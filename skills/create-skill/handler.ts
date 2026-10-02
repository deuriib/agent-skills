import { execSync } from "child_process";

type Ctx = { apiKeyId: string; sessionId: string };

const REQUIRED_FILES = ["SKILL.md", "handler.ts", "omniskill.json"] as const;

function sh(cmd: string): string {
  try {
    return execSync(cmd, { encoding: "utf8", timeout: 8000 }).trim();
  } catch (err: any) {
    return `ERROR: ${(err?.message || String(err)).slice(0, 500)}`;
  }
}

function readFile(path: string): string | null {
  try {
    return execSync(`cat "${path}"`, { encoding: "utf8", timeout: 5000 });
  } catch {
    return null;
  }
}

// OmniRoute SkillHandler: (input, { apiKeyId, sessionId }) => Promise<output>
// Register: skillExecutor.registerHandler("create-skill-handler", handler)
export async function handler(
  input: Record<string, unknown>,
  _ctx: Ctx
): Promise<Record<string, unknown>> {
  const { action = "validate", name = "", bump = "minor" } = input as {
    action?: "scaffold" | "validate" | "update-plan";
    name?: string;
    bump?: "minor" | "none";
  };

  if (action === "scaffold") {
    if (!name || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) {
      return {
        success: false,
        skill: "create-skill",
        stop: true,
        message: "name is required: lowercase kebab-case (e.g. my-skill).",
      };
    }
    const handlerName = `${name}-handler`;
    return {
      success: true,
      skill: "create-skill",
      gate: "scaffold",
      files: {
        [`skills/${name}/SKILL.md`:
          `---\nname: ${name}\ndescription: "<one line, <=500 chars, trigger-first>"\nlicense: Apache-2.0\nmetadata:\n  author: deuriib\n  version: "1.0"\nomniroute:\n  handler: ${handlerName}\n  mode: auto\n  sourceProvider: local\n  tags: []\n---\n\n# Skill: ${name}\n\n## Activation Contract\n## Hard Rules\n## Decision Gates\n## Execution Steps\n## OmniRoute Compatibility\n## References\n`],
        [`skills/${name}/handler.ts`:
          `export async function handler(input: Record<string, unknown>, ctx: { apiKeyId: string; sessionId: string }): Promise<Record<string, unknown>> {\n  return { success: true, skill: "${name}" };\n}\n\nexport default handler;\n`],
        [`skills/${name}/omniskill.json`]:
          JSON.stringify(
            {
              name, version: "1.0.0", description: "<same as frontmatter>",
              schema: { input: { type: "object", properties: { dry_run: { type: "boolean", default: true } } }, output: { type: "object", properties: { success: { type: "boolean" }, skill: { type: "string" } } } },
              handler: handlerName, mode: "auto", sourceProvider: "local", tags: [],
            },
            null, 2
          ),
      },
      next_steps: [
        `mkdir -p skills/${name}/references`,
        "Fill SKILL.md sections; add references/; keep description parity across the 3 copies.",
        `Re-run with { action: "validate", name: "${name}" }.`,
      ],
    };
  }

  if (action === "update-plan") {
    if (!name) {
      return { success: false, skill: "create-skill", message: "name is required for update-plan." };
    }
    const diffStat = sh(`git diff --stat -- skills/${name}/`);
    const status = sh(`git status --short -- skills/${name}/`);
    const contractTouched =
      /SKILL\.md|omniskill\.json|handler\.ts/.test(diffStat + status);
    return {
      success: true,
      skill: "create-skill",
      gate: "update-plan",
      worktree: (status || "(clean)").slice(0, 1000),
      diff_stat: (diffStat || "(no diff)").slice(0, 1000),
      contract_impact: contractTouched,
      bump: contractTouched ? (bump === "none" ? "none (explicit override — confirm no contract change)" : "minor: metadata.version 1.x -> 1.x+1 + omniskill.json 1.x.0 -> 1.x+1.0") : "none: content-only edit, no version change",
      rule: "Contract edit (schema/frontmatter/gates/handler) = minor bump both files. Content-only (typo/example) = no bump.",
    };
  }

  // validate (default)
  if (!name) {
    return { success: false, skill: "create-skill", message: "name is required for validate." };
  }
  const issues: string[] = [];
  const dir = `skills/${name}`;
  const contents: Record<string, string | null> = {};
  for (const f of REQUIRED_FILES) contents[f] = readFile(`${dir}/${f}`);

  for (const f of REQUIRED_FILES) {
    if (contents[f] == null) issues.push(`Missing ${dir}/${f}.`);
  }
  if (contents["SKILL.md"]) {
    const m = contents["SKILL.md"]!;
    if (!/^name: /m.test(m)) issues.push("SKILL.md frontmatter missing `name:`.");
    const desc = m.match(/^description: (.*)$/m)?.[1] ?? "";
    if (desc.length > 550) issues.push(`description ~${desc.length} chars — install cap is 500.`);
    if (!/omniroute:\n  handler:/.test(m)) issues.push("SKILL.md missing `omniroute:` block (docs-only skill, not omniskill).");
    if (!/## OmniRoute Compatibility/.test(m)) issues.push("SKILL.md missing `## OmniRoute Compatibility` section.");
    for (const ref of m.matchAll(/`references\/([a-z0-9/_.-]+\.md)`/g)) {
      if (readFile(`${dir}/references/${ref[1]}`) == null)
        issues.push(`Broken link: references/${ref[1]} does not exist.`);
    }
  }
  if (contents["handler.ts"]) {
    const h = contents["handler.ts"]!;
    if (!/export async function handler/.test(h)) issues.push("handler.ts missing `export async function handler`.");
    if (!/export default handler/.test(h)) issues.push("handler.ts missing `export default handler`.");
    if (!/apiKeyId/.test(h) || !/sessionId/.test(h)) issues.push("handler.ts ctx should carry { apiKeyId, sessionId }.");
  }
  let manifest: any = null;
  if (contents["omniskill.json"]) {
    try {
      manifest = JSON.parse(contents["omniskill.json"]!);
    } catch {
      issues.push("omniskill.json is not valid JSON.");
    }
    if (manifest) {
      if (!/^\d+\.\d+\.\d+$/.test(manifest.version ?? "")) issues.push(`omniskill.json version '${manifest.version}' is not semver.`);
      if (manifest.handler !== `${name}-handler`) issues.push(`omniskill.json handler should be '${name}-handler}'.`);
      if (!manifest.schema?.input || !manifest.schema?.output) issues.push("omniskill.json needs schema.input + schema.output.");
      const frontDesc = contents["SKILL.md"]?.match(/^description: (.*)$/m)?.[1]?.replace(/^["']|["']$/g, "").trim();
      if (frontDesc && manifest.description && frontDesc !== manifest.description)
        issues.push("Description parity broken: frontmatter != omniskill.json.");
    }
  }

  return {
    success: issues.length === 0,
    skill: "create-skill",
    gate: "validate",
    name,
    omniskill: issues.length === 0,
    issues,
    next_steps: issues.length
      ? ["Fix listed issues, then re-validate."]
      : [`Install: POST /api/skills/install with handlerCode "${name}-handler".`, `Execute: omniroute_skills_execute({ skillName: "${name}", input: {...} })`],
  };
}

export default handler;
