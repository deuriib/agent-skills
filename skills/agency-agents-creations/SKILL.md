---
name: agency-agents-creation
description: Use when creating, editing, or validating a new AI specialist agent for the Agency Agents repository. Triggers on tasks involving adding a new agent, updating agent frontmatter, structuring agent deliverables, or running the agency-agents lint/verify toolchain.
---

# Agency Agents Creation

## Overview

**Agency Agents are highly specialized, personality-driven AI specialists** defined as Markdown files with YAML frontmatter. They are not generic prompts; they are battle-tested workflows with concrete deliverables, strict rules, and measurable success metrics.

**Core principle:** Every agent must have a narrow, deep specialization, a distinct voice, and concrete code/template examples. If it reads like a generic "helpful assistant" or a vendor's quickstart guide, it will be rejected.

## File Structure & Location

Agents must be placed in a valid **division directory** (e.g., `engineering/`, `marketing/`, `gis/`).

- The authoritative list of divisions is `divisions.json` at the repository root.
- Do **not** place agents in `strategy/` (runbooks) or `integrations/` (generated output).

```text
agency-agents/
  divisions.json                 # Single source of truth for divisions
  <division>/
    <division>-<agent-slug>.md   # e.g., engineering-frontend-developer.md
```

## YAML Frontmatter Requirements

Every agent file must start with valid YAML frontmatter.

```yaml
---
name: Frontend Developer
description: Expert frontend developer specializing in modern web technologies, React/Vue, and performance optimization.
color: "#0075ca"                 # Hex code OR a name explicitly supported by resolve_opencode_color()
emoji: 🖥️
vibe: Builds responsive, accessible web apps with pixel-perfect precision.
services:                        # Optional: Only if the agent strictly requires external APIs/platforms
  - name: Vercel
    url: https://vercel.com
    tier: freemium
---
```

**Color Rule:** A `#RRGGBB` hex value always works. A color *name* only works if it exists in the converter's allowed map. If in doubt, use a hex code.

## Required Agent Sections

The agent body must be split into two semantic groups: **Persona** (who the agent is) and **Operations** (what the agent does). Use these exact section headers (with emojis) so the conversion tooling can parse them correctly.

### Persona Sections

1. **🧠 Your Identity & Memory**: Role, personality, background, and domain expertise.
2. **💭 Your Communication Style**: Tone, voice, example phrases, and approach.
3. **🚨 Critical Rules You Must Follow**: Domain-specific boundaries and constraints.

### Operations Sections

4. **🎯 Your Core Mission**: Primary responsibilities with clear deliverables. Include a "**Default requirement:**" for always-on best practices.
2. **📋 Your Technical Deliverables**: Concrete outputs. **Must include 2-3 real, runnable code blocks or templates** (not pseudo-code).
3. **🔄 Your Workflow Process**: Step-by-step methodology (e.g., Discovery → Planning → Execution → Review).
4. **🔄 Learning & Memory**: Patterns the agent recognizes and how it improves over time.
5. **🎯 Your Success Metrics**: Specific, measurable outcomes (e.g., "Page load under 3s on 3G", "Zero console errors in production").
6. **🚀 Advanced Capabilities**: Specialized techniques the agent masters.

## Workflow: Adding a New Agent

1. **Choose a Division**: Check `divisions.json` to find the correct directory. If proposing a new division, you must also update `divisions.json` and the `AGENT_DIRS` lists in the Python tooling.
2. **Draft the Agent**: Create `<division>-<agent-slug>.md` following the required sections above.
3. **Check Originality**: Run `uv run python -m agency_agents check-originality` to ensure the agent is not a near-duplicate (e.g., a simple find-replace of an existing agent).
4. **Lint the Repository**: Run `uv run python -m agency_agents lint`. This validates frontmatter, division alignment, and tool compatibility.
5. **Verify Manifest**: Run `uv run python -m agency_agents verify --all`.
   - *Note:* Adding a new agent will intentionally cause "manifest drift" for that agent. This is expected.
   - Regenerate the manifest with `uv run python -m agency_agents update-manifest --all` and commit the updated `convert-outputs.sha256` file.
6. **Submit PR**: Ensure the PR contains **only** the new/edited `.md` file and the updated `convert-outputs.sha256`. Do not commit generated `integrations/` files.

## Red Flags — STOP

| Symptom / Rationalization | Correct Action |
| --- | --- |
| "I'll just change the country name in an existing agent to make a new one." | **STOP.** This is a "near-duplicate re-skin." The agent must have genuinely different platforms, tactics, and examples. |
| "I'll use the color name 'neon-purple' because it sounds cool." | **STOP.** Use a `#RRGGBB` hex code unless the name is explicitly in the converter's allowed map. |
| "I'll commit the generated files in `integrations/<tool>/` so reviewers can see them." | **STOP.** Generated files are gitignored. Committing them will cause the PR to be rejected. Only commit the `.md` file and `convert-outputs.sha256`. |
| "I'll put the agent in the `strategy/` folder." | **STOP.** `strategy/` is for Nexus playbooks (no agent frontmatter). Agents must go in a valid division folder. |
| "I'll skip the originality check to save time." | **STOP.** CI runs this check. Failing it wastes reviewer time and delays merging. |

## Anti-Patterns

- ❌ **Generic Personality**: "I am a helpful assistant who loves to code." (Bad) vs. "I default to finding 3-5 issues and require visual proof for everything." (Good).
- ❌ **Vague Deliverables**: "I will write good code." (Bad) vs. providing a fully typed, memoized React component with virtualization. (Good).
- ❌ **Vendor Shilling**: An agent that is just a vendor's API quickstart guide wearing an "agent costume." The agent must solve the *user's* problem first.
- ❌ **Missing Metrics**: Success metrics must be quantitative (e.g., "Lighthouse score > 90") not qualitative (e.g., "The app feels fast").

## Discovery Keywords

agency agents, agent creation, agency-agents-creation, divisions.json, agent frontmatter, check-originality, verify --all, update-manifest, AI specialist, agent template.
