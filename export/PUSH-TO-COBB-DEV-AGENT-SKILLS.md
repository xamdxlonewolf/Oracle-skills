# Push oracle-dev-db to cobb-dev-agent-skills

## Copy README and skill folder

From a machine with push access to `cobb-dev-agent-skills`:

```bash
git clone https://github.com/xamdxlonewolf/cobb-dev-agent-skills.git
cd cobb-dev-agent-skills

git clone https://github.com/xamdxlonewolf/Oracle-skills.git /tmp/oracle-skills
cd /tmp/oracle-skills && git checkout cursor/oracle-dev-skill-ed6e

# Skill files → oracle-dev-db/
cp -r export/oracle-dev-copy /path/to/cobb-dev-agent-skills/oracle-dev-db
# Apply the 5 renames listed in export/AGENT-SETUP-README.md (Initial setup section)

# Official README
cp export/AGENT-SETUP-README.md /path/to/cobb-dev-agent-skills/README.md

cd /path/to/cobb-dev-agent-skills
git add oracle-dev-db/ README.md
git commit -m "Add oracle-dev-db skill and official README"
git push origin main
```

## Install after merge

```bash
npx skills add xamdxlonewolf/cobb-dev-agent-skills/oracle-dev-db
npx skills add oracle/skills/db
```
