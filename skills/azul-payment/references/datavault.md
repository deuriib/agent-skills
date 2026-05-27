# Azul DataVault (Tokenization)

DataVault allows merchants to securely store customer card information for future use without storing sensitive card data in their own servers.

## Tokenization Workflow

### 1. Create Token (Save to DataVault)

To tokenize a card during a transaction, set `SaveToDataVault: "1"`.

```json
{
  "TrxType": "Sale",
  "Amount": "10000",
  "CardNumber": "459413XXXXXXXXXX",
  "SaveToDataVault": "1",
  ...
}
```

The response will include the `DataVaultToken`.

### 2. Transaction with Token

Use the `DataVaultToken` instead of card details for subsequent payments.

```json
{
  "Channel": "EC",
  "Store": "9999999999",
  "DataVaultToken": "TOKEN-XYZ-123",
  "TrxType": "Sale",
  "Amount": "5000"
}
```

## Benefits
- Reduces PCI-DSS compliance scope.
- Enables "One-Click Pay" experiences.
- Required for Recurring Billing plans.
