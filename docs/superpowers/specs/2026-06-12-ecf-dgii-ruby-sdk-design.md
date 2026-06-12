# Design Spec: Add Ruby SDK to ecf-dgii-ssd Skill

## Overview
Update the `ecf-dgii-ssd` skill to include the newly added Ruby SDK for the Dominican Republic Electronic Invoicing (e-CF) integration.

## Proposed Changes

### 1. Copy Reference Documentation
- Source: `temp_ecf_dgii/ruby/README.md`
- Destination: `skills/ecf-dgii-ssd/references/ruby-README.md`

### 2. Update Skill Definition (`skills/ecf-dgii-ssd/SKILL.md`)
- Update metadata description triggers to include Ruby.
- Update `Activation Contract` to list Ruby.
- Update `Available SDKs and Documentation` to include Ruby SDK details:
  `- **Ruby**: references/ruby-README.md (gem 'ecf-dgii')`

### 3. Update Repository Configuration
- **`README.md`**: Update `ecf-dgii-ssd` description to list Ruby.
- **`AGENTS.md`**: Add `ecf-dgii-ssd` to the list of `Available Skills`.

## Verification Plan
- Verify that `skills/ecf-dgii-ssd/references/ruby-README.md` exists and contains correct content.
- Validate that all markdown links in `SKILL.md`, `README.md`, and `AGENTS.md` are valid and resolve correctly.
