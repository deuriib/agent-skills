---
name: mcp-gway
description: MCP Gateway manages MCP (Model Context Protocol) servers. It acts as a bridge between agent-clients and multiple MCP servers, providing a unified interface to discover, connect, and use MCP tools.
metadata:
  author: deuriib
  version: "1.0"
---

# MCP Gateway — mcp-gway

MCP Gateway manages MCP (Model Context Protocol) servers. It acts as a bridge between agent-clients and multiple MCP servers, providing a unified interface to discover, connect, and use MCP tools.

Use when: adding/removing MCP servers, listing connected servers, inspecting tool signatures, refreshing server connections, or starting the gateway server.

## Quick Reference

### List connected servers

```bash
mcp-gway list
```

Shows all connected MCP servers with their type and tool count.

### Add a server (OpenCode format — primary)

```bash
# Remote — auto-detects transport (streamable-http → sse → http)
mcp-gway add <name> --type remote --url "https://example.com/mcp"

# Remote with headers
mcp-gway add <name> --type remote --url "https://example.com/mcp" --header "Authorization=Bearer TOKEN"

# Remote with pre-registered OAuth
mcp-gway add <name> --type remote --url "https://example.com/mcp" --oauth-client-id ID --oauth-client-secret SECRET --oauth-scope "openid profile"

# Remote with timeout and enable toggle
mcp-gway add <name> --type remote --url "https://example.com/mcp" --timeout 10000 --enabled
mcp-gway add <name> --type remote --url "https://example.com/mcp" --timeout 10000 --no-enabled

# Local (stdio process)
mcp-gway add <name> --type local --command "npx -y @anthropic/mcp-filesystem"
mcp-gway add <name> --type local --command "python -m my_mcp_server" --env MY_VAR=value --cwd /path/to/workdir
mcp-gway add <name> --type local --command "npx -y my-mcp" --env KEY=VALUE --env OTHER=123 --cwd /tmp/workdir

# With specific tools only
mcp-gway add <name> --type remote --url "https://example.com/mcp" --tools "tool1,tool2,tool3"
```

### Add a server (deprecated format — still works)

Old `--type http|stdio|sse|streamable-http` syntax is kept for backward compat and internally mapped to `remote`/`local`. Prefer `remote`/`local` for new configs.

```bash
mcp-gway add <name> --type http --url "https://example.com/mcp"
mcp-gway add <name> --type stdio --command "node" --args '["server.js"]'
mcp-gway add <name> --type streamable-http --url "https://example.com/mcp"
mcp-gway add <name> --type sse --url "https://example.com/sse"
```

### Remove a server

```bash
mcp-gway remove <name>
```

### Update server tools

```bash
mcp-gway update <name> --tools "tool1,tool2"
```

### Refresh server connections

```bash
# Refresh all servers
mcp-gway refresh

# Refresh a specific server
mcp-gway refresh <name>

# Trigger OAuth flow for a server
mcp-gway refresh <name> --auth

# Refresh with custom OAuth callback port
mcp-gway refresh <name> --auth --oauth-port 9090
```

### Inspect server tools

```bash
mcp-gway inspect <name>
```

Shows tool signatures for a specific server.

### Start the gateway server

```bash
# Default (localhost:8080)
mcp-gway serve

# Custom host/port
mcp-gway serve --host 0.0.0.0 --port 9090
```

## Options for `add` (OpenCode format)

| Option | Description |
|--------|-------------|
| `--type remote\|local` | Server type (primary) |
| `--url <url>` | URL for `remote` |
| `--header "KEY=VALUE"` | HTTP header for `remote` (repeatable) |
| `--command "<cmd>"` | Command for `local` (e.g. `"npx -y my-mcp"`) |
| `--env KEY=VALUE` | Environment variable for `local` (repeatable) |
| `--cwd <path>` | Working directory for `local` |
| `--oauth-client-id ID` | Pre-registered OAuth client ID |
| `--oauth-client-secret SECRET` | Pre-registered OAuth client secret |
| `--oauth-scope SCOPE` | OAuth scope |
| `--oauth-port <port>` | Local port for OAuth callback (default 8989) |
| `--timeout <ms>` | Connection timeout in ms (default 5000) |
| `--enabled / --no-enabled` | Enable/disable without removal (default enabled) |
| `--tools <list>` | Comma-separated tool filter (default `*` = all) |
| `--args <json>` | JSON array of extra args — deprecated compat, used with `stdio`/`local` |
| `--docs-url <url>` | Deprecated — accepted for compat but not persisted (legacy) |

## Server Types

| Type | Description | Use Case |
|------|-------------|----------|
| `remote` | Auto-detects transport (streamable-http → sse → http) | Remote MCP servers (recommended) |
| `local` | Standard I/O process | Local processes, CLI tools |
| `http` | HTTP JSON-RPC (deprecated) | Legacy remote servers |
| `sse` | Server-Sent Events (deprecated) | Legacy streaming servers |
| `streamable-http` | Streamable HTTP (deprecated) | Legacy modern servers |
| `stdio` | Standard I/O (deprecated) | Legacy local processes |

## Code Mode

When connected, the gateway exposes 4 meta-tools:

| Tool | Description |
|------|-------------|
| `listToolFiles` | List all available `.pyi` stub files |
| `readToolFile` | Read function signatures from a stub |
| `getToolDocs` | Get detailed documentation for a tool |
| `executeToolCode` | Execute code in a sandboxed Starlark interpreter |

## OAuth Authentication

For servers requiring OAuth (e.g., Supabase):

```bash
# Trigger OAuth flow
mcp-gway refresh <name> --auth

# Or store token manually
mkdir -p ~/.config/mcp-gway/tokens
echo '{"access_token": "YOUR_TOKEN"}' > ~/.config/mcp-gway/tokens/<server-name>.json
```

Tokens are stored in `~/.config/mcp-gway/tokens/` and refreshed automatically.

## Connection Flow

```
1. mcp-gway add → discovers tools → generates .pyi stub
2. mcp-gway refresh → reconnects servers → updates stubs
3. mcp-gway serve → starts HTTP gateway on localhost:8080/mcp
4. opencode connects to gateway → uses tools via call_tool()
```

## Using Tools via Gateway

Once servers are added and the gateway is running, tools are accessible through `gateway_executeToolCode`:

```python
# Call any MCP tool
result = call_tool("server-name", "tool-name", param1="value1", param2="value2")

# Examples
result = call_tool("agentmemory", "memory_smart_search", query="hello")
result = call_tool("context7", "resolve-library-id", libraryName="react", query="react")
result = call_tool("context7", "query-docs", libraryId="/reactjs/react.dev", query="useState")
result = call_tool("supabase", "list_tables")
```

## Common Patterns

### Add a popular MCP server

```bash
# Context7 (documentation lookup)
mcp-gway add context7 --type remote --url "https://mcp.context7.com/mcp"

# Supabase (database)
mcp-gway add supabase --type remote --url "https://mcp.supabase.com/mcp"

# AgentMemory (memory persistence)
mcp-gway add agentmemory --type local --command "npx -y @agentmemory/mcp"
```

### Debug connection issues

```bash
# Check server status
mcp-gway list

# Re-discover tools
mcp-gway refresh

# Inspect what tools are available
mcp-gway inspect <server-name>
```

### Remove and re-add a server

```bash
mcp-gway remove old-server
mcp-gway add new-server --type remote --url "https://new-url.com/mcp"
mcp-gway refresh
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Server not connecting | `mcp-gway refresh` to retry connection |
| Tools not appearing | `mcp-gway inspect <name>` to verify tool discovery |
| Gateway not starting | Check if port 8080 is in use: `netstat -ano | findstr 8080` |
| Auth failures | `mcp-gway refresh <name> --auth` to trigger re-auth |
| Parse errors in tools | Server tools with hyphens may cause Starlark issues; contact server maintainer |

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    MCP Gateway                          │
├─────────────────────────────────────────────────────────┤
│  CLI (click)     │  HTTP/SSE Server (Starlette)        │
│  - add           │  - POST /mcp (JSON-RPC)             │
│  - remove        │  - GET /mcp (SSE stream)            │
│  - list          │  - POST /mcp/messages               │
│  - refresh       │                                     │
├─────────────────────────────────────────────────────────┤
│  Code Mode (4 meta-tools)     │  Starlark Sandbox      │
│  - listToolFiles               │  - Hermetic execution  │
│  - readToolFile                │  - Server injection    │
│  - getToolDocs                 │                        │
│  - executeToolCode             │                        │
├─────────────────────────────────────────────────────────┤
│  Registry                      │  OAuth2 (RFC 7591)     │
│  - servers/*.pyi = signatures  │  - Dynamic registration│
│  - servers/*.json = config     │  - Token storage       │
│  - legacy # comments fallback  │                        │
└─────────────────────────────────────────────────────────┘
         │                │                │
    ┌────┴────┐      ┌────┴────┐      ┌────┴────┐
    │ Server1 │      │ Server2 │      │ Server3 │
    │ (HTTP)  │      │ (SSE)   │      │ (Stdio) │
    └─────────┘      └─────────┘      └─────────┘
```

## When NOT to Use mcp-gway

- **Direct MCP client connections** — if you have a native MCP client that connects directly
- **Single server setups** — if you only need one MCP server, connect directly without the gateway
- **No MCP tools needed** — if your workflow doesn't use MCP protocol

Base directory for this skill: D:\Projects\agent-skills\skills\mcp-gway
Relative paths in this skill (e.g., scripts/, reference/) are relative to this base directory.
