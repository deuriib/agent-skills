---
name: github-labels
description: Use when creating, updating, or synchronizing GitHub repository labels declaratively. Triggers on tasks involving labels.yml, GitHub label management, adding new label categories, or configuring the github-labelmanager Action.
---

# GitHub Labels

## Overview

**GitHub labels should be managed declaratively as code**, not manually via the GitHub UI. This ensures consistency, version history, and easy replication across repositories.

**Core principle:** The single source of truth for all repository labels is `.github/labels.yml`. Changes are synchronized automatically via a GitHub Actions workflow using `kjanat/github-labelmanager`.

## File Structure

```text
.github/
  labels.yml                # Declarative label definitions
  workflows/
    sync-labels.yml         # GitHub Action to apply definitions
```

## Label Definition Syntax

Every label in `labels.yml` must adhere to the schema: `$schema=https://raw.githubusercontent.com/kjanat/github-labelmanager/master/.github/labels.schema.json`

```yaml
labels:
  - name: "label-name"
    color: "#hexcode"       # Must be a valid 6-digit hex code
    description: "Brief explanation of when to use this label"
    aliases: ["old-name"]   # Optional: merges old labels into this one
```

## Standard Label Categories

When proposing or adding new labels, align them with these established categories:

1. **Type**: `bug`, `feature`, `rule`, `harness`, `docs`, `test`, `chore`, `cli`, `refactor`
2. **Priority**: `priority: critical`, `priority: high`, `priority: medium`, `priority: low`
3. **State**: `triage`, `blocked`, `needs-info`, `good first issue`, `help wanted`
4. **Technical Domain**: `antigravity`, `pi-agent`, `oh-my-pi`, `opencode`
5. **Meta**: `dependencies`, `duplicate`, `invalid`, `wontfix`

## Synchronization Workflow

The `.github/workflows/sync-labels.yml` file automates the application of `labels.yml`:

```yaml
name: sync-labels
on:
  push:
    paths:
      - ".github/labels.yml"
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-24.04
    permissions:
      contents: read
      issues: write
    steps:
      - uses: actions/checkout@v4
      - uses: kjanat/github-labelmanager@v1
        with:
          token: ${{ github.token }}
```

## Workflow: Adding or Modifying a Label

1. **Edit `.github/labels.yml`**: Add the new label or modify an existing one under the appropriate category.
2. **Add Aliases (if renaming)**: If changing a label's name, add the old name to the `aliases` array so the manager migrates existing issues/PRs automatically.
3. **Commit and Push**: Commit the change to the default branch.
4. **Verify**: The GitHub Action will trigger automatically. Check the Actions tab to confirm successful synchronization. (Use `workflow_dispatch` if manual immediate sync is needed).

## Red Flags — STOP

| Symptom / Rationalization | Correct Action |
| --- | --- |
| "I'll just add/edit the label manually in the GitHub UI to save time." | **STOP.** Manual changes create drift and will be overwritten or ignored. Always update `labels.yml`. |
| "I'll put `labels.yml` in the root directory." | **STOP.** The sync workflow is explicitly configured to trigger only on changes to `.github/labels.yml`. |
| "I'll use a color name like 'red' or a 3-digit hex like '#f00'." | **STOP.** The JSON schema requires a valid 6-digit hex color code (e.g., `#d73a4a`). |
| "I'm renaming a label, so I'll just change the `name` field." | **STOP.** Without adding the old name to `aliases`, the action will create a new label and leave the old one orphaned on existing issues. |

## Anti-Patterns

- ❌ **Creating redundant labels**: (e.g., both `bug` and `defect`). Use the primary name and put the other in `aliases`.
- ❌ **Vague descriptions**: Descriptions should clearly state *when* to apply the label (e.g., "Documentation only" instead of "Docs").
- ❌ **Ignoring the schema**: Always include the `$schema` comment at the top of `labels.yml` to enable IDE validation and catch syntax errors before committing.

## Discovery Keywords

github labels, labels.yml, sync labels, label management, github-labelmanager, issue triage, label aliases, declarative labels.
