"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface LibraryImage {
  name: string;
  size: number;
  createdAt?: string;
  updatedAt?: string;
  url: string;
}

function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaPage() {
  const [images, setImages] = useState<LibraryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/images", { cache: "no-store" });
      const data = (await response.json().catch(() => ({}))) as { images?: LibraryImage[]; error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Unable to load images");
      }

      setImages(data.images || []);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to load images");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function upload(file: File) {
    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Unable to upload image");
      }

      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to upload image");
    } finally {
      setUploading(false);
    }
  }

  async function removeImage(name: string) {
    if (!window.confirm(`Delete image \"${name}\"?`)) return;

    const response = await fetch(`/api/admin/images?name=${encodeURIComponent(name)}`, { method: "DELETE" });
    const data = (await response.json().catch(() => ({}))) as { success?: boolean; error?: string };

    if (!response.ok || !data.success) {
      setError(data.error || "Unable to delete image");
      return;
    }

    setImages((prev) => prev.filter((item) => item.name !== name));
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Image Library</h2>
          <p className="mt-1 text-sm text-slate-600">Manage product visuals stored in Supabase.</p>
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">
          {uploading ? "Uploading..." : "Upload Image"}
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void upload(file);
              e.currentTarget.value = "";
            }}
          />
        </label>
      </header>

      {error ? <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        {loading ? (
          <p className="text-sm text-slate-500">Loading images...</p>
        ) : images.length === 0 ? (
          <p className="text-sm text-slate-500">No images in library.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {images.map((image) => (
              <article key={image.name} className="overflow-hidden rounded-xl border border-slate-200">
                <div className="relative h-40 bg-slate-100">
                  <Image src={image.url} alt={image.name} fill unoptimized className="object-cover" />
                </div>
                <div className="space-y-2 p-3">
                  <p className="truncate text-sm font-medium text-slate-900">{image.name}</p>
                  <p className="text-xs text-slate-500">{formatFileSize(image.size)}</p>
                  <button
                    type="button"
                    onClick={() => void removeImage(image.name)}
                    className="rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
