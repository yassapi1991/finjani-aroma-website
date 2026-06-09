import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { productSchema } from "@/lib/product-schema";
import { getServiceSupabase } from "@/lib/supabase/server";
import { getAdminSessionFromCookieStore } from "@/lib/admin-auth";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: Params) {
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

  const { id } = await params;

  const { data, error } = await supabase
    .from("products")
    .update({
      category: payload.data.category,
      type: payload.data.type,
      name: payload.data.name,
      description: payload.data.description,
      origin: payload.data.origin,
      price: payload.data.price,
      image_url: payload.data.imageUrl,
    })
    .eq("id", id)
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

export async function DELETE(request: Request, { params }: Params) {
  const session = await getAdminSessionFromCookieStore(await cookies());
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
  }

  const { id } = await params;

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
