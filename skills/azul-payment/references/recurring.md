# Azul Recurring Payments

Manage subscriptions and automatic billing cycles.

## Prerequisites

- Active `DataVault` token for the customer's card.
- Merchant account enabled for recurring transactions.

## Setup Recurring Plan

Recurring logic can be handled in two ways:
1. **Azul Managed**: Azul handles the scheduling (requires specific setup in portal).
2. **Merchant Managed**: Merchant stores the `DataVaultToken` and triggers a `Sale` transaction on every billing date.

### Merchant Managed Example (JSON)

Every month, the merchant backend sends a `Sale` using the token:

```json
{
  "Channel": "EC",
  "Store": "9999999999",
  "DataVaultToken": "SUB-TOKEN-888",
  "TrxType": "Sale",
  "Amount": "2999",
  "CustomOrderId": "MONTHLY-SUBSCRIPTION-MAY"
}
```

## Considerations

- **Retry Logic**: Implement exponential backoff for soft declines (e.g., code `91`).
- **Token Expiry**: Monitor responses for `DataVault TokenId is expired` and prompt user to re-card.
