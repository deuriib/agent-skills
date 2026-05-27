# Azul 3D Secure 2.0 (3DS)

Azul supports 3D Secure 2.0 to provide frictionless authentication and liability shift for e-commerce transactions.

## 3DS Workflow

### 1. Initial Request
Send the `Sale` or `Hold` request. Azul evaluates if 3DS is required based on merchant configuration and risk.

### 2. Authentication Paths

#### Frictionless Path
If the transaction is low risk, it is approved immediately (`IsoCode: 00`) without customer interaction.

#### Challenge Path
If authentication is required, Azul returns a response indicating a redirect is needed.

- **Status Code**: `3D`
- **ResponseMessage**: `3D_SECURE_CHALLENGE`

### 3. Handling the Challenge

1. **Redirect**: The merchant must redirect the customer to the URL provided (or follow the specific 3DS 2.0 component integration).
2. **Callback**: Once authenticated, Azul calls the merchant's `ECommerceUrl` with the result.

## Force No 3DS
In specific cases (like MOTO or recurring), you can bypass 3DS by sending `ForceNo3DS: "1"`.

*Warning: Bypassing 3DS removes the liability shift and increases chargeback risk.*
