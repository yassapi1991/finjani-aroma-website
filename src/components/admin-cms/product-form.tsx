"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { Product } from "@/lib/types";

export interface ProductFormValues {
  category: string;
  type: string;
  name: string;
  description: string;
  origin: string;
  price: number;
  imageUrl: string;
  isActive: boolean;
}

interface CategoryOption {
  id: string;
  name: string;
  isActive: boolean;
}

interface ProductFormProps {
  mode: "create" | "edit";
  initialValue?: Product;
  categories: CategoryOption[];
  onSubmit: (values: ProductFormValues) => Promise<void>;
  saving: boolean;
}

const emptyProduct: ProductFormValues = {
  category: "",
  type: "",
  name: "",
  description: "",
  origin: "",
  price: 1,
  imageUrl: "",
  isActive: true,
};

export function ProductForm({ mode, initialValue, categories, onSubmit, saving }: ProductFormProps) {
  const initialState = useMemo<ProductFormValues>(() => {
    if (!initialValue) {
      return {
        ...emptyProduct,
        category: categories.find((item) => item.isActive)?.name || categories[0]?.name || "",
      };
    }

    return {
      category: initialValue.category,
      type: initialValue.type,
      name: initialValue.name,
      description: initialValue.description,
      origin: initialValue.origin,
      price: initialValue.price,
      imageUrl: initialValue.imageUrl,
      isActive: initialValue.isActive !== false,
    };
  }, [categories, initialValue]);

  const [values, setValues] = useState<ProductFormValues>(initialState);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  async function uploadImage(file: File) {
    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json().catch(() => ({}))) as { imageUrl?: string; error?: string };

      if (!response.ok || !data.imageUrl) {
        setError(data.error || "Image upload failed");
        return;
      }

      setValues((prev) => ({ ...prev, imageUrl: data.imageUrl! }));
    } finally {
      setUploading(false);
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      await onSubmit(values);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to save product");
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1.5 text-sm">
          <span className="font-medium text-slate-700">Category</span>
          <select
            required
            value={values.category}
            onChange={(e) => setValues((prev) => ({ ...prev, category: e.target.value }))}
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none ring-slate-900/10 focus:border-slate-400 focus:ring-4"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1.5 text-sm">
          <span className="font-medium text-slate-700">Type</span>
          <input
            required
            value={values.type}
            onChange={(e) => setValues((prev) => ({ ...prev, type: e.target.value }))}
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none ring-slate-900/10 focus:border-slate-400 focus:ring-4"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1.5 text-sm">
          <span className="font-medium text-slate-700">Product name</span>
          <input
            required
            value={values.name}
            onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none ring-slate-900/10 focus:border-slate-400 focus:ring-4"
          />
        </label>

        <label className="space-y-1.5 text-sm">
          <span className="font-medium text-slate-700">Origin</span>
          <input
            required
            value={values.origin}
            onChange={(e) => setValues((prev) => ({ ...prev, origin: e.target.value }))}
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none ring-slate-900/10 focus:border-slate-400 focus:ring-4"
          />
        </label>
      </div>

      <label className="space-y-1.5 text-sm">
        <span className="font-medium text-slate-700">Description</span>
        <textarea
          required
          value={values.description}
          onChange={(e) => setValues((prev) => ({ ...prev, description: e.target.value }))}
          rows={4}
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none ring-slate-900/10 focus:border-slate-400 focus:ring-4"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1.5 text-sm">
          <span className="font-medium text-slate-700">Price (MAD)</span>
          <input
            required
            type="number"
            min={1}
            value={values.price}
            onChange={(e) => setValues((prev) => ({ ...prev, price: Number(e.target.value) || 1 }))}
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none ring-slate-900/10 focus:border-slate-400 focus:ring-4"
          />
        </label>

        <label className="flex items-center gap-2 self-end rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={values.isActive}
            onChange={(e) => setValues((prev) => ({ ...prev, isActive: e.target.checked }))}
            className="h-4 w-4 rounded border-slate-300 text-slate-900"
          />
          Active product
        </label>
      </div>

      <label className="space-y-1.5 text-sm">
        <span className="font-medium text-slate-700">Image URL</span>
        <input
          required
          value={values.imageUrl}
          onChange={(e) => setValues((prev) => ({ ...prev, imageUrl: e.target.value }))}
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none ring-slate-900/10 focus:border-slate-400 focus:ring-4"
        />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700">
          <FiUpload className="h-4 w-4" />
          {uploading ? "Uploading..." : "Upload image"}
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void uploadImage(file);
              e.currentTarget.value = "";
            }}
          />
        </label>
      </div>

      {values.imageUrl ? (
        <div className="relative h-44 overflow-hidden rounded-xl border border-slate-200">
          <Image src={values.imageUrl} alt="Product preview" fill unoptimized className="object-cover" />
        </div>
      ) : null}

      {error ? <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

      <button
        type="submit"
        disabled={saving}
        className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
      >
        {saving ? "Saving..." : mode === "create" ? "Create Product" : "Save Changes"}
      </button>
    </form>
  );
}
