# Azul Payment Authentication

All requests to the Azul API must be authenticated using custom HTTP headers.

## Authentication Headers

| Header | Value | Description |
|--------|-------|-------------|
| `Auth1` | `ChannelID` | Provided by Azul (e.g., `EC` for E-commerce). |
| `Auth2` | `AuthToken` | The secret API key/token provided by Azul. |

## Credential Types

### Channel
Identifies the type of integration.
- `EC`: E-Commerce
- `MO`: MOTO (Mail Order / Telephone Order)

### Store
Identifies the specific merchant store.
- Testing Store: `9999999999` (Commonly used in development).

## Security Best Practices

- Never store `Auth2` (AuthToken) in client-side code (frontend).
- Always proxy requests through a secure backend server.
- Ensure all communications are performed over HTTPS.
