---
name: db
description: Oracle Database guidance for SQL, PL/SQL, SQLcl, ORDS, administration, app development, performance, security, migrations, and agent-safe database workflows. Use when the user asks to write, edit, rewrite, review, format, debug, tune, or explain SQL; create or refactor PL/SQL; use SQLcl, Liquibase, ORDS, JDBC, node-oracledb, Python, Java, .NET, or database frameworks; troubleshoot queries, sessions, locks, waits, indexes, optimizer plans, AWR, ASH, migrations, schemas, users, roles, privileges, backup, recovery, Data Guard, RAC, multitenant, containers, monitoring, auditing, encryption, VPD, or safe agent database operations.
---

# Oracle Database Skills

This domain contains Oracle Database skills for administration, SQL and PL/SQL development, performance tuning, security, ORDS, SQLcl, migrations, frameworks, OCR container guidance, and agent-safe database workflows.

## How to Use This Domain

1. Start with the routing table below.
2. Read only the specific file or category you need.

## Paired Skill: `oracle-dev/` (project schema standards)

When the user invoked **`oracle-dev`** (project dev DB skill) or the task is **application schema DDL** in a project repo, **`oracle-dev/` takes precedence** over generic `db/` guidance for coding standards.

**Defer to `oracle-dev/` instead of this domain for:**

- Project prefix discovery and object naming
- Application tables, columns, keys, constraints, indexes, and views
- Natural keys, lookup FKs, audit columns, and status-based lifecycle
- Hand-run idempotent install scripts and MERGE seed data
- APEX export exclusions (`apex/` folders and root `f###.sql` files)

**Stay in `db/` when `oracle-dev/` does not cover the topic**, including administration, performance tuning, PL/SQL package design, ORDS, SQLcl, drivers, frameworks, migrations from other databases, security hardening, backup/recovery, and agent-safe operational workflows.

If both skills apply in one session (for example "add a table and tune the insert SQL"), use `oracle-dev/` for the DDL shape and `db/` only for the uncovered work (for example `db/performance/` or `db/plsql/`).

## Directory Structure

```text
db/
├── admin/
├── agent/
├── appdev/
├── architecture/
├── backup-recovery/
├── containers/
├── design/
├── devops/
├── features/
├── frameworks/
├── migrations/
├── monitoring/
├── ords/
├── performance/
├── plsql/
├── security/
├── sql-dev/
└── sqlcl/
```

## Category Routing

| Topic | Directory |
|-------|-----------|
| Data Guard, redo/undo logs, users | `db/admin/` |
| Safe DML, destructive operation guards, idempotency, schema discovery, ORA- error handling | `db/agent/` |
| JDBC, pooling, JSON, XML, spatial, Oracle Text, transactions, MLE, language drivers | `db/appdev/` |
| RAC, Multitenant, Exadata, In-Memory, OCI database services, Data Guard architecture | `db/architecture/` |
| Backup, recovery, RMAN, Autonomous Recovery Service, Cloud Protect | `db/backup-recovery/` |
| OCR database-category container images and pull guidance | `db/containers/` |
| ERD, data modeling, partitioning, tablespaces | `db/design/` |
| Schema migrations, online operations, edition-based redefinition, testing, version control | `db/devops/` |
| AQ, DBMS_SCHEDULER, materialized views, DBLinks, APEX, vector search, SELECT AI | `db/features/` |
| SQLAlchemy, Django, Pandas, Spring JPA, MyBatis, TypeORM, Sequelize, Dapper, GORM | `db/frameworks/` |
| Migrations from PostgreSQL, MySQL, SQL Server, MongoDB, Snowflake, and more | `db/migrations/` |
| Alert log, ADR, health monitor, space management, top SQL | `db/monitoring/` |
| ORDS architecture, installation, REST design, authentication, monitoring, ORDS Concert Sample App | `db/ords/` |
| AWR, ASH, explain plan, indexes, optimizer stats, wait events, memory | `db/performance/` |
| Package design, error handling, performance, collections, cursors, debugging | `db/plsql/` |
| Privileges, VPD, masking, auditing, encryption, network security | `db/security/` |
| SQL tuning, SQL patterns, dynamic SQL, injection avoidance | `db/sql-dev/` |
| SQLcl basics, scripting, Liquibase, formatting, DDL generation, data loading, MCP server, scheduler daemon, AWR, background jobs, schema comparison with DIFF | `db/sqlcl/` |

## Key Starting Points

- `db/sqlcl/sqlcl-mcp-server.md`
- `db/migrations/migration-assessment.md`
- `db/performance/explain-plan.md`
- `db/plsql/plsql-package-design.md`
- `db/appdev/java-oracle-jdbc.md`
- `db/devops/schema-migrations.md`
- `db/agent/schema-discovery.md`
- `db/containers/container-selection-matrix.md`
- `db/backup-recovery/autonomous-recovery-service.md`
- `db/backup-recovery/cloud-protect.md`

## Common Multi-Step Flows

| Task | Recommended Sequence |
|------|----------------------|
| Diagnose a slow query | `explain-plan` → `wait-events` → `optimizer-stats` → `awr-reports` |
| Plan a migration | `migration-assessment` → `oracle-migration-tools` → source-specific `migrate-*.md` → `migration-cutover-strategy` |
| Build RAG on Oracle Database | `ai-profiles` → `vector-search` → `dbms-vector` |
| Build a Java JDBC service | `java-oracle-jdbc` → `java-oracle-jdbc/dependencies` → `java-oracle-jdbc/connections` → `java-oracle-jdbc/sql` → `java-oracle-jdbc/pooling-production` |
| Perform agent-safe schema change | `schema-discovery` → `destructive-op-guards` → `idempotency-patterns` → `schema-migrations` |
| Set up AI-driven database access via MCP | `sqlcl-basics` (save connections) → `security/privilege-management` (least-privilege user) → `sqlcl-mcp-server` (configure + start) |
