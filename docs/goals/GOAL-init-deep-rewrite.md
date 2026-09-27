# goal file: init-deep rewrite — frame-ship workflow way

**ID:** GOAL-init-deep-rewrite
**Initiator:** montilla (coordinator/CEO)
**Date:** 2026-09-27
**Status:** approved
**Execution_Mode:** helper agents (frozen at agree-the-goal; trivial <15 lines goes by CEO small-task shortcut checkpoint-only, outside methodology)
**Domains-Touched:** [engineering, automation/ops, people]
**Classification:** big-new-direction — announced + overrideable, one-directional escalation (upgraded from scoped-change per user choice "Reescritura total")
**Framings-Considered:** [see below — 3 framings + recommendation + YAGNI cut]
**Approval:** [gate type: file-approval — user chat-yes "Aprobado, a specs" + montilla 2026-09-27]
**Period:** Q3 2026
**Owner:** montilla

## Problem Statement

`skills/init-deep/SKILL.md` is a single 244-line file with no `references/` folder, no IN/OUT/NEXT/STOP contract, and frontmatter below repo standard (`animate-ui` has `license/metadata/trigger`; `init-deep` has only `name/description`).

Violates `AGENTS.md` mandatory files (`SKILL.md` + `references/`) and link-integrity verification. Workflow mixes discovery/scoring/generate/review in one file, hard-codes TodoWrite phases, assumes LSP/Glob without graceful fallback contract, and has no helper-agents delegation rule.

Matters now because every new repo bootstrap inherits this debt.

## Desired Outcome

`init-deep` reescrita como skill modular, repo-compliant y operable vía frame-ship: `SKILL.md` delgado (contrato + router) + `references/` locales, mismo comportamiento de scoring/depth preservado, verificable con link-integrity y report final idéntico.

## Objectives

### Objective 1: Skill repo-compliant y modular

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-1.1 | 1 archivo, 0 references/ | SKILL.md ≤80 líneas + 4-5 refs | `Glob skills/init-deep/**/*` + `Read SKILL.md` line count |
| KR-1.2 | frontmatter name/description | frontmatter par animate-ui (trigger, license, metadata) | diff frontmatter vs `skills/animate-ui/SKILL.md:1-8` |
| KR-1.3 | 0 links verificables | 100% paths en `## References` existen | script link-integrity pass |

### Objective 2: Operable vía frame-ship con helper agents

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-2.1 | sin contrato IN/OUT/NEXT/STOP | contrato + 4-line note + gates por fase | `Grep IN/OUT/NEXT/STOP skills/init-deep/SKILL.md` |
| KR-2.2 | TodoWrite hard-coded, conteo fijo de agentes | delegación helper-agents escalada por tamaño, fallback sin-LSP definido | PROPOSAL.md + review PASS |
| KR-2.3 | sin preservación compat | flags `--depth/--max-depth/--create-new` + oMo alias intactos, mismo Final Report | tests de compat + `verify` HANDOFF |

## Scope

### In Scope

- Reescritura `skills/init-deep/SKILL.md` a formato delgado + router [engineering]
- Nuevos `skills/init-deep/references/` (workflow, scoring-matrix, templates-root-subdir, guardrails-pwsh-lsp) [engineering]
- Frontmatter + `## References` + link-integrity [automation/ops]
- Contrato helper-agents y reglas AGENTS.md jerárquicos (qué va a root vs subdir, no-duplicación) [people]
- REQs testeables + DESIGN + PROPOSAL + checks + build + review + verify + release vía frame-ship

### Out of Scope

- Nuevos flags (dry-run, auto-depth ML, output JSON) — YAGNI cut
- Cambiar `/init` built-in o config global `~/.config/opencode/`
- Reescribir otras skills (solo `animate-ui` como referencia)
- Publicación `skills.sh` o versionado externo

## Stakeholders

| Role | Agent | Involvement |
| ------ | ------- | ------------- |
| Sponsor | montilla | Decision authority, tie-break |
| Owner | vasquez (Engineering Lead) | Delivery ownership |
| Touched | espinoza (Automation/Ops) | Runbook/paralelismo review |
| Touched | santana (People) | Agent-governance (AGENTS.md hierarchy) review |

## Constraints

- Budget: 0 — trabajo interno, sin vendors
- Timeline: corto (1 ciclo SPEC); factibilidad la confirma vasquez en write-the-requirements
- Regulatory: sin PII/secrets — UTF-8, no tokens en logs/commits (guardrail existente)
- Brand/GTM: n/a
- People/change: cambio de contrato de skill — requiere actualizar `AGENTS.md`/`README.md` si cambia interfaz

## Open Questions

- [x] ¿Preservar texto exacto del Final Report o permitir mejora cosmética? Decidido: preservar exacto, trim cosmético solo si tests pasan. (owner: montilla 2026-09-27)
- [x] ¿Número exacto de references/ (4 vs 5)? Decidido: 4 base (workflow, scoring, templates, guardrails), 5ta solo con justificación vasquez en DESIGN. (owner: montilla 2026-09-27)
- [x] Limpiar `D:\docs\goals` creado por error pre-flight? Hecho: `Test-Path D:/docs` = False tras `Remove-Item`. (owner: montilla 2026-09-27)

## Framings-Considered

1. **Modular frame-ship rewrite (Recomendada):** SKILL.md ≤80 líneas + references/. Por qué gana: corrige violación mandatory-files, preserva scoring/depth/oMo, añade contrato testeable. Trade-off: más archivos que revisar. YAGNI: sin nuevos flags.
2. **Single-file polish:** mismo archivo, trim + frontmatter fix. Rápida (~15 min) pero sigue violando `references/` obligatorio. Descartada como estado final; útil solo como fallback si rewrite se bloquea.
3. **Full redesign con features:** añade dry-run, auto-depth, JSON. Más valor aparente, pero scope creep, rompe compat oMo, exige threat-model nuevo. Descartada — propuesta futura separada.

**Falsifiable-bet:** si `write-the-requirements` demuestra que scoring actual no es reproducible en refs sin cambiar salidas, framing 1 muere y se vuelve a framing 2 + DECISION note.

**Grill:** pending (opt-in challenger no solicitado).
