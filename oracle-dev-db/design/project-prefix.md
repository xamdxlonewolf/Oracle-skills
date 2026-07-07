# Project Prefix Discovery

## Overview

Application objects use a **project prefix** so they are distinguishable from other schemas, vendor tables, and shared database objects. The prefix applies to **all** creatable objects unless the table or view name already makes the application obvious from context.

Apply the prefix to:

- Tables
- Views
- Indexes
- Sequences
- Constraints (primary key, foreign key, unique, check)
- Standalone triggers (when not embedded in a package)

Do **not** guess a prefix when it cannot be inferred from the project.

---

## Step 1: Look for a Project-Local Config File

Before creating or renaming any object, search the project repository for:

```text
oracle-schema-prefix.md
```

Also check common alternates:

```text
.oracle/schema-prefix.md
docs/oracle-schema-prefix.md
database/oracle-schema-prefix.md
```

If the file exists, **use the prefix and schema settings documented there** for every object in that project. Do not invent a different prefix in the same repo.

---

## Step 2: Infer from Existing Objects

If no config file exists, inspect the target schema for an established pattern:

```sql
SELECT table_name
FROM   user_tables
WHERE  table_name NOT LIKE 'BIN$%'
ORDER  BY 1;
```

Look for a consistent leading token (for example `acme_orders`, `acme_customers` → prefix `acme_`).

---

## Step 3: Ask the User

If neither a config file nor an obvious pattern exists, **stop and ask**:

> What prefix should be used for Oracle objects in this project (e.g. `acme_`)?

After the user answers, **create** `oracle-schema-prefix.md` at the project root using `templates/oracle-schema-prefix.md` from this skill domain. Commit that file so future work stays consistent.

---

## Prefix Rules

| Rule | Detail |
|------|--------|
| Case | Lowercase, same as table naming (`acme_`) |
| Separator | Underscore between prefix and object name |
| Tables | `{prefix}{plural_noun}` → `acme_orders` |
| Views | `vw_{prefix}{name}` or `vw_{name}` with prefix in name → `vw_acme_active_orders` |
| Sequences | `seq_{prefix}{table}` → `seq_acme_orders` (only when not using identity) |
| Indexes | `idx_{prefix}{table}_…` → see `schema-standards.md` |
| Constraints | Keep `pk_`, `fk_`, `uq_`, `ck_` pattern with prefixed table names → `pk_acme_orders` |

---

## Example Project Config

See `templates/oracle-schema-prefix.md` for the canonical template.

---

## Oracle Version Notes (19c vs 26ai)

Prefix rules are version-independent.

## Sources

- Project convention (this domain)
- `oracle-dev-db/design/schema-standards.md`
