# Cobb Agent Setup: oracle-dev-db Skill

> **Copy this entire document into the agent running on `cobb-dev-agent-skills`.**
> It explains what to build, how the skill works, how the per-project config file works, and how to install it.

---

## Part 1 — Agent task: add the skill to this repo

### Goal

Add an Oracle schema development skill to `cobb-dev-agent-skills` on the `main` branch, in folder **`oracle-dev-db/`**.

This skill holds **project-specific** rules for creating tables, views, indexes, constraints, and SQL install scripts. It is **not** a copy of Oracle's generic `db/` documentation skill.

### Source files

Copy from the Oracle-skills repo, branch `cursor/oracle-dev-skill-ed6e`:

| File | Raw URL |
|------|---------|
| `SKILL.md` | https://raw.githubusercontent.com/xamdxlonewolf/Oracle-skills/cursor/oracle-dev-skill-ed6e/export/oracle-dev-copy/SKILL.md |
| `design/project-prefix.md` | https://raw.githubusercontent.com/xamdxlonewolf/Oracle-skills/cursor/oracle-dev-skill-ed6e/export/oracle-dev-copy/design/project-prefix.md |
| `design/schema-standards.md` | https://raw.githubusercontent.com/xamdxlonewolf/Oracle-skills/cursor/oracle-dev-skill-ed6e/export/oracle-dev-copy/design/schema-standards.md |
| `devops/idempotent-ddl-scripts.md` | https://raw.githubusercontent.com/xamdxlonewolf/Oracle-skills/cursor/oracle-dev-skill-ed6e/export/oracle-dev-copy/devops/idempotent-ddl-scripts.md |
| `templates/oracle-schema-prefix.md` | https://raw.githubusercontent.com/xamdxlonewolf/Oracle-skills/cursor/oracle-dev-skill-ed6e/export/oracle-dev-copy/templates/oracle-schema-prefix.md |

### Target folder layout

```text
cobb-dev-agent-skills/
├── README.md
└── oracle-dev-db/
    ├── SKILL.md
    ├── design/
    │   ├── project-prefix.md
    │   └── schema-standards.md
    ├── devops/
    │   └── idempotent-ddl-scripts.md
    └── templates/
        └── oracle-schema-prefix.md
```

### Required edits after copy (oracle-dev → oracle-dev-db)

Only **5 lines** need changing. All other files copy as-is.

**In `oracle-dev-db/SKILL.md`:**

| # | Find | Replace with |
|---|------|--------------|
| 1 | `name: oracle-dev` | `name: oracle-dev-db` |
| 2 | `oracle-dev/` (in the directory tree block only) | `oracle-dev-db/` |
| 3 | `npx skills add xamdxlonewolf/cobb-dev-agent-skills/oracle-dev` | `npx skills add xamdxlonewolf/cobb-dev-agent-skills/oracle-dev-db` |
| 4 | `Prefer \`oracle-dev/\`` (table header) | `Prefer \`oracle-dev-db/\`` |

**In `oracle-dev-db/design/project-prefix.md`:**

| # | Find | Replace with |
|---|------|--------------|
| 5 | `oracle-dev/design/schema-standards.md` | `oracle-dev-db/design/schema-standards.md` |

### Update root README.md

Replace or extend the repo README with the content in **Part 4** below.

### Commit and push

```bash
git add oracle-dev-db/ README.md
git commit -m "Add oracle-dev-db skill for Oracle schema standards"
git push origin main
```

---

## Part 2 — How this skill system works

### Two skills, two jobs

| Skill | Where it lives | What it is for |
|-------|----------------|----------------|
| **`oracle-dev-db`** | `cobb-dev-agent-skills/oracle-dev-db/` | Project rules: naming, keys, audit columns, install scripts |
| **`db`** | [oracle/skills](https://github.com/oracle/skills) `db/` | Generic Oracle: admin, performance, PL/SQL, SQLcl, ORDS, tuning |

Install **both** when doing database work:

```bash
npx skills add xamdxlonewolf/cobb-dev-agent-skills/oracle-dev-db
npx skills add oracle/skills/db
```

### When the agent uses which skill

| Task | Use |
|------|-----|
| Create a table, view, index, or constraint | `oracle-dev-db` |
| Write a MERGE seed script or idempotent install script | `oracle-dev-db` |
| Decide naming, PK type, audit columns, status lookups | `oracle-dev-db` |
| Tune a slow query, read AWR, explain plan | `db/performance/` |
| Design a PL/SQL package | `db/plsql/` |
| SQLcl, Liquibase, ORDS setup | `db/sqlcl/` or `db/ords/` |

### Skill file routing (inside oracle-dev-db)

```text
oracle-dev-db/
├── SKILL.md                          ← start here (table of contents)
├── design/
│   ├── project-prefix.md             ← how to find/ask for the app prefix
│   └── schema-standards.md           ← tables, columns, keys, indexes, types
├── devops/
│   └── idempotent-ddl-scripts.md     ← install.sql, MERGE seeds, table-exists blocks
└── templates/
    └── oracle-schema-prefix.md       ← blank template for application repos
```

### Agent workflow for schema work

```text
1. Read oracle-schema-prefix.md in the APPLICATION repo (not this skills repo)
2. Read oracle-dev-db/design/schema-standards.md
3. Write DDL following those rules
4. Wrap in idempotent scripts per oracle-dev-db/devops/idempotent-ddl-scripts.md
5. If stuck on generic Oracle behavior → use oracle/skills/db
```

### What this skill enforces (summary)

| Topic | Rule |
|-------|------|
| Table names | Plural, lowercase (`acme_orders`) |
| Column names | Lowercase snake_case (`order_id`) |
| Prefix | Required on all objects — from project config file |
| Primary keys | **Natural keys** by default; surrogate `NUMBER` identity only when needed |
| Identity columns | `GENERATED BY DEFAULT ON NULL AS IDENTITY` |
| Audit columns | **Required on every table:** `created_by`, `created`, `modified_by`, `modified` |
| Status / lifecycle | `status_code` column → lookup table FK (not soft-delete flags) |
| Booleans (19c) | `NUMBER(1,0)` + CHECK |
| Timestamps | `TIMESTAMP` (default `SYSTIMESTAMP` on `created`) |
| FK indexes | **Must create** — Oracle does not auto-index child FK columns |
| Tablespaces | Omit from DDL |
| Migrations | Hand-run scripts; MERGE for seeds; PL/SQL exists-check for tables |
| APEX exports | **Never modify** `apex/` folders or `f###.sql` files |

---

## Part 3 — How the project file works (`oracle-schema-prefix.md`)

### What it is

`oracle-schema-prefix.md` is a **per-application-repo** config file. It does **not** live in `cobb-dev-agent-skills`. It lives in **each application project** that uses Oracle.

Agents must read this file **before creating any database object** in that project.

### Where to put it

Copy the template from:

```text
cobb-dev-agent-skills/oracle-dev-db/templates/oracle-schema-prefix.md
```

Into the **application project root** as:

```text
your-app-repo/
└── oracle-schema-prefix.md
```

Also acceptable locations (agent should check all):

```text
.oracle/schema-prefix.md
docs/oracle-schema-prefix.md
database/oracle-schema-prefix.md
```

### What goes in it

```markdown
# Oracle Schema Prefix

## Application

| Setting | Value |
|---------|-------|
| Application name | My Application |
| Object prefix | `myapp_` |
| Schema owner | `MYAPP_OWNER` |
| Application runtime user | `MYAPP_USER` |
| Install / migration user | `MYAPP_DDL` |

## Prefix Rules

- Prefix: `myapp_` (lowercase, trailing underscore)
- Tables: `myapp_orders`, `myapp_statuses`
- Views: `vw_myapp_open_orders`
- Indexes: `idx_myapp_orders_1`

## Status Lookup Codes

| Table | Code column | Values |
|-------|-------------|--------|
| `myapp_record_statuses` | `status_code` | `ACTIVE`, `INACTIVE` |
| `myapp_order_statuses` | `status_code` | `DRAFT`, `SUBMITTED`, `APPROVED`, `REJECTED` |
```

### How agents use it

```text
Step 1  Search application repo for oracle-schema-prefix.md
        ↓ found?
        YES → use prefix and schema users from that file
        NO  → Step 2

Step 2  Query existing tables for a naming pattern (e.g. perm_orders → perm_)
        ↓ pattern found?
        YES → use that prefix; offer to create oracle-schema-prefix.md
        NO  → Step 3

Step 3  ASK THE USER: "What prefix should Oracle objects use in this project?"
        ↓ user answers
        Create oracle-schema-prefix.md from template; commit to app repo
```

### Why it matters

Without this file, agents may invent inconsistent prefixes (`app_` vs `acme_` vs no prefix) across sessions. The file is the **single source of truth** for:

- Object prefix (`myapp_`, `acme_`, etc.)
- Which schema owner vs runtime user to reference in grants
- Canonical status codes for lookup tables and seeds
- Index numbering when a table has multiple indexes

### Example: object names with prefix `myapp_`

| Object type | Name |
|-------------|------|
| Table | `myapp_orders` |
| View | `vw_myapp_open_orders` |
| PK constraint | `pk_myapp_orders` |
| FK constraint | `fk_myapp_order_items_myapp_orders` |
| Index | `idx_myapp_orders_customer_id` |
| Sequence (if used) | `seq_myapp_orders` |

---

## Part 4 — Root README.md for cobb-dev-agent-skills

Use this as the repo README after adding the skill:

```markdown
# cobb-dev-agent-skills

Collection of personal agent skills for AI-assisted development.

## Skills

| Skill | Path | Description |
|-------|------|-------------|
| Oracle Dev DB | `oracle-dev-db/` | Oracle schema and SQL standards (19c-first) |

## Installation

Install this skill and the generic Oracle Database companion skill:

```bash
npx skills add xamdxlonewolf/cobb-dev-agent-skills/oracle-dev-db
npx skills add oracle/skills/db
```

### Claude Code plugin (optional)

```bash
/plugin marketplace add xamdxlonewolf/cobb-dev-agent-skills
```

## How it works

1. **Install** `oracle-dev-db` (project rules) and `db` (generic Oracle docs).
2. **Per project:** copy `oracle-dev-db/templates/oracle-schema-prefix.md` into your application repo as `oracle-schema-prefix.md` and fill in the prefix and schema users.
3. **Agents** read `oracle-schema-prefix.md` first, then follow `oracle-dev-db/design/schema-standards.md` when writing DDL.

## Repository layout

```text
cobb-dev-agent-skills/
├── README.md
└── oracle-dev-db/
    ├── SKILL.md
    ├── design/
    ├── devops/
    └── templates/
        └── oracle-schema-prefix.md   ← copy this into each app repo
```

## Quick start (application project)

```bash
# 1. Install skills (once per machine / agent environment)
npx skills add xamdxlonewolf/cobb-dev-agent-skills/oracle-dev-db
npx skills add oracle/skills/db

# 2. In your application repo, create the project config
cp path/to/oracle-dev-db/templates/oracle-schema-prefix.md ./oracle-schema-prefix.md
# Edit: set object prefix, schema owner, runtime users, status codes

# 3. Agent creates schema objects following oracle-dev-db standards
```

## What oracle-dev-db covers

- Lowercase plural table names with project prefix
- Natural primary keys; surrogate identity columns when needed
- Mandatory audit columns: `created_by`, `created`, `modified_by`, `modified`
- Status via lookup tables (not soft-delete flags)
- Hand-run idempotent SQL scripts (MERGE seeds, table-exists PL/SQL blocks)
- Never touch APEX exports (`apex/` folders, `f###.sql` files)

## Oracle version

19c is the current baseline. Syntax should remain compatible with 26ai where practical.
```

---

## Part 5 — Install reference (for developers and agents)

### Install skills

```bash
npx skills add xamdxlonewolf/cobb-dev-agent-skills/oracle-dev-db
npx skills add oracle/skills/db
```

### Set up a new application project

1. Copy `oracle-dev-db/templates/oracle-schema-prefix.md` → `oracle-schema-prefix.md` in the app repo.
2. Fill in prefix, schema owner, app user, DDL user, and status codes.
3. Commit `oracle-schema-prefix.md` to the app repo.
4. Create SQL scripts under a folder such as `database/` using patterns from `oracle-dev-db/devops/idempotent-ddl-scripts.md`.

### Typical application repo layout

```text
my-app/
├── oracle-schema-prefix.md       ← project config (required)
├── database/
│   ├── install.sql
│   ├── tables/
│   │   └── perm_applications.sql
│   ├── indexes/
│   │   └── perm_applications.sql
│   ├── views/
│   │   └── vw_perm_open_applications.sql
│   └── seeds/
│       └── perm_statuses.sql
└── apex/                         ← NEVER modify (APEX export)
```

### Re-install or update skills

```bash
npx skills add xamdxlonewolf/cobb-dev-agent-skills/oracle-dev-db --force
npx skills add oracle/skills/db --force
```

---

## Part 6 — Exclusions (do not touch)

Agents must **never** modify:

- Any `apex/` folder (Oracle APEX export)
- Root-level `f###.sql` files (e.g. `f191.sql` — APEX app exports)

Schema DDL belongs in `database/` (or equivalent) script folders, not in APEX exports.
