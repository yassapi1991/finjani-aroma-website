"use client";

import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  isActive: boolean;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/categories?includeInactive=1", { cache: "no-store" });
      const data = (await response.json().catch(() => ({}))) as { categories?: Category[]; error?: string };

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

  function announceCategoryUpdate() {
    window.dispatchEvent(new Event("categories-updated"));
    window.localStorage.setItem("categories-updated-at", String(Date.now()));
  }

  useEffect(() => {
    void load();
  }, []);

  async function addCategory() {
    const name = newName.trim();
    if (!name) return;

    const response = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, isActive: true }),
    });

    const data = (await response.json().catch(() => ({}))) as { category?: Category; error?: string };
    if (!response.ok || !data.category) {
      setError(data.error || "Unable to create category");
      return;
    }

    await load();
    announceCategoryUpdate();
    setNewName("");
  }

  async function renameCategory(category: Category) {
    const next = window.prompt("Category name", category.name)?.trim();
    if (!next || next === category.name) return;

    const response = await fetch(`/api/categories/${category.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: next }),
    });

    const data = (await response.json().catch(() => ({}))) as { category?: Category; error?: string };
    if (!response.ok || !data.category) {
      setError(data.error || "Unable to rename category");
      return;
    }

    await load();
    announceCategoryUpdate();
  }

  async function toggleCategory(category: Category) {
    const response = await fetch(`/api/categories/${category.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !category.isActive }),
    });

    const data = (await response.json().catch(() => ({}))) as { category?: Category; error?: string };
    if (!response.ok || !data.category) {
      setError(data.error || "Unable to update category");
      return;
    }

    await load();
    announceCategoryUpdate();
  }

  async function deleteCategory(category: Category) {
    if (!window.confirm(`Delete category \"${category.name}\"?`)) return;

    const response = await fetch(`/api/categories/${category.id}`, { method: "DELETE" });
    const data = (await response.json().catch(() => ({}))) as { success?: boolean; error?: string };

    if (!response.ok || !data.success) {
      setError(data.error || "Unable to delete category");
      return;
    }

    await load();
    announceCategoryUpdate();
  }

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Categories</h2>
        <p className="mt-1 text-sm text-slate-600">Create and organize menu categories.</p>
      </header>

      {error ? <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New category"
            className="min-w-[220px] flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none ring-slate-900/10 focus:border-slate-400 focus:ring-4"
          />
          <button
            type="button"
            onClick={() => void addCategory()}
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
          >
            Add Category
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-slate-500">Loading...</td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-slate-500">No categories found.</td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-medium text-slate-900">{category.name}</td>
                    <td className="px-4 py-3">
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={category.isActive}
                          onChange={() => void toggleCategory(category)}
                          className="h-4 w-4 rounded border-slate-300 text-slate-900"
                        />
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${category.isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                          {category.isActive ? "Active" : "Inactive"}
                        </span>
                      </label>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => void renameCategory(category)}
                          className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                        >
                          Rename
                        </button>
                        <button
                          type="button"
                          onClick={() => void deleteCategory(category)}
                          className="rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
