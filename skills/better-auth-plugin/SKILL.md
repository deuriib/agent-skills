---
name: better-auth-plugin
description: "Trigger: Better Auth plugin, create plugin, server plugin, client plugin, auth hooks, schema extension. Create and integrate Better Auth plugins for authentication extensions."
license: Apache-2.0
metadata:
  author: deuriib
  version: "1.0"
---

# Skill: better-auth-plugin

## Activation Contract

Use this skill when:

- Creating a new Better Auth server or client plugin.
- Extending Better Auth's `user` model with custom fields (schema).
- Adding authorization logic via hooks (before/after matchers).
- Building a client plugin that infers server-side types.
- Integrating a custom plugin into the Better Auth configuration.

## Hard Rules

- **Server first**: Always implement the server plugin before the client plugin. The server plugin defines schema, hooks, and middleware; the client plugin only provides typed frontend APIs.
- **Schema on `user` model**: Custom fields must be declared under `schema.user.fields`. Supported types: `string`, `number`, `boolean`, `date`.
- **Hooks matcher**: Use `context.path.startsWith(...)` to target specific auth endpoints in `before`/`after` hooks.
- **APIError for validation**: Throw `new APIError("BAD_REQUEST", { message: "..." })` inside hook handlers to reject requests with validation errors.
- **Client plugin infers server types**: The client plugin must use `$InferServerPlugin` with `ReturnType<typeof serverPlugin>` to propagate schema types to the frontend.

## Decision Gates

| Need | Action |
|------|--------|
| Add custom fields to user model | Define `schema.user.fields` with field name, type, required, unique |
| Validate/transform on signup | Add `hooks.before` with matcher on `/sign-up/email` |
| Run logic after signup | Add `hooks.after` with matcher on `/sign-up/email` |
| Extend client with typed methods | Create client plugin with `$InferServerPlugin` |

## Execution Steps

1. **Plan plugin scope**: Identify what data or behavior the plugin adds (e.g., birthday tracking, TOS acceptance, custom profile fields).

2. **Create server plugin**:

   ```ts
   import type { BetterAuthPlugin } from "better-auth";

   export const myPlugin = () =>
     ({
       id: "myPlugin",
     } satisfies BetterAuthPlugin);
   ```

3. **Define schema** (if adding fields):

   ```ts
   schema: {
     user: {
       fields: {
         myField: {
           type: "string",    // string | number | boolean | date
           required: false,   // required on new records
           unique: false,     // unique constraint
         },
       },
     },
   },
   ```

4. **Add authorization hooks** (if needed):

   ```ts
   import { createAuthMiddleware, APIError } from "better-auth/api";

   hooks: {
     before: [
       {
         matcher: (context) => context.path.startsWith("/sign-up/email"),
         handler: createAuthMiddleware(async (ctx) => {
           const { myField } = ctx.body;
           // validate and throw APIError if invalid
           // return { context: ctx } to continue
         }),
       },
     ],
   },
   ```

5. **Create client plugin** (`client.ts`):

   ```ts
   import type { BetterAuthClientPlugin } from "better-auth/client";
   import type { myPlugin } from "./index";

   type MyPlugin = typeof myPlugin;

   export const myClientPlugin = () =>
     ({
       id: "myPlugin",
       $InferServerPlugin: {} as ReturnType<MyPlugin>,
     } satisfies BetterAuthClientPlugin);
   ```

6. **Initiate plugin**:

   - **Server**: Import `myPlugin` and add to `betterAuth({ plugins: [...] })`.
   - **Client**: Import `myClientPlugin` and add to `createAuthClient({ plugins: [...] })`.
   - **Database**: Run `npx auth@latest generate` to sync schema changes, or manually add fields to the user table.

## Output Contract

- Server plugin exports a function returning a `BetterAuthPlugin`-compatible object with `id`, optional `schema`, and optional `hooks`.
- Client plugin exports a function returning a `BetterAuthClientPlugin`-compatible object with `id` and `$InferServerPlugin`.
- Both plugins are registered in their respective `betterAuth()` and `createAuthClient()` configs.
- Database schema is updated to match plugin field definitions.

## References

- [Better Auth Plugin Concepts](references/docs.md) — Server plugins, client plugins, hooks, and schema reference.
