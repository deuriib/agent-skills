---
name: writing-harness-plugins
description: Use when building, porting, or debugging a plugin or extension for an AI coding agent harness (OpenCode, Pi, Antigravity, Claude Code, Codex, DeepSeek Harness) — before writing adapter code, when a plugin loads in one harness but not another, or when one capability must ship across multiple harnesses.
license: MIT
---

# Writing Harness Plugins

Building a harness plugin IS portability engineering. Every harness exposes a
different extension model: OpenCode V2 is an imperative in-process API, Pi is a
factory-function event API, Antigravity is a declarative bundle with shell
hooks. The mistake that kills projects is writing the logic three times. The
fix is **one portable core, three thin adapters**.

Core principle: **If you cannot describe the capability without naming a
harness API, you do not yet know what the plugin does.**

## When to build a plugin

Build a plugin when the capability needs to run **inside** the agent loop:
observe streaming tokens, block a tool call before it executes, inject context
before an LLM call, or register a tool the model can call.

Do not build a plugin when:

- The capability is a reusable procedure the model should read → write a
  **skill** (`SKILL.md`) instead.
- The capability is a static constraint or style guideline → write a **rule**
  file instead.
- The capability is a tool that talks to an external service over a protocol →
  expose it via **MCP**, which all three harnesses consume natively.
- A shell alias or git hook would do the job.

See `references/capability-mapping.md` for the decision matrix.

## The four questions before writing code

Answer these in writing before opening an editor. If any answer is "I'll figure
it out," stop.

1. **What is the capability, in one sentence, with no harness names?**
   Example: "Block a tool call whose arguments match a user-defined regex."
2. **Which lifecycle point does it attach to?**
   Pre-tool, post-tool, pre-LLM, stream-delta, session-start, or shutdown.
3. **Does it need to mutate, block, or only observe?**
   Observe-only plugins port everywhere. Blocking plugins depend on a harness
   that supports cancellation. Mutation is harness-specific.
4. **What is the portable core?**
   The pure logic — parsing, matching, policy — that knows nothing about the
   harness. This is the only code you unit-test in isolation.

## Harness taxonomy

| Family | Examples | Extension shape | Porting cost |
| --- | --- | --- | --- |
| **Imperative in-process API** | OpenCode V2, Pi | TypeScript module exports a factory; hooks registered on a context object | Low — same language, similar lifecycle |
| **Declarative bundle** | Antigravity, Claude Code | Directory with a manifest plus optional `hooks/`, `skills/`, `rules/`, `mcp/` | Medium — logic lives in shell/JS handlers, not the host process |
| **Runtime composition** | DeepSeek Harness | Everything is a plugin, including the agent loop | High — requires understanding the runtime graph |

Identify the family first. A single adapter design cannot serve an imperative
API and a declarative bundle; plan for two adapter shapes, not three.

## The procedure (RED → GREEN → REFACTOR)

### Step 1 — Write the pressure scenario first (RED)

Before any adapter code, write the observable behaviour you need:

```
Given harness: OpenCode V2
When the model streams the text "rm -rf /" inside a bash tool call
Then the tool call is cancelled before execution
And the model receives the reason
```

Store it in `references/testing-scenarios.md` under the plugin name. Run it
against a stub harness. It must fail for the right reason — not because the
plugin is missing, but because the capability is not implemented.

### Step 2 — Build the portable core

Write the pure logic as a standalone module with no harness imports:

```ts
// core/policy.ts — zero harness imports
export interface PolicyInput {
  surface: "text" | "tool";
  toolName?: string;
  content: string;
}

export interface PolicyDecision {
  action: "allow" | "block" | "observe";
  reason?: string;
}

export function evaluate(rules: Rule[], input: PolicyInput): PolicyDecision {
  // pure, deterministic, unit-testable
}
```

The core is the only thing you test exhaustively. Adapters are thin enough to
verify by integration test.

### Step 3 — Write the thinnest adapter per harness (GREEN)

Each adapter does exactly three things: read the harness event, call the core,
translate the core decision back into the harness's return shape.

OpenCode V2 adapter shape:

```ts
import { Plugin } from "@opencode/plugin";
import { evaluate } from "my-plugin-core";

export default Plugin.define({
  id: "my-plugin",
  async setup(ctx) {
    const rules = await loadRules(ctx.location.directory);
    ctx.tool.transform.before((event) => {
      const decision = evaluate(rules, {
        surface: "tool",
        toolName: event.tool,
        content: JSON.stringify(event.input),
      });
      if (decision.action === "block") {
        return { cancel: true, reason: decision.reason };
      }
    });
    return () => {};
  },
});
```

Pi adapter shape:

```ts
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { evaluate } from "my-plugin-core";

export default function (pi: ExtensionAPI) {
  let rules: Rule[] = [];
  pi.on("session_start", async (_e, ctx) => {
    rules = await loadRules(ctx.cwd ?? process.cwd());
  });
  pi.on("tool_call", async (event) => {
    const decision = evaluate(rules, {
      surface: "tool",
      toolName: event.toolName,
      content: JSON.stringify(event.input),
    });
    if (decision.action === "block") {
      return { block: true, reason: decision.reason };
    }
  });
}
```

Antigravity adapter shape — a shell/Node hook, not an in-process module:

```json
{
  "PreToolUse": [
    {
      "matcher": ".*",
      "handler": { "command": "node", "args": ["bin/guard.js"] }
    }
  ]
}
```

```js
// bin/guard.js
const { evaluate } = require("my-plugin-core");
const input = JSON.parse(require("node:fs").readFileSync(0, "utf-8"));
const d = evaluate(loadRules(process.cwd()), {
  surface: "tool",
  toolName: input.tool,
  content: JSON.stringify(input.input),
});
process.stdout.write(
  JSON.stringify(
    d.action === "block"
      ? { allow_tool: false, deny_reason: d.reason }
      : { allow_tool: true }
  )
);
```

Re-run the pressure scenario. It must now pass.

### Step 4 — Refactor for portability (REFACTOR)

The adapter should contain **no policy logic**. If you see an `if` that decides
whether something is allowed inside an adapter, move it to the core. The
adapter only answers: *"which event, and what return shape does this harness
expect?"*

Then add a second pressure scenario that exercises a **negative** case — an
input that looks similar but must not trigger. Only ship when both pass.

## Portability rules

- **One core, many adapters.** The core must compile and test without any
  harness package installed.
- **Name the lifecycle point, not the API.** Write "pre-tool block" in design
  docs; translate to `ctx.tool.transform.before`, `pi.on("tool_call")`, or
  `PreToolUse` only inside the adapter.
- **Capabilities are not uniform.** Prose interruption works in OpenCode V2 and
  Pi but not in Antigravity. Document the gap; do not fake it.
- **Autodiscovery paths are part of the contract.** A plugin that works but
  lands in the wrong directory does not work. Verify with the path table in
  `references/autodiscovery-paths.md`.
- **Manifests are the only stable surface across declarative harnesses.** Keep
  `plugin.json` minimal and versioned.

## Common traps

- **Writing the adapter before the core.** You end up with three
  implementations that drift. Core first, always.
- **Returning the wrong shape.** OpenCode V2 returns `{ cancel, reason }` from
  a transform; Pi returns `{ block, reason }` from `tool_call`; Antigravity
  prints `{ allow_tool, deny_reason }`. These are not interchangeable.
- **Assuming mid-stream abort.** Pi observes `message_update` but does not
  document a mid-stream abort; defer corrections to `turn_end`. OpenCode V2 may
  expose abort through a domain method; check the version you target.
- **Forgetting cleanup.** OpenCode V2 `setup` must return a cleanup function for
  timers, watchers, and connections. Leaking them breaks plugin reload.
- **Shipping without the manifest field.** Pi resolves extensions through the
  `pi.extensions` field in `package.json` (or a file in `~/.pi/agent/extensions/`).
  A compiled `dist/` that no manifest points to is invisible.
- **Treating Antigravity `rules/` as conditional.** Rules in a plugin bundle
  are always-on. Conditional logic must live in `hooks.json`.

## Verification checklist

Before publishing an adapter:

- [ ] Core passes unit tests with no harness installed.
- [ ] Positive pressure scenario fires the correct decision.
- [ ] Negative pressure scenario does not fire.
- [ ] Adapter contains no policy `if` statements.
- [ ] Plugin loads from the harness's autodiscovery path.
- [ ] Manifest/entry field points at the built artifact (if the harness requires a build).
- [ ] Cleanup function releases every resource (OpenCode V2).
- [ ] Capability gaps are documented in the README.
