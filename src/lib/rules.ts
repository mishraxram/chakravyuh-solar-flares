// Rule-based red flags. Fast, explainable, no AI.
// Each rule adds a Flag with a plain-English reason to the events it matches.
import type { LogEvent, Flag } from './parse.ts';

const BURST_COUNT = 5;          // failed logins...
const BURST_WINDOW_MS = 120_000; // ...within 2 minutes
const AFTER_BURST_MS = 15 * 60_000;

function add(e: LogEvent, code: string, reason: string, severity: Flag['severity']) {
  if (!e.flags.some((f) => f.code === code)) e.flags.push({ code, reason, severity });
}

const hhmm = (e: LogEvent) => e.timeText.slice(11, 16);

export function applyRules(events: LogEvent[]): LogEvent[] {
  const ipsByUser = new Map<string, Set<string>>();  // IPs each user was seen on
  const usersByIp = new Map<string, Set<string>>();  // users seen on each IP
  const burstIps = new Map<string, number>();         // ip -> time of last burst

  events.forEach((e, i) => {
    const t = e.time.getTime();
    const h = e.time.getHours();

    // 1. Off-hours activity (23:00 to 06:00)
    if ((h < 6 || h >= 23) && e.action !== 'LOGOUT')
      add(e, 'off-hours', `Activity at ${hhmm(e)}, outside working hours (06:00-23:00)`, 'medium');

    // 2. Burst of failed logins from the same IP
    if (e.action === 'LOGIN_FAIL' && e.ip) {
      const window = events.slice(0, i + 1).filter(
        (p) => p.action === 'LOGIN_FAIL' && p.ip === e.ip && t - p.time.getTime() <= BURST_WINDOW_MS,
      );
      if (window.length >= BURST_COUNT) {
        window.forEach((p) => add(p, 'burst-fail', `${window.length} failed logins in 2 min from ${e.ip} (password guessing)`, 'high'));
        burstIps.set(e.ip, t);
      }
    }

    // 3. Successful login soon after a failed-login burst from the same IP
    if (e.action === 'LOGIN' && burstIps.has(e.ip) && t - burstIps.get(e.ip)! <= AFTER_BURST_MS)
      add(e, 'login-after-burst', `Successful login from ${e.ip} right after a failed-login burst: password likely guessed`, 'high');

    // 4. Login from an IP this user never used before
    const seen = ipsByUser.get(e.user);
    if (e.action === 'LOGIN' && e.ip && seen && seen.size > 0 && !seen.has(e.ip))
      add(e, 'new-ip', `First login by ${e.user} from ${e.ip} (usual: ${[...seen].join(', ')})`, 'medium');

    // 5. Same IP used by a different user before
    const others = usersByIp.get(e.ip);
    if (e.ip && others && !others.has(e.user) && others.size > 0)
      add(e, 'shared-ip', `IP ${e.ip} was used earlier by ${[...others].join(', ')}`, 'medium');

    // 6. Student account trying to change or delete records
    if (e.role === 'student' && /UPDATE|DELETE/.test(e.action))
      add(e, 'role-misuse', `Student account tried ${e.action} on ${e.target}`, 'high');

    // 7. Big marks jump, e.g. 42->92
    const jump = e.detail.match(/(\d+)\s*->\s*(\d+)/);
    if (/^marks/i.test(e.target) && jump && +jump[2] - +jump[1] >= 30)
      add(e, 'marks-jump', `Marks changed ${jump[1]} -> ${jump[2]} (+${+jump[2] - +jump[1]})`, 'high');

    // 8. Logs deleted or cleared (anti-forensics)
    if (/DELETE|CLEAR|TRUNCATE/.test(e.action) && /log/i.test(e.target))
      add(e, 'log-clear', `${e.target} deleted (${e.detail || 'no detail'}): possible evidence destruction`, 'high');

    // 9. Direct root login on the server
    if (e.action === 'LOGIN' && e.user === 'root')
      add(e, 'root-login', `Direct login as root from ${e.ip}`, 'high');

    // Remember who used what (only after checks, so the current event is compared with the past)
    if (e.user && e.ip && e.action !== 'LOGIN_FAIL') {
      if (!ipsByUser.has(e.user)) ipsByUser.set(e.user, new Set());
      ipsByUser.get(e.user)!.add(e.ip);
    }
    if (e.ip && e.user) {
      if (!usersByIp.has(e.ip)) usersByIp.set(e.ip, new Set());
      usersByIp.get(e.ip)!.add(e.user);
    }
  });
  return events;
}

// One-line verdict from the rules (AI summary comes later, separately)
export function ruleVerdict(events: LogEvent[]) {
  const high = events.filter((e) => e.flags.some((f) => f.severity === 'high')).length;
  const medium = events.filter((e) => e.flags.length && !e.flags.some((f) => f.severity === 'high')).length;
  const level = high > 0 ? 'high' : medium > 0 ? 'medium' : 'none';
  return { high, medium, level };
}
