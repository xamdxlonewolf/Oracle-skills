#!/usr/bin/env node
/**
 * Reinstall / update official Oracle skills and your custom oracle-dev-db skill
 * via the skills CLI. Uses `skills add` (reliable) instead of `skills update`.
 *
 * Usage:
 *   npx github:xamdxlonewolf/Oracle-skills sync-oracle-skills
 *   npx . sync-oracle-skills
 *   npx . sync-oracle-skills --global
 *   npx . sync-oracle-skills --check
 *   npx . sync-oracle-skills --official-only
 *   npx . sync-oracle-skills --custom-only
 */

import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');

function loadConfig() {
  const configPath = join(repoRoot, 'sync-skills.config.json');
  return JSON.parse(readFileSync(configPath, 'utf8'));
}

function parseArgs(argv) {
  return {
    check: argv.includes('--check') || argv.includes('-n'),
    global: argv.includes('--global') || argv.includes('-g'),
    officialOnly: argv.includes('--official-only'),
    customOnly: argv.includes('--custom-only'),
    help: argv.includes('--help') || argv.includes('-h'),
  };
}

function printHelp() {
  console.log(`sync-oracle-skills — reinstall official + custom Oracle skills

Usage:
  npx github:xamdxlonewolf/Oracle-skills sync-oracle-skills [options]

Options:
  --check, -n       Show what would run without installing
  --global, -g      Pass -g to skills add (global install)
  --official-only   Update only oracle/skills/* entries from config
  --custom-only     Update only your fork entries from config
  --help, -h        Show this help

Config: sync-skills.config.json at repo root (edit official/custom lists)

Examples:
  npx github:xamdxlonewolf/Oracle-skills sync-oracle-skills
  npx github:xamdxlonewolf/Oracle-skills sync-oracle-skills --global
  npx . sync-oracle-skills --check
`);
}

function runSkillsAdd(skillsCli, source, flags) {
  const args = ['-y', skillsCli, 'add', source, ...flags];
  console.log(`\n> npx ${args.join(' ')}`);

  if (process.env.SYNC_ORACLE_SKILLS_CHECK === '1') {
    return 0;
  }

  const result = spawnSync('npx', args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  return result.status ?? 1;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const config = loadConfig();
  const flags = [...(config.defaultFlags ?? ['-y'])];
  if (args.global) {
    flags.push('-g');
  }

  const official = args.customOnly ? [] : (config.official ?? []);
  const custom = args.officialOnly ? [] : (config.custom ?? []);
  const sources = [...official, ...custom];

  if (sources.length === 0) {
    console.error('No skill sources selected. Check flags or sync-skills.config.json.');
    process.exit(1);
  }

  console.log('Oracle skills sync');
  console.log('  Official:', official.length ? official.join(', ') : '(skipped)');
  console.log('  Custom:  ', custom.length ? custom.join(', ') : '(skipped)');

  if (args.check) {
    process.env.SYNC_ORACLE_SKILLS_CHECK = '1';
    for (const source of sources) {
      runSkillsAdd(config.skillsCli ?? 'skills', source, flags);
    }
    console.log('\n(check only — nothing installed)');
    return;
  }

  for (const source of sources) {
    const code = runSkillsAdd(config.skillsCli ?? 'skills', source, flags);
    if (code !== 0) {
      console.error(`\nFailed installing ${source} (exit ${code}).`);
      process.exit(code);
    }
  }

  console.log('\nDone. Installed / refreshed:');
  for (const source of sources) {
    console.log(`  - ${source}`);
  }
}

main();
