# Core Agent Contract: The 5 Universal Pillars

**Read this reference when:** defining a new agent or subagent specification from scratch, auditing an agent that drifts out of bounds, or formalizing responsibilities across multi-agent workflows.

---

Regardless of whether an agent runs in Claude Code, OpenCode, Codex, LangGraph, or a custom event loop, every reliable agent implements five universal invariants.

## Pillar 1: Identity & Mandate (Single Responsibility)

An agent without negative boundaries will eventually attempt everything. Define not just what it does, but what it is explicitly prohibited from doing.

- **Role**: Precise professional designation (e.g., "Observability Reviewer", not "Helper").
- **Mandate**: Exactly one primary responsibility. If a mandate has an "and", consider splitting into two subagents.
- **Explicit Anti-Goals (Out of Scope)**: What the agent must NEVER do. E.g., a reviewer must never mutate code; an explorer must never make network calls.

```markdown
### Bad
"You are a helpful assistant that analyzes code and fixes bugs."

### Good
"You are a read-only security reviewer. Your sole mandate is identifying
vulnerabilities against OWASP Top 10. You must never edit files, execute tests,
or implement fixes. When you identify a flaw, output the risk and hand off."
```

## Pillar 2: Trigger & Dispatch Contract

Routing systems and orchestrators must know exactly when to wake the agent. Ambiguous triggers cause routing conflicts and token waste.

- **Triggering Symptoms**: Concrete situations, errors, or keywords that require this agent.
- **Non-Triggers**: Closely related situations that belong to a different agent.
- **Orchestration Mode**: Autonomous subagent, background worker, or interactive pair.

```markdown
### Dispatch Specification
- **Triggers**: Static analysis warnings, authentication flow changes, secret exposure scans.
- **Non-Triggers**: General code style formatting (route to linter), performance profiling (route to perf-reviewer).
- **Execution Style**: Ephemeral subagent; runs to completion, returns result, terminates.
```

## Pillar 3: Tool Surface & Least Privilege

Every tool granted to an agent expands its attack surface and decision complexity.

- **Least Privilege Access**: Grant only the tools necessary for the mandate.
- **Mutation Boundary**: Segregate read tools (`read`, `grep`, `glob`) from write tools (`edit`, `write`, `bash`).
- **Tool Guardrails**: Specify safety preconditions on dangerous tools (e.g., "Bash allowed only for `npm test`, never `git push`").

```markdown
### Tool Configuration
- **Allowed Tools**: `read`, `grep`, `glob`, `webfetch`
- **Denied Tools**: `edit`, `write`, `bash`
- **Rationale**: Read-only verification agent cannot risk accidental workspace mutations.
```

## Pillar 4: Context & Handoff Lifecycle

Agents fail when overloaded with irrelevant session history. Isolate context aggressively.

- **Input Payload**: Explicit fields passed on invocation (task prompt, file targets, specific constraints).
- **Session Isolation**: Fresh context per run vs. persistent thread. Default to fresh isolated context for subagents.
- **Upstream Memory**: What facts or conventions from long-term memory must be pre-loaded.

```markdown
### Handoff Protocol
- **Parent Input**: Target branch diff + list of modified security-critical files.
- **State**: Ephemeral. Discard intermediate reasoning after generating output.
```

## Pillar 5: Output Schema & Termination Condition

A subagent must know when it is done and deliver an unambiguous deliverable back to the parent or user.

- **Completion Signal**: What marks the task as complete (e.g., single final markdown block, JSON schema).
- **Halt Criteria**: Stop rules when blocked or when information is missing (fail fast, ask, do not guess).
- **Escalation Path**: What to do when an unrecoverable error or blocker occurs.

```markdown
### Output Format
Every run must terminate with:
1. **Verdict**: PASS | FAIL | BLOCKED
2. **Findings Table**: Severity, Location, Description, Proof of Concept.
3. **Recommended Next Agent**: (e.g., `fix-a-bug` or `general`).
```

---

## Universal Agent Specification Template

Use this template to draft an agent definition before translating it into a harness-specific configuration:

```markdown
# Agent: [agent-name]

## Mandate
- **Role**: [One-line professional identity]
- **Core Objective**: [Single responsibility]
- **Anti-Goals**: [What this agent MUST NOT do]

## Triggers & Routing
- **Use when**: [Trigger conditions, symptoms, keywords]
- **Do NOT use when**: [Adjacent tasks that route elsewhere]

## Capabilities & Permissions
- **Allowed Tools**: [List of permitted tools]
- **Prohibited Tools**: [List of blocked tools or destructive capabilities]
- **Environment**: [Read-only filesystem, isolated network, sandbox, etc.]

## Workflow & Invariants
1. [Step 1: Input ingestion & verification]
2. [Step 2: Core processing]
3. [Step 3: Verification gate]

## Output Contract
- **Format**: [Structured markdown / JSON]
- **Termination**: [Clear stop condition]
- **Escalation**: [When and how to escalate blockers]
```
