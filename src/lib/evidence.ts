// Evidence integrity: SHA-256 hashing (browser Web Crypto) + audit trail kept in localStorage.

export async function sha256(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export type Evidence = { name: string; size: number; hash: string; lockedAt: string };
export type AuditEntry = { at: string; action: string; detail: string };

const KEY_EVIDENCE = 'loglens.evidence';
const KEY_AUDIT = 'loglens.audit';

// localStorage can fail (private mode), so every access is wrapped
function read<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) ?? '') as T; } catch { return fallback; }
}
function write(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable: keep working in memory */ }
}

let memAudit: AuditEntry[] = read(KEY_AUDIT, []);
let memEvidence: Evidence | null = read(KEY_EVIDENCE, null);

export const now = () => new Date().toLocaleString('en-IN', { hour12: false });

export function audit(action: string, detail: string) {
  memAudit = [...memAudit, { at: now(), action, detail }].slice(-200);
  write(KEY_AUDIT, memAudit);
}
export const getAudit = () => memAudit;

export async function lockEvidence(name: string, text: string): Promise<Evidence> {
  memEvidence = { name, size: new TextEncoder().encode(text).length, hash: await sha256(text), lockedAt: now() };
  write(KEY_EVIDENCE, memEvidence);
  audit('EVIDENCE_LOCKED', `${name} · ${memEvidence.size} bytes · SHA-256 ${memEvidence.hash}`);
  return memEvidence;
}
export const getEvidence = () => memEvidence;

export async function verifyEvidence(text: string) {
  if (!memEvidence) return null;
  const current = await sha256(text);
  const match = current === memEvidence.hash;
  audit(match ? 'VERIFY_MATCH' : 'VERIFY_TAMPERED', `${memEvidence.name} · now ${current}`);
  return { match, current, original: memEvidence.hash };
}

export function clearCase() {
  memAudit = []; memEvidence = null;
  write(KEY_AUDIT, memAudit); write(KEY_EVIDENCE, null);
}
