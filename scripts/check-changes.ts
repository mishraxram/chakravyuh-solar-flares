// Prints the change register for a log. Run: node scripts/check-changes.ts <file>
import { readFileSync } from 'node:fs';
import { parseLog } from '../src/lib/parse.ts';
import { applyRules } from '../src/lib/rules.ts';
import { extractChanges } from '../src/lib/changes.ts';
for (const f of process.argv.slice(2)) {
  const r = parseLog(readFileSync(f, 'utf8'), 2026); applyRules(r.events);
  console.log(`== ${f}`);
  for (const c of extractChanges(r.events)) console.log(`#${c.n} ${c.timeText} ${c.user}@${c.ip} ${c.action} ${c.target} [${c.before} -> ${c.after}] ${c.status.toUpperCase()} (${c.reasons.length} reasons)`);
}
