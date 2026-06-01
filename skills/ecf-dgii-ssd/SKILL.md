---
name: ecf-dgii-ssd
description: "Trigger: ECF DGII, SSD, República Dominicana, facturación electrónica, comprobantes fiscales, ECF, SDK, e-CF. Expert guidance for integrating Dominican Republic electronic invoicing using ECF SSD SDKs (.NET, TypeScript, React, Python, Java, Kotlin, iOS, C++)."
license: MIT
metadata:
  author: SSD-Smart-Software-Development-SRL
  version: "1.0"
---

# Skill: ecf-dgii-ssd

## Activation Contract

Use this skill when:
- The user or agent needs to integrate Electronic Invoicing (Facturación Electrónica e-CF) for the Dominican Republic (DGII).
- The user mentions ECF SSD, DGII SDKs, or e-CF integration in any supported language (.NET, TypeScript, React, Python, Java, Kotlin, iOS, C++).
- Implementing solutions for e-CF generation, signing, token authentication, and DGII communication using SSD's services.

## Overview

[ECF SSD](https://ecf.ssd.com.do) is a platform that simplifies the emission of electronic tax receipts (e-CF) in the Dominican Republic. Instead of implementing XML signing, DGII seed authentication, certificate management, retries, and storage manually, ECF SSD handles it. The user only needs to send the receipt data in JSON format through one of the SDKs.

## Hard Rules

- **DO NOT** attempt to manually build XML signing logic, seed authentication, or raw DGII token requests. The SDKs handle this automatically.
- **ALWAYS** use the high-level `sendEcf` (or `SendEcfAsync`, `send_ecf`) method provided by the SDKs to send an e-CF. This method encapsulates routing, sending, and polling with exponential backoff until the DGII responds with a final status.
- **NEVER** expose the backend API key (JWT) in a frontend application. Use the backend SDK to generate a read-only, RNC-scoped API key for the frontend to use.
- Use the correct environment for the task: `test` (Internal testing), `cert` (DGII certification), or `prod` (Production).

## Available SDKs and Documentation

References for each SDK are available in the local `references/` directory:

- **Main Repository Info**: `references/main-README.md`
- **.NET**: `references/net-README.md` (`dotnet add package SSDDO.ECF_DGII.SDK`)
- **TypeScript / Node.js**: `references/typescript-README.md` (`npm install @ssddo/ecf-sdk`)
- **React**: `references/react-README.md` (`npm install @ssddo/ecf-react`)
- **Python**: `references/python-README.md` (`pip install ecf-dgii`)
- **Java**: `references/java-README.md` (`implementation 'do.com.ssd.ecfx:ecf-dgii-sdk-java:1.0.0'`)
- **Kotlin**: `references/kotlin-README.md` (`implementation("do.com.ssd.ecfx:ecf-dgii-sdk-kotlin:1.0.0")`)
- **iOS / Swift**: `references/ios-README.md`
- **C++**: `references/cpp-README.md`

## Architecture Pattern (Backend / Frontend)

When building full-stack applications with ECF SSD, follow this architecture:

1. **Backend**: Validates business logic, converts the internal invoice to the ECF JSON format, and sends it to the ECF SSD API using the backend API Key. It receives a `messageId` and returns it immediately to the client without waiting for DGII.
2. **Frontend Polling**: The frontend uses a read-only token to directly poll the ECF SSD API for the status of the invoice until it reaches `Finished`. This offloads the polling workload from your backend.
3. **Read-Only Tokens**: The backend must expose an endpoint (e.g., `GET /ecf-token`) that calls `createApiKey({ rnc: tenant.rnc })` to return a restricted, short-lived API key to the frontend.

## QR Code and Printing Requirements

When an e-CF is successfully processed (`Finished`), the DGII requires printed receipts to contain a QR Code, a Security Code, and the Signature Date. The SDK response provides these:
- `ImpresionUrl` / `impresionUrl` / `impresion_url`: The exact URL that must be encoded into the QR code.
- `CodSec` / `codSec` / `cod_sec`: The security code to print.
- `FechaFirma` / `fechaFirma` / `fecha_firma`: The digital signature date to print.

## Common Operations

- **Sending an e-CF**: Construct the `ECF` object (Encabezado, DetallesItems, etc.) and pass it to `sendEcf`. The SDK automatically maps it to the correct endpoint (e.g., `/ecf/31` for Factura de Crédito Fiscal Electrónica) based on the `TipoeCF` field.
- **Handling responses**: Wait for the `EcfResponse` object. Check the `progress` field (`Queued`, `Sending`, `Polling`, `Finished`, `Error`). If finished, proceed to generate QR and print.

## Execution Steps

1. Identify the user's target language/framework.
2. Review the specific `references/<language>-README.md` to get the exact syntax, package names, and setup instructions.
3. Construct the code snippet implementing the correct architectural pattern.
4. Ensure the API keys are injected via environment variables (e.g., `ECF_API_KEY`) or constructor parameters.
5. Provide clear instructions on how to start the certification or production processes, referencing the main documentation.
