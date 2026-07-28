"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductForm, ProductFormValues } from "@/components/admin-cms/product-form";

interface CategoryOption {
  id: string;
  name: string;
  isActive: boolean;
}

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const response = await fetch("/api/categories?includeInactive=1", { cache: "no-store" });
        const data = (await response.json().catch(() => ({}))) as { categories?: CategoryOption[]; error?: string };

        if (!response.ok) {
          throw new Error(data.error || "Unable to load categories");
        }

        setCategories(data.categories || []);
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : "Unable to load categories");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  async function createProduct(values: ProductFormValues) {
    setSaving(true);
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Unable to create product");
      }

      router.push("/admin/products");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Add Product</h2>
          <p className="mt-1 text-sm text-slate-600">Create a new product and publish it instantly.</p>
        </div>
        <Link href="/admin/products" className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
          Back to products
        </Link>
      </header>

      {error ? <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">Loading...</div>
      ) : (
        <ProductForm mode="create" categories={categories} onSubmit={createProduct} saving={saving} />
      )}
    </div>
  );
}
