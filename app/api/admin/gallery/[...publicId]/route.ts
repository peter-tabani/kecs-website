import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/admin-session";
import { deleteGalleryImage, listGalleryImages } from "@/lib/cloudinary";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ publicId: string[] }> }
) {
  if (!verifySessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { publicId: publicIdSegments } = await params;
  const publicId = publicIdSegments.join("/");

  const [image] = await listGalleryImages().then((images) =>
    images.filter((img) => img.id === publicId)
  );
  const category = image?.category;

  const ok = await deleteGalleryImage(publicId);
  if (!ok) {
    return NextResponse.json({ error: "Failed to delete photo." }, { status: 500 });
  }

  revalidatePath("/");
  revalidatePath("/gallery");
  if (category) revalidatePath(`/gallery/${category}`);

  return NextResponse.json({ ok: true });
}
