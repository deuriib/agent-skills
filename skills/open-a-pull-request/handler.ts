import { execSync } from "child_process";

type Ctx = { apiKeyId: string; sessionId: string };

function sh(cmd: string): string {
  try {
    return execSync(cmd, { encoding: "utf8", timeout: 15000 }).trim();
  } catch (err: any) {
    return `ERROR: ${(err?.message || String(err)).slice(0, 800)}`;
  }
}

function toBranchName(type: string, name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "task";
  return `${type}/${slug}`;
}

// OmniRoute SkillHandler: (input, { apiKeyId, sessionId }) => Promise<output>
// Register: skillExecutor.registerHandler("open-a-pull-request-handler", handler)
export async function handler(
  input: Record<string, unknown>,
  _ctx: Ctx
): Promise<Record<string, unknown>> {
  const {
    issue_number,
    branch,
    branch_type = "feat",
    title,
    summary,
    test_plan,
    base = "main",
    draft = false,
    dry_run = true,
  } = input as {
    issue_number?: number;
    branch?: string;
    branch_type?: string;
    title?: string;
    summary?: string;
    test_plan?: string;
    base?: string;
    draft?: boolean;
    dry_run?: boolean;
  };

  if (!issue_number) {
    return {
      success: false,
      skill: "open-a-pull-request",
      gate: "link-first",
      stop: true,
      message: "No linked issue/spec. A PR with no linked unit gets closed, not reviewed. Provide issue_number.",
    };
  }

  const status = sh("git status --short");
  const diffStat = sh("git diff --stat");
  const branchName = branch || toBranchName(branch_type, `issue-${issue_number}`);

  const body =
    `Closes #${issue_number}\n\n` +
    `## Summary\n${summary || "<one-intent summary>"}\n\n` +
    `## Changes\n${diffStat.slice(0, 1500) || "<diff stat>"}\n\n` +
    `## Test plan\n${test_plan || "<checks run + results>"}`;

  const createsBranch = sh("git branch --show-current") !== branchName;
  const lineCount = diffStat
    .split("\n")
    .map((l) => {
      const m = l.match(/(\d+) insertion.*(\d+) deletion|(\d+) insertion|(\d+) deletion/);
      if (!m) return 0;
      return (m[1] ? +m[1] : m[3] ? +m[3] : 0) + (m[2] ? +m[2] : m[4] ? +m[4] : 0);
    })
    .reduce((a, b) => a + b, 0);

  if (dry_run) {
    return {
      success: true,
      skill: "open-a-pull-request",
      gate: "plan",
      dry_run: true,
      branch: branchName,
      base,
      worktree_status: status.slice(0, 1000),
      diff_stat: diffStat.slice(0, 1500),
      size_warning: lineCount > 400
        ? `~${lineCount} changed lines > 400. Split (references/splitting-a-pr.md), stack, or document size:exception.`
        : null,
      pr_title: title || `<type>(<scope>): <intent> (Closes #${issue_number})`,
      pr_body: body,
      next_steps: [
        `git checkout -b ${branchName} ${base}`,
        "Shape commits with git-commit (one reason-to-revert each).",
        "Run repo checks locally (typecheck/lint minimum).",
        `git push -u origin ${branchName}`,
        `gh pr create --base ${base} --title "<title>" --body-file <body>${draft ? " --draft" : ""}`,
      ],
    };
  }

  if (status && createsBranch === false && status.length > 0) {
    // dirty tree on the PR branch is fine (it becomes the diff) — only flag is reported
  }

  const steps: string[] = [];
  if (createsBranch) steps.push(sh(`git checkout -b ${branchName}`));
  const pushOut = sh(`git push -u origin ${branchName}`);
  if (pushOut.startsWith("ERROR") && !pushOut.includes("up-to-date") && !pushOut.includes("Everything up-to-date"))
    return { success: false, skill: "open-a-pull-request", error: pushOut.slice(0, 800) };

  const fs = await import("fs/promises");
  const tmp = `pr-body-${Date.now()}.md`;
  await fs.writeFile(tmp, body, "utf8");
  const prOut = sh(
    `gh pr create --base ${base} --title "${(title || branchName).replace(/"/g, '\\"')}" --body-file "${tmp}"${draft ? " --draft" : ""}`
  );
  sh(`del "${tmp}" 2>nul || rm -f "${tmp}"`);
  return {
    success: !prOut.startsWith("ERROR"),
    skill: "open-a-pull-request",
    gate: "open",
    branch: branchName,
    pr_result: prOut.slice(0, 2000),
    follow_through: ["Watch CI; fix red on the branch (references/ci-red.md).", "Answer every review thread (references/addressing-review.md)."],
  };
}

export default handler;
