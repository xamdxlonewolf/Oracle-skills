# Push oracle-dev to cobb-dev-agent-skills

The `oracle-dev` skill is ready to add to `cobb-dev-agent-skills`. Automated push failed because the cloud agent does not have write access to that repository.

## Option A — Copy files (simplest)

From a machine with push access to `cobb-dev-agent-skills`:

```bash
git clone https://github.com/xamdxlonewolf/cobb-dev-agent-skills.git
cd cobb-dev-agent-skills

# Copy from this Oracle-skills branch (after merge) or from export/oracle-dev-copy/
cp -r /path/to/oracle-dev ./

# Use the Cobb README from export if desired, or merge README sections manually
git add oracle-dev/ README.md
git commit -m "Add oracle-dev skill for project schema standards"
git push origin main
```

## Option B — Apply patch

```bash
git clone https://github.com/xamdxlonewolf/cobb-dev-agent-skills.git
cd cobb-dev-agent-skills
git am /path/to/0001-Add-oracle-dev-skill-for-project-schema-standards.patch
git push origin main
```

## Option C — From Oracle-skills PR branch

```bash
git clone https://github.com/xamdxlonewolf/Oracle-skills.git
cd Oracle-skills
git checkout cursor/oracle-dev-skill-ed6e
cp -r oracle-dev /path/to/cobb-dev-agent-skills/
```

Then update `cobb-dev-agent-skills/README.md` with install instructions (see `export/oracle-dev-copy/../README` in the prepared clone).

## Install after merge

```bash
npx skills add xamdxlonewolf/cobb-dev-agent-skills/oracle-dev
npx skills add oracle/skills/db
```

## What changed for Cobb repo

- Full `oracle-dev/` folder (5 skill files)
- Updated `README.md` with skill table and install commands
- `oracle-dev/SKILL.md` references `oracle/skills/db` as external companion skill
