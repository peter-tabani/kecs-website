import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/admin-session";
import {
  ALLOWED_MIME_TYPES,
  GALLERY_LIMIT,
  MAX_FILE_SIZE_BYTES,
  listGalleryImages,
  uploadGalleryImage,
} from "@/lib/cloudinary";
import { galleryCategories } from "@/data/gallery-categories";

const LIMIT_REACHED_MESSAGE =
  "Your current media storage limit has been reached. To upload more photos, please contact the website administrator to increase your storage capacity.";

function isAuthorized(request: NextRequest): boolean {
  return verifySessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
}

function revalidateGalleryPaths(category: string) {
  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath(`/gallery/${category}`);
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const images = await listGalleryImages();
  return NextResponse.json({ images, limit: GALLERY_LIMIT });
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  const category = formData?.get("category");
  const caption = formData?.get("caption");

  if (!(file instanceof File) || typeof category !== "string") {
    return NextResponse.json({ error: "A photo and category are required." }, { status: 400 });
  }

  if (!galleryCategories.some((c) => c.slug === category)) {
    return NextResponse.json({ error: "Unknown category." }, { status: 400 });
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, or WEBP images are allowed." },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json({ error: "Image must be 5MB or smaller." }, { status: 400 });
  }

  const existing = await listGalleryImages();
  if (existing.length >= GALLERY_LIMIT) {
    return NextResponse.json(
      { error: LIMIT_REACHED_MESSAGE, code: "limit_reached" },
      { status: 409 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await uploadGalleryImage(buffer, {
    category,
    caption: typeof caption === "string" ? caption.slice(0, 200) : "",
  });

  if (!result.ok) {
    const status = result.reason === "limit_reached" ? 409 : 500;
    const error =
      result.reason === "limit_reached"
        ? LIMIT_REACHED_MESSAGE
        : result.reason === "not_configured"
        ? "Photo storage is not configured yet. Contact the website administrator."
        : "Upload failed. Please try again.";
    return NextResponse.json({ error, code: result.reason }, { status });
  }

  revalidateGalleryPaths(category);
  return NextResponse.json({ image: result.image }, { status: 201 });
}
