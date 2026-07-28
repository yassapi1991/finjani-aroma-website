"use client";

import { FormEvent, Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiLock, FiUser } from "react-icons/fi";

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = useMemo(() => searchParams.get("redirect") || "/admin/dashboard", [searchParams]);

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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#dbeafe_0%,#f8fafc_45%,#f1f5f9_100%)] px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.2)] lg:grid-cols-[1.1fr_1fr]">
          <aside className="hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-10 text-white lg:block">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">Finjani Aroma</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight">Professional Admin CMS</h1>
            <p className="mt-4 text-sm leading-relaxed text-slate-200">
              Manage products, categories, media, and settings from one secure control panel.
            </p>
          </aside>

          <article className="p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Secure Access</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Sign in to Admin</h2>
            <p className="mt-2 text-sm text-slate-600">Use your administrator credentials to continue.</p>

            <form className="mt-7 space-y-4" onSubmit={submit}>
              <label className="block space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Username</span>
                <span className="relative block">
                  <FiUser className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    id="admin-email"
                    type="email"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none ring-slate-900/10 transition focus:border-slate-400 focus:ring-4"
                  />
                </span>
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Password</span>
                <span className="relative block">
                  <FiLock className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    id="admin-password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none ring-slate-900/10 transition focus:border-slate-400 focus:ring-4"
                  />
                </span>
              </label>

              {error ? <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-70"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </article>
        </div>
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
