import { v2 as cloudinary } from "cloudinary";

/**
 * Persists the admin's password hash.
 *
 * There is no database on this project, so this rides on the Cloudinary
 * account that already stores the gallery. The hash is kept as context
 * metadata on a private 1x1 placeholder asset, read back through the Admin API
 * (which is authenticated), never through a public URL.
 *
 * If this store cannot be reached for any reason, callers fall back to the
 * ADMIN_PASSWORD environment variable, so the school can never be locked out
 * of their own site by a storage outage.
 */

const CONFIG_PUBLIC_ID = "kes-admin/credentials";
const PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

export type StoredCredentials = { hash: string; salt: string; updatedAt: string };

let configured = false;

function ensureConfigured(): boolean {
  if (configured) return true;
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) return false;
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });
  configured = true;
  return true;
}

export async function readStoredCredentials(): Promise<StoredCredentials | null> {
  if (!ensureConfigured()) return null;
  try {
    const resource = await cloudinary.api.resource(CONFIG_PUBLIC_ID, {
      type: "private",
      context: true,
    });
    const ctx = resource?.context?.custom ?? resource?.context;
    if (!ctx?.pwd_hash || !ctx?.pwd_salt) return null;
    return {
      hash: String(ctx.pwd_hash),
      salt: String(ctx.pwd_salt),
      updatedAt: String(ctx.updated_at ?? ""),
    };
  } catch {
    // Not found on first run, or Cloudinary unreachable. Either way: fall back.
    return null;
  }
}

export async function writeStoredCredentials(hash: string, salt: string): Promise<boolean> {
  if (!ensureConfigured()) return false;
  try {
    await cloudinary.uploader.upload(PLACEHOLDER, {
      public_id: CONFIG_PUBLIC_ID,
      type: "private",
      overwrite: true,
      invalidate: true,
      context: {
        pwd_hash: hash,
        pwd_salt: salt,
        updated_at: new Date().toISOString(),
      },
    });
    return true;
  } catch (err) {
    console.error("Failed to save admin password", err);
    return false;
  }
}

/** True when the school has set their own password (rather than the setup one). */
export async function hasCustomPassword(): Promise<boolean> {
  return (await readStoredCredentials()) !== null;
}
