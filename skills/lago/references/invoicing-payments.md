# Lago Invoicing & Payments

## Invoicing Overview

Lago auto-generates invoices per the plan model. Subscription fees can be billed at period start (advance) or end (arrears). Usage charges are calculated at period end.

### Invoice Lifecycle

1. **Draft**: Generated but editable. Can be refreshed, updated, or deleted.
2. **Finalized**: Locked and ready for payment. Triggers `invoice.created` webhook.
3. **Payment collected**: Status updates via PSP or manual recording.
4. **Voided**: Invoice voided with optional credit note generation.

### Invoice Settings

| Setting | Description |
|---------|-------------|
| **Grace period** | Buffer (days) between generation and finalization. Allows review before locking. |
| **Net payment term** | Days customer has to pay after finalization (e.g., net 30). |
| **Invoice numbering** | Per customer or per billing entity. Custom prefix/length. |
| **Issuing date** | Choose invoice date: period start, period end, or specific day. |
| **Empty invoices** | Configure whether zero-amount invoices are generated. |
| **Taxes** | Apply tax rates per billing entity and/or customer. |
| **Metadata** | Key-value pairs attached to invoices. |

### Draft Invoices

Draft invoices can be:
- **Refreshed**: Recalculate fees for the current draft.
- **Updated**: Modify metadata, payment terms, or fees.
- **Finalized**: Lock and trigger payment processing.

### One-Off Invoices

Issue one-off invoices for:
- Add-ons (one-time fees)
- Manual charges not tied to a subscription

Use `POST /invoices` with `invoice_type: one_off` and an array of add-on codes.

### Invoice Preview

Generate a preview of what an invoice would look like without creating it. Useful for estimation before customer commitment.

### Invoice Export

Export invoices as CSV (simple or advanced) filtered by date range, status, customer, or billing entity.

---

## Credit Notes

Credit notes refund or credit back a customer for a fee or invoice.

### Types

- **Full refund**: Entire invoice amount credited.
- **Partial refund**: Line-item level credit.
- **Void credit**: Void available credit without refund.

### Credit Note Metadata

Add key-value metadata to credit notes. Operations: create (replace all), update (merge), delete single key, delete all.

### Estimate

`POST /credit_notes/estimate` returns amounts before creating the credit note.

---

## Coupons

### Coupon Types

| Type | Behavior |
|------|----------|
| **Fixed amount** | Deducts X cents from invoice total |
| **Percentage** | Deducts X% from invoice total |

### Frequency

- **Once**: Applied to a single invoice.
- **Recurring**: Applied to each invoice for N billing periods.

### Application

Apply a coupon to a customer: `POST /applied_coupons` with coupon code and optional overrides (amount, percentage, frequency).

---

## Payment Providers

### Native Integrations

| Provider | Type | Features |
|----------|------|----------|
| **Stripe** | Official | Auto-sync customers, payment intents, checkout links, refunds, payment method management |
| **Adyen** | Official | Auto-sync customers, payment intents, checkout links, refunds |
| **GoCardless** | Official | Direct debit bank payments, customer sync, payment intents |
| **Cashfree** | Community | India market, payment intents |
| **Moneyhash** | Community | Africa and Middle East payment infrastructure |

### Payment Provider Capabilities

When configured, Lago:
- Auto-synchronizes customer info to the PSP.
- Creates payment intents when invoices are finalized.
- Generates shareable checkout URLs.
- Updates invoice payment status from PSP webhooks.
- Initiates refunds for credit notes.

### Custom Payment Integration

For PSPs not natively supported:
1. Use Lago webhooks to get invoice payloads.
2. Implement payment processing in your application.
3. Record payments manually via `POST /payments`.
4. See the `lago-payment-integration` skill for detailed custom PSP integration.

### Payment Methods

Customer's payment instruments managed by the PSP:
- List methods: `GET /customers/{external_id}/payment_methods`
- Set default: `PUT /customers/{external_id}/payment_methods/{id}`
- Delete: `DELETE /customers/{external_id}/payment_methods/{id}`

### Payment Pre-Authorization

Validate payment methods before creating/upgrading/downgrading subscriptions. Generates a checkout URL for the customer to provide payment details.

### Payment Retries

Retry failed payments:
- Manual: `POST /invoices/{id}/retry_payment`
- Automatic: Via dunning campaigns (automatic dunning).

### Payment Receipts

Lago auto-generates payment receipts for each processed payment (manual or provider). Access via `GET /payment_receipts`.

### Manual Payments

Record payments outside of native PSP integrations via `POST /payments`.

---

## Dunning (Payment Recovery)

### Automatic Dunning

Lago automates customer communications for overdue invoices:
1. Configure dunning campaigns (escalation schedule, email templates).
2. Lago sends reminders at defined intervals.
3. Payment requests are created for overdue invoices.
4. Escalate: reminder -> warning -> final notice -> suspension.

### Manual Dunning

- List overdue invoices.
- Create payment requests: `POST /payment_requests`.
- Track payment request status.

### Payment Requests

A payment request groups overdue invoices for a single payment intent.

---

## Wallets (Prepaid Credits)

### Wallet Structure

| Field | Description |
|-------|-------------|
| `rate` | Amount per credit (e.g., 1.5 USD per credit) |
| `credits_balance` | Current credit balance |
| `balance_cents` | Monetary value of current balance |
| `consumed_credits` | Credits consumed |
| `consumed_amount_cents` | Monetary value consumed |
| `expiration_at` | Optional expiration date |

### Wallet Alerts

Monitor wallet balance thresholds. Trigger when balance drops below a threshold. Configurable via dashboard or API.

### Wallet Transaction Operations

| Type | Direction | Description |
|------|-----------|-------------|
| **Inbound** | Added | Top-up, initial funding |
| **Outbound** | Deducted | Usage consumption |
| **Void** | Removed | Admin credit removal |

### Traceability

For traceable wallets, track how inbound transactions fund outbound ones. Available for wallets created with `transaction_metadata: enabled` (subject to ClickHouse availability).

---

## Alerts

### Usage Alerts

Monitor subscription usage thresholds:
- Threshold type: `fixed` (absolute value) or `percentage` (of plan limit).
- Triggers webhook when exceeded.
- Per subscription or per charge.

### Wallet Alerts

Monitor wallet credit balance thresholds:
- Trigger when balance drops below threshold.
- Configurable via dashboard or API.

### Credits Consumption Alerts

Specific to wallets:
- Threshold as fixed credit amount.
- Fires once per threshold crossing.
- Can be configured via API or dashboard.
