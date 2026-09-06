import crypto from "crypto";
import { readStoredCredentials } from "@/lib/admin-config";
import { verifyPassword } from "@/lib/password";

export const ADMIN_SESSION_COOKIE = "kes_admin_session";
export const SESSION_MAX_AGE_SECONDS = 12 * 60 * 60; // 12 hours
export const RESET_TOKEN_MAX_AGE_SECONDS = 30 * 60; // 30 minutes

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  return secret;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function timingSafeStringEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) {
    // Compare against itself so both branches take the same time.
    crypto.timingSafeEqual(aBuf, aBuf);
    return false;
  }
  return crypto.timingSafeEqual(aBuf, bBuf);
}

// ── Login sessions ─────────────────────────────────────────────

export function createSessionToken(): string {
  const expires = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `admin:${expires}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const separatorIndex = token.lastIndexOf(".");
  if (separatorIndex === -1) return false;

  const payload = token.slice(0, separatorIndex);
  const signature = token.slice(separatorIndex + 1);

  if (!timingSafeStringEqual(signature, sign(payload))) return false;

  const [, expiresRaw] = payload.split(":");
  const expires = Number(expiresRaw);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;

  return true;
}

// ── Credentials ────────────────────────────────────────────────

export function verifyUsername(username: string): boolean {
  const validUsername = process.env.ADMIN_USERNAME ?? "";
  if (!validUsername) return false;
  return timingSafeStringEqual(username, validUsername);
}

/**
 * Checks a password against the one the school set themselves. Falls back to
 * the ADMIN_PASSWORD environment variable when no password has been set yet,
 * or when the stored one cannot be read.
 */
export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  if (!verifyUsername(username)) return false;

  const stored = await readStoredCredentials();
  if (stored) {
    return verifyPassword(password, stored.hash, stored.salt);
  }

  const envPassword = process.env.ADMIN_PASSWORD ?? "";
  if (!envPassword) return false;
  return timingSafeStringEqual(password, envPassword);
}

// ── Password reset links ───────────────────────────────────────

/**
 * A reset link is a signed, time-limited token. It carries a fingerprint of
 * the password that was current when it was issued, so using the link once
 * (which changes the password) invalidates any other outstanding link.
 * Nothing needs to be stored server side.
 */
async function currentPasswordFingerprint(): Promise<string> {
  const stored = await readStoredCredentials();
  const material = stored ? stored.hash : (process.env.ADMIN_PASSWORD ?? "");
  return crypto.createHash("sha256").update(material).digest("hex").slice(0, 16);
}

export async function createResetToken(): Promise<string> {
  const expires = Date.now() + RESET_TOKEN_MAX_AGE_SECONDS * 1000;
  const fingerprint = await currentPasswordFingerprint();
  const payload = `reset:${expires}:${fingerprint}`;
  return `${payload}.${sign(payload)}`;
}

export async function verifyResetToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const separatorIndex = token.lastIndexOf(".");
  if (separatorIndex === -1) return false;

  const payload = token.slice(0, separatorIndex);
  const signature = token.slice(separatorIndex + 1);
  if (!timingSafeStringEqual(signature, sign(payload))) return false;

  const [kind, expiresRaw, fingerprint] = payload.split(":");
  if (kind !== "reset") return false;

  const expires = Number(expiresRaw);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;

  // Already used (the password changed since this link was issued)?
  return fingerprint === (await currentPasswordFingerprint());
}
