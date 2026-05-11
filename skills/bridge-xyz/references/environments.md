# Bridge-xyz Environments

## 🌐 Environment Links & Base URLs

| Environment | Base URL | Dashboard |
|-------------|----------|-----------|
| **Sandbox** | `https://api.sandbox.bridge.xyz/v0` | [Sandbox Dashboard](https://dashboard.bridge.xyz/) (Switch to Sandbox) |
| **Production** | `https://api.bridge.xyz/v0` | [Production Dashboard](https://dashboard.bridge.xyz/) |

---

## 🏗️ Core Differences

### 1. API Keys & Authentication
- **Sandbox**: Keys are generated separately in the Sandbox section of the dashboard. They usually start with a different prefix (e.g., `sk_sandbox_...`).
- **Production**: Requires full KYB approval of your business before production keys are activated.

### 2. KYC/KYB Simulation (Sandbox Only)
- In Sandbox, you don't need real documents.
- Use the **Simulation Endpoint**: `POST /v0/customers/{customer_id}/sandbox/simulate_kyc_approval` to instantly move a customer to `approved` status.
- Production requires real verification by the Bridge compliance team or automated providers.

### 3. Money Movement
- **Sandbox**: Transfers are simulated. You can use specific amounts to trigger different failure scenarios (e.g., insufficient funds).
- **Production**: Transfers involve real fiat (ACH/Wire) and real on-chain stablecoins.

### 4. Webhooks
- **Sandbox**: You must configure separate webhook URLs for Sandbox events.
- **Production**: Events are triggered by real financial activity.

### 5. Supported Blockchains
- **Sandbox**: Connects to testnets (e.g., Polygon Amoy, Ethereum Sepolia).
- **Production**: Connects to mainnets (Polygon, Ethereum, Solana, Base, etc.).

## 🚫 Production-Only Features (Not in Sandbox)

While Sandbox is extensive, the following features are strictly Production-only or have significant limitations:

1. **Real Money Settlement**: Sandbox does NOT move real fiat (USD, EUR, etc.) or real mainnet stablecoins. All financial outcomes are simulated.
2. **Physical Card Issuing**: While you can simulate virtual card creation, the physical manufacturing and shipping of cards are Production-only.
3. **Mainnet On-chain Activity**: Sandbox transactions occur on testnets (Amoy, Sepolia). You cannot interact with mainnet liquidity or addresses.
4. **Live Banking Rails**: Real connections to FedWire, ACH, or SEPA networks are simulated. You cannot "push" real funds from a Sandbox virtual account to a real bank.
5. **KYB for Businesses**: Full KYB (Know Your Business) verification is a manual, human-reviewed process in Production. Sandbox uses simple simulation endpoints to "approve" businesses.
6. **Legacy Card API**: The deprecated Bridge Cards API may have limited support or inconsistencies in Sandbox compared to the newer Stripe Issuing integration.
7. **Production API Keys**: Production keys are only issued after compliance approval and are not interchangeable with Sandbox keys.

---

## 💡 Recommendations
- **Prefix your keys**: Use environment variables like `BRIDGE_API_URL` and `BRIDGE_API_KEY` to easily toggle between environments.
- **Automated Testing**: Use the Simulation Endpoints in your CI/CD pipeline to test full money-movement flows without manual intervention.
