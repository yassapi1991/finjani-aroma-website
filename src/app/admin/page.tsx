import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { SectionTitle } from "@/components/sections/section-title";
import { sampleProducts } from "@/lib/sample-products";
import { getServiceSupabase } from "@/lib/supabase/server";
import { Product } from "@/lib/types";
import { ADMIN_LOGIN_PATH, getAdminSessionFromCookieStore } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Administration",
  description: "Panneau d'administration pour gerer les produits de la carte Finjani Aroma.",
  robots: {
    index: false,
    follow: false,
  },
};

async function getProducts(): Promise<Product[]> {
  try {
    const supabase = getServiceSupabase();
    if (!supabase) return sampleProducts;

    const { data, error } = await supabase
      .from("products")
      .select("id, category, type, name, description, origin, price, image_url, created_at")
      .order("created_at", { ascending: false });

    if (error || !data) return sampleProducts;

    return data.map((item) => ({
      id: item.id,
      category: item.category,
      type: item.type,
      name: item.name,
      description: item.description,
      origin: item.origin,
      price: item.price,
      imageUrl: item.image_url,
      createdAt: item.created_at,
    }));
  } catch {
    return sampleProducts;
  }
}

export default async function AdminPage() {
  const session = await getAdminSessionFromCookieStore(await cookies());
  if (!session) {
    redirect(ADMIN_LOGIN_PATH);
  }

  const products = await getProducts();

  return (
    <div className="page-shell space-y-8">
      <SectionTitle
        eyebrow="CMS"
        title="Panneau d’Administration"
        description="Espace protégé pour créer, modifier et supprimer les produits stockés dans Supabase."
      />
      <form action="/api/admin/logout" method="post" className="-mt-3">
        <button
          type="submit"
          className="rounded-full border border-[var(--coffee-line)] bg-[var(--coffee-card)] px-5 py-2 text-[10px] uppercase tracking-[0.16em] text-[var(--coffee-muted)] transition hover:border-[var(--coffee-gold)] hover:text-[var(--coffee-gold)]"
        >
          Se Déconnecter
        </button>
      </form>
      <AdminDashboard initialProducts={products} />
    </div>
  );
}
