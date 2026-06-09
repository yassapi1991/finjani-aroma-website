"use client";

import { FormEvent, Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = useMemo(() => searchParams.get("redirect") || "/admin", [searchParams]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        setError(data.error || "Connexion impossible.");
        return;
      }

      router.replace(redirectTarget);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="section-ivory min-h-[calc(100vh-220px)] py-16 sm:py-24">
      <div className="page-shell max-w-lg">
        <article className="rounded-3xl border border-[var(--coffee-line)] bg-[var(--coffee-cream)] p-8 shadow-[0_16px_42px_rgba(115,82,50,0.14)] sm:p-10">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--coffee-gold)]">Espace Sécurisé</p>
          <h1 className="mt-3 font-serif text-4xl text-[var(--coffee-ink)]">Connexion Admin</h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--coffee-muted)]">
            Connectez-vous pour gérer les produits, les prix et les visuels du catalogue Finjani Aroma.
          </p>

          <form className="mt-7 space-y-4" onSubmit={submit}>
            <div>
              <label className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-[var(--coffee-gold)]" htmlFor="admin-email">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[var(--coffee-line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--coffee-gold)]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-[var(--coffee-gold)]" htmlFor="admin-password">
                Mot de Passe
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[var(--coffee-line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--coffee-gold)]"
              />
            </div>

            {error ? (
              <p className="rounded-xl border border-red-300/70 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="btn-lux-primary w-full justify-center px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] disabled:opacity-70"
            >
              {loading ? "Connexion..." : "Se Connecter"}
            </button>
          </form>
        </article>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminLoginContent />
    </Suspense>
  );
}
