# Add Ruby SDK to ecf-dgii-ssd Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Ruby SDK documentation, update the `ecf-dgii-ssd` skill definition, and update the repository index files (`AGENTS.md`, `README.md`) to include Ruby support.

**Architecture:** Copy reference documentation from the cloned repository, update the skill's triggers and list of supported languages, and ensure all references are correctly indexed.

**Tech Stack:** Markdown, Git, Bash

---

### Task 1: Copy Reference Documentation

**Files:**
- Create: `skills/ecf-dgii-ssd/references/ruby-README.md`

- [ ] **Step 1: Copy Ruby README**

Run:
```bash
cp temp_ecf_dgii/ruby/README.md skills/ecf-dgii-ssd/references/ruby-README.md
```

- [ ] **Step 2: Verify copy operation**

Run:
```bash
ls -l skills/ecf-dgii-ssd/references/ruby-README.md
```
Expected: File exists and has a size of around 9791 bytes.

- [ ] **Step 3: Commit changes**

Run:
```bash
git add skills/ecf-dgii-ssd/references/ruby-README.md
git commit -m "docs: add ruby-README reference documentation for ecf-dgii-ssd"
```

---

### Task 2: Update Skill Definition

**Files:**
- Modify: `skills/ecf-dgii-ssd/SKILL.md`

- [ ] **Step 1: Modify SKILL.md**

Update the skill file content to include Ruby in the description, activation contract, and available SDKs list.

Target content in `skills/ecf-dgii-ssd/SKILL.md`:
```markdown
description: "Trigger: ECF DGII, SSD, República Dominicana, facturación electrónica, comprobantes fiscales, ECF, SDK, e-CF. Expert guidance for integrating Dominican Republic electronic invoicing using ECF SSD SDKs (.NET, TypeScript, React, Python, Java, Kotlin, iOS, C++)."
```
Replacement:
```markdown
description: "Trigger: ECF DGII, SSD, República Dominicana, facturación electrónica, comprobantes fiscales, ECF, SDK, e-CF. Expert guidance for integrating Dominican Republic electronic invoicing using ECF SSD SDKs (.NET, TypeScript, React, Python, Ruby, Java, Kotlin, iOS, C++)."
```

Target content in `skills/ecf-dgii-ssd/SKILL.md`:
```markdown
- The user mentions ECF SSD, DGII SDKs, or e-CF integration in any supported language (.NET, TypeScript, React, Python, Java, Kotlin, iOS, C++).
```
Replacement:
```markdown
- The user mentions ECF SSD, DGII SDKs, or e-CF integration in any supported language (.NET, TypeScript, React, Python, Ruby, Java, Kotlin, iOS, C++).
```

Target content in `skills/ecf-dgii-ssd/SKILL.md`:
```markdown
- **Python**: `references/python-README.md` (`pip install ecf-dgii`)
- **Java**: `references/java-README.md` (`implementation 'do.com.ssd.ecfx:ecf-dgii-sdk-java:1.0.0'`)
```
Replacement:
```markdown
- **Python**: `references/python-README.md` (`pip install ecf-dgii`)
- **Ruby**: `references/ruby-README.md` (`gem 'ecf-dgii'`)
- **Java**: `references/java-README.md` (`implementation 'do.com.ssd.ecfx:ecf-dgii-sdk-java:1.0.0'`)
```

- [ ] **Step 2: Commit SKILL.md changes**

Run:
```bash
git add skills/ecf-dgii-ssd/SKILL.md
git commit -m "docs: update ecf-dgii-ssd skill definition with ruby sdk support"
```

---

### Task 3: Update AGENTS.md

**Files:**
- Modify: `AGENTS.md`

- [ ] **Step 1: Add ecf-dgii-ssd to AGENTS.md**

Target content in `AGENTS.md`:
```markdown
- **ef2-api**: [skills/ef2-api/SKILL.md](skills/ef2-api/SKILL.md)
```
Replacement:
```markdown
- **ecf-dgii-ssd**: [skills/ecf-dgii-ssd/SKILL.md](skills/ecf-dgii-ssd/SKILL.md)
- **ef2-api**: [skills/ef2-api/SKILL.md](skills/ef2-api/SKILL.md)
```

- [ ] **Step 2: Commit AGENTS.md changes**

Run:
```bash
git add AGENTS.md
git commit -m "docs: add ecf-dgii-ssd to available skills in AGENTS.md"
```

---

### Task 4: Update README.md

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add Ruby to ecf-dgii-ssd description in README.md**

Target content in `README.md`:
```markdown
- **ecf-dgii-ssd**: ECF SSD SDKs and integration guidelines for Dominican Republic electronic invoicing (e-CF), supporting multiple languages (.NET, TypeScript, React, Python, Java, Kotlin, iOS, C++).
```
Replacement:
```markdown
- **ecf-dgii-ssd**: ECF SSD SDKs and integration guidelines for Dominican Republic electronic invoicing (e-CF), supporting multiple languages (.NET, TypeScript, React, Python, Ruby, Java, Kotlin, iOS, C++).
```

- [ ] **Step 2: Commit README.md changes**

Run:
```bash
git add README.md
git commit -m "docs: update ecf-dgii-ssd description in README.md with ruby support"
```

---

### Task 5: Clean Up

**Files:**
- Delete: `temp_ecf_dgii` (directory)

- [ ] **Step 1: Delete cloned temp directory**

Run:
```bash
rm -rf temp_ecf_dgii
```

- [ ] **Step 2: Verify git status is clean**

Run:
```bash
git status
```
Expected: Clean working tree.
