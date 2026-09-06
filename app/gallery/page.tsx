import Link from "next/link";
import { Camera } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionBanner from "@/components/ui/SectionBanner";
import PhotoGrid from "@/components/gallery/PhotoGrid";
import SwipeRow from "@/components/ui/SwipeRow";
import { galleryCategories } from "@/data/gallery-categories";
import { listGalleryImages } from "@/lib/cloudinary";

export const metadata = {
  title: "Photo Gallery | The Kenya Excellent Centre and School",
};

export default async function GalleryPage() {
  const allImages = await listGalleryImages();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <TopBar />
      <Header />
      <Navbar />

      <SectionBanner
        image="/images/hero/kecs-gate.webp"
        eyebrow="KES in Pictures"
        title="Photo Gallery"
        subtitle="Photos from around the school: the classrooms, the field, our events and the people here."
      />

      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
          <div className="mb-6 lg:mb-10">
            <h2 className="hero-title text-3xl text-slate-900">Browse by Category</h2>
          </div>

          <SwipeRow desktopGrid="lg:grid-cols-3">
            {galleryCategories.map((category) => {
              const photosInCategory = allImages.filter((img) => img.category === category.slug);
              const cover = photosInCategory[0]?.url ?? category.fallbackImage;

              return (
                <Link
                  key={category.slug}
                  href={`/gallery/${category.slug}`}
                  className="group relative block h-64 overflow-hidden rounded-xl shadow-md"
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
                    <p className="mt-1 text-sm text-white/70">{category.blurb}</p>
                  </div>
                </Link>
              );
            })}
          </SwipeRow>

          <div className="mb-6 mt-10 lg:mb-8 lg:mt-16">
            <h2 className="hero-title text-3xl text-slate-900">All Photos</h2>
          </div>
          <PhotoGrid images={allImages} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
