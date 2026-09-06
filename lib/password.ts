import crypto from "crypto";

/**
 * Password hashing with scrypt from Node's own crypto module.
 * No external dependency, and scrypt is deliberately slow to brute force.
 */

const KEY_LENGTH = 64;

export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, KEY_LENGTH).toString("hex");
  return { hash, salt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  if (!hash || !salt) return false;
  try {
    const candidate = crypto.scryptSync(password, salt, KEY_LENGTH);
    const stored = Buffer.from(hash, "hex");
    if (candidate.length !== stored.length) return false;
    return crypto.timingSafeEqual(candidate, stored);
  } catch {
    return false;
  }
}

/** Rejects passwords that would be trivially guessable. */
export function validatePasswordStrength(password: string): string | null {
  if (password.length < 10) return "Password must be at least 10 characters long.";
  if (!/[a-zA-Z]/.test(password)) return "Password must contain at least one letter.";
  if (!/[0-9]/.test(password)) return "Password must contain at least one number.";
  if (/^(password|change-this|admin|kesadmin|12345)/i.test(password)) {
    return "That password is too easy to guess. Please choose another one.";
  }
  return null;
}
