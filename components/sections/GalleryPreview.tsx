import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";
import { galleryCategories } from "@/data/gallery-categories";
import { listGalleryImages } from "@/lib/cloudinary";
import SwipeRow from "@/components/ui/SwipeRow";

export default async function GalleryPreview() {
  const allImages = await listGalleryImages();

  return (
    <section className="bg-[#fffaf2] py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
        <div className="mb-10 flex flex-col items-center gap-3 text-center lg:mb-14">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#d97706]">
            Life at KES in Pictures
          </p>
          <h2 className="hero-title text-4xl leading-tight text-slate-900 md:text-5xl">
            Explore Our Photo Gallery
          </h2>
          <p className="max-w-xl text-base leading-8 text-slate-500">
            Photos from the classroom, the field and school events. Pick a
            category to see the rest.
          </p>
        </div>

        <SwipeRow desktopGrid="lg:grid-cols-3">
          {galleryCategories.map((category) => {
            const photosInCategory = allImages.filter((img) => img.category === category.slug);
            const cover = photosInCategory[0]?.url ?? category.fallbackImage;

            return (
              <Link
                key={category.slug}
                href={`/gallery/${category.slug}`}
                className="group relative block h-56 overflow-hidden rounded-xl shadow-md lg:h-64"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 group-hover:opacity-90"
                  style={{ backgroundImage: `url('${cover}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="mb-2 flex w-fit items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white">
                    <Camera size={12} />
                    {photosInCategory.length} Photo{photosInCategory.length === 1 ? "" : "s"}
                  </span>
                  <h3 className="hero-title text-xl text-white md:text-2xl">{category.label}</h3>
                </div>
              </Link>
            );
          })}
        </SwipeRow>

        <div className="mt-8 flex justify-center lg:mt-12">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-full bg-[#0f172a] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#1e293b]"
          >
            View Full Gallery <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
