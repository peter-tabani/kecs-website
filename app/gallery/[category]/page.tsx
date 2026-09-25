import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionBanner from "@/components/ui/SectionBanner";
import PhotoGrid from "@/components/gallery/PhotoGrid";
import { getCategoryBySlug } from "@/data/gallery-categories";
import { listGalleryImages } from "@/lib/cloudinary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryData = getCategoryBySlug(category);
  return {
    title: categoryData?.label ?? "Gallery",
    description: categoryData?.blurb,
    alternates: { canonical: `/gallery/${category}` },
  };
}

export default async function CategoryGalleryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryData = getCategoryBySlug(category);
  if (!categoryData) notFound();

  const images = await listGalleryImages(category);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <TopBar />
      <Header />
      <Navbar />

      <SectionBanner
        image={images[0]?.url ?? categoryData.fallbackImage}
        eyebrow="KES in Pictures"
        title={categoryData.label}
        subtitle={categoryData.blurb}
      />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
          <Link
            href="/gallery"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#d97706] hover:text-[#b45309]"
          >
            <ArrowLeft size={15} /> Back to Full Gallery
          </Link>
          <PhotoGrid images={images} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
