---
name: azul-payment
description: "Trigger: Azul Payment, Azul API, integration, payments, 3DS, DataVault. Assists with Azul Payment Gateway implementation."
license: MIT
metadata:
  author: deuriib
  version: "1.0"
---

# Azul Payment Integration Skill

Assists developers in integrating the Azul Payment Gateway (Servicios Digitales Popular) for e-commerce, recurring payments, and 3D Secure authentication.

## Triggers

- "How to integrate Azul in my website?"
- "Azul Payment Gateway API documentation"
- "Azul Sale JSON example"
- "Azul 3DS 2.0 implementation"
- "Azul DataVault tokenization"
- "Azul response codes ISO8583"

## References

- [Endpoints](references/endpoints.md) — URLs for Production and Testing environments.
- [Authentication](references/auth.md) — Header logic (Auth1, Auth2) and credentials.
- [Transactions](references/transactions.md) — Sale, Refund, Void, and Hold examples.
- [DataVault](references/datavault.md) — Card tokenization and vaulted payments.
- [3D Secure 2.0](references/3ds.md) — Frictionless and Challenge workflows.
- [Error Codes](references/error_codes.md) — ISO8583 and Azul-specific response codes.
- [Recurring](references/recurring.md) — Subscription and billing plan setup.

## Rules

- Always prioritize **JSON** examples over SOAP unless explicitly requested.
- Use the 120-second timeout recommendation for all API requests.
- Ensure `Auth1` and `Auth2` headers are included in every request explanation.
- For 3D Secure, always mention the requirement for a redirect URL handling.
