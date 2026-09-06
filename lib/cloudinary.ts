import { v2 as cloudinary } from "cloudinary";

export const GALLERY_FOLDER = "kecs-gallery";
export const GALLERY_LIMIT = 15;
/** How many of the newest uploads feed the homepage About slideshow. */
export const ABOUT_SLIDESHOW_COUNT = 5;
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
export const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

export type GalleryImage = {
  id: string;
  url: string;
  category: string;
  caption: string;
  createdAt: string;
};

export type UploadFailureReason = "not_configured" | "limit_reached" | "upload_failed";

let configured = false;

function ensureConfigured(): boolean {
  if (configured) return true;
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return false;
  }
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });
  configured = true;
  return true;
}

type CloudinarySearchResource = {
  public_id: string;
  secure_url: string;
  created_at: string;
  context?: { custom?: Record<string, string> } & Record<string, string | undefined>;
};

function readContextValue(
  resource: CloudinarySearchResource,
  key: "category" | "caption"
): string | undefined {
  return resource.context?.custom?.[key] ?? resource.context?.[key];
}

export async function listGalleryImages(category?: string): Promise<GalleryImage[]> {
  if (!ensureConfigured()) return [];

  let expression = `folder:${GALLERY_FOLDER}`;
  if (category) expression += ` AND tags:${category}`;

  try {
    const result = await cloudinary.search
      .expression(expression)
      .with_field("context")
      .with_field("tags")
      .sort_by("created_at", "desc")
      .max_results(GALLERY_LIMIT)
      .execute();

    return ((result.resources ?? []) as CloudinarySearchResource[]).map((resource) => ({
      id: resource.public_id,
      url: resource.secure_url,
      category: readContextValue(resource, "category") ?? category ?? "uncategorized",
      caption: readContextValue(resource, "caption") ?? "",
      createdAt: resource.created_at,
    }));
  } catch (err) {
    console.error("Cloudinary listGalleryImages failed", err);
    return [];
  }
}

export async function uploadGalleryImage(
  buffer: Buffer,
  meta: { category: string; caption: string }
): Promise<{ ok: true; image: GalleryImage } | { ok: false; reason: UploadFailureReason }> {
  if (!ensureConfigured()) return { ok: false, reason: "not_configured" };

  const existing = await listGalleryImages();
  if (existing.length >= GALLERY_LIMIT) {
    return { ok: false, reason: "limit_reached" };
  }

  try {
    const result = await new Promise<{ public_id: string; secure_url: string; created_at: string }>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: GALLERY_FOLDER,
            resource_type: "image",
            tags: [meta.category],
            context: { category: meta.category, caption: meta.caption },
          },
          (error, uploadResult) => {
            if (error || !uploadResult) reject(error ?? new Error("Cloudinary upload returned no result"));
            else resolve(uploadResult as { public_id: string; secure_url: string; created_at: string });
          }
        );
        stream.end(buffer);
      }
    );

    return {
      ok: true,
      image: {
        id: result.public_id,
        url: result.secure_url,
        category: meta.category,
        caption: meta.caption,
        createdAt: result.created_at,
      },
    };
  } catch (err) {
    console.error("Cloudinary upload failed", err);
    return { ok: false, reason: "upload_failed" };
  }
}

export async function deleteGalleryImage(publicId: string): Promise<boolean> {
  if (!ensureConfigured()) return false;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    return true;
  } catch (err) {
    console.error("Cloudinary delete failed", err);
    return false;
  }
}
