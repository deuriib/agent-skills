# agent-skills

[![skills.sh](https://skills.sh/b/deuriib/agent-skills)](https://skills.sh/deuriib/agent-skills)

A collection of AI agent skills.

## Installation

To use these skills with your AI agent, you can add them using the `skills` CLI:

```bash
npx -y skills add deuriib/agent-skills
```

## Available Skills

- **animate-ui**: Implement and customize Motion-powered components from Animate UI. shadcn/ui compatible animated primitives and components.
- **azul-payment**: Azul Payment Gateway integration for Dominican Republic. Supports Sale, Refund, 3DS 2.0, and DataVault (tokenization).
- **better-auth-plugin**: Create Better Auth plugins with server-client pairs, schema extensions, hooks, and middleware for custom authentication logic.
- **bridge-xyz**: Integrate Bridge-xyz APIs for stablecoin money movement, including customer onboarding (KYC/KYB), fiat-to-crypto transfers, and virtual accounts.
- **ecf-dgii-ssd**: ECF SSD SDKs and integration guidelines for Dominican Republic electronic invoicing (e-CF), supporting multiple languages (.NET, TypeScript, React, Python, Ruby, Java, Kotlin, iOS, C++).
- **ef2-api**: Build EF2 API integrations for Dominican Republic electronic invoicing (e-CF) via DGII. Includes support for B2B, consumer sales, credit/debit notes, and exports.
- **lago**: Integrate the Lago open-source billing platform for usage-based and subscription billing. Covers event ingestion, billable metrics, plans, charges, invoices, credit notes, payment providers, wallets, webhooks, and self-hosted deployment.
- **lago-payment-integration**: Extend the Lago billing system with custom Payment Service Provider (PSP) integrations, covering backend (Rails) and frontend (React) components.
- **mcp-gway**: MCP Gateway manages MCP (Model Context Protocol) servers. It acts as a bridge between agent-clients and multiple MCP servers, providing a unified interface to discover, connect, and use MCP tools.
- **htmx**: Build modern web interfaces using HTML attributes instead of JavaScript frameworks. Covers htmx attributes, events, extensions, server-side integration patterns, and UI examples.
- **htpy**: Generate HTML from pure Python without templates. Covers elements, attributes, components, streaming, async rendering, static typing, and the html2htpy converter.
- **mintoria-brand-guidelines**: Official brand guidelines for Mintoria, including colors, typography, logos, and premium design principles.

## Dispatch & Workflow — frame→ship Pack

A stage-powered dispatch chain for spec-driven work. Every unit of work runs
`frame-intent → translate-to-spec → propose-changes → review → execute-spec → quality-gate → verify-handoff → ship-release`, with reviews fanning out to
`review-security` / `review-architecture` when the proposal touches trust
boundaries or architecture contracts.

- **frame-intent**: Convert CEO/COO strategic direction into a structured Product Brief and OKR set. Use when a new initiative starts, quarterly planning begins, or a strategic pivot is considered. Triggered by "start a new initiative", "define OKRs", or "strategic planning".
- **translate-to-spec**: Translate an approved Product Brief into domain specs, architecture contracts, and testable requirements. Use after a brief is approved or when a new domain needs spec coverage.
- **propose-changes**: Produce a structured PROPOSED_CHANGES.md for a spec without modifying repository files. Use when a specialist is ready to implement or a change needs pre-approval.
- **review-security**: Perform a structured security review of a proposed change with STRIDE threat model and verdict. Use when a change touches auth, data, external APIs, or when CISO sign-off is required.
- **review-architecture**: Review a proposal against the canonical architecture contract and record an ADR. Use when a change modifies public APIs, data models, or cross-cutting concerns.
- **execute-spec**: Execute an approved spec through structured implementation with test traceability. Use when a proposal is approved and the specialist is cleared to write code. Triggered by "implement this spec" or "execute SPEC-XXX".
- **quality-gate**: Orchestrate domain reviewers and produce a consolidated Quality Gate Report. Use when implementation is ready for review, or when c-levels plus CEO must waive a gate. Triggered by "run quality gate" or "gate SPEC-XXX", after execute-spec completes.
- **verify-handoff**: Verify completed implementation meets Definition of Done and produce a structured handoff. Use when a specialist declares work complete and it needs review before shipping.
- **ship-release**: Orchestrate release shipping including release notes, changelog, and deployment coordination. Use when verified work is ready to ship or when preparing a tagged release.

Chain: `frame-intent → translate-to-spec → propose-changes → review-security / review-architecture → execute-spec → quality-gate → verify-handoff → ship-release`
