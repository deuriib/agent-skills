---
name: agency-agents-runbooks
description: Use when creating, editing, or registering multi-agent scenario runbooks (NEXUS playbooks) in the Agency Agents repository. Triggers on tasks involving `strategy/runbooks/`, `strategy/runbooks.json`, multi-agent workflow design, or mapping agent rosters to business scenarios.
---

# Agency Agents Runbooks

## Overview

**Runbooks are NEXUS scenario playbooks that define coordinated, multi-agent workflows** for specific business scenarios (e.g., Startup MVP, Incident Response, Marketing Campaign).

**Core principle:** Runbooks are **orchestration doctrine, not installable agents**. They live in `strategy/runbooks/`, do **not** have YAML frontmatter, and must be explicitly registered in `strategy/runbooks.json` to be usable by the Agency Agents app and CLI.

## File Structure & Location

```text
agency-agents/
  strategy/
    runbooks.json                     # Machine-readable roster registry
    runbooks/
      scenario-startup-mvp.md         # Prose runbook document
      scenario-incident-response.md   # Prose runbook document
```

*Note: `strategy/` is **not** a division. Do not add it to `divisions.json` or `AGENT_DIRS`.*

## Runbook Markdown Structure

Every runbook in `strategy/runbooks/` should follow this proven structure:

```markdown
# 🚀 Runbook: [Scenario Name]

> **Mode**: NEXUS-[Full|Sprint|Micro] | **Duration**: [e.g., 4-6 weeks] | **Agents**: [Count]

---

## Scenario
[Brief 2-3 sentence description of the business context and goal.]

## Agent Roster
### Core Team (Always Active)
| Agent | Role |
|-------|------|
| [Display Name] | [Brief responsibility] |

### [Secondary Team] (Activated [Phase])
| Agent | Role |
|-------|------|
| [Display Name] | [Brief responsibility] |

## [Phase/Week]-by-[Phase/Week] Execution
[Use ASCII tree diagrams or clear step-by-step lists to show the workflow.]
```

Day 1-2: Discovery
├── Agent A → Task description
├── Agent B → Task description
└── Quality Gate: [Specific approval criteria]

```

## Key Decisions
| Decision Point | When | Who Decides |
|---------------|------|-------------|
| [Decision] | [Timeline] | [Agent/Role] |

## Success Criteria
| Metric | Target |
|--------|--------|
| [Quantitative metric] | [Specific number/target] |

## Common Pitfalls & Mitigations
| Pitfall | Mitigation |
|---------|-----------|
| [Common failure mode] | [How the runbook prevents it] |
```

## Machine-Readable Registry (`runbooks.json`)

Every new runbook **must** be registered in `strategy/runbooks.json`. This file is consumed by the Agency Agents app to enable one-click team deployment.

```json
{
  "runbooks": [
    {
      "slug": "startup-mvp",
      "title": "Startup MVP Build",
      "mode": "NEXUS-Sprint",
      "duration": "4-6 weeks",
      "summary": "Idea to live product with real users, fast — without skipping QA.",
      "doc": "strategy/runbooks/scenario-startup-mvp.md",
      "roster": [
        {
          "group": "Core Team",
          "activation": "always",
          "agents": [
            "agents-orchestrator",
            "project-manager-senior",
            "engineering-frontend-developer"
          ]
        }
      ]
    }
  ]
}
```

### Critical Slug Rule

The `agents` array in `runbooks.json` **must use agent slugs** (the `.md` filename stem), **not** display names.

- ✅ Correct: `"engineering-frontend-developer"` (from `engineering/engineering-frontend-developer.md`)
- ✅ Correct: `"agents-orchestrator"` (from `specialized/agents-orchestrator.md`)
- ❌ Incorrect: `"Frontend Developer"` (display name)
- ❌ Incorrect: `"frontend-developer"` (missing division prefix where applicable)

## Workflow: Creating a New Runbook

1. **Define the Scenario**: Identify a repeatable, multi-agent workflow (e.g., "Enterprise Feature Development", "Paid Media Account Takeover").
2. **Draft the Markdown**: Create `strategy/runbooks/scenario-<slug>.md` following the structure above. Use ASCII trees for execution phases.
3. **Map the Roster**: Identify the exact agents needed and group them by activation phase (e.g., "always", "week 3+", "as needed").
4. **Register in `runbooks.json`**: Add a new object to the `runbooks` array. Ensure every slug in the `agents` array matches an existing agent file stem.
5. **Verify Slugs**: Run the repository's consistency checks (e.g., `scripts/check-runbooks.sh` or equivalent CI guards) to ensure no slug is orphaned or misspelled.
6. **Submit PR**: Commit both the new `.md` file and the updated `runbooks.json`.

## Red Flags — STOP

| Symptom / Rationalization | Correct Action |
| --- | --- |
| "I'll add YAML frontmatter to the runbook so it looks like an agent." | **STOP.** Runbooks are orchestration doctrine, not agents. They must **not** have frontmatter. |
| "I'll use the agent's display name in `runbooks.json` because it's easier to read." | **STOP.** The app resolves agents by slug. Using display names will cause silent failures or broken installs. |
| "I'll put the runbook in a division folder like `engineering/`." | **STOP.** Runbooks belong exclusively in `strategy/runbooks/`. |
| "I'll list 50 agents in the Core Team to be thorough." | **STOP.** NEXUS modes have constraints (Micro: minutes, Sprint: 4-6 weeks, Full: months). Keep rosters lean and phase-activated. |
| "I'll update the markdown but forget `runbooks.json`." | **STOP.** The runbook is invisible to the installer and app until registered in the JSON file. |

## Anti-Patterns

- ❌ **Vague Success Criteria**: "The product is successful." (Bad) vs. "First users onboarded within 48 hours of launch." (Good).
- ❌ **Missing Quality Gates**: A runbook that moves linearly without explicit "Reality Checker" or "Evidence Collector" verification steps invites production failures.
- ❌ **Orphaned Slugs**: Adding an agent to the markdown roster table but forgetting to add its slug to `runbooks.json` (or vice versa) creates a mismatch that breaks one-click deployment.
- ❌ **Overly Granular Phases**: Breaking execution into hourly steps instead of logical phases (e.g., "Discovery", "Core Build", "Hardening") makes the runbook brittle and hard to follow.

## Discovery Keywords

agency agents runbooks, NEXUS playbooks, multi-agent workflow, scenario orchestration, runbooks.json, agent slugs, strategy/runbooks, startup mvp, incident response.
