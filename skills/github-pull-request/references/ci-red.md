# CI Is Red After Opening

The PR is open, CI fails. Fix on the SAME branch — never open a second
PR for the fix. The PR tracks the unit of work; red CI is part of it.

## Path

1. **Read the log first.** Click the failing job, read the actual error
   — not the summary line. Copy the failing command.
2. **Reproduce locally.** Run the SAME command CI runs
   (typecheck, the failing test file, the lint job). If it
   passes locally but fails in CI, the diff is environment: versions,
   cache, env vars, ordering. Check those before touching code.
3. **Fix on the branch.** Smallest change that greens the job.
   `git add` + `git commit` with a `fix(<scope>):` message, push.
4. **Re-verify.** Watch the job go green. Confirm no NEW failures
   appeared in other jobs (flakes love company).
5. **Flaky job?** Re-run once. Green on retry + passes locally 3× →
   note it in the PR ("job X flaked, green on retry, passes locally")
   and move on. Red twice → it's real, fix it.

## Rules

- One fix commit per CI failure round — don't bundle unrelated cleanup
  into the "fix CI" commit.
- Never merge on red, never use admin-merge to skip. Red means the
  branch is wrong, not the gate.
- Never widen permissions, skip jobs, or edit CI config to make YOUR
  PR green. If CI itself is broken for everyone, that's a separate PR
  by whoever owns the pipeline.
