import { ABOUT_SLIDESHOW_COUNT, GALLERY_LIMIT, listGalleryImages } from "@/lib/cloudinary";
import UploadForm from "@/components/admin/UploadForm";
import AdminGalleryGrid from "@/components/admin/AdminGalleryGrid";
import ChangePassword from "@/components/admin/ChangePassword";
import { hasCustomPassword } from "@/lib/admin-config";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [images, hasOwnPassword] = await Promise.all([listGalleryImages(), hasCustomPassword()]);
  const used = images.length;
  const percentUsed = Math.min(100, Math.round((used / GALLERY_LIMIT) * 100));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="hero-title text-2xl text-slate-900">Photo Gallery</h1>
        <p className="mt-1 text-sm text-slate-500">
          Upload and manage the photos shown across the KES website.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-600">
        <p className="mb-2 font-semibold text-slate-800">Where your photos appear</p>
        <p>
          Every photo you upload goes to its category page under{" "}
          <span className="font-semibold">Gallery</span> on the website. The{" "}
          <span className="font-semibold">{ABOUT_SLIDESHOW_COUNT} most recent photos</span>{" "}
          also appear automatically in the slideshow on the homepage, whichever
          category they belong to. You do not need to do anything else, the
          website updates itself.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-700">Storage used</span>
          <span className="text-slate-500">
            {used} / {GALLERY_LIMIT} photos
          </span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-[#d97706] transition-all"
            style={{ width: `${percentUsed}%` }}
          />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
        <UploadForm currentCount={used} limit={GALLERY_LIMIT} />
        <AdminGalleryGrid images={images} />
      </div>

      <ChangePassword usingSetupPassword={!hasOwnPassword} />
    </div>
  );
}
