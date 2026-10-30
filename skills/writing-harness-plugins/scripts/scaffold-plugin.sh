#!/usr/bin/env bash
# Usage: scaffold-plugin.sh <name> <harness>
set -euo pipefail

NAME="${1:?name required}"
HARNESS="${2:?harness required (opencode-v2|pi|antigravity)}"
ROOT="$(pwd)/packages/${NAME}"

case "$HARNESS" in
opencode-v2)
  mkdir -p "$ROOT/src"
  cat >"$ROOT/src/index.ts" <<'EOF'
import { Plugin } from "@opencode/plugin";
import { evaluate } from "../core/index.js";

export default Plugin.define({
  id: "PLUGIN_ID",
  async setup(ctx) {
    return () => {};
  },
});
EOF
  ;;
pi)
  mkdir -p "$ROOT/src"
  cat >"$ROOT/src/index.ts" <<'EOF'
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { evaluate } from "../core/index.js";

export default function (pi: ExtensionAPI) {}
EOF
  ;;
antigravity)
  mkdir -p "$ROOT/bin"
  cat >"$ROOT/plugin.json" <<'EOF'
{
  "$schema": "https://antigravity.google/schemas/v1/plugin.json",
  "name": "PLUGIN_ID",
  "description": ""
}
EOF
  cat >"$ROOT/hooks.json" <<'EOF'
{
  "PreToolUse": [
    { "matcher": ".*", "handler": { "command": "node", "args": ["bin/hook.js"] } }
  ]
}
EOF
  ;;
*)
  echo "unknown harness: $HARNESS" >&2
  exit 2
  ;;
esac

echo "scaffolded $NAME for $HARNESS at $ROOT"
