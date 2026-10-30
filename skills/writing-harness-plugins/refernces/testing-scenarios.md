# Pressure Scenario Library

Each scenario is a JSON object consumed by `scripts/validate-plugin.sh`.

## Schema

```json
{
  "name": "block-force-push",
  "harness": "opencode-v2",
  "capability": "pre-tool-block",
  "event": {
    "surface": "tool",
    "toolName": "bash",
    "input": { "command": "git push --force origin main" }
  },
  "expect": "block"
}
```

`expect` is `"block"`, `"allow"`, or `"observe"`.

## Baseline scenarios

### block-force-push

```json
{
  "name": "block-force-push",
  "harness": "opencode-v2",
  "capability": "pre-tool-block",
  "event": {
    "surface": "tool",
    "toolName": "bash",
    "input": { "command": "git push --force origin main" }
  },
  "expect": "block"
}
```

### allow-safe-push (negative)

```json
{
  "name": "allow-safe-push",
  "harness": "opencode-v2",
  "capability": "pre-tool-block",
  "event": {
    "surface": "tool",
    "toolName": "bash",
    "input": { "command": "git push origin main" }
  },
  "expect": "allow"
}
```

### block-force-push-pi

```json
{
  "name": "block-force-push-pi",
  "harness": "pi",
  "capability": "pre-tool-block",
  "event": {
    "surface": "tool",
    "toolName": "bash",
    "input": { "command": "git push --force origin main" }
  },
  "expect": "block"
}
```

### block-force-push-antigravity

```json
{
  "name": "block-force-push-antigravity",
  "harness": "antigravity",
  "capability": "pre-tool-block",
  "event": {
    "surface": "tool",
    "toolName": "bash",
    "input": { "command": "git push --force origin main" }
  },
  "expect": "block"
}
```

The same scenario across three harnesses is the portability test. If one
adapter returns a different decision, the core is fine and the adapter's
translation is wrong.
