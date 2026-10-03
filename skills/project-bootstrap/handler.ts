import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import TEMPLATES from "./templates";

type Ctx = { apiKeyId: string; sessionId: string };

/** Files this skill manages, in application order. Order matters: config first, then docs. */
const PLAN = [
  ".gitattributes",
  ".gitignore",
  ".npmrc",
  ".editorconfig",
  ".pre-commit-config.yaml",
  ".bump-version.json",
  "script/bump-version.mjs",
  "LICENSE",
  "README.md",
  "CHANGELOG.md",
  "CODE_OF_CONDUCT.md",
  "PRODUCT.md",
] as const;

/** Status vocabulary returned per file. Dry-run uses the would_* variant. */
type Status = "created" | "merged" | "skipped" | "would_create" | "would_skip";

interface FilePlan {
  path: string;
  template: string | null;
  mode: "create" | "merge" | "conditional";
}

interface PlanEntry {
  path: string;
  status: Status;
  note?: string;
}

interface BootstrapInput {
  project?: string;
  description?: string;
  author?: string;
  year?: number;
  contact?: string;
  license?: string;
  status?: string;
  install_cmd?: string;
  usage_cmd?: string;
  dev_cmd?: string;
  files?: string[];
  force?: boolean;
  dry_run?: boolean;
}

/**
 * Static file plan.
 * - `create`: write template only when the target is missing. Existing file wins
 *   (these are human-authored or machine-maintained — never clobber them).
 * - `merge`: append the template only if the target lacks its core anchor; the
 *   existing content is preserved verbatim above the appended block.
 * - `conditional`: like create, but skipped unless requested via `files`.
 */
const PLAN_TABLE: FilePlan[] = [
  { path: ".gitattributes", template: ".gitattributes", mode: "create" },
  { path: ".gitignore", template: ".gitignore", mode: "merge" },
  { path: ".npmrc", template: ".npmrc", mode: "create" },
  { path: ".editorconfig", template: ".editorconfig", mode: "create" },
  { path: ".pre-commit-config.yaml", template: ".pre-commit-config.yaml", mode: "create" },
  { path: ".bump-version.json", template: ".bump-version.json", mode: "create" },
  { path: "script/bump-version.mjs", template: "script/bump-version.mjs", mode: "create" },
  { path: "LICENSE", template: "LICENSE", mode: "create" },
  { path: "README.md", template: "README.md", mode: "create" },
  { path: "CHANGELOG.md", template: "CHANGELOG.md", mode: "merge" },
  { path: "CODE_OF_CONDUCT.md", template: "CODE_OF_CONDUCT.md", mode: "create" },
  { path: "PRODUCT.md", template: "PRODUCT.md", mode: "create" },
];

/** Anchor strings used by `merge` mode to decide whether appending is needed. */
const MERGE_ANCHORS: Record<string, string> = {
  ".gitignore": "# ---- Dependencies ----",
  "CHANGELOG.md": "# Changelog",
};

const KNOWN_TEMPLATES = new Set<string>(PLAN);

function loadTemplate(rel: string): string {
  // Templates are inlined into templates.ts (generated) so the handler needs no
  // external file reads in the OmniRoute sandbox. Placeholder tokens
  // ({{project}}, ...) are replaced by renderTemplate() below.
  const raw = TEMPLATES[rel];
  if (raw === undefined) throw new Error(`Missing template: ${rel}`);
  return raw;
}

function renderTemplate(raw: string, vars: Record<string, string>): string {
  return raw.replace(/\{\{([a-z_]+)\}\}/g, (whole, key: string) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? vars[key] : whole
  );
}

function coerceInput(input: Record<string, unknown>): BootstrapInput {
  const i = input as BootstrapInput;
  return {
    project: typeof i.project === "string" ? i.project : undefined,
    description: typeof i.description === "string" ? i.description : undefined,
    author: typeof i.author === "string" ? i.author : undefined,
    year: typeof i.year === "number" ? i.year : undefined,
    contact: typeof i.contact === "string" ? i.contact : undefined,
    license: typeof i.license === "string" ? i.license : undefined,
    status: typeof i.status === "string" ? i.status : undefined,
    install_cmd: typeof i.install_cmd === "string" ? i.install_cmd : undefined,
    usage_cmd: typeof i.usage_cmd === "string" ? i.usage_cmd : undefined,
    dev_cmd: typeof i.dev_cmd === "string" ? i.dev_cmd : undefined,
    files: Array.isArray(i.files) ? i.files.filter((f): f is string => typeof f === "string") : undefined,
    force: Boolean(i.force),
    dry_run: i.dry_run === undefined ? true : Boolean(i.dry_run),
  };
}

function buildVars(i: BootstrapInput): Record<string, string> {
  const project = i.project ?? "";
  const author = i.author ?? "Your Name";
  const year = String(i.year ?? new Date().getFullYear());
  const license = i.license ?? "MIT";
  const contact = i.contact ?? i.author ?? "maintainers@example.com";
  return {
    project,
    description: i.description ?? "One-paragraph description of what this project does and why.",
    author,
    year,
    contact,
    license,
    status: i.status ?? "Experimental — breaking changes may occur.",
    install_cmd: i.install_cmd ?? `npm install ${project || "<package>"}`,
    usage_cmd: i.usage_cmd ?? `npx ${project || "<cli>"}`,
    dev_cmd: i.dev_cmd ?? "npm install && npm test",
    date: new Date().toISOString().slice(0, 10),
    goal_1: "Primary goal to achieve.",
    goal_2: "Secondary goal to achieve.",
    nongoal_1: "Explicit non-goal to keep scope tight.",
  };
}

function writeFile(path: string, content: string, dryRun: boolean): Status {
  if (dryRun) return "would_create";
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, "utf8");
  return "created";
}

/**
 * Apply one plan entry. Returns the outcome plus an optional human note.
 * Merge mode appends the rendered template below existing content when the
 * anchor is missing; if the anchor is present, the file is left untouched.
 */
function applyEntry(
  entry: FilePlan,
  vars: Record<string, string>,
  opts: { dryRun: boolean; force: boolean; requested: boolean; root: string }
): { status: Status; note?: string } {
  const abs = join(opts.root, entry.path);
  const exists = existsSync(abs);

  if (entry.mode === "conditional" && !opts.requested) {
    return { status: opts.dryRun ? "would_skip" : "skipped", note: "not requested" };
  }

  if (entry.mode === "merge" && exists) {
    const existing = readFileSync(abs, "utf8");
    const anchor = MERGE_ANCHORS[entry.path];
    if (anchor && existing.includes(anchor)) {
      return { status: opts.dryRun ? "would_skip" : "skipped", note: "already present" };
    }
    const rendered = renderTemplate(loadTemplate(entry.template!), vars);
    if (opts.dryRun) return { status: "would_create", note: "append missing section" };
    mkdirSync(dirname(abs), { recursive: true });
    const sep = existing.endsWith("\n") ? "\n" : "\n\n";
    writeFileSync(abs, existing + sep + rendered, "utf8");
    return { status: "merged", note: "appended missing section" };
  }

  if (exists && !opts.force) {
    // Non-destructive default: an existing file always wins unless forced.
    return { status: opts.dryRun ? "would_skip" : "skipped", note: "exists" };
  }

  const rendered = renderTemplate(loadTemplate(entry.template!), vars);
  const status = writeFile(abs, rendered, opts.dryRun);
  return { status, note: opts.force && exists ? "overwritten (force)" : undefined };
}

// OmniRoute SkillHandler: (input, { apiKeyId, sessionId }) => Promise<output>
// Register: skillExecutor.registerHandler("project-bootstrap-handler", handler)
export async function handler(
  input: Record<string, unknown>,
  _ctx: Ctx
): Promise<Record<string, unknown>> {
  const i = coerceInput(input ?? {});

  if (!i.project || i.project.trim() === "") {
    return {
      success: false,
      skill: "project-bootstrap",
      gate: "need-project",
      stop: true,
      message: "Provide `project` (the directory/repo name to bootstrap).",
      next_steps: ["Re-call with { project: \"my-repo\", description: \"...\" }."],
    };
  }

  const vars = buildVars(i);
  const requested = new Set(i.files ?? []);
  for (const f of requested) {
    if (!KNOWN_TEMPLATES.has(f)) {
      return {
        success: false,
        skill: "project-bootstrap",
        gate: "unknown-file",
        stop: true,
        message: `Unknown file "${f}" in \`files\`. Allowed: ${[...KNOWN_TEMPLATES].join(", ")}`,
        next_steps: ["Drop the unknown entry or fix the spelling."],
      };
    }
  }

  const dryRun = i.dry_run !== false;
  const root = process.cwd();
  const plan: PlanEntry[] = [];

  for (const entry of PLAN_TABLE) {
    const wanted = requested.size === 0 || requested.has(entry.path);
    const effectiveMode = entry.mode === "conditional" || requested.size > 0 ? "conditional" : entry.mode;
    const outcome = applyEntry(
      { ...entry, mode: effectiveMode as FilePlan["mode"] },
      vars,
      { dryRun, force: Boolean(i.force), requested: wanted, root }
    );
    plan.push({ path: entry.path, status: outcome.status, note: outcome.note });
  }

  const created = plan.filter((p) => p.status === "created" || p.status === "would_create").length;
  const skipped = plan.filter((p) => p.status === "skipped" || p.status === "would_skip").length;
  const verb = dryRun ? "Would create" : "Created";

  return {
    success: true,
    skill: "project-bootstrap",
    gate: dryRun ? "dry-run" : "applied",
    dry_run: dryRun,
    project: i.project,
    summary: `${verb} ${created}, skipped ${skipped} of ${plan.length} planned files.`,
    files: plan,
    next_steps: dryRun
      ? ["Review the plan above.", "Re-call with dry_run: false to write to disk."]
      : ["Run `pre-commit install` if hooks were added.", "Review generated README/PRODUCT and fill placeholders."],
  };
}

export default handler;
