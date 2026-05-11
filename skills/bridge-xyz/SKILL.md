---
name: bridge-xyz
description: "Trigger: Bridge API, stablecoin payments, /bridge-xyz, transfer funds, customer onboarding. Integrate Bridge-xyz APIs for stablecoin money movement."
license: Apache-2.0
metadata:
  author: deuriib
  version: "1.0"
---

# Skill: bridge-xyz

## Activation Contract

Use this skill when:

- Integrating Bridge-xyz APIs for stablecoin payments.
- Onboarding customers (KYC/KYB) via Bridge.
- Orchestrating transfers between fiat rails and crypto addresses.
- Managing virtual accounts or custodial wallets.

## Hard Rules

- **Idempotency**: ALWAYS use the `Idempotency-Key` header for write operations (transfers, customer creation).
- **Environment**: Default to `https://api.bridge.xyz/v0` for production and check for sandbox specific endpoints/flags during testing.
- **KYC/TOS**: Ensure `tos_acceptance` is handled before attempting to move funds for a customer.
- **Liquidation**: Use Liquidation Addresses for automatic offramping from crypto to fiat.

## Environments & Base URLs

| Environment    | Base URL                            | Note                          |
| -------------- | ----------------------------------- | ----------------------------- |
| **Sandbox**    | `https://api.sandbox.bridge.xyz/v0` | Use for testing & simulation. |
| **Production** | `https://api.bridge.xyz/v0`         | Requires KYB approval.        |

## Supported Assets & Rails

- **Currencies**: USD, EUR, MXN, BRL, GBP, COP (Beta).
- **Stablecoins**: USDC, USDT, PYUSD, USDB, USDG, EURC, DAI.
- **Networks**: Ethereum, Polygon, Solana, Base, Arbitrum, Avalanche, Stellar, Sui, Tron.
  _For a detailed mapping, see `references/assets-and-rails.md`._

## Recommendations & Best Practices

- **Sandbox Testing**: Use the **Simulation Endpoints** (like `/sandbox/simulate_kyc_approval`) to skip manual document verification during development.
- **Idempotency Strategy**: Store your `Idempotency-Key` alongside your local transaction record. If a request times out, retry with the SAME key.
- **Webhook Reliability**: Implement a queue for incoming webhooks. Bridge retries webhook delivery, so your endpoint must be able to handle duplicate events (idempotency in consumption).
- **Compliance First**: Always check the `requirements` field in the Customer object. If it's not empty, the customer cannot move funds.

## DO's and DONT's

### ✅ DO

- **DO** verify webhook signatures using the `Bridge-Signature` header.
- **DO** use Liquidation Addresses for high-volume offramping to reduce API overhead.
- **DO** handle the `awaiting_funds` state in transfers; it's a normal part of the fiat-to-crypto flow.
- **DO** cache exchange rates only for short periods (30s max) as they update frequently.

### ❌ DON'T

- **DON'T** hardcode API keys; use environment variables.
- **DON'T** attempt a transfer for a customer whose `tos_acceptance` is not `approved`.
- **DON'T** use a single `Idempotency-Key` for different logical operations.
- **DON'T** poll the `/transfers` endpoint excessively; use Webhooks for status updates.

## Decision Gates

| Feature             | Tool / Endpoint          | Note                                                      |
| ------------------- | ------------------------ | --------------------------------------------------------- |
| Customer Onboarding | `/customers` + KYC Links | Use `retrieve_a_hosted_kyc_link` for easiest integration. |
| Fiat -> Crypto      | `/transfers`             | Requires an `external_account_id` (bank) as source.       |
| Crypto -> Fiat      | `/liquidation_addresses` | Best for automated flows.                                 |
| Hold Balance        | `/bridge_wallets`        | Bridge-custodied wallets.                                 |

## Execution Steps

1. **Onboard**: Create a Customer and obtain TOS/KYC acceptance.
2. **Link**: Add an External Account (Bank/Card) or generate a Virtual Account.
3. **Move**: Initiate a Transfer using the appropriate source and destination IDs.
4. **Monitor**: Configure Webhooks to track `transfer.status_changed` events.

## Output Contract

- Implementation uses Bridge-xyz standard naming conventions.
- Error handling includes Bridge-specific error codes.
- Webhook signature verification is implemented for security.

## References

- `references/api-map.md` — Detailed mapping of all documentation links.
- `assets/examples.md` — Implementation code snippets (Auth, Transfers, Webhooks).
- `https://apidocs.bridge.xyz/llms.txt` — External full documentation index.
