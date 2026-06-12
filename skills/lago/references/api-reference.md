# Lago API Reference

## Base URLs

| Environment | Base URL |
|-------------|----------|
| Lago Cloud (US) | `https://api.getlago.com/api/v1` |
| Lago Cloud (EU) | `https://api.eu.getlago.com/api/v1` |
| Self-hosted | `http://<your-domain>/api/v1` |

## Authentication

All requests require an API key in the `Authorization` header:

```
Authorization: Bearer <your_api_key>
```

API keys are managed in the Lago dashboard under Developers > API Keys.

---

## API Standards

### Content Type

All requests and responses use `application/json`.

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 204 | No Content (delete) |
| 400 | Bad Request (malformed) |
| 401 | Unauthorized |
| 404 | Not Found |
| 422 | Validation Error |
| 429 | Rate Limited |
| 5xx | Server Error |

### Pagination

List endpoints support `page` and `per_page` query parameters (default per_page varies by endpoint).

### Query Parameters

- Simple: `?page=1&per_page=20&external_customer_id=123`
- Array: `?coupon_code[]=10_OFF&coupon_code[]=20_OFF` (brackets required)

---

## Client Libraries

| Language | Package | Repository |
|----------|---------|------------|
| Python | `lago-python-client` | `pip install lago-python-client` |
| Ruby | `lago-ruby-client` | `gem install lago-ruby-client` |
| JavaScript | `lago-javascript-client` | `npm install lago-javascript-client` |
| Go | `lago-go-client` | `go get github.com/getlago/lago-go-client@v1` |

### Python Example

```python
from lago_python_client import Client

client = Client(api_key='__YOUR_API_KEY__')
# For EU region:
# client = Client(api_key='__YOUR_API_KEY__', api_url='https://api.eu.getlago.com/')
```

### JavaScript Example

```js
import { Client } from 'lago-javascript-client'
const client = Client('__YOUR_API_KEY__')
// For self-hosted:
// const client = Client('__YOUR_API_KEY__', { baseUrl: 'http://localhost:3000/api/v1' })
```

---

## Key Endpoints

### Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/events` | Send a single usage event |
| POST | `/events/batch` | Send batch of events (up to 100) |
| GET | `/events/{transaction_id}` | Retrieve a specific event |
| GET | `/events` | List all events (filterable) |
| POST | `/events/estimate_fees` | Estimate fees for an event |

### Billable Metrics

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/billable_metrics` | Create a billable metric |
| GET | `/billable_metrics` | List all billable metrics |
| GET | `/billable_metrics/{code}` | Retrieve by code |
| PUT | `/billable_metrics/{code}` | Update |
| DELETE | `/billable_metrics/{code}` | Delete |

### Plans

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/plans` | Create a plan |
| GET | `/plans` | List all plans |
| GET | `/plans/{code}` | Retrieve by code |
| PUT | `/plans/{code}` | Update |
| DELETE | `/plans/{code}` | Delete |

### Plan Charges

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/plans/{code}/charges` | Create a usage-based charge |
| GET | `/plans/{code}/charges` | List charges |
| GET | `/plans/{code}/charges/{id}` | Retrieve charge |
| PUT | `/plans/{code}/charges/{id}` | Update charge |
| DELETE | `/plans/{code}/charges/{id}` | Delete charge |
| POST | `/plans/{code}/charges/{id}/filters` | Create charge filter |
| GET | `/plans/{code}/charges/{id}/filters` | List charge filters |
| PUT | `/plans/{code}/charges/{id}/filters/{filter_id}` | Update charge filter |
| DELETE | `/plans/{code}/charges/{id}/filters/{filter_id}` | Delete charge filter |

### Plan Fixed Charges

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/plans/{code}/fixed_charges` | Create a fixed charge (add-on) |
| GET | `/plans/{code}/fixed_charges` | List fixed charges |
| GET | `/plans/{code}/fixed_charges/{id}` | Retrieve fixed charge |
| PUT | `/plans/{code}/fixed_charges/{id}` | Update fixed charge |
| DELETE | `/plans/{code}/fixed_charges/{id}` | Delete fixed charge |

### Customers

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/customers` | Create a customer |
| GET | `/customers` | List all customers |
| GET | `/customers/{external_id}` | Retrieve by external_id |
| PUT | `/customers/{external_id}` | Update |
| DELETE | `/customers/{external_id}` | Delete |
| GET | `/customers/{external_id}/customer_portal` | Get portal/checkout URL |
| POST | `/customers/{external_id}/checkout_url` | Regenerate PSP checkout URL |
| GET | `/customers/{external_id}/current_usage` | Get current usage |
| GET | `/customers/{external_id}/past_usage` | Get past usage |
| GET | `/customers/{external_id}/projected_usage` | Get projected usage |

### Subscriptions

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/subscriptions` | Create/assign plan to customer |
| GET | `/subscriptions` | List all active subscriptions |
| GET | `/subscriptions/{id}` | Retrieve |
| PUT | `/subscriptions/{id}` | Update |
| DELETE | `/subscriptions/{id}` | Terminate |
| GET | `/subscriptions/{id}/lifetime_usage` | Get lifetime usage |
| PUT | `/subscriptions/{id}/lifetime_usage` | Update lifetime usage |

### Subscription Charges

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/subscriptions/{id}/charges` | List effective charges |
| GET | `/subscriptions/{id}/charges/{charge_id}` | Retrieve charge |
| PUT | `/subscriptions/{id}/charges/{charge_id}` | Create/update charge override |
| POST | `/subscriptions/{id}/charges/{charge_id}/filters` | Create charge filter override |
| GET | `/subscriptions/{id}/charges/{charge_id}/filters` | List filters |
| PUT | `/subscriptions/{id}/charges/{charge_id}/filters/{filter_id}` | Update filter override |
| DELETE | `/subscriptions/{id}/charges/{charge_id}/filters/{filter_id}` | Delete filter override |

### Invoices

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/invoices` | List all invoices |
| GET | `/invoices/{id}` | Retrieve invoice |
| PUT | `/invoices/{id}` | Update |
| POST | `/invoices` | Create one-off invoice |
| PUT | `/invoices/{id}/finalize` | Finalize draft |
| PUT | `/invoices/{id}/refresh` | Refresh draft |
| POST | `/invoices/{id}/download` | Download PDF |
| POST | `/invoices/{id}/retry_payment` | Retry payment |
| POST | `/invoices/{id}/retry_finalization` | Retry finalization |
| PUT | `/invoices/{id}/void` | Void invoice |
| POST | `/invoices/preview` | Preview invoice |

### Credit Notes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/credit_notes` | Create credit note |
| GET | `/credit_notes` | List all |
| GET | `/credit_notes/{id}` | Retrieve |
| PUT | `/credit_notes/{id}` | Update |
| POST | `/credit_notes/{id}/download` | Download PDF |
| POST | `/credit_notes/{id}/void` | Void available credit |
| POST | `/credit_notes/estimate` | Estimate amounts |

### Coupons

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/coupons` | Create coupon |
| GET | `/coupons` | List all |
| GET | `/coupons/{code}` | Retrieve |
| PUT | `/coupons/{code}` | Update |
| DELETE | `/coupons/{code}` | Delete |
| POST | `/applied_coupons` | Apply coupon to customer |
| GET | `/applied_coupons` | List applied coupons |
| DELETE | `/applied_coupons/{id}` | Remove applied coupon |

### Add-ons

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/add_ons` | Create add-on |
| GET | `/add_ons` | List all |
| GET | `/add_ons/{code}` | Retrieve |
| PUT | `/add_ons/{code}` | Update |
| DELETE | `/add_ons/{code}` | Delete |

### Wallets

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/wallets` | Create wallet |
| GET | `/wallets` | List all |
| GET | `/wallets/{id}` | Retrieve |
| PUT | `/wallets/{id}` | Update |
| DELETE | `/wallets/{id}` | Terminate |
| POST | `/wallets/{id}/top_up` | Top-up credits |
| GET | `/wallets/{id}/transactions` | List transactions |
| POST | `/wallets/{id}/transactions/{tx_id}/payment_url` | Get checkout URL |

### Payment Methods

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/customers/{external_id}/payment_methods` | List payment methods |
| PUT | `/customers/{external_id}/payment_methods/{id}` | Update (set default) |
| DELETE | `/customers/{external_id}/payment_methods/{id}` | Delete payment method |

### Payment Requests (Dunning)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/payment_requests` | Create payment request for overdue invoices |
| GET | `/payment_requests` | List all payment requests |

### Webhook Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/webhook_endpoints` | Create webhook endpoint |
| GET | `/webhook_endpoints` | List all |
| GET | `/webhook_endpoints/{id}` | Retrieve |
| PUT | `/webhook_endpoints/{id}` | Update |
| DELETE | `/webhook_endpoints/{id}` | Delete |

### Taxes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/taxes` | Create tax rate |
| GET | `/taxes` | List all |
| GET | `/taxes/{code}` | Retrieve |
| PUT | `/taxes/{code}` | Update |
| DELETE | `/taxes/{code}` | Delete |

### Billing Entities

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/billing_entities` | Create billing entity |
| GET | `/billing_entities` | List all |
| GET | `/billing_entities/{code}` | Retrieve |
| PUT | `/billing_entities/{code}` | Update |

### Features / Entitlements

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/features` | Create feature |
| GET | `/features` | List all |
| GET | `/features/{code}` | Retrieve |
| PUT | `/features/{code}` | Update |
| DELETE | `/features/{code}` | Delete |
| POST | `/plans/{code}/entitlements` | Set plan entitlements (replaces all) |
| GET | `/plans/{code}/entitlements` | List plan entitlements |
| PATCH | `/plans/{code}/entitlements` | Update plan entitlements |
| DELETE | `/plans/{code}/entitlements/{ent_id}` | Remove entitlement from plan |
| GET | `/subscriptions/{id}/entitlements` | List subscription entitlements |
| PATCH | `/subscriptions/{id}/entitlements` | Update subscription entitlements |
| DELETE | `/subscriptions/{id}/entitlements/{ent_id}` | Remove subscription entitlement |

### Alerts

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/subscriptions/{id}/alerts` | Create usage alert |
| GET | `/subscriptions/{id}/alerts` | List alerts |
| GET | `/subscriptions/{id}/alerts/{alert_id}` | Retrieve alert |
| PUT | `/subscriptions/{id}/alerts/{alert_id}` | Update alert |
| DELETE | `/subscriptions/{id}/alerts/{alert_id}` | Delete alert |
| POST | `/wallets/{id}/alerts` | Create wallet alert |
| GET | `/wallets/{id}/alerts` | List wallet alerts |
| GET | `/wallets/{id}/alerts/{alert_id}` | Retrieve wallet alert |
| PUT | `/wallets/{id}/alerts/{alert_id}` | Update wallet alert |
| DELETE | `/wallets/{id}/alerts/{alert_id}` | Delete wallet alert |

### Audit Logs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/audit_logs/activity_logs` | List activity logs |
| GET | `/audit_logs/activity_logs/{activity_id}` | Retrieve activity log |
| GET | `/audit_logs/api_logs` | List API logs |
| GET | `/audit_logs/api_logs/{request_id}` | Retrieve API log |

### Payments

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/payments` | Record manual payment |
| GET | `/payments` | List all payments |
| GET | `/payments/{id}` | Retrieve payment |

### Payment Receipts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/payment_receipts` | List all receipts |
| GET | `/payment_receipts/{id}` | Retrieve receipt |

### Organization

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/organizations` | Get organization settings |
| PUT | `/organizations` | Update organization (deprecated, use dashboard) |

---

## OpenAPI Spec

The full OpenAPI specification is available at:
- `https://swagger.getlago.com/openapi.yaml`
