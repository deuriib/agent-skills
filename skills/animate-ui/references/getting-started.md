# Getting Started with Animate UI

Animate UI is a distribution of React components built with **Tailwind CSS** and **Motion** (Framer Motion), inspired by shadcn/ui.

## Prerequisites

Ensure your project has the following dependencies:

```bash
npm install motion tailwind-merge clsx lucide-react
```

## Installation

Animate UI uses the same installation process as **shadcn/ui**.

### 1. Initialize shadcn/ui

If you haven't already, initialize shadcn/ui in your project:

```bash
npx shadcn@latest init
```

### 2. Add Components

Use the `add` command with the `@animate-ui` scoped package names. The naming convention follows the documentation hierarchy.

**Example: Adding Sliding Number Primitive**
```bash
npx shadcn@latest add @animate-ui/primitives-texts-sliding-number
```

**Example: Adding Avatar Group Component**
```bash
npx shadcn@latest add @animate-ui/components-animate-avatar-group
```

## MCP Support

If using an AI agent with MCP support, you can initialize the shadcn MCP server:

```bash
npx shadcn@latest mcp init --client [claude|cursor|vscode]
```
