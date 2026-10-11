# Harness Adapters: Translating Contracts into Runtimes

**Read this reference when:** converting a universal agent specification into harness-specific configuration files (Claude Code, OpenCode, OpenAI / Codex, LangGraph, or CrewAI).

---

Agent specifications authored with `writing-agents` are runtime-agnostic. Use the conversion recipes below to translate the contract into your target runtime.

## 1. Claude Code (`.claude/agents/<name>.md`)

Claude Code subagents are configured as markdown files with frontmatter.

### Mapping

| Universal Contract | Claude Code Field |
|--------------------|-------------------|
| Role & Mandate     | Markdown body + `description` |
| Triggers           | Frontmatter `description` (triggers orchestrator routing) |
| Allowed Tools      | Frontmatter `tools: [read, grep, glob]` |
| Model Tier         | Frontmatter `model: sonnet | haiku | opus` |

### Example (`.claude/agents/security-reviewer.md`)

```markdown
---
name: security-reviewer
description: Use when auditing code changes for vulnerabilities, reviewing authentication logic, or scanning dependencies for known CVEs.
tools:
  - read
  - grep
  - glob
model: sonnet
---

You are a read-only security reviewer. Your sole mandate is identifying vulnerabilities.
You are strictly forbidden from editing files or running shell execution commands.

## Workflow
1. Read the provided diff and identify modified attack surfaces.
2. Verify against OWASP Top 10 guidelines.
3. Return a markdown table of findings with risk scores and recommendations.
```

---

## 2. OpenCode (`AGENTS.md` & `.opencode/agents/*.json`)

OpenCode leverages hierarchical `AGENTS.md` instructions and subagent definitions via `task` declarations or agent manifests.

### Mapping

| Universal Contract | OpenCode Configuration |
|--------------------|------------------------|
| Role & Mandate     | Agent prompt / `AGENTS.md` subagent role |
| Triggers           | `description` in `task` tool subagent catalog |
| Allowed Tools      | `tools` array in subagent definition |
| Model ID           | Model config (e.g. `opencode-omniroute/auto/smart`) |

### Example (`.opencode/agents/explorer.json`)

```json
{
  "name": "explore",
  "description": "Deep-reading exploration assistant. Maps current state using read and search tools; read-only, never changes state.",
  "tools": ["read", "grep", "glob"],
  "systemPrompt": "You are a read-only codebase explorer. Map code structures, find symbol usages, and report architecture patterns. Never mutate files or run commands."
}
```

---

## 3. OpenAI Assistants / Codex / Swarm

OpenAI's tool-calling APIs and Swarm agent definitions use typed function declarations and JSON instructions.

### Mapping

| Universal Contract | OpenAI / Swarm Equivalent |
|--------------------|---------------------------|
| Role & Mandate     | `instructions` / `system_message` |
| Triggers           | Orchestrator handoff function docstring |
| Allowed Tools      | `tools: [{"type": "function", ...}]` |
| Termination        | Return value or Handoff Agent routine |

### Example (Python Swarm / Function Calling)

```python
from swarm import Agent

def transfer_to_security_reviewer():
    """Transfer to the specialized read-only security reviewer when security-sensitive files are touched."""
    return security_reviewer

security_reviewer = Agent(
    name="Security Reviewer",
    instructions="""You are a read-only security reviewer.
Audit the provided diff for OWASP Top 10 vulnerabilities.
Never invoke mutating tools. Produce a structured audit report.""",
    functions=[read_file, grep_code],
)
```

---

## 4. LangGraph / CrewAI

In graph-based and role-based agent systems, nodes or crew members encode the contract explicitly.

### LangGraph StateGraph Node Example

```python
from typing import TypedDict, Literal
from langgraph.prebuilt import create_react_agent

# Isolated tool surface
tools = [read_file, grep_code, glob_files]

security_node = create_react_agent(
    model=model,
    tools=tools,
    state_modifier="""You are an isolated security auditing agent.
Analyze the provided code state. Return findings and set status to 'AUDITED'."""
)
```

### CrewAI Agent Definition

```python
from crewai import Agent

security_agent = Agent(
    role="Principal Security Auditor",
    goal="Identify and verify security vulnerabilities in code changes without altering repository state",
    backstory="You are an expert security engineer dedicated to uncovering subtle injection, auth, and state race conditions.",
    tools=[ReadFileTool(), SearchFilesTool()],
    allow_delegation=False,
    verbose=True
)
```

---

## Harness Portability Checklist

When exporting an agent specification across runtimes:
- [ ] Tool permissions strictly match capability level (no accidental write access).
- [ ] Context handoff is explicit (parent passes target, subagent returns structured deliverable).
- [ ] Stop condition is deterministic (no multi-turn conversational wandering for automated subagents).
- [ ] Escalation logic is defined (subagent signals blockers back to orchestrator).
