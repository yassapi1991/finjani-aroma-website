import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { getAdminSessionFromCookieStore } from "@/lib/admin-auth";
import { getServiceSupabase } from "@/lib/supabase/server";

interface Params {
  params: Promise<{ id: string }>;
}

const categoryUpdateSchema = z.object({
  name: z.string().min(2).max(120).optional(),
  isActive: z.boolean().optional(),
});

export async function PUT(request: Request, { params }: Params) {
  const session = await getAdminSessionFromCookieStore(await cookies());
  if (!session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
  }

  const body = (await request.json().catch(() => null)) as unknown;
  const payload = categoryUpdateSchema.safeParse(body);
  if (!payload.success) {
    return NextResponse.json({ error: payload.error.issues[0]?.message || "Invalid payload" }, { status: 400 });
  }

  const { id } = await params;

  const { data: currentCategory, error: currentCategoryError } = await supabase
    .from("categories")
    .select("id, name")
    .eq("id", id)
    .single();

  if (currentCategoryError || !currentCategory) {
    return NextResponse.json({ error: currentCategoryError?.message || "Category not found" }, { status: 404 });
  }

  const nextName = payload.data.name?.trim();

  const updates: { name?: string; is_active?: boolean } = {};
  if (typeof nextName === "string" && nextName.length > 0) updates.name = nextName;
  if (typeof payload.data.isActive === "boolean") updates.is_active = payload.data.isActive;

  if (!updates.name && typeof updates.is_active !== "boolean") {
    return NextResponse.json({ error: "No updates provided" }, { status: 400 });
  }

  if (updates.name && updates.name.toLowerCase() !== currentCategory.name.toLowerCase()) {
    const { data: existingName, error: existingNameError } = await supabase
      .from("categories")
      .select("id")
      .ilike("name", updates.name)
      .neq("id", id)
      .limit(1)
      .maybeSingle();

    if (existingNameError) {
      return NextResponse.json({ error: existingNameError.message }, { status: 500 });
    }

    if (existingName) {
      return NextResponse.json({ error: "A category with this name already exists." }, { status: 409 });
    }
  }

  const { data, error } = await supabase
    .from("categories")
    .update(updates)
    .eq("id", id)
    .select("id, name, is_active, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (updates.name && updates.name !== currentCategory.name) {
    const { error: productsRenameError } = await supabase
      .from("products")
      .update({ category: updates.name })
      .eq("category", currentCategory.name);

    if (productsRenameError) {
      return NextResponse.json({ error: productsRenameError.message }, { status: 500 });
    }
  }

  return NextResponse.json({
    category: {
      id: data.id,
      name: data.name,
      isActive: data.is_active,
      createdAt: data.created_at,
    },
  });
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await getAdminSessionFromCookieStore(await cookies());
  if (!session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
  }

  const { id } = await params;

  const { data: categoryData, error: categoryError } = await supabase
    .from("categories")
    .select("name")
    .eq("id", id)
    .single();

  if (categoryError) {
    return NextResponse.json({ error: categoryError.message }, { status: 404 });
  }

  const { count, error: productsError } = await supabase
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("category", categoryData.name);

  if (productsError) {
    return NextResponse.json({ error: productsError.message }, { status: 500 });
  }

  if ((count ?? 0) > 0) {
    return NextResponse.json(
      { error: "Impossible de supprimer une catégorie utilisée par des produits." },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
