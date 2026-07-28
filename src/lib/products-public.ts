import { getServiceSupabase } from "@/lib/supabase/server";
import { unstable_noStore as noStore } from "next/cache";
import { Product } from "@/lib/types";

export async function getPublicProducts(): Promise<Product[]> {
  noStore();
  const supabase = getServiceSupabase();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("products")
    .select("id, category, type, name, description, origin, price, image_url, is_active, created_at")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map((item) => ({
    id: item.id,
    category: item.category,
    type: item.type,
    name: item.name,
    description: item.description,
    origin: item.origin,
    price: Number(item.price),
    imageUrl: item.image_url,
    isActive: item.is_active,
    createdAt: item.created_at,
  }));
}
