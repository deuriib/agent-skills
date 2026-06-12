---
name: lago
description: "Trigger: Lago billing, usage-based billing, event ingestion, metering, billing API, subscription management. Integrate and implement Lago open-source billing platform for usage-based and subscription billing."
license: Apache-2.0
metadata:
  author: deuriib
  version: "1.0"
---

# Skill: lago

## Activation Contract

Use this skill when:

- Implementing usage-based or subscription billing with Lago.
- Designing event ingestion for metering customer usage.
- Creating billable metrics, plans, charges, and subscriptions via Lago API.
- Managing invoices, credit notes, coupons, and wallet/prepaid credits.
- Integrating payment providers (Stripe, Adyen, GoCardless) with Lago.
- Setting up webhooks to react to billing events.
- Deploying Lago self-hosted (Docker) or using Lago Cloud.
- Building AI agent billing with the Lago Agent SDK or MCP Server.

## Hard Rules

- **Idempotency by design**: Every event carries a `transaction_id`. Same ID + subscription = deduplicated. Retries are always safe.
- **Event code as contract**: The `code` field maps to a billable metric. Treat it as a stable API contract — renaming a metric requires updating event sources.
- **external_subscription_id ties everything**: Events, invoices, and usage all reference this. It must match an active subscription in Lago.
- **Timestamp determines billing period**: Lago assigns events to billing periods based on `timestamp`, not arrival time. Late-arriving events go to the correct historical period.
- **Never store API keys in code**: Use environment variables or secrets manager. Lago Cloud uses Bearer token auth; self-hosted uses the same scheme.
- **Webhook endpoints must respond 2xx**: Lago retries on non-2xx. Implement idempotent webhook handlers — same event may arrive multiple times.
- **One subscription per plan per customer**: A customer can have multiple subscriptions (different plans), but only one active subscription per plan.
- **Prefer charge filters over multiple metrics**: Use filters on a single billable metric for dimension-based pricing (region, model, tier) instead of creating many separate metrics.

## Decision Gates

| Need | Approach |
|------|----------|
| Event volume < 1K/sec | REST API (single or batch up to 100) |
| Event volume 1K-10K/sec | REST API batch or Kafka/Redpanda |
| Event volume > 10K/sec | Kafka/Redpanda, Kinesis, or pre-aggregation |
| Historical backfill | S3 batch import (.jsonl) |
| LLM token billing | Agent SDK (wrap provider client) |
| Live billing context in AI tools | Lago MCP Server |
| Charge model: flat per unit | `standard` |
| Charge model: tiered pricing | `graduated` or `volume` |
| Charge model: per-transaction % | `percentage` |
| Charge model: bundling | `package` |
| Charge model: custom amount | `dynamic` |
| Prepaid credits | Wallets with top-ups |
| Collect overdue invoices | Payment Requests (dunning) |
| Revenue recognition | Reports + analytics |
| Multi-entity billing | Billing Entities |
| Feature gating per plan | Entitlements |
| E-invoicing compliance | Billing Entity + tax configuration |

## Execution Steps

1. **Set up Lago instance**: Choose Lago Cloud (managed) or self-hosted via Docker. Obtain API key and base URL (`api.getlago.com`, `api.eu.getlago.com`, or custom).

2. **Define billable metrics**: Create metrics for each billable dimension (API calls, compute hours, tokens, storage). Choose aggregation type: `SUM`, `COUNT`, `COUNT_UNIQUE`, `MAX`, `LATEST`, `WEIGHTED_SUM`. Add filters for dimension-based pricing.

3. **Create plans**: Build plans with base subscription fee, usage-based charges (linked to billable metrics), and fixed charges (add-ons). Set billing interval (weekly/monthly/yearly), advance/arrears, trial period. Apply charge models (standard, graduated, volume, percentage, package, dynamic).

4. **Create customers and subscriptions**: Create customers with `external_id` from your system. Assign plans to create subscriptions. A subscription ties a plan to a customer for a billing period.

5. **Ingest usage events**: Send events with `transaction_id`, `external_subscription_id`, `code`, `timestamp`, and `properties`. Use REST API for low volume, Kafka/Kinesis/S3 for high volume. Handle deduplication via `transaction_id`.

6. **Configure invoicing**: Set grace period, net payment terms, invoice numbering, taxes per billing entity. Lago auto-generates invoices per plan model. Use draft invoices for review before finalization.

7. **Set up payment collection**: Connect native payment provider (Stripe, Adyen, GoCardless) or use webhooks to trigger payments on your PSP. Record manual payments as needed.

8. **Configure webhooks**: Register webhook endpoints in Developers > Webhooks. Choose HMAC or JWT signature. Handle events like `invoice.created`, `invoice.payment_status_updated`, `subscription.terminated`.

9. **Monitor and reconcile**: Compare event counts between your source and Lago via `GET /events`. Use reports and analytics for revenue tracking. Set up usage and credit alerts.

## Output Contract

- Event schema uses `transaction_id` with meaningful, traceable IDs (not random UUIDs).
- Billable metrics have clear names, aggregation types, and optional grouping/filters.
- Plans map to your pricing page tiers with correct charge models and intervals.
- Webhook handlers verify signatures and process events idempotently.
- Production event ingestion uses the appropriate channel for volume (REST, Kafka, Kinesis, S3).
- Customer `external_id` and `external_subscription_id` match your application's identifiers.

## References

- `references/core-concepts.md` — Events, billable metrics, plans, subscriptions, customers, charges.
- `references/api-reference.md` — Authentication, API standards, client libraries, rate limits, endpoints.
- `references/invoicing-payments.md` — Invoices, credit notes, coupons, wallets, payment providers, dunning.
- `references/webhooks-deployment.md` — Webhook format/signature, messages, self-hosted deployment, integrations.
