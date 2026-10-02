type Ctx = { apiKeyId: string; sessionId: string };

const METHODS = ["get", "post", "put", "patch", "delete"] as const;
const SWAPS = [
  "innerHTML", "outerHTML", "beforebegin", "afterbegin",
  "beforeend", "afterend", "delete", "none",
] as const;
const TRIGGERS = ["click", "change", "submit", "load", "revealed", "every", "custom"] as const;

const PATTERN_PRESETS: Record<string, { attrs: string; server: string; notes: string }> = {
  ajax: {
    attrs: `hx-get="/fragment" hx-target="#result" hx-swap="innerHTML"`,
    server: "Return an HTML fragment (not JSON). Check HX-Request header to serve fragment vs full page.",
    notes: "Default trigger is the element's natural event (click for buttons, submit for forms).",
  },
  form: {
    attrs: `hx-post="/submit" hx-target="#form-result" hx-swap="innerHTML"`,
    server: "On validation error return status 422 + re-rendered form fragment. Add hx-encoding=\"multipart/form-data\" for file uploads.",
    notes: "htmx serializes the enclosing form automatically. Use hx-include to add values from outside the form.",
  },
  "infinite-scroll": {
    attrs: `hx-get="/items?page=2" hx-trigger="revealed" hx-swap="afterend"`,
    server: "Each page returns items + the next sentinel div carrying the next hx-get. Last page returns items only.",
    notes: "hx-trigger=\"revealed\" fires when the sentinel scrolls into view.",
  },
  "live-search": {
    attrs: `hx-get="/search" hx-trigger="keyup changed delay:300ms" hx-target="#results"`,
    server: "Debounce server-side too. Return a results-list fragment; empty query returns the empty-state fragment.",
    notes: "keyup changed delay:300ms is the canonical live-search trigger.",
  },
  "click-to-edit": {
    attrs: `hx-get="/item/1/edit" hx-target="this" hx-swap="outerHTML"`,
    server: "GET returns the edit form; form hx-put returns the read-only row. Cancel button issues hx-get for the row.",
    notes: "Swap on the row itself (hx-target=\"this\", outerHTML) so edit/view replace each other.",
  },
  realtime: {
    attrs: `hx-ext="sse" sse-connect="/events" sse-swap="message" hx-target="#feed" hx-swap="beforeend"`,
    server: "Serve text/event-stream. Each event carries an HTML fragment. Needs the sse extension script.",
    notes: "Use hx-ext=\"ws\" + ws-connect for bidirectional; sse for server-push only.",
  },
  history: {
    attrs: `hx-get="/page" hx-push-url="true" hx-target="#main"`,
    server: "Return the fragment; htmx snapshots #main content so back-button restores it.",
    notes: "hx-push-url=\"true\" pushes the hx-get URL into browser history.",
  },
  boost: {
    attrs: `hx-boost="true"`,
    server: "Serve full pages as usual; htmx upgrades anchors/forms to AJAX. Fall back gracefully when JS is off.",
    notes: "Put hx-boost on <body> to upgrade the whole site progressively.",
  },
};

// OmniRoute SkillHandler: (input, { apiKeyId, sessionId }) => Promise<output>
// Register: skillExecutor.registerHandler("htmx-handler", handler)
export async function handler(
  input: Record<string, unknown>,
  _ctx: Ctx
): Promise<Record<string, unknown>> {
  const {
    task = "",
    pattern = "custom",
    method = "get",
    trigger,
    target,
    swap = "innerHTML",
    snippet = "",
  } = input as {
    task?: string;
    pattern?: string;
    method?: string;
    trigger?: string;
    target?: string;
    swap?: string;
    snippet?: string;
  };

  if (!task) {
    return {
      success: false,
      skill: "htmx",
      stop: true,
      message: "task is required: one sentence describing the dynamic UI behavior you need.",
    };
  }

  const warnings: string[] = [];
  const m = method.toLowerCase();
  if (!(METHODS as readonly string[]).includes(m))
    warnings.push(`Unknown method '${method}'. Use hx-get/post/put/patch/delete.`);
  if (!(SWAPS as readonly string[]).includes(swap))
    warnings.push(`Unknown swap '${swap}'. Valid: ${SWAPS.join(", ")}.`);
  if (trigger && !(TRIGGERS as readonly string[]).includes(trigger) && !/every \d+[sm]/i.test(trigger) && !trigger.includes("delay:"))
    warnings.push(`Unusual trigger '${trigger}'. Common: click, change, load, revealed, 'every 2s', 'keyup changed delay:300ms'.`);

  const preset = PATTERN_PRESETS[pattern];
  if (!preset) {
    return {
      success: false,
      skill: "htmx",
      message: `Unknown pattern '${pattern}'. Valid: ${Object.keys(PATTERN_PRESETS).join(", ")}, custom.`,
      valid_patterns: Object.keys(PATTERN_PRESETS),
    };
  }

  const attrs: string[] = [];
  if (pattern === "custom") {
    attrs.push(`hx-${m}="<url>"`);
    if (target) attrs.push(`hx-target="${target}"`);
    if (swap !== "innerHTML" || target) attrs.push(`hx-swap="${swap}"`);
    if (trigger) attrs.push(`hx-trigger="${trigger}"`);
  } else {
    attrs.push(preset.attrs);
    if (target) attrs.push(`<!-- override target: hx-target="${target}" -->`);
    if (trigger) attrs.push(`<!-- override trigger: hx-trigger="${trigger}" -->`);
  }

  const snippetReview = snippet
    ? reviewSnippet(snippet)
    : null;

  return {
    success: true,
    skill: "htmx",
    pattern,
    task: String(task).slice(0, 500),
    element_scaffold: `<div ${attrs.join(" ")}>\n  <!-- content / fallback -->\n</div>`,
    server_contract: preset.server,
    guidance_notes: preset.notes,
    hard_rules: [
      "Server returns HTML fragments, not JSON — htmx swaps HTML into the DOM.",
      "Distinguish htmx vs full-page requests via the HX-Request header.",
      "Behavior lives in attributes; avoid inline JavaScript.",
    ],
    warnings,
    snippet_review: snippetReview,
    references: ["references/attributes.md", "references/server-integration.md", "references/examples/ui-patterns.md"],
  };
}

function reviewSnippet(src: string): { issues: string[]; ok: boolean } {
  const issues: string[] = [];
  const s = src.slice(0, 4000);
  if (!/hx-(get|post|put|patch|delete|boost)/.test(s))
    issues.push("No hx-* request attribute found — element does nothing without hx-get/post/... or hx-boost.");
  if (/hx-(get|post)/.test(s) && !/hx-target/.test(s))
    issues.push("No hx-target: response swaps into the requesting element by default — confirm that is intended.");
  if (/fetch\(|axios\.|\$\.ajax/.test(s) && /hx-(get|post)/.test(s))
    issues.push("Manual fetch/AJAX alongside hx-* detected — pick one; duplication causes double requests.");
  if (/hx-swap="(innerHTML|outerHTML)"/.test(s) && !/hx-target/.test(s))
    issues.push("Explicit default swap without a target is noise — drop hx-swap or add hx-target.");
  if (/\.innerHTML\s*=/.test(s))
    issues.push("Manual innerHTML assignment defeats htmx's swap pipeline — let hx-swap do it.");
  return { issues, ok: issues.length === 0 };
}

export default handler;
