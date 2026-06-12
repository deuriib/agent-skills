# Lago Frontend Custom Payment Integration Guide

This reference outlines the frontend directories, components, pages, and chips required to implement the UI for a new Custom Payment Service Provider (PSP).

---

## 1. Directory Structure & File Conventions

All frontend additions follow this directory layout within Lago's React repository:

```
src/
├── pages/
│   └── settings/
│       ├── Integrations.tsx                       # Main integrations page
│       ├── [PSPName]IntegrationDetails.tsx        # Details view for connected PSP
│       └── [PSPName]Integrations.tsx              # Connecting / managing connections
├── components/
│   └── settings/
│       ├── Add[PSPName]Dialog.tsx                 # Form modal to enter API Keys / Secrets
│       └── Delete[PSPName]Dialog.tsx              # Confirmation modal to disconnect
└── public/
    └── images/
        └── [PSPName].svg                          # PSP brand logo in vector format
```

*(Note: Replace `[PSPName]` with the camel-cased name of your payment provider, e.g., `MoneyHash` or `CheckoutCom`).*

---

## 2. Setting Up the Integration UI

### Main Integrations Dashboard (`Integrations.tsx`)
- Add a card/listing for the new PSP.
- Display the connection status (Connected, Disconnected, or Incomplete).
- Include buttons to "Connect" or "Manage" the integration.

### Connection & Edit Dialogs
Create the dialog component (`Add[PSPName]Dialog.tsx`):
- Implement a form containing fields for all required settings and secrets defined in the backend model (e.g., API Key, Sandbox/Production toggles, Client Secrets).
- Trigger the GraphQL mutation (`create[PSPName]Integration` or `update[PSPName]Integration`) upon form submission.
- Implement validation rules on input fields to match backend requirements.

### Integration Details Page (`[PSPName]IntegrationDetails.tsx`)
- Displays connection info (e.g., masked API keys, active webhooks).
- Exposes webhook configurations so the user can easily copy their webhook endpoint URL.
- Provides a link or button to edit credentials or delete the integration.

---

## 3. Customer Linking UI

Lago allows linking a local customer with a customer inside the PSP.

- **Accordion Component**: Update the `PaymentProvidersAccordion` component.
  - Render an option to enable/disable the new payment provider for the customer.
  - Implement input fields to assign the customer's external PSP customer ID, or auto-generation checkboxes.
  - Connect actions to the customer update mutations.

---

## 4. Global UI Updates

Ensure the new provider is integrated across Lago's core UI views:

- **PaymentProviderChip (`src/components/PaymentProviderChip.tsx`)**:
  - Add a mapping for your PSP name.
  - Render the custom label, icon/svg, and appropriate style classes (colors/borders).
- **PaymentDetails (`src/pages/PaymentDetails.tsx`)**:
  - Handle rendering payment-specific responses, metadata, and status checks returned by the new provider.
