# Addressing Review

Every thread gets closed by CHANGE or REPLY. Silence is not a
resolution — an unanswered thread means the reviewer was ignored.

## Loop

1. **Read all threads first.** Before touching code, read every comment.
   Group them: real defects, suggestions, questions, nits.
2. **Change or reply, per thread:**
   - Agree → make the change, reply "Done in `<commit>`" (or resolve
     if the platform auto-resolves on push).
   - Disagree → reply with the technical reason, referencing code or
     evidence. "I prefer it this way" is not a reason. If the reviewer
     insists after a grounded reply, yield — they own review quality.
   - Question → answer in the thread AND put the answer in code or docs
     if the next reader will wonder too.
3. **Push as fixup commits** on the same branch (`fix(<scope>): address
   review: …`). Don't rewrite history under an active review unless the
   reviewer asks — they re-review the diff, and force-push hides it.
4. **Re-request review** when all threads are changed-or-replied and CI
   is green. Say what changed since last round in one line.

## Rules

- Never resolve a thread you didn't answer (by change or reply).
- Never force-push to erase review comments. Ever.
- Nits (typos, naming) get fixed, not debated — batch them into one
  commit and move on.
- If review reveals the PR mixed two intents, split now (see
  `splitting-a-pr.md`) rather than growing the thread count.
