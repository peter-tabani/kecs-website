"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, UploadCloud } from "lucide-react";
import { galleryCategories } from "@/data/gallery-categories";

const LIMIT_REACHED_MESSAGE =
  "Your current media storage limit has been reached. To upload more photos, please contact the website administrator to increase your storage capacity.";

export default function UploadForm({
  currentCount,
  limit,
}: {
  currentCount: number;
  limit: number;
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (currentCount >= limit) {
    return (
      <div className="flex items-start gap-4 rounded-xl border border-amber-300 bg-amber-50 p-6">
        <AlertTriangle size={22} className="mt-0.5 shrink-0 text-amber-600" />
        <div>
          <h3 className="mb-1 font-bold text-amber-900">Upload limit reached</h3>
          <p className="text-sm leading-7 text-amber-800">{LIMIT_REACHED_MESSAGE}</p>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/admin/gallery", { method: "POST", body: formData });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.error ?? "Upload failed. Please try again.");
        return;
      }

      formRef.current?.reset();
      router.refresh();
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-6"
    >
      <div>
        <label htmlFor="file" className="mb-1.5 block text-sm font-medium text-slate-700">
          Photo (JPEG, PNG or WEBP, up to 5MB)
        </label>
        <input
          id="file"
          name="file"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          required
          className="block w-full rounded-lg border border-slate-300 bg-slate-50 text-sm text-slate-900 file:mr-4 file:rounded-full file:border-0 file:bg-[#d97706] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
        />
      </div>

      <div>
        <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-slate-700">
          Category
        </label>
        <select
          id="category"
          name="category"
          required
          defaultValue=""
          className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706]"
        >
          <option value="" disabled>
            Select a category
          </option>
          {galleryCategories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="caption" className="mb-1.5 block text-sm font-medium text-slate-700">
          Caption (optional)
        </label>
        <input
          id="caption"
          name="caption"
          type="text"
          maxLength={200}
          placeholder="e.g. Prize-giving day, December 2025"
          className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706]"
        />
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#d97706] py-3 text-sm font-semibold text-white transition hover:bg-[#b45309] disabled:opacity-60"
      >
        <UploadCloud size={16} />
        {submitting ? "Uploading..." : "Upload Photo"}
      </button>

      <p className="text-center text-xs text-slate-400">
        {currentCount} / {limit} photos used
      </p>
    </form>
  );
}
