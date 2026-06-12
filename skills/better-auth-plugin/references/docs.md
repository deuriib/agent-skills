# Better Auth Plugin Reference

## Architecture

Better Auth plugins follow a **server-client pair** pattern:

- **Server plugin**: Defines schema extensions, hooks (before/after), and middleware. Lives server-side.
- **Client plugin**: Provides typed frontend APIs that infer the server plugin's schema types.

## Plugin Structure

```
my-plugin/
├── index.ts    # Server plugin definition
└── client.ts   # Client plugin definition
```

## Server Plugin API

### `id` (required)
Unique identifier string for the plugin.

### `schema` (optional)
Extend the `user` model with custom fields.

```ts
schema: {
  user: {
    fields: {
      fieldName: {
        type: "string" | "number" | "boolean" | "date",
        required: boolean,   // default: false
        unique: boolean,     // default: false
      },
    },
  },
}
```

### `hooks` (optional)
Intercept auth actions `before` or `after` they execute.

- **`matcher`**: Function receiving `context` with `path`. Return `true` to trigger the handler.
- **`handler`**: `createAuthMiddleware` callback receiving `ctx` with `body`, `headers`, `query`, etc.

### Error Handling

Use `APIError` from `better-auth/api`:

```ts
throw new APIError("BAD_REQUEST", { message: "Description" });
throw new APIError("UNAUTHORIZED", { message: "Not allowed" });
```

## Client Plugin API

```ts
import type { BetterAuthClientPlugin } from "better-auth/client";

export const myClientPlugin = () => ({
  id: "myPlugin",
  $InferServerPlugin: {} as ReturnType<typeof serverPlugin>,
} satisfies BetterAuthClientPlugin);
```

## CLI Commands

```bash
npx auth@latest generate   # Generate DB schemas from plugin definitions
```

## Important Types

| Import Path | Type |
|-------------|------|
| `better-auth` | `BetterAuthPlugin` |
| `better-auth/client` | `BetterAuthClientPlugin` |
| `better-auth/api` | `createAuthMiddleware`, `APIError` |
