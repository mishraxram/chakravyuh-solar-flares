// Quick check: run parser + rules on the sample files and print the flags.
// Run: node scripts/check-rules.ts
import { readFileSync } from 'node:fs';
import { parseLog } from '../src/lib/parse.ts';
import { applyRules, ruleVerdict } from '../src/lib/rules.ts';

for (const f of process.argv.slice(2).length ? process.argv.slice(2) : [
  'public/samples/erp-marks-tamper.csv',
  'public/samples/ssh-bruteforce.log',
  'public/samples/hinglish-case.csv',
]) {
  const r = parseLog(readFileSync(f, 'utf8'), 2026);
  applyRules(r.events);
  const v = ruleVerdict(r.events);
  console.log(`\n== ${f}: ${r.events.length} events, ${r.unparsed.length} not understood, risk=${v.level} (high ${v.high}, medium ${v.medium})`);
  for (const e of r.events) if (e.flags.length) console.log(`#${e.n} ${e.timeText} ${e.user} ${e.action} -> ${e.flags.map((x) => x.code).join(', ')}`);
}
