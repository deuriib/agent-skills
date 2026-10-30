#!/usr/bin/env bash
# Usage: validate-plugin.sh <package-dir> <harness>
set -euo pipefail

DIR="${1:?package dir required}"
HARNESS="${2:?harness required}"

fail() {
  echo "❌ $*" >&2
  exit 1
}

case "$HARNESS" in
opencode-v2)
  [[ -f "$DIR/src/index.ts" ]] || fail "missing src/index.ts"
  grep -q "Plugin.define" "$DIR/src/index.ts" || fail "entry does not use Plugin.define"
  grep -q "id:" "$DIR/src/index.ts" || fail "entry missing stable id"
  grep -q "setup" "$DIR/src/index.ts" || fail "entry missing setup"
  ;;
pi)
  [[ -f "$DIR/src/index.ts" ]] || fail "missing src/index.ts"
  grep -q "ExtensionAPI" "$DIR/src/index.ts" || fail "entry does not type the ExtensionAPI"
  ;;
antigravity)
  [[ -f "$DIR/plugin.json" || -f "$DIR/.antigravity-plugin/plugin.json" ]] ||
    fail "missing plugin.json or .antigravity-plugin/plugin.json"
  grep -q '"name"' "$DIR/plugin.json" 2>/dev/null ||
    grep -q '"name"' "$DIR/.antigravity-plugin/plugin.json" 2>/dev/null ||
    fail "manifest missing name"
  ;;
*)
  fail "unknown harness: $HARNESS"
  ;;
esac

echo "✅ $HARNESS adapter structure is valid"
