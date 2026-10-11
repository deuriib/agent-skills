---
name: writing-agents
description: Use when creating, refining, or scoping AI agents or subagents, when an agent violates its boundary, when subagents suffer from runaway loops or vague handoffs, or when defining agent personas and tool access across execution runtimes.
metadata:
  version: 0.1.0
---

# Writing Agents

## Overview

An agent without negative boundaries is an unconstrained prompt that will eventually attempt everything and fail unpredictably.

A production-grade agent or subagent is a bounded execution unit. Regardless of the harness—Claude Code, OpenCode, Codex, Swarm, LangGraph, or CrewAI—every agent requires a single mandate, a minimal tool surface, an explicit context lifecycle, and an unambiguous termination contract.

## When to Use

Use when:
- Designing a new specialized agent or subagent for any harness.
- An existing agent wanders out of scope, rationalizes rule violations, or hallucinates missing parameters.
- Multi-agent orchestration breaks down due to fuzzy handoffs, runaway loops, or vague deliverables.
- Auditing permissions to enforce least privilege (e.g., isolating reviewers to read-only tools).

Do NOT use when:
- Writing workflow instructions or procedural guidance (use `writing-skills` instead).
- Authoring passive workspace rules or behavioral criteria (use `writing-rules` instead).
- Fixing an immediate application bug directly in code (use `fix-a-bug` instead).

## The Five Invariants

Every agent definition must enforce five invariants:

1. **Mandate & Anti-Goals**: Single responsibility. State what the agent does, and explicitly list what it is forbidden from doing.
2. **Deterministic Trigger**: Concrete symptoms that dispatch the agent, distinguishing it from adjacent roles.
3. **Least Privilege Tools**: Provide only the minimal tool surface required. Hard-separate read tools from mutating tools.
4. **Context Isolation**: Seed the subagent with the exact input payload needed. Do not dump entire workspace transcripts.
5. **Structured Termination**: Define the exact exit artifact (verdict, table, diff) and stop rule so the subagent finishes autonomously.

## Common Mistakes

- **The "Helpful" Trap**: Allowing an agent to guess or assist outside its mandate. *Fix*: Enforce early halts and escalation on missing data.
- **The Kitchen Sink**: Granting write and shell access to analysis or review agents. *Fix*: Restrict available tools at configuration time.
- **Vague Deliverables**: Allowing open-ended chat as a completion signal. *Fix*: Enforce fixed output schemas (Markdown table, JSON, or typed verdict).

## References

- For the step-by-step universal agent specification template and boundary rules, see [references/core-agent-contract.md](references/core-agent-contract.md).
- For converting specifications into runtime files for Claude Code, OpenCode, Swarm, or LangGraph, see [references/harness-adapters.md](references/harness-adapters.md).
- For pressure testing agent definitions with failure scenarios before deployment, see [references/testing-agents.md](references/testing-agents.md).
