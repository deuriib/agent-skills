---
name: github-funding
description: Use when configuring, creating, or troubleshooting a sponsor button in a GitHub repository. Triggers on tasks involving GitHub Sponsors, FUNDING.yml, repository funding setup, or adding donation links to a repo.
---

# GitHub Funding

## Overview

**GitHub Funding allows repository maintainers to display a sponsor button** that links to funding platforms. This is configured exclusively via a `.github/FUNDING.yml` file in the repository's default branch.

**Core principle:** The `FUNDING.yml` file must strictly follow the supported platform syntax and be placed in the correct directory (`.github/`) on the default branch to be recognized and rendered by GitHub.

## Supported Platforms and Syntax

Add each platform on a new line. You can specify one username, package name, or project name per external platform, up to four GitHub Sponsors usernames, and up to four custom URLs.

| Platform | Syntax Example |
| --- | --- |
| GitHub Sponsors | `github: [username1, username2]` |
| Patreon | `patreon: username` |
| Open Collective | `open_collective: username` |
| Ko-fi | `ko_fi: username` |
| Buy Me a Coffee | `buy_me_a_coffee: username` |
| Tidelift | `tidelift: platform-name/package-name` |
| LFX Mentorship | `community_bridge: project-name` |
| IssueHunt | `issuehunt: username` |
| Liberapay | `liberapay: username` |
| Polar | `polar: username` |
| thanks.dev | `thanks_dev: u/gh/username` |
| Custom URL | `custom: ["https://example.com/donate", "https://paypal.me/user"]` |

*Note: If a custom URL in an array includes a colon (`:`), it must be wrapped in quotes to be valid YAML.*

## Workflow: Setting Up a Sponsor Button

1. **Create the file**: Create `.github/FUNDING.yml` in the repository's default branch.
2. **Add funding sources**: Populate the file with the appropriate platform keys and values based on the syntax table above.
3. **Enable in Settings** (if not automatically detected):
   - Navigate to the repository's **Settings**.
   - Under **General** > **Features**, ensure the **Sponsorships** checkbox is selected.
   - Click **Set up sponsor button** or **Override funding links**.
   - The UI will open the `FUNDING.yml` editor. Review, make changes if needed, and commit.
4. **Commit changes**: Commit the file directly to the default branch, or open a pull request targeting the default branch.

## Example `FUNDING.yml`

```yaml
# .github/FUNDING.yml
github: [octocat, surftocat]
patreon: octocat
tidelift: npm/octo-package
custom: ["https://www.paypal.me/octocat", "https://octocat.com/donate"]
```

## Red Flags — STOP

| Symptom / Rationalization | Correct Action |
| --- | --- |
| "I'll put `FUNDING.yml` in the root directory to make it easier to find." | **STOP.** GitHub only reads this file if it is located in the `.github/` directory. |
| "I'll use a platform key not on the supported list." | **STOP.** GitHub will silently ignore unsupported keys. Use the `custom` key for unsupported platforms. |
| "I'll add 5 custom URLs to cover all my links." | **STOP.** GitHub only supports a maximum of 4 custom URLs. |
| "I committed it to a feature branch for now." | **STOP.** The file must exist on the repository's **default branch** to be recognized. |
| "My custom URL has a colon and isn't quoted." | **STOP.** YAML will parse it incorrectly or fail. Wrap URLs containing `:` in double quotes (e.g., `"https://..."`). |

## Anti-Patterns

- ❌ **Using unsupported platform keys**: GitHub will not render them. Always fall back to the `custom` key.
- ❌ **Placing the file in the wrong branch**: The sponsor button will not appear in the UI if the file is not merged into the default branch.
- ❌ **Invalid YAML syntax**: Ensure arrays are properly formatted with `[` and `]`, and that strings containing special characters (like `:`) are quoted.

## Discovery Keywords

github sponsors, funding, donate, FUNDING.yml, sponsor button, repository settings, open collective, patreon, ko-fi, tidelift, custom funding link.
