# Bridge-xyz Implementation Examples

## 1. Creating a Customer with Idempotency
```typescript
const createCustomer = async (userData: any) => {
  const response = await fetch('https://api.bridge.xyz/v0/customers', {
    method: 'POST',
    headers: {
      'Api-Key': process.env.BRIDGE_API_KEY,
      'Idempotency-Key': `cust_${userData.external_id}`, // Unique identifier from your DB
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'individual',
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email
    })
  });
  return response.json();
};
```

## 2. Initiating a Transfer (Fiat to Crypto)
```typescript
const initiateTransfer = async (amount: string, customerId: string, bankId: string, walletAddress: string) => {
  const response = await fetch('https://api.bridge.xyz/v0/transfers', {
    method: 'POST',
    headers: {
      'Api-Key': process.env.BRIDGE_API_KEY,
      'Idempotency-Key': `tx_${Date.now()}`, 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount: amount,
      currency: 'usd',
      source: {
        payment_method: 'external_account',
        external_account_id: bankId,
        customer_id: customerId
      },
      destination: {
        payment_method: 'crypto_address',
        delivery_method: 'usdc',
        currency: 'usd',
        address: walletAddress,
        chain: 'polygon'
      }
    })
  });
  return response.json();
};
```

## 3. Webhook Signature Verification
```javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return expectedSignature === signature;
}
```
