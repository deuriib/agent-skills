import { execSync } from "child_process";

type Ctx = { apiKeyId: string; sessionId: string };

const TYPES = [
  "feat", "fix", "refactor", "perf", "test",
  "docs", "style", "build", "ci", "chore", "revert",
];

function sh(cmd: string): string {
  try {
    return execSync(cmd, { encoding: "utf8", timeout: 8000 }).trim();
  } catch (err: any) {
    return `ERROR: ${(err?.message || String(err)).slice(0, 500)}`;
  }
}

function isConventional(subject: string): { ok: boolean; reason?: string } {
  if (!subject || subject.length > 72)
    return { ok: false, reason: "subject must be 1-72 chars" };
  const m = subject.match(/^([a-z]+)(\([a-z0-9-]+\))?: .+/);
  if (!m) return { ok: false, reason: "must match type(scope): subject" };
  if (!TYPES.includes(m[1]))
    return { ok: false, reason: `unknown type '${m[1]}'` };
  if (/[A-Z]$/.test(subject) || subject.endsWith("."))
    return { ok: false, reason: "no trailing period, imperative mood" };
  return { ok: true };
}

// OmniRoute SkillHandler: (input, { apiKeyId, sessionId }) => Promise<output>
// Register: skillExecutor.registerHandler("git-commit-handler", handler)
export async function handler(
  input: Record<string, unknown>,
  _ctx: Ctx
): Promise<Record<string, unknown>> {
  const { type, scope, subject, body, paths, dry_run = true } = input as {
    type?: string;
    scope?: string;
    subject?: string;
    body?: string;
    paths?: string[];
    dry_run?: boolean;
  };

  const status = sh("git status --short");
  const stat = sh("git diff --stat");
  const fullSubject =
    subject || (type ? `${type}${scope ? `(${scope})` : ""}: <subject>` : "");

  const check = isConventional(fullSubject);
  const message = fullSubject + (body ? `\n\n${body}` : "");
  const stagedPaths = Array.isArray(paths) ? paths : [];

  if (dry_run) {
    return {
      success: check.ok,
      skill: "git-commit",
      valid: check.ok,
      validation_error: check.ok ? null : check.reason,
      worktree_status: status.slice(0, 2000),
      diff_stat: stat.slice(0, 2000),
      proposed_message: message,
      next_steps: check.ok
        ? [
            `git add ${stagedPaths.length ? stagedPaths.join(" ") : "<unit-paths>"}`,
            `git commit -m "${fullSubject}"`,
            "git log --oneline -5",
          ]
        : [`Fix subject: ${check.reason}. See references/conventional-types.md`],
    };
  }

  if (!check.ok)
    return { success: false, skill: "git-commit", error: check.reason };
  if (!stagedPaths.length)
    return { success: false, skill: "git-commit", error: "paths[] required for a real commit (no blind git add -A)" };

  const addOut = sh(`git add ${stagedPaths.map((p) => `"${p}"`).join(" ")}`);
  const commitMsg = message.replace(/"/g, '\\"');
  const commitOut = sh(`git commit -m "${commitMsg}"`);
  return {
    success: true,
    skill: "git-commit",
    message: fullSubject,
    add_output: addOut.slice(0, 1000),
    commit_output: commitOut.slice(0, 2000),
    verify: sh("git log --oneline -3"),
  };
}

export default handler;
