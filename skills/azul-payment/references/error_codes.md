# Azul Payment Response Codes

Azul uses standard ISO8583 response codes and gateway-specific error descriptions.

## Response Fields

- `ResponseCode`: `ISO8583` (Standard) or `ERROR` (Gateway/Validation).
- `IsoCode`: The numeric code (e.g., `00` for success).
- `ResponseMessage`: Human-readable status (e.g., `APROBADA`).
- `ErrorDescription`: Detailed error message when `ResponseCode` is `ERROR`.

## Common ISO Codes

| ISO Code | Message | Action |
|----------|---------|--------|
| `00` | APROBADA | Success. |
| `01` | LLAMAR AL BANCO | Refer to issuer. |
| `03` | CONFIGURACIÓN INVALIDA | Verify Store/Channel ID. |
| `04` | TARJETA CANCELADA | Ask for another card. |
| `05` | DECLINADA | Do not honor. |
| `08` | NO AUTENTICADA | 3DS Authentication failed. |
| `14` | TARJETA INVALIDA | Check card number/expiry. |
| `51` | INSUFICIENCIA DE FONDOS | Ask for another card. |
| `54` | TARJETA VENCIDA | Card expired. |
| `59` | SOSPECHA DE FRAUDE | Do not retry. |
| `91` | EMISOR NO DISPONIBLE | Retry later. |

## Gateway Errors

- `FATAL_ERROR`: System failure, contact Azul.
- `INVALID_AUTH`: Hash Mismatch or invalid `Auth1`/`Auth2`.
- `3DS time frame expired`: Customer took too long to complete challenge.
- `DataVault TokenId does not exist`: Invalid or deleted token.
