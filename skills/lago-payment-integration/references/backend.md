# Lago Backend Custom Payment Integration Guide

This reference outlines the required backend models, GraphQL inputs, jobs, services, and factories to integrate a new Custom Payment Service Provider (PSP) in Lago.

---

## 1. Models & Database Setup

To store integration and customer details, you need to set up the database tables and models:

### Payment Provider Model
Create `app/models/payment_providers/[psp_name]_provider.rb`:
- Must inherit from `BaseProvider`.
- Use `secrets_accessors` for sensitive credentials (e.g., API keys, client secrets).
- Use `settings_accessors` for public configuration parameters.
- Provide a `payment_type` method returning a string identifier.
- Map external status values to Lago's standard statuses: `processing`, `success`, and `failed`.

```ruby
module PaymentProviders
  class CustomPspProvider < BaseProvider
    PROCESSING_STATUSES = %w[pending authorized].freeze
    SUCCESS_STATUSES = %w[captured succeeded].freeze
    FAILED_STATUSES = %w[failed expired voided].freeze

    secrets_accessors :api_key
    settings_accessors :webhook_secret

    validates :api_key, presence: true

    def payment_type
      "custom_psp"
    end
  end
end
```

### Payment Provider Customer Model
Create `app/models/payment_provider_customers/[psp_name]_customer.rb`:
- Must inherit from `BaseCustomer`.
- Stores the mapping between the Lago Customer and the external PSP customer ID.

### Core Registrations
- **Customer Model**: Register the new provider in the `PAYMENT_PROVIDERS` enum in `app/models/customer.rb`.
- **Organization Model**: Define the `has_many` relationship to your provider model in `app/models/organization.rb`.
- **Customer Serializer**: Include the provider customer details in `app/serializers/v1/customer_serializer.rb`.

---

## 2. GraphQL Input Types & Mutations

Lago uses GraphQL for front-to-back communication. You must expose the CRUD mutations for the new integration.

- **Types**:
  - `app/graphql/types/payment_providers/[psp_name]_input.rb`: Defines the input arguments for the creation and update mutations.
  - `app/graphql/types/payment_providers/[psp_name].rb`: Exposes the provider fields to the frontend.
- **Mutations**:
  - Create the base, create, and update mutations in `app/graphql/mutations/payment_providers/[psp_name]/`.
- **Registrations**:
  - `resolvers/payment_providers_resolver.rb`: Register the new type in the `provider_type` helper.
  - `app/graphql/types/customers/object.rb`: Register in `provider_customer`.
  - `app/graphql/types/payment_providers/object.rb`: Add logic to `resolve_type`.
  - `app/graphql/types/mutation_type.rb`: Expose create and update mutations.

---

## 3. Customer Handling & Synchronization

When a Lago customer is linked to the new PSP, Lago syncs or creates the customer record in the PSP.

- **Services**:
  - Create the customer integration service: `app/services/payment_provider_customers/[psp_name]_service.rb`
  - Create the customer creation service under the provider namespace: `app/services/payment_providers/[psp_name]/customers/create_service.rb`
- **Jobs**:
  - Create `app/jobs/payment_provider_customers/[psp_name]_create_job.rb` to handle creation asynchronously.
- **Factories**:
  - Register your creation logic in `app/services/payment_providers/create_customer_factory.rb`.
  - Register in `app/services/payment_provider_customers/factory.rb`.

---

## 4. Invoices & Payment Processing

Lago triggers payment collection when invoices are finalized.

- **Services**:
  - Create `app/services/invoices/payments/[psp_name]_service.rb` (orchestrates payment intent creation).
  - Create `app/services/payment_providers/[psp_name]/payments/create_service.rb` (calls the PSP API).
- **Jobs**:
  - Create `app/jobs/invoices/payments/[psp_name]_create_job.rb` to run payment tasks in the background.
- **Factories**:
  - Register in `app/services/payment_providers/create_payment_factory.rb`.
  - Register in `app/services/invoices/payments/payment_providers/factory.rb`.

---

## 5. Payment Requests

If using payment requests (one-off or upfront payments):
- Create `app/jobs/payment_requests/payments/[psp_name]_create_job.rb`.
- Create `app/services/payment_requests/payments/[psp_name]_service.rb`.
- Register your PSP in `app/services/payment_requests/payments/payment_providers/factory.rb`.

---

## 6. Checkout URL (Optional)

If the PSP requires redirecting the customer to a hosted checkout portal:
- Create `app/jobs/payment_provider_customers/[psp_name]_checkout_url_job.rb` to retrieve and store the redirect checkout URL.
