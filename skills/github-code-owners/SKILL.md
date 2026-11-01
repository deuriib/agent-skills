---
name: github-code-owners
description: Use when configuring, updating, or troubleshooting GitHub CODEOWNERS files to automate pull request review requests. Triggers on tasks involving code ownership, assigning reviewers to specific paths, setting up branch protection reviews, or resolving CODEOWNERS syntax errors.
---

# GitHub Code Owners

## Overview

**CODEOWNERS files automate pull request review requests based on file paths.** This ensures the right people or teams are always notified when their domain is modified.

**Core principle:** The `CODEOWNERS` file must be placed in a recognized directory on the base branch, and uses a gitignore-like syntax where the **last matching pattern takes precedence**.

## File Location & Hierarchy

GitHub looks for the `CODEOWNERS` file in three specific locations, in this exact order. The first one it finds is the one it uses:

1. `.github/CODEOWNERS` (Recommended)
2. `/CODEOWNERS` (Root directory)
3. `docs/CODEOWNERS`

**Crucial Rule:** The file must exist on the **base branch** of the pull request (e.g., `main`) for GitHub to automatically request reviews.

## Syntax & Rules

The syntax follows most `.gitignore` rules, but has critical exceptions.

```text
# Pattern           Owner(s)
*                   @global-owner1 @global-owner2
*.js                @js-owner
/docs/              @docs-team
/build/logs/        @doctocat
```

### Key Rules

- **Precedence**: The **last matching pattern** wins. Always define global defaults at the top and specific overrides at the bottom.
- **Multiple Owners**: Must be on the **same line**, separated by spaces.
- **Case Sensitivity**: Paths are strictly case-sensitive, even on case-insensitive OSs.
- **Team Access**: Teams (`@org/team-name`) must have explicit `write` access to the repository, even if team members already have access.

### Unsupported `.gitignore` Features

Do NOT use these in a `CODEOWNERS` file; they will fail silently or cause syntax errors:

- ❌ Negating a pattern with `!` (e.g., `!*.md`)
- ❌ Escaping a `#` with `\` to use it as a pattern
- ❌ Character ranges with `[ ]` (e.g., `[a-z]*.txt`)

## Standard Patterns

| Pattern | Matches |
| --- | --- |
| `*` | All files in the repository (global fallback). |
| `*.js` | All JavaScript files anywhere in the repo. |
| `/docs/` | The `/docs` directory at the root and all subdirectories. |
| `docs/*` | Files directly inside `/docs`, but **not** nested subdirectories. |
| `apps/` | Any `apps` directory anywhere in the repository. |
| `**/logs` | Any `logs` directory nested anywhere in the repository. |

## Workflow: Setting Up Code Owners

1. **Create the file**: Create `.github/CODEOWNERS` on your default branch.
2. **Set a global fallback**: Assign a default owner for `*` at the top of the file.
3. **Define specific ownership**: Add patterns for specific directories or file types below the global fallback.
4. **Handle exceptions**: If a subdirectory should *not* be owned by the parent rule, list it below without an owner (or assign a different owner) to override the parent rule.
5. **Enforce via Branch Protection (Optional but Recommended)**:
   - Go to Repository **Settings** > **Branches** > **Branch protection rules**.
   - Enable **"Require a pull request before merging"**.
   - Check **"Require review from Code Owners"**.

## Red Flags — STOP

| Symptom / Rationalization | Correct Action |
| --- | --- |
| "I'll put the file in `.github/workflows/CODEOWNERS` to keep it tidy." | **STOP.** GitHub only checks `.github/`, root, and `docs/`. It will be ignored. |
| "I'll use `!*.md` to exclude markdown files from the global owner." | **STOP.** Negation `!` is not supported. Assign a specific owner to `*.md` or leave it blank to bypass the global owner. |
| "I'll list multiple owners on different lines for the same pattern." | **STOP.** Only the last owner on the last line will be assigned. Put them on the same line. |
| "I committed the CODEOWNERS file to my feature branch." | **STOP.** It must exist on the base branch (e.g., `main`) to take effect for PRs targeting that branch. |
| "I'll assign `@org/new-team` but they don't have repo access yet." | **STOP.** Teams must have explicit `write` access to the repository to be assigned as code owners. |

## Anti-Patterns

- ❌ **Relying solely on global `*` ownership**: This creates notification fatigue. Always define specific overrides for distinct domains (e.g., `/docs/`, `/frontend/`).
- ❌ **Using `docs/*` when you meant `/docs/`**: `docs/*` only matches files directly in the `docs` folder, not files in subdirectories like `docs/api/`. Use `/docs/` to match the directory and all children.
- ❌ **Forgetting inline comments**: Comments must start with `#` and can be placed on their own line or at the end of a pattern line. Do not use unsupported comment syntax.

## Discovery Keywords

CODEOWNERS, code owners, pull request reviews, auto-assign reviewers, branch protection, GitHub teams, file path ownership.
