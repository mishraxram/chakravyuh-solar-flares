// Checks SHA-256 + tamper detection on a sample. Run: node scripts/check-hash.ts
import { readFileSync } from 'node:fs';
import { lockEvidence, verifyEvidence } from '../src/lib/evidence.ts';
const text = readFileSync('public/samples/erp-marks-tamper.csv', 'utf8');
const ev = await lockEvidence('erp-marks-tamper.csv', text);
console.log('locked  ', ev.hash);
console.log('same    ', (await verifyEvidence(text))!.match ? 'MATCH' : 'TAMPERED');
console.log('42->92 changed to 42->93', (await verifyEvidence(text.replace('42->92', '42->93')))!.match ? 'MATCH' : 'TAMPERED');
