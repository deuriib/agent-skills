# Lago Webhook Handling for Custom Payments Guide

Webhooks are critical to updating payment statuses (such as invoice payment successes, charge failures, or chargebacks) in near real-time. This guide details how to configure routes, controllers, and services in Lago.

---

## 1. Webhook Endpoint Generation

The webhook URL exposed to the merchant usually follows a pattern with their Lago organization ID and a secure verification code:

```ruby
URI.join(
  ENV["LAGO_API_URL"],
  "webhooks/[psp_name]/#{organization_id}?code=#{URI.encode_www_form_component(payment_provider.code)}"
)
```

---

## 2. Routes & Controllers Registration

### Routing Configuration
Register the webhook path in `config/routes.rb`:

```ruby
post 'webhooks/[psp_name]/:organization_id', to: 'webhooks#[psp_name]'
```

### Controller Action
Expose the endpoint in `app/controllers/webhooks_controller.rb`:
- Fetch the payload and pass it to the webhook validation and processing pipeline.

```ruby
def [psp_name]
  organization = Organization.find(params[:organization_id])
  provider = organization.payment_providers.find_by!(code: params[:code], type: 'PaymentProviders::[PspClassName]Provider')

  # Enqueue webhook payload processing
  IncomingWebhook.create!(
    payment_provider: provider,
    payload: params.permit!.to_h,
    status: :pending
  )

  head :ok
end
```

---

## 3. Validation & Parsing Services

Implement validation services to protect your webhook endpoint from spoofing or unauthorized payload manipulation:

- **Validation Service (`app/services/payment_providers/[psp_name]/validate_incoming_webhook_service.rb`)**:
  - Validates webhook signatures using the `webhook_secret` or webhook signing keys.
- **Handling Service (`app/services/payment_providers/[psp_name]/handle_incoming_webhook_service.rb`)**:
  - Matches the incoming webhook type (e.g., `payment.succeeded`, `charge.failed`) with Lago models.
  - Maps external payment statuses back to Lago statuses.
- **Event Job (`app/jobs/payment_providers/[psp_name]/handle_event_job.rb`)**:
  - Asynchronously processes the parsed payment status changes to avoid blocking webhook delivery.
- **Inbound Webhook Register**:
  - Register the validator and handler in the global webhook router: `app/services/inbound_webhooks/process_service.rb` and `app/services/inbound_webhooks/validate_payload_service.rb`.
