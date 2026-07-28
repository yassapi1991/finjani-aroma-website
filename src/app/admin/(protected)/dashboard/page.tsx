import Link from "next/link";
import { FiArrowRight, FiBox, FiEyeOff, FiImage, FiTag } from "react-icons/fi";
import { getServiceSupabase } from "@/lib/supabase/server";

async function getStats() {
  const supabase = getServiceSupabase();
  if (!supabase) {
    return {
      totalProducts: 0,
      activeProducts: 0,
      inactiveProducts: 0,
      categories: 0,
      images: 0,
    };
  }

  const [{ count: totalProducts }, { count: activeProducts }, { count: inactiveProducts }, { count: categories }, { data: images }] =
    await Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("products").select("id", { count: "exact", head: true }).eq("is_active", true),
      supabase.from("products").select("id", { count: "exact", head: true }).eq("is_active", false),
      supabase.from("categories").select("id", { count: "exact", head: true }),
      supabase.storage.from("product-images").list("", { limit: 100 }),
    ]);

  return {
    totalProducts: totalProducts ?? 0,
    activeProducts: activeProducts ?? 0,
    inactiveProducts: inactiveProducts ?? 0,
    categories: categories ?? 0,
    images: images?.length ?? 0,
  };
}

const cards = [
  {
    title: "Total Products",
    key: "totalProducts",
    icon: FiBox,
    color: "from-slate-800 to-slate-600",
  },
  {
    title: "Active Products",
    key: "activeProducts",
    icon: FiBox,
    color: "from-emerald-700 to-emerald-500",
  },
  {
    title: "Inactive Products",
    key: "inactiveProducts",
    icon: FiEyeOff,
    color: "from-amber-700 to-amber-500",
  },
  {
    title: "Categories",
    key: "categories",
    icon: FiTag,
    color: "from-indigo-700 to-indigo-500",
  },
  {
    title: "Library Images",
    key: "images",
    icon: FiImage,
    color: "from-cyan-700 to-cyan-500",
  },
] as const;

export default async function AdminDashboardPage() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Control Center</p>
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
        <p className="mt-2 text-sm text-slate-600">Manage your catalog, media, and categories in one place.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => {
          const Icon = card.icon;
          const value = stats[card.key];

          return (
            <article key={card.key} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className={`inline-flex rounded-xl bg-gradient-to-br ${card.color} p-2 text-white`}>
                <Icon className="h-4 w-4" />
              </div>
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{card.title}</p>
              <p className="mt-1 text-3xl font-bold text-slate-900">{value}</p>
            </article>
          );
        })}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Link href="/admin/products" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300">
          <h3 className="text-lg font-semibold text-slate-900">Manage Products</h3>
          <p className="mt-1 text-sm text-slate-600">Add, edit, and control product visibility.</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-900">Open <FiArrowRight className="h-4 w-4" /></span>
        </Link>
        <Link href="/admin/categories" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300">
          <h3 className="text-lg font-semibold text-slate-900">Manage Categories</h3>
          <p className="mt-1 text-sm text-slate-600">Create and organize menu categories.</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-900">Open <FiArrowRight className="h-4 w-4" /></span>
        </Link>
        <Link href="/admin/media" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300">
          <h3 className="text-lg font-semibold text-slate-900">Image Library</h3>
          <p className="mt-1 text-sm text-slate-600">Upload and reuse visuals from Supabase storage.</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-900">Open <FiArrowRight className="h-4 w-4" /></span>
        </Link>
      </section>
    </div>
  );
}
