---
name: github-issue-templates
description: Use when creating, updating, or configuring GitHub issue templates and forms. Triggers on tasks involving `.github/ISSUE_TEMPLATE`, YAML issue forms, `config.yml` for issue choosers, or standardizing bug reports and feature requests.
---

# GitHub Issue Templates

## Overview

**GitHub issue templates standardize how contributors report bugs, request features, or ask questions.** They ensure maintainers receive structured, actionable information, reducing back-and-forth triage.

**Core principle:** Templates must reside in the `.github/ISSUE_TEMPLATE/` directory and can be either simple Markdown (`.md`) files or highly structured YAML (`.yml`) forms. The YAML form schema is strongly preferred for bug reports and feature requests.

## File Structure & Ordering

```text
.github/
  ISSUE_TEMPLATE/
    config.yml                # Optional: Configures the template chooser UI
    1-bug-report.yml          # YAML form (numbered for explicit ordering)
    2-feature-request.yml     # YAML form
    3-documentation.md        # Fallback Markdown template
```

**Ordering Rule:** Templates are listed alphanumerically, grouped by file type (YAML before Markdown). To control the exact order in the UI, **prefix filenames with numbers** (e.g., `1-`, `2-`).

## YAML Form Schema Structure

A robust YAML issue form consists of top-level metadata and a `body` array of fields.

```yaml
name: Bug Report
description: File a bug report to help us improve.
title: "[Bug]: "
labels: ["bug", "triage"]
assignees:
  - octocat
type: bug
body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to fill out this bug report!
  - type: textarea
    id: what-happened
    attributes:
      label: What happened?
      description: Also tell us what you expected to happen.
      placeholder: Tell us what you see!
      value: "A bug happened!"
    validations:
      required: true
  - type: dropdown
    id: version
    attributes:
      label: Version
      options:
        - 1.0.2 (Default)
        - 1.0.3 (Edge)
      default: 0
    validations:
      required: true
  - type: textarea
    id: logs
    attributes:
      label: Relevant log output
      description: Please copy and paste any relevant log output.
      render: shell  # Automatically formats as a code block
  - type: checkboxes
    id: terms
    attributes:
      label: Code of Conduct
      options:
        - label: I agree to follow this project's Code of Conduct
          required: true
```

### Supported Field Types

- `markdown`: Static text/instructions.
- `input`: Single-line text (e.g., contact info, URLs).
- `textarea`: Multi-line text (use `render: shell` or `render: json` for automatic code formatting).
- `dropdown`: Single or multiple choice (`multiple: true`).
- `checkboxes`: List of boolean options.
- `upload`: File attachments (e.g., screenshots).

## Configuring the Template Chooser

Use `.github/ISSUE_TEMPLATE/config.yml` to control the user experience when clicking "New Issue".

```yaml
blank_issues_enabled: false
contact_links:
  - name: GitHub Community Support
    url: https://github.com/orgs/community/discussions
    about: Please ask and answer questions here.
  - name: Security Vulnerability
    url: https://example.com/security
    about: Please report security vulnerabilities here, not in public issues.
```

**Key Configuration Rules:**

- Set `blank_issues_enabled: false` to force users to select a template. (Users with Write/Maintain/Admin access will still see a "Maintainers only" blank issue option).
- Use `contact_links` to redirect off-topic questions, security reports, or discussions to the appropriate external channels.

## Workflow: Adding or Updating a Template

1. **Create/Edit the file**: Add or modify a `.yml` or `.md` file in `.github/ISSUE_TEMPLATE/`.
2. **Update `config.yml`**: If adding a new category, ensure `contact_links` or `blank_issues_enabled` still make sense.
3. **Number the filename**: Prefix with a number (e.g., `4-new-harness.yml`) to guarantee its position in the chooser.
4. **Commit to the default branch**: Templates only appear in the UI once merged into the repository's default branch.
5. **Test**: Open a new issue in the repository UI to verify the form renders correctly and required fields behave as expected.

## Red Flags — STOP

| Symptom / Rationalization | Correct Action |
| --- | --- |
| "I'll put the templates in `.github/templates/` to keep it short." | **STOP.** GitHub only recognizes `.github/ISSUE_TEMPLATE/`. |
| "I'll name the file `bug report.yml` with a space." | **STOP.** Use hyphens or underscores (e.g., `bug-report.yml`) to avoid URL encoding issues and ensure consistent alphanumeric sorting. |
| "I'll set `blank_issues_enabled: true` so users aren't restricted." | **STOP.** This defeats the purpose of templates. Set to `false` to enforce structured data; maintainers can still create blank issues. |
| "I'll ask for logs in a standard textarea without `render`." | **STOP.** Always use `render: shell` or `render: json` for log outputs so GitHub automatically formats them as code blocks. |
| "I'll put the `config.yml` in the root `.github/` folder." | **STOP.** The `config.yml` for the issue chooser must be inside `.github/ISSUE_TEMPLATE/`. |

## Anti-Patterns

- ❌ **Overly long forms**: Requiring 10+ fields causes contributor friction. Only ask for information that is strictly necessary for triage.
- ❌ **Vague descriptions**: Field descriptions should guide the user on *what* to provide (e.g., "Steps to reproduce" instead of "Details").
- ❌ **Forgetting `default` in dropdowns**: If a dropdown has a `default` index, ensure it points to a valid option (e.g., `default: 0` for the first item).
- ❌ **Duplicating labels in YAML and UI**: Rely on the `labels` array in the YAML frontmatter to auto-tag issues, rather than asking users to manually type labels in a text field.

## Discovery Keywords

github issue templates, issue forms, bug report template, feature request, config.yml, blank_issues_enabled, contact_links, YAML form schema, issue triage.
