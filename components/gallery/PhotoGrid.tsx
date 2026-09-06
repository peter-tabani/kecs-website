"use client";

import { useState } from "react";
import { ZoomIn } from "lucide-react";
import type { GalleryImage } from "@/lib/cloudinary";
import Lightbox from "./Lightbox";

export default function PhotoGrid({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
        <p className="font-semibold text-slate-600">Photos coming soon</p>
        <p className="mt-1 text-sm text-slate-400">
          We add new photos often, so check back soon.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((image, i) => (
          <button
            key={image.id}
            onClick={() => setOpenIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-lg bg-slate-100"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.url}
              alt={image.caption || "KES gallery photo"}
              className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
              <ZoomIn size={22} className="text-white" />
            </div>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={images}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onPrev={() => setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))}
          onNext={() => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length))}
        />
      )}
    </>
  );
}
