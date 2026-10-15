// Evidence integrity: SHA-256 hashing (browser Web Crypto) + audit trail kept in localStorage.

export async function sha256(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export type Evidence = { name: string; size: number; hash: string; lockedAt: string };
// Each audit entry stores the hash of the entry before it (a hash chain).
// If anyone edits or deletes an old entry, the hashes after it stop matching.
export type AuditEntry = { at: string; action: string; detail: string; prev: string; hash: string };
const GENESIS = '0'.repeat(64);
const entryHash = (e: Omit<AuditEntry, 'hash'>) => sha256(`${e.prev}|${e.at}|${e.action}|${e.detail}`);

const KEY_EVIDENCE = 'loglens.evidence';
const KEY_AUDIT = 'loglens.audit';

// localStorage can fail (private mode), so every access is wrapped
function read<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) ?? '') as T; } catch { return fallback; }
}
function write(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable: keep working in memory */ }
}

let memAudit: AuditEntry[] = read<AuditEntry[]>(KEY_AUDIT, []).filter((e) => e.hash); // drop old entries saved before the hash chain existed
let memEvidence: Evidence | null = read(KEY_EVIDENCE, null);

export const now = () => new Date().toLocaleString('en-IN', { hour12: false });

// Entries are added one at a time (queue) so each one links to the real previous hash
let queue: Promise<void> = Promise.resolve();
export function audit(action: string, detail: string): Promise<void> {
  queue = queue.then(async () => {
    const prev = memAudit.length ? memAudit[memAudit.length - 1].hash : GENESIS;
    const entry = { at: now(), action, detail, prev };
    memAudit = [...memAudit, { ...entry, hash: await entryHash(entry) }];
    write(KEY_AUDIT, memAudit);
  });
  return queue;
}
export const getAudit = () => memAudit;

// Re-computes every hash. Returns the first broken entry number (1-based), or 0 if the chain is intact.
export async function verifyAuditChain(): Promise<number> {
  let prev = GENESIS;
  for (let i = 0; i < memAudit.length; i++) {
    const e = memAudit[i];
    if (e.prev !== prev || e.hash !== (await entryHash(e))) return i + 1;
    prev = e.hash;
  }
  return 0;
}

// Demo only: secretly edits entry 1 the way an insider might, without fixing the hashes
export function tamperAuditForDemo() {
  if (!memAudit.length) return;
  memAudit = memAudit.map((e, i) => (i === 0 ? { ...e, detail: e.detail.replace(/\d/, '9') + ' (edited)' } : e));
  write(KEY_AUDIT, memAudit);
}

export async function lockEvidence(name: string, text: string): Promise<Evidence> {
  memEvidence = { name, size: new TextEncoder().encode(text).length, hash: await sha256(text), lockedAt: now() };
  write(KEY_EVIDENCE, memEvidence);
  await audit('EVIDENCE_LOCKED', `${name} · ${memEvidence.size} bytes · SHA-256 ${memEvidence.hash}`);
  return memEvidence;
}
export const getEvidence = () => memEvidence;

export async function verifyEvidence(text: string) {
  if (!memEvidence) return null;
  const current = await sha256(text);
  const match = current === memEvidence.hash;
  await audit(match ? 'VERIFY_MATCH' : 'VERIFY_TAMPERED', `${memEvidence.name} · now ${current}`);
  return { match, current, original: memEvidence.hash };
}

export function clearCase() {
  memAudit = []; memEvidence = null;
  write(KEY_AUDIT, memAudit); write(KEY_EVIDENCE, null);
}
