# cobb-dev-agent-skills

Collection of personal agent skills for AI-assisted development.

## Skills

| Skill | Path | Description |
|-------|------|-------------|
| Oracle Dev | `oracle-dev/` | Project-specific Oracle Database schema and SQL standards (19c-first) |

## Installation

Install a skill by pointing at this repository and the skill folder:

```bash
npx skills add xamdxlonewolf/cobb-dev-agent-skills/oracle-dev
```

### Companion skill: Oracle Database (`db/`)

`oracle-dev` covers application schema conventions. For generic Oracle administration, performance, PL/SQL, SQLcl, ORDS, and agent-safe database workflows, also install the official Oracle Database domain:

```bash
npx skills add oracle/skills/db
```

## Repository layout

```text
cobb-dev-agent-skills/
├── README.md
└── oracle-dev/
    ├── SKILL.md
    ├── design/
    ├── devops/
    └── templates/
```

## oracle-dev quick start

1. Copy `oracle-dev/templates/oracle-schema-prefix.md` into your project as `oracle-schema-prefix.md`.
2. Fill in the application prefix, schema owner, and runtime users.
3. Agents read that file before creating tables, views, indexes, or seed scripts.
