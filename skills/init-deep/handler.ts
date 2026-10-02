type Ctx = { apiKeyId: string; sessionId: string };

const DOMAINS = [
  "Security & Privacy", "Testing", "Engineering", "Operations & Automation",
  "Legal & Regulatory", "Brand & Marketing", "Revenue & Commercial",
  "Product", "Financial", "People & Conduct", "Cross-Domain",
] as const;

const DOMAIN_ALIASES: Record<string, string> = {
  sec: "Security & Privacy", security: "Security & Privacy", privacy: "Security & Privacy",
  test: "Testing", testing: "Testing",
  eng: "Engineering", engineering: "Engineering",
  ops: "Operations & Automation", operations: "Operations & Automation", automation: "Operations & Automation",
  legal: "Legal & Regulatory", regulatory: "Legal & Regulatory",
  brand: "Brand & Marketing", marketing: "Brand & Marketing",
  rev: "Revenue & Commercial", revenue: "Revenue & Commercial", commercial: "Revenue & Commercial",
  product: "Product", finance: "Financial", financial: "Financial",
  people: "People & Conduct", conduct: "People & Conduct",
};

const WEIGHTS: Record<string, number> = {
  file_count: 3, subdir_count: 2, code_ratio: 2, unique_patterns: 1,
  module_boundary: 2, symbol_density: 2, export_count: 2,
  reference_centrality: 3, pii_secrets_proximity: 3,
  regulated_artifact: 3, revenue_impact: 2, cross_domain_boundary: 2,
};

interface DirSignal {
  path: string;
  factors?: Record<string, number>;
  distinct_domain?: boolean;
  regulated?: boolean;
}

// OmniRoute SkillHandler: (input, { apiKeyId, sessionId }) => Promise<output>
// Register: skillExecutor.registerHandler("init-deep-handler", handler)
export async function handler(
  input: Record<string, unknown>,
  _ctx: Ctx
): Promise<Record<string, unknown>> {
  const {
    mode = "update",
    depth = 3,
    domains = "all",
    directories = [],
  } = input as {
    mode?: "update" | "create-new";
    depth?: number;
    domains?: string;
    directories?: DirSignal[];
  };

  const d = Math.max(0, Math.floor(Number(depth) || 0));
  if (d > 10) {
    return { success: false, skill: "init-deep", stop: true, message: "depth > 10 is rejected. Default is 3." };
  }

  const { resolved, warnings } = resolveDomains(domains);
  const guardrails = [
    "Manual only — explicit /init-deep invocation, never auto-run.",
    "Project workdir only — never touch global config (~/.config/...) or built-in /init.",
    "Evidence-gated: a domain section needs a file/path hit; otherwise mark absent/candidate.",
    "Edit existing AGENTS.md; Write only files that do not exist.",
    "UTF-8 output, no secrets, PII tokenised ([USER-1]), no legal advice.",
  ];

  if (!Array.isArray(directories) || directories.length === 0) {
    return {
      success: true,
      skill: "init-deep",
      phase: "plan",
      mode,
      depth: d,
      domains_filter: resolved,
      warnings,
      guardrails,
      scoring_matrix: WEIGHTS,
      decision_rules: "root always; >15 create; 8-15 create only if distinct domain; <8 skip; regulated high-confidence artifact overrides (<8 still creates). Depth cap + domains filter applied AFTER scoring.",
      next_steps: [
        "Phase 1 discovery: structural map + domain signals (references/domain-signals.md) + read existing AGENTS.md.",
        "Re-call with directories[] = [{ path, factors: {file_count: N, ...}, distinct_domain?, regulated? }] to score.",
        "Skeletons: references/templates.md. Budgets: root 50-150 lines, subdir 20-60.",
      ],
    };
  }

  const scored = (directories as DirSignal[]).map((dir) => {
    const factors = dir.factors || {};
    let score = 0;
    for (const [k, v] of Object.entries(factors)) {
      score += (WEIGHTS[k] || 0) * Number(v || 0);
    }
    const regulated = Boolean(dir.regulated);
    let action = "skip (parent covers)";
    if (dir.path === ".") action = "create/update (root always)";
    else if (score > 15) action = "create AGENTS.md";
    else if (score >= 8) action = dir.distinct_domain ? "create (distinct domain)" : "skip (parent covers)";
    else if (regulated) action = "create (domain-override: regulated artifact)";
    return { path: dir.path, score, action, domain_override: regulated && score < 8 };
  });

  const withinDepth = scored.filter((s) => {
    if (s.path === ".") return true;
    const segs = s.path.split("/").filter(Boolean).length;
    return segs <= d;
  });
  const droppedByDepth = scored.filter((s) => !withinDepth.includes(s)).map((s) => s.path);

  const locations = [
    { path: ".", type: "root" },
    ...withinDepth
      .filter((s) => s.path !== "." && !s.action.startsWith("skip"))
      .map((s) => ({ path: s.path, score: s.score, reason: s.action })),
  ];

  return {
    success: true,
    skill: "init-deep",
    phase: "scored",
    mode,
    depth: d,
    domains_filter: resolved,
    warnings,
    guardrails,
    scored,
    dropped_by_depth: droppedByDepth,
    AGENTS_LOCATIONS: locations,
    next_steps: [
      "Phase 3: generate root first, then subdirs — one domain section per evidence hit, max 3 domain tags per subdir.",
      "Phase 4: deduplicate (child = delta only), validate budgets + evidence, final report with DOMAINS ACTIVE map.",
    ],
  };
}

function resolveDomains(raw: string): { resolved: string[]; warnings: string[] } {
  const warnings: string[] = [];
  if (!raw || raw.trim().toLowerCase() === "all") return { resolved: [...DOMAINS], warnings };
  const out: string[] = [];
  for (const part of raw.split(",").map((s) => s.trim()).filter(Boolean)) {
    const hit = (DOMAINS as readonly string[]).find((d) => d.toLowerCase() === part.toLowerCase())
      || DOMAIN_ALIASES[part.toLowerCase()];
    if (hit) {
      if (!out.includes(hit)) out.push(hit);
    } else {
      warnings.push(`Unknown domain '${part}' — ignored (canonical list only).`);
    }
  }
  return { resolved: out.length ? out : [...DOMAINS], warnings };
}

export default handler;
