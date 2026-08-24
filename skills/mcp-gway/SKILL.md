---
name: mcp-gway
description: MCP Gateway manages MCP (Model Context Protocol) servers. It acts as a bridge between agent-clients and multiple MCP servers, providing a unified interface to discover, connect, and use MCP tools.
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

### Add a server

```bash
# HTTP/SSE server
mcp-gway add <name> --type http --url "https://example.com/mcp"

# Streamable HTTP server
mcp-gway add <name> --type streamable-http --url "https://example.com/mcp"

# SSE server
mcp-gway add <name> --type sse --url "https://example.com/sse"

# Stdio server (local process)
mcp-gway add <name> --type stdio --command "node" --args '["server.js"]'

# With environment variables
mcp-gway add <name> --type stdio --command "python" --args '["server.py"]' --env "API_KEY=xxx" --env "DEBUG=true"

# With specific tools only
mcp-gway add <name> --type http --url "https://example.com/mcp" --tools "tool1,tool2,tool3"
```

### Remove a server

```bash
mcp-gway remove <name>
```

### Refresh server connections

```bash
# Refresh all servers
mcp-gway refresh

# Refresh triggers re-discovery of tools from all connected servers
```

### Inspect server tools

```bash
mcp-gway inspect <name>
```

Shows tool signatures for a specific server.

### Update server tools

```bash
mcp-gway update <name> --tools "tool1,tool2"
```

### Start the gateway server

```bash
# Default (localhost:8080)
mcp-gway serve

# Custom host/port
mcp-gway serve --host 0.0.0.0 --port 9090
```

## Server Types

| Type | Description | Use Case |
|------|-------------|----------|
| `http` | HTTP JSON-RPC | Remote MCP servers |
| `sse` | Server-Sent Events | Streaming remote servers |
| `streamable-http` | Streamable HTTP | Modern MCP servers (recommended) |
| `stdio` | Standard I/O | Local processes, CLI tools |

## Connection Flow

```
1. mcp-gway add → discovers tools → generates .pyi stub
2. mcp-gway refresh → reconnects all servers → updates stubs
3. mcp-gway serve → starts HTTP gateway on localhost:8080/mcp
4. opencode connects to gateway → uses tools via call_tool()
```

## Using Tools via Gateway

Once servers are added and the gateway is running, tools are accessible through `gateway_executeToolCode`:

```python
# Call any MCP tool
result = call_tool("server-name", "tool-name", param1="value1", param2="value2")
result

# Examples
result = call_tool("agentmemory", "memory_smart_search", query="hello")
result = call_tool("context7", "resolve-library-id", libraryName="react", query="react")
result = call_tool("context7", "query-docs", libraryId="/reactjs/react.dev", query="useState")
result = call_tool("supabase", "list_tables")
```

## Managing Tokens

Some servers require OAuth authentication. Tokens are stored automatically:

```bash
# Tokens are stored in the gateway config directory
# Re-auth happens automatically on refresh if tokens expire
mcp-gway refresh  # Triggers re-auth if needed
```

## Common Patterns

### Add a popular MCP server

```bash
# Context7 (documentation lookup)
mcp-gway add context7 --type streamable-http --url "https://mcp.context7.com/mcp"

# Supabase (database)
mcp-gway add supabase --type streamable-http --url "https://mcp.supabase.com"

# AgentMemory (memory persistence)
mcp-gway add agentmemory --type stdio --command "npx" --args '["-y", "@agentmemory/mcp"]'
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
mcp-gway add new-server --type streamable-http --url "https://new-url.com/mcp"
mcp-gway refresh
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Server not connecting | `mcp-gway refresh` to retry connection |
| Tools not appearing | `mcp-gway inspect <name>` to verify tool discovery |
| Gateway not starting | Check if port 8080 is in use: `netstat -ano | findstr 8080` |
| Auth failures | Tokens may be expired; refresh triggers re-auth |
| Parse errors in tools | Server tools with hyphens may cause Starlark issues; contact server maintainer |

## Architecture

```
┌─────────────────────────────────────────────────┐
│  ai-agent                                       │
│  └─ gateway_executeToolCode                     │
│     └─ call_tool(server, tool, **kwargs)        │
└───────────────────┬─────────────────────────────┘
                    │ HTTP (localhost:8080/mcp)
┌───────────────────▼─────────────────────────────┐
│  mcp-gway (Gateway Server)                      │
│  └─ Routes calls to registered servers          │
└──┬────────┬────────┬────────┬───────────────────┘
   │        │        │        │
   ▼        ▼        ▼        ▼
agentmemory betterfullstack context7 supabase
(STDIO)    (STDIO)   (HTTP)   (HTTP)
```

## When NOT to Use mcp-gway

- **Direct MCP client connections** — if you have a native MCP client that connects directly
- **Single server setups** — if you only need one MCP server, connect directly without the gateway
- **No MCP tools needed** — if your workflow doesn't use MCP protocol

Base directory for this skill: C:\Users\deuri\.agents\skills\mcp-gway
Relative paths in this skill (e.g., scripts/, reference/) are relative to this base directory.
