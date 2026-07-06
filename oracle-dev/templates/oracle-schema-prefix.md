# Oracle Schema Prefix

> Copy this file to your **project repository root** as `oracle-schema-prefix.md`.
> Agents and developers must read this file before creating Oracle objects in this project.

## Application

| Setting | Value |
|---------|-------|
| Application name | _e.g. Acme Order Management_ |
| Object prefix | _e.g. `acme_`_ |
| Schema owner | _e.g. `ACME_APP`_ |
| Application runtime user | _e.g. `ACME_USER`_ |
| Install / migration user | _e.g. `ACME_DDL`_ |

## Prefix Rules

- Prefix: **`acme_`** (lowercase, trailing underscore)
- Applies to: tables, views, indexes, sequences, constraints
- Table names: plural lowercase → `acme_orders`
- Views: `vw_` prefix → `vw_acme_open_orders`

## Status Lookup Codes

Document canonical status values here so seeds and application code stay aligned:

| Table | Code column | Values |
|-------|-------------|--------|
| `acme_order_statuses` | `status_code` | `OPEN`, `SHIPPED`, `CANCELLED` |
| `acme_record_statuses` | `status_code` | `ACTIVE`, `INACTIVE` |

## Index Numbering

When a table has multiple indexes, use numeric suffixes:

| Table | Indexes |
|-------|---------|
| `acme_orders` | `idx_acme_orders_customer_id`, `idx_acme_orders_2` |

## Notes

_Add project-specific exceptions, legacy table names without prefix, or integration schemas here._
