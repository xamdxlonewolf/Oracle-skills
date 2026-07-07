---
name: oracle-dev-db
description: Project-specific Oracle Database schema and SQL development standards for 19c-first estates. Primary entry point for application schema work — your project naming, keys, audit columns, lookup patterns, and idempotent DDL take precedence over generic db/ guidance. Automatically consults the official oracle/skills db/ skill only for topics outside this domain (administration, performance tuning, PL/SQL package design, ORDS, SQLcl, agent-safe ops, drivers, frameworks). Use when creating or altering tables, views, indexes, constraints, sequences, seed data scripts, or idempotent DDL in application schemas.
---

# Oracle Dev DB Schema Skills

Project-tailored Oracle Database guidance for **SQL and schema object creation**. This domain reflects application development preferences, not generic Oracle documentation defaults.

## Install (your fork + official Oracle db)

This skill lives in **your** skills repo, not `oracle/skills`. Install both skills:

```bash
# Official Oracle Database skill — used only when this skill escalates
npx skills add oracle/skills/db

# Your project schema standards — primary entry point
npx skills add xamdxlonewolf/Oracle-skills/oracle-dev-db
```

You cannot publish custom skills to `oracle/skills`; keep `oracle-dev-db` in your fork and pair it with the official `db` skill at install time.

## Entry Point and Precedence (read first)

You were invoked through **`oracle-dev-db`**. Treat this domain as the **authoritative source** for application schema coding. The paired official **`db/`** skill from `oracle/skills` is available for everything else.

**Precedence rule — always apply in this order:**

1. **Check `oracle-dev-db/` first.** If the topic appears in the Category Routing table below, follow only `oracle-dev-db/` files. Do not substitute generic guidance from `db/design/`, `db/devops/`, or other `db/` paths when this skill covers the same concern.
2. **Escalate to official `db/` only when needed.** If the topic is outside `oracle-dev-db/` scope, read the installed `db/SKILL.md` (from `oracle/skills/db`) and route to the matching `db/` category.
3. **On overlap, `oracle-dev-db/` wins.** When both skills touch the same artifact (for example table DDL, column naming, PK/FK strategy, audit columns, seed scripts, or install-script style), apply this skill's standards and use `db/` only for the uncovered parts (for example explain plan, package bodies, or admin tasks in the same session).

| Stay in `oracle-dev-db/` (your standards win) | Escalate to official `db/` |
|-----------------------------------------------|----------------------------|
| Project prefix and object naming | Database administration, users, roles, tablespaces |
| Tables, columns, keys, constraints, indexes, views in app schemas | Performance tuning, AWR, ASH, explain plan, optimizer |
| Natural keys, lookup FKs, audit columns, status lifecycle | PL/SQL package design, collections, cursors, debugging |
| Hand-run idempotent install and seed scripts | Liquibase/Flyway-first migrations, online redefinition |
| 19c-first project DDL defaults | ORDS, SQLcl, JDBC/drivers, language frameworks |
| APEX export exclusions (never touch `apex/` or `f###.sql`) | Agent-safe destructive-op guards, schema discovery, ORA catalog |

## How to Use This Domain

1. **Read the project prefix file first** — see `design/project-prefix.md`.
2. Apply `design/schema-standards.md` for every new or changed object.
3. Use `devops/idempotent-ddl-scripts.md` for install scripts, seed data, and object deployment.
4. **Only if the task is outside the table above**, open the installed `db/SKILL.md` and follow its routing for the uncovered topic.

## Directory Structure

```text
oracle-dev-db/
├── design/
│   ├── project-prefix.md
│   └── schema-standards.md
├── devops/
│   └── idempotent-ddl-scripts.md
└── templates/
    └── oracle-schema-prefix.md
```

## Category Routing

| Topic | File |
|-------|------|
| Application prefix discovery and project-local config | `design/project-prefix.md` |
| Tables, columns, keys, constraints, indexes, views, data types, audit columns | `design/schema-standards.md` |
| Hand-run scripts, MERGE seeds, CREATE OR REPLACE, table-exists PL/SQL blocks | `devops/idempotent-ddl-scripts.md` |
| Blank prefix template to copy into a project repo | `templates/oracle-schema-prefix.md` |

## Key Starting Points

- `design/project-prefix.md`
- `design/schema-standards.md`
- `devops/idempotent-ddl-scripts.md`

## Common Multi-Step Flows

| Task | Recommended Sequence |
|------|----------------------|
| Add a new application table | `project-prefix.md` → `schema-standards.md` → `idempotent-ddl-scripts.md` |
| Add seed / reference data | `schema-standards.md` (lookup FK pattern) → `idempotent-ddl-scripts.md` (MERGE) |
| Add a view over app tables | `project-prefix.md` → `schema-standards.md` → `idempotent-ddl-scripts.md` |
| Need explain plan, AWR, or admin help | Escalate to official `db/performance/` or `db/admin/` |

## Relationship to official `db/`

| Prefer `oracle-dev-db/` | Prefer official `db/` |
|-------------------------|----------------------|
| Naming, PK strategy, audit columns, app schema layout | Generic Oracle data modeling examples |
| Natural keys, lookup FKs, status-based lifecycle | DW star schema, bitmap indexes, partitioning strategy |
| Hand-run idempotent install scripts | Liquibase/Flyway-first migration workflows |
| 19c-first project defaults | PL/SQL package design, error handling, collections |

## APEX and Export Exclusions

Never modify:

- Any `apex/` folder (Oracle APEX export)
- Root-level `f###.sql` files (APEX application exports, e.g. `f191.sql`)

Schema changes belong in the project's SQL script folders, not APEX exports.
