type Ctx = { apiKeyId: string; sessionId: string };

const FRAMEWORKS = ["django", "fastapi", "starlette", "flask", "bare"] as const;
const CONCERNS = ["component", "layout", "fragment", "streaming", "async", "typing", "html2htpy", "review"] as const;

// OmniRoute SkillHandler: (input, { apiKeyId, sessionId }) => Promise<output>
// Register: skillExecutor.registerHandler("htpy-handler", handler)
export async function handler(
  input: Record<string, unknown>,
  _ctx: Ctx
): Promise<Record<string, unknown>> {
  const {
    task = "",
    framework = "bare",
    concern = "component",
    snippet = "",
  } = input as {
    task?: string;
    framework?: string;
    concern?: string;
    snippet?: string;
  };

  if (!task) {
    return {
      success: false,
      skill: "htpy",
      stop: true,
      message: "task is required: one sentence describing the HTML you need to generate in Python.",
    };
  }

  const fw = framework.toLowerCase();
  if (!(FRAMEWORKS as readonly string[]).includes(fw)) {
    return {
      success: false,
      skill: "htpy",
      message: `Unknown framework '${framework}'. Valid: ${FRAMEWORKS.join(", ")}.`,
    };
  }
  if (!(CONCERNS as readonly string[]).includes(concern)) {
    return {
      success: false,
      skill: "htpy",
      message: `Unknown concern '${concern}'. Valid: ${CONCERNS.join(", ")}.`,
      valid_concerns: [...CONCERNS],
    };
  }

  if (concern === "review" || snippet) {
    return {
      success: true,
      skill: "htpy",
      concern: "review",
      task: String(task).slice(0, 500),
      review: reviewSnippet(snippet || ""),
      hard_rules: hardRules(),
    };
  }

  return {
    success: true,
    skill: "htpy",
    task: String(task).slice(0, 500),
    framework: fw,
    concern,
    scaffold: scaffoldFor(fw, concern),
    hard_rules: hardRules(),
    references: concernRefs(concern),
  };
}

function hardRules(): string[] {
  return [
    "Attributes via call(), children via getitem[]: div(id=\"x\")[\"text\"].",
    "class → class_, for → for_, dashes via underscore: hx_post=\"/x\" renders hx-post.",
    "No template language — components are plain Python functions returning elements.",
    "Fragments (no wrapper): use htpy.Fragment or return lists/generators for htmx partials.",
  ];
}

function concernRefs(concern: string): string[] {
  switch (concern) {
    case "streaming": return ["references/usage.md", "scripts/examples/streaming.py"];
    case "async": return ["references/integration.md", "scripts/examples/async_render.py"];
    case "typing": return ["references/typing.md"];
    case "html2htpy": return ["references/html2htpy.md"];
    case "component": case "layout": return ["references/patterns.md", "scripts/examples/components.py"];
    case "fragment": return ["references/usage.md", "references/integration.md"];
    default: return ["references/usage.md", "references/patterns.md"];
  }
}

function scaffoldFor(fw: string, concern: string): string {
  const fragNote =
    concern === "fragment"
      ? "\n# htmx partial: return the inner content only — no <html>/<body> wrapper."
      : "";
  const streamNote =
    concern === "streaming"
      ? "\n# Streaming: yield chunks (SyncGenerator); framework flushes each chunk."
      : "";
  const asyncNote =
    concern === "async" ? "\n# Async: use `async with` / awaited children inside an async view." : "";
  const typeNote =
    concern === "typing" ? "\nfrom htpy import Element, Renderable  # annotate components -> Renderable" : "";

  const renderTail: Record<string, string> = {
    django: 'from django.http import HttpResponse\n\ndef view(request):\n    return HttpResponse(str(page()))',
    fastapi: 'from fastapi.responses import HTMLResponse\n\n@app.get("/", response_class=HTMLResponse)\ndef view():\n    return str(page())',
    starlette: 'from starlette.responses import HTMLResponse\n\nasync def view(request):\n    return HTMLResponse(str(page()))',
    flask: 'from flask import Response\n\n@app.get("/")\ndef view():\n    return Response(str(page()), mimetype="text/html")',
    bare: 'print(page())',
  };

  return [
    "from htpy import div, h1, ul, li",
    typeNote,
    "",
    "def page(items: list[str]):",
    '    return div(".wrap")[' ,
    '        h1["Title"],',
    "        ul[\n            (li[item] for item in items),\n        ],",
    "    ]",
    fragNote, streamNote, asyncNote,
    "",
    `# --- ${fw} wiring ---`,
    renderTail[fw] || renderTail.bare,
  ]
    .filter((l) => l !== "")
    .join("\n");
}

function reviewSnippet(src: string): { issues: string[]; ok: boolean } {
  const issues: string[] = [];
  const s = src.slice(0, 4000);
  if (!s.trim()) {
    return { issues: ["Empty snippet — pass the Python code to review."], ok: false };
  }
  if (/\bclass\s*=/.test(s) && !/class_/.test(s))
    issues.push("`class=` is a syntax error in htpy — use `class_=`.");
  if (/\bfor\s*=\s*["']/.test(s) && !/for_/.test(s))
    issues.push("`for=` on a label collides with Python — use `for_=`.");
  if (/f["']<.*>/.test(s) || /""".*</.test(s))
    issues.push("Raw HTML string building detected — build with htpy elements so escaping/composition stay safe.");
  if (/\{\{.*\}\}|\{%.*%\}/.test(s))
    issues.push("Template tags ({{ }}/{% %}) don't belong in htpy — delete the template, compose elements in Python.");
  if (/hx-post|hx-get/.test(s) && !/hx_post|hx_get/.test(s))
    issues.push("`hx-post=` with a dash is invalid Python kwarg — use `hx_post=` (underscore renders as dash).");
  if (/str\(.*\).*\+.*str\(/.test(s))
    issues.push("String-concatenated fragments — return element lists/generators instead so children compose.");
  return { issues, ok: issues.length === 0 };
}

export default handler;
