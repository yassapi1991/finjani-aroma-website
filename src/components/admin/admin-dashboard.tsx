"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  FiCheck,
  FiAlertCircle,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiX,
  FiPlus,
  FiLoader,
  FiImage,
} from "react-icons/fi";
import { Product, ProductCategory, ProductInput } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

interface AdminDashboardProps {
  initialProducts: Product[];
}

type ToastKind = "success" | "error";

interface ToastItem {
  id: number;
  message: string;
  kind: ToastKind;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const emptyForm: ProductInput = {
  category: "Café en Grains",
  type: "Marocain",
  name: "",
  description: "",
  origin: "",
  price: 45,
  imageUrl: "",
};

// ─── Toast component ─────────────────────────────────────────────────────────

function Toast({ toast, onDismiss }: { toast: ToastItem; onDismiss: (id: number) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 3800);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div
      className={`toast-anim flex items-center gap-3 rounded-xl border px-4 py-3 text-sm shadow-xl backdrop-blur-md ${
        toast.kind === "success"
          ? "border-[var(--coffee-olive)] bg-[color-mix(in_srgb,var(--coffee-bg-soft)_90%,var(--coffee-olive))] text-[var(--coffee-cream)]"
          : "border-red-500/40 bg-[color-mix(in_srgb,var(--coffee-bg-soft)_90%,#7f1d1d)] text-red-200"
      }`}
    >
      {toast.kind === "success" ? (
        <FiCheck className="h-4 w-4 shrink-0 text-[var(--coffee-olive)]" />
      ) : (
        <FiAlertCircle className="h-4 w-4 shrink-0 text-red-400" />
      )}
      <span>{toast.message}</span>
      <button
        onClick={() => onDismiss(toast.id)}
        className="ml-auto text-[var(--coffee-muted)] hover:text-[var(--coffee-cream)]"
        aria-label="Fermer"
      >
        <FiX className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

// ─── Confirm Modal ────────────────────────────────────────────────────────────

function ConfirmModal({
  productName,
  onConfirm,
  onCancel,
}: {
  productName: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="toast-anim mx-4 w-full max-w-sm rounded-2xl border border-[var(--coffee-line)] bg-[var(--coffee-bg-soft)] p-6 shadow-2xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
          <FiTrash2 className="h-5 w-5 text-red-400" />
        </div>
        <h3 className="mt-4 font-serif text-xl text-[var(--coffee-cream)]">Confirmer la suppression</h3>
        <p className="mt-2 text-sm text-[var(--coffee-muted)]">
          Supprimer définitivement{" "}
          <span className="font-semibold text-[var(--coffee-cream)]">&ldquo;{productName}&rdquo;</span>
          {" "}? Cette action est irréversible.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-[var(--coffee-line)] px-4 py-2.5 text-xs uppercase tracking-[0.14em] text-[var(--coffee-muted)] transition hover:border-[var(--coffee-gold)] hover:text-[var(--coffee-cream)]"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-500/80 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-red-500"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export function AdminDashboard({ initialProducts }: AdminDashboardProps) {
  const [products, setProducts]         = useState<Product[]>(initialProducts);
  const [form, setForm]                 = useState<ProductInput>(emptyForm);
  const [editingId, setEditingId]       = useState<string | null>(null);
  const [loading, setLoading]           = useState(false);
  const [toasts, setToasts]             = useState<ToastItem[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [search, setSearch]             = useState("");
  const toastCounter                    = useRef(0);
  const formRef                         = useRef<HTMLFormElement>(null);

  const title = useMemo(
    () => (editingId ? "Modifier le Produit" : "Ajouter un Produit"),
    [editingId]
  );

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
    );
  }, [products, search]);

  const addToast = useCallback((message: string, kind: ToastKind) => {
    const id = ++toastCounter.current;
    setToasts((prev) => [...prev, { id, message, kind }]);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  async function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const payload  = { ...form, price: Number(form.price) };
    const endpoint = editingId ? `/api/products/${editingId}` : "/api/products";
    const method   = editingId ? "PUT" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) { addToast(data.error || "Échec de l'action", "error"); return; }
      if (editingId) {
        setProducts((prev) => prev.map((item) => (item.id === editingId ? data.product : item)));
        addToast("Produit mis à jour avec succès", "success");
      } else {
        setProducts((prev) => [data.product, ...prev]);
        addToast("Produit créé avec succès", "success");
      }
      setForm(emptyForm);
      setEditingId(null);
    } finally {
      setLoading(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    const id = deleteTarget.id;
    setDeleteTarget(null);
    setLoading(true);
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) { addToast(data.error || "Suppression échouée", "error"); return; }
      setProducts((prev) => prev.filter((item) => item.id !== id));
      addToast("Produit supprimé", "success");
    } finally {
      setLoading(false);
    }
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    setForm({
      category: product.category, type: product.type, name: product.name,
      description: product.description, origin: product.origin,
      price: product.price, imageUrl: product.imageUrl,
    });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {/* Toast stack */}
      <div className="fixed bottom-6 right-6 z-50 flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2">
        {toasts.map((t) => <Toast key={t.id} toast={t} onDismiss={dismissToast} />)}
      </div>

      {/* Confirm delete modal */}
      {deleteTarget && (
        <ConfirmModal
          productName={deleteTarget.name}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
        {/* ── Form panel ─────────────────────────────── */}
        <form
          ref={formRef}
          onSubmit={saveProduct}
          className="space-y-4 rounded-2xl border border-[var(--coffee-line)] bg-[var(--coffee-bg-soft)] p-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl text-[var(--coffee-cream)]">{title}</h2>
            {editingId && (
              <button
                type="button"
                onClick={() => { setEditingId(null); setForm(emptyForm); }}
                className="flex items-center gap-1.5 rounded-lg border border-[var(--coffee-line)] px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-[var(--coffee-muted)] transition hover:border-[var(--coffee-gold)] hover:text-[var(--coffee-cream)]"
              >
                <FiX className="h-3.5 w-3.5" /> Annuler
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-[var(--coffee-gold)]">Catégorie</label>
              <select value={form.category}
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value as ProductCategory }))}
                className="w-full rounded-xl border border-[var(--coffee-line)] bg-[var(--coffee-bg)] px-4 py-2.5 text-sm outline-none transition focus:border-[var(--coffee-gold)]">
                <option>Café en Grains</option><option>Gelato Italiano</option><option>Tartes Glacées</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-[var(--coffee-gold)]">Type</label>
              <input placeholder="Espresso, Artisanal…" value={form.type}
                onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
                className="w-full rounded-xl border border-[var(--coffee-line)] bg-[var(--coffee-bg)] px-4 py-2.5 text-sm outline-none transition focus:border-[var(--coffee-gold)]"
                required />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-[var(--coffee-gold)]">Nom du produit</label>
            <input placeholder="Arabica Signature…" value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-xl border border-[var(--coffee-line)] bg-[var(--coffee-bg)] px-4 py-2.5 text-sm outline-none transition focus:border-[var(--coffee-gold)]"
              required />
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-[var(--coffee-gold)]">Description</label>
            <textarea placeholder="Notes de dégustation…" value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              className="min-h-[80px] w-full rounded-xl border border-[var(--coffee-line)] bg-[var(--coffee-bg)] px-4 py-2.5 text-sm outline-none transition focus:border-[var(--coffee-gold)]"
              required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-[var(--coffee-gold)]">Origine</label>
              <input placeholder="Maroc, Éthiopie…" value={form.origin}
                onChange={(e) => setForm((prev) => ({ ...prev, origin: e.target.value }))}
                className="w-full rounded-xl border border-[var(--coffee-line)] bg-[var(--coffee-bg)] px-4 py-2.5 text-sm outline-none transition focus:border-[var(--coffee-gold)]"
                required />
            </div>
            <div>
              <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-[var(--coffee-gold)]">Prix (MAD)</label>
              <input placeholder="45" type="number" min={1} value={form.price}
                onChange={(e) => setForm((prev) => ({ ...prev, price: Number(e.target.value) }))}
                className="w-full rounded-xl border border-[var(--coffee-line)] bg-[var(--coffee-bg)] px-4 py-2.5 text-sm outline-none transition focus:border-[var(--coffee-gold)]"
                required />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-[var(--coffee-gold)]">URL de l&apos;image</label>
            <input placeholder="https://images.unsplash.com/…" value={form.imageUrl}
              onChange={(e) => setForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
              className="w-full rounded-xl border border-[var(--coffee-line)] bg-[var(--coffee-bg)] px-4 py-2.5 text-sm outline-none transition focus:border-[var(--coffee-gold)]"
              required />
            <div className="mt-2 overflow-hidden rounded-xl border border-[var(--coffee-line)]">
              {form.imageUrl ? (
                <div className="relative h-32 w-full">
                  <Image src={form.imageUrl} alt="Aperçu" fill unoptimized className="object-cover" onError={() => {}} />
                </div>
              ) : (
                <div className="flex h-20 items-center justify-center gap-2 text-xs text-[var(--coffee-muted)]">
                  <FiImage className="h-4 w-4" /> Aperçu de l&apos;image
                </div>
              )}
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--coffee-gold)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:brightness-110 disabled:opacity-60">
            {loading ? <FiLoader className="h-4 w-4 animate-spin" />
              : editingId ? <><FiCheck className="h-4 w-4" /> Enregistrer les modifications</>
              : <><FiPlus className="h-4 w-4" /> Ajouter le produit</>}
          </button>
        </form>

        {/* ── Product list ──────────────────────────── */}
        <div className="space-y-4">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--coffee-muted)]" />
            <input placeholder="Rechercher un produit…" value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[var(--coffee-line)] bg-[var(--coffee-bg-soft)] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[var(--coffee-gold)]" />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Effacer"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--coffee-muted)] hover:text-[var(--coffee-cream)]">
                <FiX className="h-4 w-4" />
              </button>
            )}
          </div>
          <p className="text-xs text-[var(--coffee-muted)]">
            {filteredProducts.length} produit{filteredProducts.length !== 1 ? "s" : ""}
            {search && ` · "${search}"`}
          </p>
          <div className="space-y-3">
            {filteredProducts.length === 0 ? (
              <div className="rounded-2xl border border-[var(--coffee-line)] bg-[var(--coffee-bg-soft)] p-10 text-center text-sm text-[var(--coffee-muted)]">
                Aucun produit trouvé
              </div>
            ) : filteredProducts.map((product) => (
              <article key={product.id}
                className="group flex items-center gap-4 overflow-hidden rounded-2xl border border-[var(--coffee-line)] bg-[var(--coffee-bg-soft)] p-4 transition-all duration-300 hover:border-[color-mix(in_srgb,var(--coffee-gold)_35%,var(--coffee-line))]">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-[var(--coffee-line)]">
                  <Image src={product.imageUrl} alt={product.name} fill unoptimized
                    className="object-cover transition duration-500 group-hover:scale-110" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="rounded-full bg-[var(--coffee-line)] px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-[var(--coffee-gold)]">
                    {product.category}
                  </span>
                  <h3 className="mt-0.5 truncate font-serif text-lg text-[var(--coffee-cream)]">{product.name}</h3>
                  <p className="truncate text-xs text-[var(--coffee-muted)]">{product.type} · {product.origin}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <p className="font-serif text-base font-semibold text-[var(--coffee-cream)]">{formatCurrency(product.price)}</p>
                  <div className="flex gap-1.5">
                    <button onClick={() => startEdit(product)} title="Modifier"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--coffee-line)] text-[var(--coffee-muted)] transition hover:border-[var(--coffee-gold)] hover:text-[var(--coffee-cream)]">
                      <FiEdit2 className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => setDeleteTarget(product)} title="Supprimer"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-400/25 text-red-400/60 transition hover:border-red-400/60 hover:text-red-300">
                      <FiTrash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
