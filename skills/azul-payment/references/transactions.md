# Azul Payment Transactions

Core transaction types for processing payments, refunds, and cancellations.

## Sale (Venta)

Charges a customer's card immediately.

### Request Body (JSON)

```json
{
  "Channel": "EC",
  "Store": "9999999999",
  "CardNumber": "459413XXXXXXXXXX",
  "Expiration": "202512",
  "CVC": "999",
  "PosInputMode": "E-Commerce",
  "TrxType": "Sale",
  "Amount": "10000",
  "Itbis": "1800",
  "OrderNumber": "ORDER-12345",
  "CustomOrderId": "CID-98765"
}
```

*Note: `Amount` and `Itbis` are sent in cents (e.g., `10000` = $100.00).*

### Success Response

```json
{
  "AuthorizationCode": "OK5920",
  "AzulOrderId": "44247590",
  "DateTime": "20230613155851",
  "IsoCode": "00",
  "ResponseMessage": "APROBADA",
  "ResponseCode": "ISO8583",
  "Ticket": "1"
}
```

## Refund (Devolución)

Returns funds to a cardholder after a transaction has been settled.

- **Requirement**: Must reference a previously successful `AzulOrderId` or use the original transaction data.
- **Constraints**: Amount cannot exceed the original transaction amount.

## Void (Anulación)

Cancels a transaction before it is settled (typically within a 20-minute window).

- **Requirement**: Use `TrxType: Void`.
- **Constraint**: Only valid if the lot has not been closed.

## Hold & Post (Pre-Autorización)

- **Hold**: Reserves funds without charging (TrxType: `Hold`).
- **Post**: Completes the charge (TrxType: `Post`).
- **Constraint**: `Post` amount cannot exceed 115% of the original `Hold` amount.
