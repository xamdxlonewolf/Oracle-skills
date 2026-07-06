---
name: oracle-dev
description: Project-specific Oracle Database schema and SQL development standards for 19c-first estates. Use when creating or altering tables, views, indexes, constraints, sequences, seed data scripts, or idempotent DDL in application schemas. Covers naming conventions, natural keys, audit columns, lookup-table patterns, hand-run migration scripts, and project prefix discovery. Does not replace the generic db/ domain for administration, performance tuning, PL/SQL package design, ORDS, or agent-safe operations — route those to db/ when needed.
---

# Oracle Dev Schema Skills

Project-tailored Oracle Database guidance for **SQL and schema object creation**. This domain reflects Cobb County application development preferences, not generic Oracle documentation defaults.

For administration, performance, security, PL/SQL patterns, SQLcl, ORDS, and broad Oracle Database topics, install and use the **`db/`** domain from [oracle/skills](https://github.com/oracle/skills):

```bash
npx skills add oracle/skills/db
```

## How to Use This Domain

1. **Read the project prefix file first** — see `design/project-prefix.md`.
2. Apply `design/schema-standards.md` for every new or changed object.
3. Use `devops/idempotent-ddl-scripts.md` for install scripts, seed data, and object deployment.
4. Fall back to the external **`db/`** skill from `oracle/skills` for topics not covered here.

## Directory Structure

```text
oracle-dev/
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
| Need explain plan, AWR, or admin help | Install `oracle/skills/db` → `db/performance/` or `db/admin/` |

## Relationship to `db/` (oracle/skills)

Install both skills when doing database work:

```bash
npx skills add xamdxlonewolf/cobb-dev-agent-skills/oracle-dev
npx skills add oracle/skills/db
```

| Prefer `oracle-dev/` | Prefer `db/` |
|----------------------|--------------|
| Naming, PK strategy, audit columns, app schema layout | Generic Oracle data modeling examples |
| Natural keys, lookup FKs, status-based lifecycle | DW star schema, bitmap indexes, partitioning strategy |
| Hand-run idempotent install scripts | Liquibase/Flyway-first migration workflows |
| 19c-first project defaults | PL/SQL package design, error handling, collections |

## APEX and Export Exclusions

Never modify:

- Any `apex/` folder (Oracle APEX export)
- Root-level `f###.sql` files (APEX application exports, e.g. `f191.sql`)

Schema changes belong in the project's SQL script folders, not APEX exports.
