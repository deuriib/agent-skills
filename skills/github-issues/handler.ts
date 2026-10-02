import { execSync } from "child_process";

type Ctx = { apiKeyId: string; sessionId: string };

function sh(cmd: string): string {
  try {
    return execSync(cmd, { encoding: "utf8", timeout: 15000 }).trim();
  } catch (err: any) {
    return `ERROR: ${(err?.message || String(err)).slice(0, 800)}`;
  }
}

function scrubSecrets(text: string): { clean: string; blocked: boolean } {
  const secretRe =
    /(ghp_|gho_|github_pat_|sk-|xox[bpas]-|-----BEGIN [A-Z ]*PRIVATE KEY-----)/i;
  const blocked = secretRe.test(text);
  const clean = text
    .replace(/(ghp_[A-Za-z0-9]+)/g, "<TOKEN>")
    .replace(/(github_pat_[A-Za-z0-9_]+)/g, "<TOKEN>")
    .slice(0, 4000);
  return { clean, blocked };
}

// OmniRoute SkillHandler: (input, { apiKeyId, sessionId }) => Promise<output>
// Register: skillExecutor.registerHandler("github-issues-handler", handler)
export async function handler(
  input: Record<string, unknown>,
  _ctx: Ctx
): Promise<Record<string, unknown>> {
  const {
    action = "view",
    number,
    title,
    body,
    labels,
    comment,
    dry_run = true,
  } = input as {
    action?: "view" | "create" | "triage" | "take" | "comment" | "close" | "reopen" | "search";
    number?: number;
    title?: string;
    body?: string;
    labels?: string[];
    comment?: string;
    dry_run?: boolean;
  };

  const auth = sh("gh auth status");
  if (auth.startsWith("ERROR")) {
    return {
      success: false,
      skill: "github-issues",
      gate: "auth-first",
      stop: true,
      message: "gh is not authenticated. Run `gh auth status` / `gh auth login` first. No API workarounds.",
      auth_output: auth.slice(0, 500),
    };
  }

  if (action === "search") {
    return {
      success: true,
      skill: "github-issues",
      gate: "locate",
      commands: [
        "gh issue list --search \"<query>\" --state open --limit 30",
        "gh issue list --label needs-triage --state open --limit 30",
        "gh search issues \"<query>\" --state open --json number,title,labels",
      ],
      next_steps: ["Search, don't scroll (references/search-recipes.md). View with `gh issue view <N> --comments` before mutating."],
    };
  }

  if (action === "view" || !number) {
    if (!number)
      return {
        success: false,
        skill: "github-issues",
        gate: "locate",
        message: "number is required for view/triage/take/comment/close/reopen.",
      };
    const out = sh(`gh issue view ${number} --comments`);
    const { clean, blocked } = scrubSecrets(out);
    return {
      success: !out.startsWith("ERROR"),
      skill: "github-issues",
      gate: "view-before-mutate",
      issue: number,
      detail: clean,
      secret_warning: blocked ? "Output contained possible secrets — scrubbed to <TOKEN>." : null,
      next_steps: ["Read state, labels, linked PRs before any edit, comment, assign, close, or reopen."],
    };
  }

  if (action === "create") {
    if (!title || !body) {
      return {
        success: false,
        skill: "github-issues",
        gate: "shape-first",
        stop: true,
        message: "title + body required. Apply references/issue-template.md: imperative scoped title; body has context, repro/proposal, acceptance criteria.",
        template: "Title: `<verb> <scope>: <outcome>`. Body: ## Context / ## Repro or Proposal / ## Acceptance criteria.",
      };
    }
    const { blocked } = scrubSecrets(`${title}\n${body}`);
    if (blocked)
      return { success: false, skill: "github-issues", stop: true, message: "Body looks like it contains a token/key. Scrub to placeholders first." };
    if (dry_run) {
      return {
        success: true,
        skill: "github-issues",
        gate: "shape-first",
        dry_run: true,
        proposed_title: title,
        proposed_labels: labels || [],
        next_steps: [`gh issue create --title "${title}" --body-file <shaped-body> ${(labels || []).map((l) => `--label "${l}"`).join(" ")}`.trim()],
      };
    }
    const fs = await import("fs/promises");
    const tmp = `issue-body-${Date.now()}.md`;
    await fs.writeFile(tmp, body, "utf8");
    const out = sh(
      `gh issue create --title "${title.replace(/"/g, '\\"')}" --body-file "${tmp}" ${(labels || []).map((l) => `--label "${l}"`).join(" ")}`
    );
    sh(`del "${tmp}" 2>nul || rm -f "${tmp}"`);
    return { success: !out.startsWith("ERROR"), skill: "github-issues", gate: "create", result: out.slice(0, 2000) };
  }

  if (action === "triage") {
    const cmds = [
      `gh issue view ${number} --comments`,
      labels?.length
        ? `gh issue edit ${number} --add-label "${labels.join(",")}" --remove-label "needs-triage"`
        : `gh issue edit ${number} # add type:/priority:/status: labels per references/triage-labels.md`,
    ];
    if (dry_run)
      return { success: true, skill: "github-issues", gate: "triage", dry_run: true, commands: cmds };
    const viewOut = sh(cmds[0]);
    return { success: true, skill: "github-issues", gate: "triage", detail: scrubSecrets(viewOut).clean, commands: cmds };
  }

  if (action === "take") {
    const cmds = [
      `gh issue edit ${number} --add-assignee @me`,
      `gh issue develop ${number} --checkout`,
    ];
    if (dry_run)
      return { success: true, skill: "github-issues", gate: "take", dry_run: true, commands: cmds, rule: "Take = assign + branch + status-label move. Claiming without branching is theater." };
    const a = sh(cmds[0]);
    const b = sh(cmds[1]);
    return { success: !b.startsWith("ERROR"), skill: "github-issues", gate: "take", assign_output: a.slice(0, 500), branch_output: b.slice(0, 1000) };
  }

  if (action === "comment") {
    if (!comment)
      return { success: false, skill: "github-issues", message: "comment text required." };
    const { blocked } = scrubSecrets(comment);
    if (blocked)
      return { success: false, skill: "github-issues", stop: true, message: "Comment contains a possible secret. Scrub first." };
    if (dry_run)
      return { success: true, skill: "github-issues", gate: "track", dry_run: true, commands: [`gh issue comment ${number} --body "${comment.slice(0, 120)}..."`] };
    const out = sh(`gh issue comment ${number} --body "${comment.replace(/"/g, '\\"')}"`);
    return { success: !out.startsWith("ERROR"), skill: "github-issues", gate: "track", result: out.slice(0, 1000) };
  }

  if (action === "close" || action === "reopen") {
    if (dry_run) {
      return {
        success: true,
        skill: "github-issues",
        gate: action === "close" ? "close-needs-proof" : "reopen",
        dry_run: true,
        rule:
          action === "close"
            ? "Close only with proof: merged PR (Closes #N), verified outcome, or documented wontfix/duplicate comment."
            : "Reopen only with new evidence or a reverted fix.",
        commands: action === "close"
          ? [`gh issue comment ${number} --body "<proof or reason>"`, `gh issue close ${number} --reason "completed|not planned"`]
          : [`gh issue reopen ${number}`, `gh issue comment ${number} --body "<new evidence>"`],
      };
    }
    if (action === "close") {
      if (!comment)
        return { success: false, skill: "github-issues", stop: true, message: "Manual close needs a proof comment first. Post it, then close." };
      const c = sh(`gh issue comment ${number} --body "${comment.replace(/"/g, '\\"')}"`);
      const k = sh(`gh issue close ${number}`);
      return { success: !k.startsWith("ERROR"), skill: "github-issues", gate: "close-needs-proof", comment_output: c.slice(0, 500), close_output: k.slice(0, 500) };
    }
    const out = sh(`gh issue reopen ${number}`);
    return { success: !out.startsWith("ERROR"), skill: "github-issues", gate: "reopen", result: out.slice(0, 500) };
  }

  return { success: false, skill: "github-issues", error: `unknown action '${action}'` };
}

export default handler;
