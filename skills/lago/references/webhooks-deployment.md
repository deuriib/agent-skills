# Lago Webhooks & Deployment

## Webhooks

### Webhook Configuration

Up to 10 webhook endpoints can be registered per organization.

**Configuration via API:**

```json
{
  "webhook_endpoint": {
    "webhook_url": "https://your-app.com/lago-webhooks",
    "signature_algo": "hmac"
  }
}
```

**Signature options:**

| Algorithm | Pros | Cons |
|-----------|------|------|
| **HMAC** | Shorter header, no size restrictions | Requires shared secret management |
| **JWT** | Standardized, self-contained payload | Larger header, potential size limits |

### HMAC Signature Verification

The HMAC signature token is found in Developers > Webhooks > HMAC Signature Token.

Verify webhooks by computing HMAC-SHA256 of the request body and comparing with the `Lago-Signature` header.

### Webhook Events (Messages)

Lago sends these event types (list may grow — handle unknown types gracefully):

**Invoice Events:**
- `invoice.created` — New invoice generated
- `invoice.payment_status_updated` — Payment status changed
- `invoice.drafted` — Draft invoice created
- `invoice.one_off_created` — One-off invoice created
- `invoice.retry_payment` — Payment retry triggered

**Subscription Events:**
- `subscription.created` — Subscription started
- `subscription.terminated` — Subscription ended
- `subscription.started` — Pending subscription activated
- `subscription.plan_changed` — Plan upgraded/downgraded

**Payment Events:**
- `payment.created` — Payment processed
- `payment.payment_method_added` — New payment method added
- `payment.request_created` — Payment request created
- `payment.request_requirements_changed` — Payment request requirements changed

**Credit Note Events:**
- `credit_note.created` — Credit note issued

**Wallet Events:**
- `wallet.transaction.created` — Wallet transaction (top-up/void)
- `wallet.depleted` — Wallet balance reached zero

**Alert Events:**
- `alert.created` — Usage or wallet alert triggered

### Webhook Error Handling

- Respond with 2xx (`200`, `201`, `202`, `204`) to acknowledge receipt.
- Lago retries on non-2xx responses.
- Access webhook logs in Developers > Webhooks (filter by date, type, HTTP status).
- Failed events show error response and retry count.

### Retry Behavior

Lago retries failed webhook deliveries. The number of retries and intervals depend on configuration. Implement idempotent handling — the same event may arrive multiple times.

---

## Self-Hosted Deployment

### Docker (Easiest)

```bash
# Clone the repository
git clone https://github.com/getlago/lago.git
cd lago

# Start all services
docker compose up -d
```

Services started:
- Lago API (Rails)
- Lago Frontend (React)
- PostgreSQL
- Redis
- Sidekiq (background jobs)

### Compatibility Matrix

| Component | Version |
|-----------|---------|
| PostgreSQL | >= 14 |
| Redis | >= 6 |
| Ruby | (managed by Docker) |
| Node.js | (managed by Docker) |

### Database Maintenance

- Regular VACUUM and ANALYZE for Postgres performance.
- Monitor connection pool usage.
- Set up WAL archiving for point-in-time recovery.

### Useful Commands

| Command | Description |
|---------|-------------|
| `docker compose up -d` | Start all services |
| `docker compose logs -f api` | Watch API logs |
| `docker compose exec api rails c` | Rails console |
| `docker compose exec api rails db:migrate` | Run migrations |
| `docker compose exec api rails lago:seed` | Seed demo data |

### Version Updates

1. Pull latest images: `docker compose pull`
2. Restart services: `docker compose up -d`
3. Run migrations: `docker compose exec api rails db:migrate`
4. Check migration guides for breaking changes.

### Tracking & Analytics

Self-hosted instances can optionally enable telemetry for usage tracking. Disabled by default.

---

## Lago Cloud

Lago Cloud is the managed version:
- Hosted and maintained by Lago.
- Includes managed Kafka endpoint for high-volume event ingestion.
- EU and US regions available.
- Automatic upgrades and backups.
- SOC 2 Type 2 compliant.

---

## AI Agent Integrations

### Agent SDK

Wrap provider clients to auto-emit token usage events:

```python
from lago_agent_sdk import LagoSDK

sdk = LagoSDK(api_key="__KEY__", default_subscription_id="sub_42")
client = sdk.wrap(boto3.client("bedrock-runtime", region_name="eu-west-1"))
```

**Supported providers:** AWS Bedrock, Mistral, OpenAI, Anthropic, Google Gemini.
**Languages:** Python, JavaScript/TypeScript.

Emits one event per non-zero token dimension (input, output, cached input, tool calls).

### MCP Server

Connect Lago to any AI system via the Model Context Protocol. Query live billing data, manage customers, inspect subscriptions — all through natural language.

**Setup:**

```json
{
  "mcpServers": {
    "lago": {
      "command": "docker",
      "args": ["run", "-i", "--rm",
        "-e", "LAGO_API_KEY",
        "-e", "LAGO_API_URL",
        "getlago/lago-mcp-server"
      ]
    }
  }
}
```

Environment variables:
- `LAGO_API_KEY` — Your Lago API key
- `LAGO_API_URL` — Lago base URL (e.g., `https://api.getlago.com`)

### Billing Assistant (Beta)

AI-powered assistant for automating manual billing operations via natural language within the Lago dashboard.

---

## Integrations

### Accounting

| Integration | Type | Description |
|-------------|------|-------------|
| NetSuite | Native | Real-time billing data sync |
| QuickBooks | n8n | Billing data sync via n8n workflow |
| Xero | Native | Real-time billing data sync |

### CRM

| Integration | Type | Description |
|-------------|------|-------------|
| HubSpot | Native | Real-time billing data sync |
| Salesforce CPQ | Native | Billing data sync |
| Salesforce CRM | Native | Billing data sync |

### Data / ETL

| Integration | Type | Description |
|-------------|------|-------------|
| Airbyte | Community | ELT pipelines |
| Lago Data Pipeline | Native | Sync to data warehouse / cloud storage |
| Polytomic | Community | ETL pipelines |

### Alerting

| Integration | Type | Description |
|-------------|------|-------------|
| n8n | Community | Workflow automation |
| Zapier | Community | Workflow automation |

### Usage Ingestion

| Integration | Type | Description |
|-------------|------|-------------|
| Segment | Native | Send usage data via Segment |
| Hightouch | Native | Sync data from warehouse to Lago |

### Tax

| Integration | Type | Description |
|-------------|------|-------------|
| Anrok | Native | Automated tax calculation |
| Avalara | Native | Automated tax calculation |
| Lago EU Taxes | Native | EU VAT compliance |

### Marketplaces

| Integration | Type | Description |
|-------------|------|-------------|
| AWS Marketplace | Suger.io | Sell through AWS Marketplace |
| Azure Marketplace | Suger.io | Sell through Azure Marketplace |
| GCP Marketplace | Suger.io | Sell through GCP Marketplace |

### Entitlements

| Integration | Type | Description |
|-------------|------|-------------|
| Oso | Community | Authorization + entitlements |

---

## Pricing Templates

Lago provides templates to replicate popular B2B pricing models:

| Template | Model |
|----------|-------|
| Segment | Hybrid (subscription + usage) |
| Algolia | Pay-as-you-go |
| Google BigQuery | Pay-as-you-go with credits |
| Notion | Per-seat |
| Mistral | Per-token |
| OpenAI | Per-token |
| Stripe | Per-transaction |

---

## Security

- **API Keys**: Managed in Developers > API Keys. Regenerate on compromise.
- **SSO**: SAML-based Single Sign-On for team access.
- **RBAC**: Role-Based Access Control for team member permissions.
- **Audit Logs**: Track all actions performed on resources (activity logs) and API requests (API logs).
- **Security Logs**: Track critical security actions (team changes, auth, API keys).
- **SOC 2 Type 2**: Lago Cloud is SOC 2 Type 2 compliant.
