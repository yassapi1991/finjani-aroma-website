"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { FiBox, FiGrid, FiImage, FiLogOut, FiSettings, FiTag } from "react-icons/fi";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: FiGrid },
  { href: "/admin/products", label: "Products", icon: FiBox },
  { href: "/admin/categories", label: "Categories", icon: FiTag },
  { href: "/admin/media", label: "Image Library", icon: FiImage },
  { href: "/admin/settings", label: "Settings", icon: FiSettings },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-slate-900">
      <div className="mx-auto grid min-h-screen max-w-[1700px] lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-slate-200 bg-white/90 px-5 py-6 backdrop-blur lg:px-6">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Finjani Aroma</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Admin CMS</h1>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-slate-900 text-white shadow-[0_8px_20px_rgba(15,23,42,0.24)]"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                <FiLogOut className="h-4 w-4" />
                Logout
              </button>
            </form>
          </div>
        </aside>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
