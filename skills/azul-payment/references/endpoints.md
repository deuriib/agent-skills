# Azul Payment Endpoints

Azul provides separate environments for integration testing and production.

## Environment URLs

| Environment | Base URL (JSON) |
|-------------|----------------|
| **Testing** | `https://pruebas.azul.com.do/webservices/JSON/Default.asmx` |
| **Production** | `https://pagos.azul.com.do/webservices/JSON/Default.asmx` |
| **Contingency** | `https://contpagos.azul.com.do/webservices/JSON/Default.asmx` |

## Timeout Recommendations

It is highly recommended to set a timeout of **120 seconds** for all requests to the Azul API to account for issuer response times and network latency.

```javascript
// Example fetch timeout in Node.js
const response = await fetch(url, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(payload),
  signal: AbortSignal.timeout(120000) // 120 seconds
});
```
