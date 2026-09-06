/**
 * Small in-memory throttle for the admin login.
 *
 * Good enough to stop someone guessing the password by hand or with a simple
 * script. It is per-server-instance, so on a platform that runs several
 * instances an attacker gets this many tries per instance. If the school ever
 * needs a hard guarantee, move this to a shared store.
 */

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

type Entry = { count: number; firstAttempt: number };
const attempts = new Map<string, Entry>();

export function checkRateLimit(key: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || now - entry.firstAttempt > WINDOW_MS) {
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((entry.firstAttempt + WINDOW_MS - now) / 1000),
    };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

export function recordFailure(key: string): void {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || now - entry.firstAttempt > WINDOW_MS) {
    attempts.set(key, { count: 1, firstAttempt: now });
    return;
  }

  entry.count += 1;

  // Opportunistic cleanup so the map cannot grow without bound.
  if (attempts.size > 1000) {
    for (const [k, v] of attempts) {
      if (now - v.firstAttempt > WINDOW_MS) attempts.delete(k);
    }
  }
}

export function clearAttempts(key: string): void {
  attempts.delete(key);
}
