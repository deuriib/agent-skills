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

## Dispatch & Workflow — spec-sdd Pack

A stage-powered dispatch chain for spec-driven work. Every unit of work runs
`route → specify → plan → tasks → execute → verify → lessons → seal`, with all
state living in the shared agent memory store.

- **spec-sdd-delgado**: Thin orchestrator and chain router for the spec-sdd pack. Owns frontier scheduling, signals, routines, sessions, and mesh sync. Use when starting, routing, or escalating spec-driven work.
- **spec-sdd-specify**: Durable spec authoring via memory slots. Owns slot lifecycle and explicit saves. Use when creating, reading, or evolving the frozen spec all downstream stages consume.
- **spec-sdd-plan**: Exploratory planning with sketches, graph context, and recall. Owns sketch lifecycle and pre-task research. Use when turning a frozen spec into a promotable plan.
- **spec-sdd-tasks**: Durable task DAG with leases, checkpoints, sentinels, and facet tags. Use when decomposing a promoted plan into executable, guarded work units.
- **spec-sdd-execute**: Evidence-backed execution with facet queries, provenance, and commit linkage. Use when claiming leased actions and producing verifiable outputs.
- **spec-sdd-verify**: Independent quality gate with audit, diagnostics, healing, and insights. Owns FAIL → execute retry (N=2), then escalates to delgado. Use when gating execute outputs before lessons.
- **spec-sdd-lessons**: Lesson capture and team diffusion for passed work. Owns lesson lifecycle, team sharing, and Obsidian publishing. Use when turning verified outputs into reusable knowledge.
- **spec-sdd-crystallize**: Terminal compaction with crystals, consolidation, snapshots, governance deletes, and bridge sync. Use when sealing verified lessons into long-term memory.

Chain: `spec-sdd-delgado → spec-sdd-specify → spec-sdd-plan → spec-sdd-tasks → spec-sdd-execute → spec-sdd-verify → spec-sdd-lessons → spec-sdd-crystallize`
