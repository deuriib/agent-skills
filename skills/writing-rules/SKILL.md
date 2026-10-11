---
name: writing-rules
description: Use when creating or editing agent rule files, when a rule uses vague adjectives, when agents ignore an existing rule, or when compliance cannot be checked from the output.
metadata:
  version: 0.1.0
---

# Writing Rule Criteria

## Overview

**A rule without a verifiable acceptance criterion is a wish, not a rule.**

This skill applies Test-Driven Development to rule authoring. You write the acceptance criterion first, watch an agent violate the rule without it (RED), then write the rule (GREEN), and finally close loopholes (REFACTOR).

Rule files are **passive and conditional**. They are injected into context based on triggers. Their value depends entirely on whether an agent can verify compliance. A rule that cannot be verified is indistinguishable from no rule at all.

**Budget note:** this skill runs over the <500-word target because, as a discipline-enforcing skill, its Iron Law, Red Flags, and before/after examples are the enforcement mechanism. Step-by-step procedure already lives in references/criterion-format.md.

## When to Use

Use when:

- You are creating a new rule for an agent (`.opencode/rules/*.mdcx`, `AGENTS.md`, `.omp/agent/rules/*.md`, etc.)
- A rule already exists but agents consistently ignore or misinterpret it
- You need to translate a vague preference ("write good marketing copy") into something actionable
- You are reviewing a rule file and cannot tell whether a given rule is being followed

Do NOT use for:

- Mechanical constraints with no judgment left (regex, linter, validation script). **Automate those instead** — but use this skill first to derive the exact check to automate: de-subjectivize the rule here, then automate the resulting binary criterion.
- One-off instructions that will not be reused across tasks.
- Project-specific conventions that belong in a codebase's `CONTRIBUTING.md`, not in an agent rule file.

## Core Pattern

### The RED-GREEN-REFACTOR Cycle for Rules

1. **RED**: Write the acceptance criterion first
2. **Watch it fail**: Run scenarios without the rule, document violations
3. **GREEN**: Write the rule addressing those violations
4. **Verify**: Run scenarios with the rule, ensure compliance
5. **REFACTOR**: Close loopholes, tighten criteria

**No rule without a failing test first.** This applies to new rules and edits to existing rules.

### ❌ Vague Rule (No Criterion)

```markdown
## Marketing

- Write compelling copy
```

**Why bad**: No verifiable criterion. An agent can't tell if they're following it.

### ⚠️ Still Not Verifiable (Specific but Not Binary)

```markdown
## Marketing

- Headlines must use power verbs and quantify benefits
- Write for a specific audience (e.g., "developers who want to save time")
- Include a clear call-to-action (e.g., "Sign up now")
```

**Why it still fails**: more specific, but "power verbs" has no observable test — two agents will disagree on whether it passes. Specificity without a binary check is still a wish. The full criterion below fixes this.

```markdown
## Marketing

- Write good social media copy.
- Keep the brand voice consistent.
```

**Problem:** An agent cannot determine when it has succeeded. There is no observable, verifiable condition. The rule is effectively invisible.

### ✅ Rule with Acceptance Criterion

```markdown
## Marketing

### Social Media Copy

**Rule:** Social media copy must be concise and on-brand.

**Acceptance criterion:**

- Maximum 280 characters per post.
- Must include one clear call to action (e.g., "Learn more", "Sign up").
- Must match the brand voice defined in `brand-voice.md` (tone: direct, no emojis, no exclamation marks).

**Verification:**

- Count characters in generated copy.
- Check for CTA presence.
- Check output contains zero tokens from the forbidden list in `brand-voice.md` (tone: direct, no emojis, no exclamation marks).
```

**Why it works:** The agent can now self-verify. The criterion is observable, specific, and binary (pass/fail). If it fails, the agent knows exactly what to fix.

**If the referenced file does not exist yet:** do not ship a criterion that points at it. Ship an interim observable proxy (e.g. an inline forbidden-token list) and record a follow-up to its owner. A criterion that cannot be checked today is a wish today.

## The Iron Law

**NO RULE WITHOUT A FAILING TEST FIRST.**

This applies to new rules AND edits to existing rules. If you write a rule and cannot describe the scenario where an agent would violate it **and** how you would detect that violation, the rule is not ready.

**Violating the letter of the Iron Law is violating its spirit.** "Following the spirit" while shipping a rule without a criterion is the violation, not an excuse for it.

No exceptions:

- Not for "simple additions"
- Not for "just clarifying wording"
- Not for "documentation updates"
- If you edit a rule without testing, delete the edit and start over.

## Red Flags — STOP and Rewrite the Rule

- "The writers know what it means" / "don't over-engineer"
- "A senior approved the vague wording"
- "This domain is subjective, criteria don't apply"
- "I'll add the criterion later"
- "It's about spirit, not ritual"

**All of these mean: the rule has no acceptance criterion. Write it before shipping.**

## Quick Reference

| Step | Action                                                                         | Output                        |
| ---- | ------------------------------------------------------------------------------ | ----------------------------- |
| 1    | Identify the rule's domain and trigger                                         | Scope + when the rule applies |
| 2    | Write a **pressure scenario** where an agent would violate the rule without it | Baseline behavior (RED)       |
| 3    | Write the rule with an **observable, binary criterion**                        | Rule document (GREEN)         |
| 4    | Test the rule against the scenario with an agent                               | Verify compliance             |
| 5    | Find rationalizations the agent uses to bypass the rule                        | Loophole list                 |
| 6    | Close loopholes in the rule text                                               | Refactored rule               |
| 7    | Repeat steps 4–6 until the agent consistently complies                         | Stable rule                   |

## Implementation

**Read [references/criterion-format.md](references/criterion-format.md) when drafting or revising a rule.** It holds the full procedure: domain trigger format, RED pressure-scenario template, GREEN criterion format (observable, binary, specific), verify loop, rationalization counters, stability check, and per-type testing guidance.

Decision rule: if you cannot describe the violation scenario **and** its binary check, do not ship the rule — you do not understand it yet.

## Common Mistakes

| Mistake                                                           | Fix                                                                             |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Rule uses subjective adjectives ("good", "clean", "professional") | Replace with measurable conditions (character count, required elements, format) |
| Rule has no "Applies when" clause                                 | Add a trigger. Without it, the agent cannot know when the rule is active.       |
| Criterion requires human judgment ("looks right")                 | Split into objective sub-criteria. If impossible, automate it instead.          |
| Rule is too long (500+ words)                                     | Move details to a referenced file. Keep the rule itself short and scannable.    |
| Rule duplicates an existing rule                                  | Cross-reference instead of repeating. Duplication creates drift.                |
| Rule is not tested                                                | Delete it and start over. Untested rules are liabilities.                       |
