# Bridge-xyz Full Asset & Rail Mapping

This document contains the complete set of 1200+ supported payment routes as of May 2026.

## 🏦 Supported Fiat Rails
- **ACH**: USD (USA)
- **Wire**: USD (International)
- **SEPA**: EUR (Europe)
- **SPEI**: MXN (Mexico)
- **Pix**: BRL (Brazil)
- **Faster Payments**: GBP (UK)
- **Bre-B & Bank Transfer**: COP (Colombia) - BETA

---

## 🪙 Complete Route Matrix (Summary by Asset)

### 💵 USD / Stablecoins (USDC, USDT, PYUSD, DAI, USDB, USDG, USDP)
| Source Rail/Chain | Supported Destination Chains | Min Transfer |
|-------------------|-----------------------------|--------------|
| **ACH (USD)** | Aptos, Arbitrum, Avalanche, Base, Celo, Ethereum, HyperEVM, Optimism, Plasma, Polygon, Solana, Stellar, Sui, Tempo, Tron, World Chain | 1 USD (20 for USDT/DAI) |
| **Wire (USD)** | Same as ACH | 1 USD (20 for USDT/DAI) |
| **Ethereum** | Aptos, Arbitrum, Avalanche, Base, Celo, Ethereum, HyperEVM, Optimism, Polygon, Solana, Stellar, Sui, Tempo, Tron | Variable (1-20 USDC/USDT) |
| **Polygon** | Same as Ethereum | 1 USDC / 5 USDT |
| **Solana** | Same as Ethereum + CASH, EURC, USDSUI | 1 USDC / 20 USDT |
| **Base** | Same as Ethereum | 1 USDC / 5 USDT |
| **Arbitrum** | Same as Ethereum | 1 USDC / 5 USDT |

### 💶 EUR / EURC
| Source Rail/Chain | Supported Destination Chains | Min Transfer |
|-------------------|-----------------------------|--------------|
| **SEPA (EUR)** | Arbitrum, Avalanche, Base, Celo, Ethereum, Optimism, Polygon, Solana, Stellar, Tempo | 1 EUR |
| **Ethereum (EURC)** | Base, Ethereum, Solana, Stellar | 1 EURC |
| **Solana (EURC)** | Base, Ethereum, Solana, Stellar, SEPA (EUR), Wire (USD), ACH (USD) | 1 EURC |
| **Stellar (EURC)** | Base, Ethereum, Solana, Stellar, SEPA (EUR) | 1 EURC |

### 🌮 MXN (SPEI)
| Source Rail/Chain | Supported Destination Chains | Min Transfer |
|-------------------|-----------------------------|--------------|
| **SPEI (MXN)** | Arbitrum, Avalanche, Base, Ethereum, Optimism, Polygon, Solana, Stellar, Tron | 50 MXN |
| **Solana (USDC)** | SPEI (MXN) | 2 USDC |

### 🇧🇷 BRL (Pix)
| Source Rail/Chain | Supported Destination Chains | Min Transfer |
|-------------------|-----------------------------|--------------|
| **Pix (BRL)** | Arbitrum, Avalanche, Base, Ethereum, Optimism, Polygon, Solana, Stellar, Tron | 10 BRL |
| **Solana (USDC)** | Pix (BRL) | 2 USDC |

---

## ⛓️ Full Blockchain List
- **Mainnets**: Ethereum, Polygon, Solana, Base, Arbitrum, Avalanche, Stellar, Sui, Tron, Optimism, World Chain, Aptos, Celo.
- **Testnets (Sandbox)**: Sepolia (Ethereum), Amoy (Polygon), Solana Devnet/Testnet.

## ⚠️ Important Integration Notes
1. **Minimums**: Most ACH/Wire transfers have a **1 USD** minimum for USDC, but a **20 USD** minimum for USDT and DAI due to gas costs.
2. **COP (Beta)**: Transfers in Colombian Pesos are in Beta and currently have limited destination options (Solana, Polygon, Ethereum).
3. **EEA Restrictions**: USDT and Bridge-issued stablecoins (USDB/USDG) are **NOT** supported for users in the European Economic Area (EEA).
4. **Liquidation**: To offramp automatically, use a **Liquidation Address** pointed to a supported fiat external account.

*For the full row-by-row mapping of all 1211 routes, refer to the Bridge API Route Explorer in the live documentation.*
