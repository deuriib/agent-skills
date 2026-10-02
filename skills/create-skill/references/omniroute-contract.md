# OmniRoute Contract — create-skill

Authoritative subset of OmniRoute's Skills framework needed to author compatible skills.
Source of truth: OmniRoute `src/lib/skills/` + `src/app/api/skills/`.

## Skill record

```ts
interface Skill {
  id: string; apiKeyId: string;
  name: string;              // 1-100 chars, unique per owner
  version: string;           // semver ^\d+\.\d+\.\d+$ — required
  description: string;       // max 500 chars — enforced at install
  schema: { input: object; output: object };  // JSON Schema objects
  handler: string;           // handler NAME lookup, not code
  enabled: boolean;
  mode?: "on" | "off" | "auto";
  sourceProvider?: "skillsmp" | "skillssh" | "local";
  tags?: string[];
}
```

## Handler signature (exact)

```ts
export async function handler(
  input: Record<string, unknown>,
  ctx: { apiKeyId: string; sessionId: string; provider?: string; model?: string }
): Promise<Record<string, unknown>>;
export default handler;
```

Register at boot: `skillExecutor.registerHandler("<name>-handler", handler)`.

## Install endpoint

`POST /api/skills/install` (management auth):

```json
{
  "name": "my-skill", "version": "1.0.0",
  "description": "<=500 chars, same as frontmatter>",
  "schema": { "input": { "<from omniskill.json>" }, "output": { "<from omniskill.json>" } },
  "handlerCode": "my-skill-handler",
  "apiKeyId": "your-api-key-id"
}
```

`handlerCode` is a **handler-name lookup** — arbitrary source is never eval'd.
Marketplace installs store SKILL.md text as documentation and route through model tool calls.

## Execution

- MCP: `omniroute_skills_execute({ skillName, input, sessionId? })` (requires `apiKeyId`).
- MCP list/enable/history: `omniroute_skills_list`, `omniroute_skills_enable`, `omniroute_skills_executions`.
- Execution rows: `status ∈ pending|running|success|error|timeout`, with `durationMs` or `errorMessage`.

## Modes

| Mode | Meaning |
| ---- | ------- |
| `on` | Always injected as a tool definition |
| `off` | Never injected, never executable |
| `auto` | Scored per request; injected only on match (default for repo skills) |

## Agent Skills (documentation side)

OmniRoute's second system: static `SKILL.md` catalog (`skills/<id>/SKILL.md`,
frontmatter `name` + `description`) served via REST/MCP/A2A for external agents.
An **omniskill** satisfies both: executable Skill record + catalog-grade SKILL.md.
