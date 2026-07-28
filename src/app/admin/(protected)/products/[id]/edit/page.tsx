"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductForm, ProductFormValues } from "@/components/admin-cms/product-form";
import { Product } from "@/lib/types";

interface CategoryOption {
  id: string;
  name: string;
  isActive: boolean;
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    void params.then((value) => setId(value.id));
  }, [params]);

  useEffect(() => {
    if (!id) return;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch("/api/products?includeInactive=1", { cache: "no-store" }),
          fetch("/api/categories?includeInactive=1", { cache: "no-store" }),
        ]);

        const productsData = (await productsResponse.json().catch(() => ({}))) as { products?: Product[]; error?: string };
        const categoriesData = (await categoriesResponse.json().catch(() => ({}))) as {
          categories?: CategoryOption[];
          error?: string;
        };

        if (!productsResponse.ok) {
          throw new Error(productsData.error || "Unable to load products");
        }
        if (!categoriesResponse.ok) {
          throw new Error(categoriesData.error || "Unable to load categories");
        }

        const found = (productsData.products || []).find((item) => item.id === id) || null;
        if (!found) {
          throw new Error("Product not found");
        }

        setProduct(found);
        setCategories(categoriesData.categories || []);
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : "Unable to load product");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [id]);

  async function updateProduct(values: ProductFormValues) {
    if (!id) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Unable to update product");
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
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Edit Product</h2>
          <p className="mt-1 text-sm text-slate-600">Update product details, visuals, and visibility.</p>
        </div>
        <Link href="/admin/products" className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
          Back to products
        </Link>
      </header>

      {error ? <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

      {loading || !product ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">Loading...</div>
      ) : (
        <ProductForm mode="edit" initialValue={product} categories={categories} onSubmit={updateProduct} saving={saving} />
      )}
    </div>
  );
}
