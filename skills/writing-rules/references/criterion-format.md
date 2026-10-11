# Criterion Format and Pressure-Testing Procedure

**Read this reference when:** you are drafting or revising a rule and need the
step-by-step format, or when a rule exists but agents ignore it and you need
the pressure-testing loop.

## Step 1: Define the Domain and Trigger

Every rule must state **when it applies**. A rule that applies always becomes
noise. A rule that applies never is dead.

Format:

```markdown
## [Domain]

**Applies when:** [specific condition, symptom, or context]
```

Example:

```markdown
## Finance

**Applies when:** Generating invoices, expense reports, or budget summaries.
```

## Step 2: Write the Pressure Scenario (RED)

Before writing the rule, describe the scenario where an agent would fail
without it.

```markdown
### Baseline Scenario

Agent is asked to "send a summary email to the client."
Without a rule, the agent:

- Writes a 600-word email.
- Includes emojis and exclamation marks.
- Omits a clear next step.
```

This is your failing test. You cannot skip it. If you cannot describe the
failure, you do not understand the rule.

## Step 3: Write the Rule with an Acceptance Criterion (GREEN)

The criterion must be:

- **Observable** (can be checked from the agent's output)
- **Binary** (pass or fail, no subjective middle ground)
- **Specific** (no "good", "appropriate", "reasonable")

Format:

```markdown
### [Rule Name]

**Rule:** [One-sentence constraint]

**Acceptance criterion:**

- [Condition 1]
- [Condition 2]

**Verification:**

- [How to check condition 1]
- [How to check condition 2]

**Examples:**

- ✅ [Passing example]
- ❌ [Failing example]
```

## Step 4: Test Against the Scenario

Run the pressure scenario with the rule present. Does the agent comply?

If yes → proceed to Step 5.
If no → the rule is not working. Ask: is the criterion ambiguous? Is the
trigger wrong? Rewrite the rule, not the test.

## Step 5: Find Rationalizations (REFACTOR)

Agents are creative at finding loopholes. Common rationalizations:

| Rationalization | Counter |
| ------------------------------------------ | ---------------------------------------------------- |
| "The user didn't specify, so I'll assume." | Add: "When unspecified, default to [X]." |
| "This is an edge case." | Add: "Applies to all cases, including edge cases." |
| "I'll do it later." | Add: "Must be done before [stage]." |
| "The rule is too strict for this context." | Add: "No exceptions without explicit user override." |
| "Our writers know what it means — don't over-engineer." | Expertise doesn't transfer intent. If two agents disagree on pass/fail, the rule is vague. Add the binary check. |
| "This domain is subjective, criteria don't apply." | Split into objective sub-criteria (length, required elements, forbidden tokens). If truly unjudgeable, automate it instead. |

Document each rationalization and the corresponding rule edit.

## Step 6: Verify Stability

Re-run the scenario after each loophole fix. The rule is stable when the
agent complies without prompting.

## Testing by Rule Type

Different rules need different testing approaches:

### Discipline-Enforcing Rules (constraints)

Examples: "Never publish without approval", "Always run typecheck before
committing." Test with:

- Pressure scenarios: does the agent comply under time pressure or ambiguity?
- Multiple pressures: combine "user is in a hurry" + "rule feels unnecessary" +
  "agent wants to be helpful."

### Technique Rules (how to do something)

Examples: "Use TDD for all code changes", "Write commit messages in imperative
mood." Test with:

- Academic questions: does the agent understand the technique?
- Application scenarios: can the agent apply it to a novel case?

### Reference Rules (facts, paths, conventions)

Examples: "Brand voice is defined in `brand-voice.md`", "API keys are in
`.env.local`." Test with:

- Retrieval: can the agent find the referenced resource?
- Application: does the agent use the reference when relevant?
