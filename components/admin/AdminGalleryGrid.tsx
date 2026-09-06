"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import type { GalleryImage } from "@/lib/cloudinary";
import { getCategoryBySlug } from "@/data/gallery-categories";

export default function AdminGalleryGrid({ images }: { images: GalleryImage[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Delete this photo? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  }

  if (images.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
        No photos uploaded yet. Use the form to add your first one.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image) => (
        <div
          key={image.id}
          className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white"
        >
          <div className="relative h-44 w-full overflow-hidden bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.url}
              alt={image.caption || "Gallery photo"}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-4">
            <span className="mb-2 inline-block rounded-full bg-[#d97706]/10 px-2.5 py-1 text-xs font-bold text-[#d97706]">
              {getCategoryBySlug(image.category)?.label ?? image.category}
            </span>
            <p className="line-clamp-2 min-h-[2.5rem] text-sm text-slate-600">
              {image.caption || "No caption"}
            </p>
          </div>
          <button
            onClick={() => handleDelete(image.id)}
            disabled={deletingId === image.id}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition hover:bg-red-600 group-hover:opacity-100 disabled:opacity-60"
            aria-label="Delete photo"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}
