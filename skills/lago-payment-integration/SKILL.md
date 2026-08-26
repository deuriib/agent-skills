---
name: lago-payment-integration
description: Use when integrating a custom payment gateway provider (PSP) in the Lago billing system, or modifying existing payment provider models, controllers, and frontend configuration.
license: MIT
metadata:
  author: deuriib
  version: "1.0"
---

# Lago Payment Integration Skill

Assists developers in extending the Lago billing system with a custom Payment Service Provider (PSP) integration in both backend (Ruby on Rails API) and frontend (React UI).

## Triggers

- "How to integrate a new payment gateway in Lago?"
- "Implementing custom payment providers in Lago backend"
- "Adding new PSP integrations in Lago dashboard"
- "Lago custom payment webhook routing and controllers"
- "Lago payment provider class setup"

## References

- [Backend Integration](references/backend.md) — Models, GraphQL input types, mutations, and database registrations.
- [Frontend Integration](references/frontend.md) — Dashboard pages, dialogs, customer accordions, and chip updates.
- [Webhook Handling](references/webhooks.md) — Endpoint generation, controllers, verification, and event processing.

## Rules

- **Strict Service Design**: Every backend integration service must inherit from `BaseService`, expose a single public method named `call`, and return a result object (never return `nil`).
- **Standardized Status Mapping**: External PSP payment statuses must map explicitly to Lago's standard statuses: `processing`, `success`, or `failed`.
- **Factory Registration**: Ensure all factories are updated when adding a new PSP (e.g., `CreateCustomerFactory`, `CreatePaymentFactory`, and `Invoices::Payments::PaymentProviders::Factory`).
- **Secure Credentials Access**: Never store API keys or client secrets in `settings_accessors`. Use `secrets_accessors` for secure, encrypted DB storage.
- **Frontend Page Layout**: Follow Lago's React layout conventions by creating separate `[PSPName]IntegrationDetails`, `[PSPName]Integrations`, and connection dialog components.
