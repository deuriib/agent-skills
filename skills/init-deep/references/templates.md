# Templates with domain slots — init-deep

Budgets are hard: root 50–150 lines, subdir 30–80 lines.
Domains displace generic text — they never extend the budget.

## Root AGENTS.md skeleton

```markdown
# PROJECT KNOWLEDGE BASE

**Generated:** {TIMESTAMP}
**Commit:** {SHORT_SHA}
**Branch:** {BRANCH}

## OVERVIEW

{1-2 sentences: what + core stack}

## DOMAINS ACTIVE

| Domain | Status | Evidence |
|--------|--------|----------|
| Security & Privacy | active/absent | {path or —} |
| Testing | active/absent | {path or —} |
| Engineering | active | {path} |
| Operations & Automation | active/absent | {path or —} |
| Legal & Regulatory | active/absent | {path or —} |
| Brand & Marketing | active/absent | {path or —} |
| Revenue & Commercial | active/absent | {path or —} |
| Product | active/absent | {path or —} |
| Financial | active/absent | {path or —} |
| People & Conduct | active/absent | {path or —} |

## STRUCTURE

{tree with non-obvious purposes only}

## WHERE TO LOOK

| Task | Location | Notes |

## BOUNDARIES

{trust boundaries, PII stores with purpose/TTL/deletion route, approval gates.
Skip if no cross-domain evidence. Max 8 lines.}

## CODE MAP

{from LSP/Grep — skip if project <10 files}

## CONVENTIONS

{ONLY deviations from standard}

## ANTI-PATTERNS (THIS PROJECT)

{explicitly forbidden here}

## COMMANDS

```bash
{dev/test/build}
```

## NOTES

{gotchas}
```

## Subdirectory skeleton

```markdown
# {DIR} — AGENTS

`DOMAINS: {max 3, e.g. Security & Privacy, Testing}`

## OVERVIEW

{1 line: responsibility of this dir}

## WHERE TO LOOK

| Task | Location | Notes |

## GUARDRAILS (THIS DIR)

{max 5 bullets, domain-specific deltas only. No parent repeats.
Examples: `- Security: all queries parameterized — see db/client.ts`
`- Testing: unit floor 80% — tests/unit/<domain>/ required with change`
`- Legal: DPA required before new processor — route to legal`}

## CONVENTIONS

{only if different from parent}

## ANTI-PATTERNS

{explicitly forbidden here}
```

Omit `STRUCTURE` unless dir has >5 subdirs.
Omit `GUARDRAILS` bullets without evidence.
