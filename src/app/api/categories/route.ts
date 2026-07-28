import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { getAdminSessionFromCookieStore } from "@/lib/admin-auth";
import { getServiceSupabase } from "@/lib/supabase/server";

const categorySchema = z.object({
  name: z.string().min(2).max(120),
  isActive: z.boolean().optional().default(true),
});

export async function GET(request: Request) {
  const includeInactiveParam = new URL(request.url).searchParams.get("includeInactive");
  const cookieStore = await cookies();
  const adminSession = await getAdminSessionFromCookieStore(cookieStore);
  const includeInactive = includeInactiveParam === "1" && Boolean(adminSession.user);

  const supabase = getServiceSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
  }

  let query = supabase
    .from("categories")
    .select("id, name, is_active, created_at")
    .order("name", { ascending: true });

  if (!includeInactive) {
    query = query.eq("is_active", true);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    categories: data.map((item) => ({
      id: item.id,
      name: item.name,
      isActive: item.is_active,
      createdAt: item.created_at,
    })),
  });
}

export async function POST(request: Request) {
  const session = await getAdminSessionFromCookieStore(await cookies());
  if (!session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
  }

  const body = (await request.json().catch(() => null)) as unknown;
  const payload = categorySchema.safeParse(body);
  if (!payload.success) {
    return NextResponse.json({ error: payload.error.issues[0]?.message || "Invalid payload" }, { status: 400 });
  }

  const nextName = payload.data.name.trim();

  const { data: existingCategory, error: existingCategoryError } = await supabase
    .from("categories")
    .select("id")
    .ilike("name", nextName)
    .limit(1)
    .maybeSingle();

  if (existingCategoryError) {
    return NextResponse.json({ error: existingCategoryError.message }, { status: 500 });
  }

  if (existingCategory) {
    return NextResponse.json({ error: "A category with this name already exists." }, { status: 409 });
  }

  const { data, error } = await supabase
    .from("categories")
    .insert({
      name: nextName,
      is_active: payload.data.isActive,
    })
    .select("id, name, is_active, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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
