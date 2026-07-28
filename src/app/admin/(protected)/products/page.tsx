"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FiEdit2, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface CategoryOption {
  id: string;
  name: string;
  isActive: boolean;
}

const PAGE_SIZE = 8;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function loadData() {
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

      setProducts(productsData.products || []);
      setCategories(categoriesData.categories || []);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to load data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadData();
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((item) =>
        [item.name, item.type, item.category, item.origin, item.description].some((field) =>
          field.toLowerCase().includes(q)
        )
      );
    }

    if (statusFilter !== "all") {
      list = list.filter((item) => (statusFilter === "active" ? item.isActive !== false : item.isActive === false));
    }

    if (categoryFilter !== "all") {
      list = list.filter((item) => item.category === categoryFilter);
    }

    return list;
  }, [products, search, statusFilter, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const currentItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  async function toggleActive(product: Product) {
    const response = await fetch(`/api/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: product.category,
        type: product.type,
        name: product.name,
        description: product.description,
        origin: product.origin,
        price: product.price,
        imageUrl: product.imageUrl,
        isActive: !(product.isActive ?? true),
      }),
    });

    const data = (await response.json().catch(() => ({}))) as { product?: Product; error?: string };
    if (!response.ok || !data.product) {
      setError(data.error || "Unable to update status");
      return;
    }

    setProducts((prev) => prev.map((item) => (item.id === product.id ? data.product! : item)));
  }

  async function deleteProduct(productId: string) {
    const response = await fetch(`/api/products/${productId}`, { method: "DELETE" });
    const data = (await response.json().catch(() => ({}))) as { success?: boolean; error?: string };

    if (!response.ok || !data.success) {
      setError(data.error || "Unable to delete product");
      return;
    }

    setProducts((prev) => prev.filter((item) => item.id !== productId));
    setConfirmDeleteId(null);
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Products</h2>
          <p className="mt-1 text-sm text-slate-600">Manage catalog items, pricing, status, and visuals.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          <FiPlus className="h-4 w-4" />
          Add Product
        </Link>
      </header>

      {error ? <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-4">
          <label className="relative md:col-span-2">
            <FiSearch className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search products..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none ring-slate-900/10 transition focus:border-slate-400 focus:ring-4"
            />
          </label>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as typeof statusFilter);
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none ring-slate-900/10 transition focus:border-slate-400 focus:ring-4"
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none ring-slate-900/10 transition focus:border-slate-400 focus:ring-4"
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    Loading products...
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    No products found.
                  </td>
                </tr>
              ) : (
                currentItems.map((product) => (
                  <tr key={product.id} className="border-t border-slate-100">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-900">{product.name}</p>
                      <p className="text-xs text-slate-500">{product.type} · {product.origin}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{product.category}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">{formatCurrency(product.price)}</td>
                    <td className="px-4 py-3">
                      <label className="inline-flex cursor-pointer items-center gap-2">
                        <input
                          type="checkbox"
                          checked={product.isActive !== false}
                          onChange={() => void toggleActive(product)}
                          className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                        />
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${product.isActive !== false ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                          {product.isActive !== false ? "Active" : "Inactive"}
                        </span>
                      </label>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                          <FiEdit2 className="h-3.5 w-3.5" /> Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(product.id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-50"
                        >
                          <FiTrash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-sm text-slate-600">
          <p>
            Showing {(currentPage - 1) * PAGE_SIZE + 1}-{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-2">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      {confirmDeleteId ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-slate-900">Delete Product</h3>
            <p className="mt-2 text-sm text-slate-600">This action is permanent. Are you sure you want to remove this product?</p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmDeleteId(null)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void deleteProduct(confirmDeleteId)}
                className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
