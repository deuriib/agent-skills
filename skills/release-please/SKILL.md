---
name: release-please
description: Use when configuring, troubleshooting, or automating releases with Google's Release Please. Triggers on tasks involving release-please-config.json, .release-please-manifest.json, Conventional Commits, Release PRs, or GitHub Actions release workflows.
---

# Release Please

## Overview

**Release Please automates CHANGELOG generation, GitHub release creation, and version bumps** by parsing git history for Conventional Commit messages.

**Core principle:** Instead of releasing continuously, Release Please maintains a "Release PR" that accumulates changes. When this PR is merged, Release Please tags the commit, updates the changelog, bumps versions in source files, and creates a GitHub Release.

## Release PR Lifecycle Labels

Monitor the status of a release via GitHub PR labels:

- `autorelease: pending`: Initial state; the PR is open and accumulating changes.
- `autorelease: tagged`: The PR has been merged and the release has been tagged in GitHub.
- `autorelease: published`: (Optional convention) Publication tooling has successfully published the artifact (e.g., to npm or PyPI).

## Configuration Files (Manifest-Driven)

For monorepos or explicit version tracking, Release Please requires two files at the repository root:

### 1. `release-please-config.json`

Defines the release strategy, paths, and rules for each package.

```json
{
  "$schema": "https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json",
  "release-type": "node",
  "packages": {
    ".": {
      "release-type": "node"
    },
    "packages/my-lib": {
      "release-type": "python",
      "package-name": "my-lib"
    }
  }
}
```

### 2. `.release-please-manifest.json`

Tracks the last-released version for each configured path.

```json
{
  ".": "1.2.3",
  "packages/my-lib": "0.4.1"
}
```

*Note: This file can be initialized as `{}` during bootstrap. After the first release, Release Please manages it automatically.*

## Conventional Commits Requirement

Release Please **strictly relies** on Conventional Commits to determine version bumps:

- `fix:` → SemVer patch (e.g., `1.0.0` → `1.0.1`)
- `feat:` → SemVer minor (e.g., `1.0.0` → `1.1.0`)
- `feat!:`, `fix!:`, `refactor!:` → SemVer major (breaking change, e.g., `1.0.0` → `2.0.0`)

### Manual Version Override

To force a specific version bump, include `Release-As: x.x.x` (case-insensitive) in the **commit body**:

```text
chore: release 2.0.0

Release-As: 2.0.0
```

## Workflow: Setting Up Release Please

1. **Bootstrap Configuration**: Create `release-please-config.json` and an empty `{}` `.release-please-manifest.json` at the repository root.
2. **Commit to Default Branch**: Merge these files into your default branch (e.g., `main`).
3. **Set Up GitHub Action**: Create `.github/workflows/release-please.yml` to automate Release PR creation and tagging.
4. **Trigger Initial Run**: Push a Conventional Commit (e.g., `feat: initial setup`) or manually trigger the workflow. Release Please will open the first Release PR.
5. **Merge to Release**: Review the Release PR. When ready, merge it. Release Please will automatically tag the release and update the manifest.

## GitHub Actions Setup

Use the official action to automate the workflow. This example handles both opening the Release PR and publishing when merged.

```yaml
name: Release Please

on:
  push:
    branches:
      - main

permissions:
  contents: write
  pull-requests: write

jobs:
  release-please:
    runs-on: ubuntu-latest
    steps:
      - uses: google-github-actions/release-please-action@v4
        id: release
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          # For manifest-driven (monorepo) setups:
          command: manifest 
          # For single-package setups, use:
          # release-type: node
```

## Red Flags — STOP

| Symptom / Rationalization | Correct Action |
| --- | --- |
| "I'll manually edit `.release-please-manifest.json` to fix a version." | **STOP.** After bootstrap, only Release Please should edit this file. Manual edits cause state desync. Use a `Release-As:` commit to correct versions. |
| "I'll put the config files in a `.github/` subfolder." | **STOP.** Release Please expects `release-please-config.json` and `.release-please-manifest.json` at the **repository root** by default. |
| "I'll use `fix bug` instead of `fix: resolve bug` in my commit message." | **STOP.** Release Please strictly parses the `type:` prefix. Without it, the commit is ignored for version bumping. |
| "I'll delete the Release PR to cancel the release." | **STOP.** Closing the PR does not reset the state cleanly. Let it accumulate, or use the `release-please` CLI with `--force-run` if absolutely necessary. |
| "I forgot to add `package-name` for my Python/Go package." | **STOP.** Non-Node strategies cannot infer the package name from source files automatically. You must specify `"package-name"` in the config. |

## Anti-Patterns

- ❌ **Mixing manifest and single-package commands**: If you have a `release-please-config.json`, you must use `command: manifest` in the GitHub Action, not `release-type`.
- ❌ **Ignoring the `autorelease: pending` label**: Do not manually remove or alter this label, as the Release Please action uses it to identify and update existing Release PRs.
- ❌ **Overly granular package paths**: Defining a package path for every single file instead of logical directories creates unmanageable config files. Group related artifacts.

## Discovery Keywords

release-please, conventional commits, release PR, autorelease, release-please-config.json, release-please-manifest.json, github actions release, monorepo release, version bump, changelog automation.
