# Lago Core Concepts

## Events (Usage Ingestion)

Events are the atomic unit of usage measurement. They describe what a customer consumed.

### Event Schema

```json
{
  "transaction_id": "inf_20240314_cust42_gpt4_00831",
  "external_subscription_id": "sub_42",
  "code": "llm_tokens",
  "timestamp": 1710421740,
  "properties": {
    "model": "gpt-4",
    "tokens_in": 820,
    "tokens_out": 1500
  }
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `transaction_id` | Yes | Unique ID for deduplication. Make it meaningful (type+date+customer+sequence), not random UUID. |
| `external_subscription_id` | Yes | Must match an active subscription in Lago. Events with unknown IDs are ingested but not post-processed. |
| `code` | Yes | Maps to a billable metric. Stable API contract. |
| `timestamp` | No | Unix timestamp (seconds). If omitted, uses reception time. Determines billing period assignment. |
| `properties` | No | Key-value pairs for pricing dimensions. Include future-proof fields — unused properties cost nothing. |
| `precise_total_amount_cents` | No | Skip aggregation and set monetary amount directly (string, to avoid float rounding). |

### Delivery Methods

| Method | Max Throughput | Use Case |
|--------|---------------|----------|
| REST API (single) | < 1K events/sec | Start here, simplest setup |
| REST API (batch) | 1K-10K events/sec | Up to 100 events/request |
| Kafka / Redpanda | > 10K events/sec | Real-time high-volume production |
| Amazon Kinesis | > 10K events/sec | AWS-native streaming |
| Amazon S3 | Any | Historical backfills, batch loads |
| Agent SDK | N/A | LLM token billing (wraps provider client) |

### Deduplication

Lago guarantees exactly-once processing via `transaction_id`. Same ID + subscription = only the first is billed. Works across delivery methods. With ClickHouse, uniqueness is maintained with both `transaction_id` and `timestamp`.

### Edge Cases

- **Late-arriving events**: Assigned to correct historical period based on `timestamp`. If invoice already finalized, not included; recurring metrics impact next cycle.
- **Events before subscription start**: Ingested but ignored during post-processing.
- **Events for terminated subscriptions**: Ingested but ignored (safety mechanism).
- **Correcting events (Postgres)**: Send new `transaction_id` (422 on duplicate).
- **Correcting events (ClickHouse)**: Resend same `transaction_id` + `timestamp` with updated properties (replaces original).

### Rate Limits (REST API)

| Category | Default Limit |
|----------|--------------|
| Event ingestion | 500 requests/sec |
| Current usage | 200 requests/sec |
| All other endpoints | 50 requests/sec |

Rate-limited responses include `x-ratelimit-limit`, `x-ratelimit-remaining`, `x-ratelimit-reset` headers. Kafka/Kinesis/S3 connectors are not subject to REST rate limits.

---

## Billable Metrics

Billable metrics define how incoming events are aggregated to measure consumption.

### Aggregation Types

| Type | Description | Metered or Recurring |
|------|-------------|---------------------|
| `COUNT` | Counts number of times an event occurs | Metered |
| `COUNT_UNIQUE` | Returns unique values of a property | Metered or Recurring |
| `SUM` | Sums a numeric property from events | Metered or Recurring |
| `MAX` | Returns max value of a property | Metered |
| `LATEST` | Returns latest value of a property | Metered |
| `WEIGHTED SUM` | Sum prorated by time used per period | Metered or Recurring |
| `CUSTOM` | SQL expression for complex calculations | Metered or Recurring |

### Groups and Filters

- **Groups** (deprecated): Break down usage by event property for visibility.
- **Filters**: Slice a single billable metric along attributes (region, model, tier). Each slice can be priced independently on plans. "Most specific match wins" — set a default rate and override for specific dimensions.

### Recurring vs Metered

- **Metered**: Aggregated in real-time from events during the billing period.
- **Recurring**: Applied periodically (daily, weekly, monthly) regardless of events.

### Rounding

Rounding rules can be applied to the final aggregation result (e.g., round up to nearest integer).

### SQL Expressions

For advanced calculations, use SQL custom expressions (e.g., `properties.tokens_in + properties.tokens_out`).

---

## Plans

Plans define how products are priced and billed. They group pricing, billing cadence, features, commitments, and invoicing rules.

### Plan Structure

A plan is composed of:
1. **Basic info**: name, code, description, taxes.
2. **Plan model**: billing interval (monthly, yearly, weekly), base amount + currency, advance/arrears, trial period.
3. **Fixed charges (add-ons)**: Recurring fees tied to add-ons, billed as fixed amount on invoices.
4. **Usage-based charges**: Linked to billable metrics, priced per charge model.
5. **Minimum commitment**: Minimum amount across all invoices in a billing period.
6. **Entitlements**: Feature access attached to the plan.
7. **Progressive billing**: Auto-triggers invoices when cumulative usage reaches thresholds.

### Charge Models

| Model | Description |
|-------|-------------|
| **Standard** | Flat per-unit price |
| **Graduated** | Tiered pricing: different rates per unit range (e.g., $0.50/unit for 0-100, $0.40/unit for 101+) |
| **Volume** | Volume-based: all units priced at the tier rate once threshold is crossed |
| **Percentage** | Percentage of a value (per-transaction fee), with optional flat fee and free units |
| **Package** | Bundle pricing: X units for Y price, then per-unit rate above |
| **Dynamic** | Uses `precise_total_amount_cents` from events — Lago skips its own aggregation |
| **Graduated Percentage** | Graduated tiers expressed as percentage rates |
| **Custom price** | Free-form pricing via custom expression |

### Plan Editing Rules

- Fully editable if not linked to any active subscription.
- Once assigned, core properties lock: billing interval, advance/arrears, proration rules.
- Prices, charges, and charge settings remain editable.
- Use `cascade_updates: true` to propagate changes to overridden subscriptions.
- To change locked properties: remove active subscriptions, or create a new plan and migrate.

---

## Subscriptions

A subscription is created when a plan is assigned to a customer.

### Key Rules

- One active subscription per plan per customer (multiple subscriptions OK for different plans).
- Subscription has `started_at`, optional `terminated_at`.
- Upgrades/downgrades: change the plan on an existing subscription. Lago handles billing period alignment.
- Editing a subscription: change plan override properties without changing the base plan.

### Subscription States

- **Pending**: Scheduled to start in the future.
- **Active**: Currently billing.
- **Terminated**: Ended. Events after termination are ingested but ignored.

---

## Customers

Customers represent the entities you bill. They reference your application's user/org IDs.

### Key Fields

- `external_id`: Your application's customer identifier (required).
- `name`, `email`, `address_line1`, `city`, `zipcode`, `country`, `tax_identification_number`.
- `currency`: Default currency.
- `payment_provider`: Connected PSP (stripe, adyen, gocardless).
- `provider_customer_id`: ID on the payment provider side.
- `metadata`: Key-value pairs for custom data.

### Customer Portal

Retrieve an embeddable checkout/portal link via `GET /customers/{id}/customer_portal`.

---

## Entitlements

Unify entitlements and billing. Features define what a customer can access. Plans attach features with privilege values.

### Feature

Represents an entitlement component (e.g., "seats", "max_storage"). Has:
- `code`: Stable identifier.
- `name`, `description`.
- `privileges`: Properties with types (integer, boolean, select) and values.

### Plan Entitlement

Assigns features to a plan with specific privilege values. Overrides feature defaults.

### Subscription Entitlement

Can override plan-level entitlements per subscription.

---

## Wallets (Prepaid Credits)

Prepaid credits allow customers to pre-pay for usage. Enable recurring revenue for pay-as-you-go models.

### Wallet Operations

- **Create**: Set name, rate (currency per credit), credits balance, currency.
- **Top-up**: Add credits to active wallet.
- **Terminate**: Close a wallet.
- **Alerts**: Trigger notifications when balance crosses thresholds.
- **Traceability**: Track how credits flow between inbound and outbound transactions.

---

## Coupons

Coupons apply discounts to customer invoices.

### Properties

- **Coupon type**: `fixed_amount` or `percentage`.
- **Frequency**: `once` (single invoice) or `recurring` (multiple billing periods).
- **Expiration**: `no_expiration`, `time_limit` (days after issuance), or `date`.
- **Amount**: Coupon's face value (cents or percentage).
- **Applies to**: `all` invoices or `plans` (specific plan codes).
- **Reusable**: Can be applied to multiple customers.

Applied coupons can override coupon defaults per customer.

---

## Add-ons (One-Time Fees)

Add-ons are one-time fees applied on one-off invoices. Used for setup fees, one-off charges, customer success fees.

### Usage

- Create an add-on with name, code, amount, taxes.
- Optionally attach to a plan as a fixed charge (recurring).
- Issue a one-off invoice with the add-on to a customer.

---

## Billing Entities

Allow an organization to manage different billing configurations (tax rules, invoice numbering, logos) per entity. Each entity generates its own invoices.
