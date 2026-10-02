type Ctx = { apiKeyId: string; sessionId: string };

interface FixInput {
  symptom?: string;
  expected?: string;
  actual?: string;
  repro_command?: string;
  repro_output?: string;
  hypothesis?: string;
  attempt?: number;
  proposed_fix?: string;
  files_touched?: string[];
}

// OmniRoute SkillHandler: (input, { apiKeyId, sessionId }) => Promise<output>
// Register: skillExecutor.registerHandler("fix-a-bug-handler", handler)
export async function handler(
  input: Record<string, unknown>,
  _ctx: Ctx
): Promise<Record<string, unknown>> {
  const {
    symptom = "",
    expected = "",
    actual = "",
    repro_command = "",
    repro_output = "",
    hypothesis = "",
    attempt = 1,
    proposed_fix = "",
    files_touched = [],
  } = input as FixInput;

  const reproduced = Boolean(repro_command && repro_output);
  const n = Number(attempt) || 1;

  if (!reproduced) {
    return {
      success: false,
      skill: "fix-a-bug",
      gate: "reproduce-first",
      reproduced: false,
      stop: true,
      message:
        "No hypothesis or fix allowed yet. Provide repro_command + repro_output (exact steps, smallest input). See references/reproduction-recipe.md.",
      capture_template: {
        symptom: symptom || "<one sentence: what broke>",
        expected: expected || "<what should happen>",
        actual: actual || "<what happens instead>",
      },
      next_steps: [
        "Run the failing command/test and paste FULL output (message, stack, exit code).",
        "Shrink to the smallest input that still fails; script it.",
        "Re-call with repro_command + repro_output set.",
      ],
    };
  }

  if (!hypothesis) {
    return {
      success: true,
      skill: "fix-a-bug",
      gate: "hypothesize",
      reproduced: true,
      message:
        "Repro accepted. State ONE hypothesis as 'X is root cause because Y' before any fix.",
      next_steps: [
        "git log --oneline -10 + git blame on failing lines (was it ever working?).",
        "Walk the bad value backward frame by frame (references/root-cause-tracing.md).",
        "Re-call with hypothesis set.",
      ],
    };
  }

  if (n >= 3 && !proposed_fix) {
    return {
      success: false,
      skill: "fix-a-bug",
      gate: "escalate",
      stop: true,
      message:
        "Two hypotheses failed. Stop fixing alone: post evidence (steps tried, env, diffs) and ask a human. No fix #4 solo.",
    };
  }

  if (!proposed_fix) {
    return {
      success: true,
      skill: "fix-a-bug",
      gate: "test-hypothesis",
      hypothesis,
      message: "Test this ONE hypothesis with the smallest single-variable change. Never stack fixes.",
      checklist: [
        "Change one variable only; re-run repro_command.",
        "Confirmed => fix at source (not symptom call-sites).",
        "Rejected => form a NEW hypothesis, increment attempt.",
      ],
    };
  }

  const touched = Array.isArray(files_touched) ? files_touched : [];
  return {
    success: true,
    skill: "fix-a-bug",
    gate: "verify-fix",
    hypothesis,
    proposed_fix: String(proposed_fix).slice(0, 2000),
    requires_regression_test: true,
    regression_rule: "Repro becomes a failing-first test, committed with the fix.",
    verify_checklist: [
      "Regression test fails without fix, passes with it.",
      "Surrounding suite green + edge cases (references/verify-fix.md).",
      "No secrets/PII in logs. Smallest diff at source.",
    ],
    files_touched: touched,
  };
}

export default handler;
