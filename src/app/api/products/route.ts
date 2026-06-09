import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sampleProducts } from "@/lib/sample-products";
import { productSchema } from "@/lib/product-schema";
import { getServiceSupabase } from "@/lib/supabase/server";
import { getAdminSessionFromCookieStore } from "@/lib/admin-auth";

export async function GET() {
  const supabase = getServiceSupabase();

  if (!supabase) {
    return NextResponse.json({ products: sampleProducts });
  }

  const { data, error } = await supabase
    .from("products")
    .select("id, category, type, name, description, origin, price, image_url, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ products: sampleProducts, fallback: true });
  }

  const products = data.map((item) => ({
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

  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const session = await getAdminSessionFromCookieStore(await cookies());
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
  }

  const body = await request.json();
  const payload = productSchema.safeParse(body);

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.issues[0]?.message || "Invalid payload" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("products")
    .insert({
      category: payload.data.category,
      type: payload.data.type,
      name: payload.data.name,
      description: payload.data.description,
      origin: payload.data.origin,
      price: payload.data.price,
      image_url: payload.data.imageUrl,
    })
    .select("id, category, type, name, description, origin, price, image_url, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    product: {
      id: data.id,
      category: data.category,
      type: data.type,
      name: data.name,
      description: data.description,
      origin: data.origin,
      price: data.price,
      imageUrl: data.image_url,
      createdAt: data.created_at,
    },
  });
}
