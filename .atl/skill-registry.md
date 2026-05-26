# Skill Registry

This registry provides a central index of all installed skills. Use it to discover available triggers and pass exact skill paths to subagents.

## Registry Contract

- Source of truth is always `SKILL.md`.
- Deduplication prefers project-level skills.
- Subagents should read the specific `SKILL.md` before starting work.

## Indexed Skills

| Skill | Trigger / Description | Scope | Path |
| --- | --- | --- | --- |
| **bridge-xyz** | Bridge API, stablecoin payments, /bridge-xyz, transfer funds, customer onboarding. Integrate Bridge-xyz APIs for stablecoin money movement. | project | `skills/bridge-xyz/SKILL.md` |
| **ef2-api** | facturacion electronica, e-CF, DGII, NCF, EF2, factura, comprobante fiscal, nota credito, nota debito. Build EF2 API integrations for Dominican Republic electronic invoicing. | project | `skills/ef2-api/SKILL.md` |
| **flet-expert** | Flet, building Python web/desktop/mobile apps, ft.Page, Flet controls. Expert guidance for building applications with the Flet framework. | project | `skills/flet-expert/SKILL.md` |
| **mintoria-brand-guidelines** | Official brand guidelines for Mintoria, including colors, typography, logos, and premium design principles. | project | `skills/mintoria-brand-guidelines/SKILL.md` |
