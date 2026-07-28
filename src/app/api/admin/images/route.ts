import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminSessionFromCookieStore } from "@/lib/admin-auth";
import { getServiceSupabase } from "@/lib/supabase/server";

const STORAGE_BUCKET = "product-images";

export async function GET() {
  const session = await getAdminSessionFromCookieStore(await cookies());
  if (!session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
  }

  const { data, error } = await supabase.storage.from(STORAGE_BUCKET).list("", {
    limit: 200,
    sortBy: { column: "created_at", order: "desc" },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const images = (data || []).map((item) => {
    const { data: publicUrlData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(item.name);

    return {
      name: item.name,
      size: item.metadata?.size ?? 0,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      url: publicUrlData.publicUrl,
    };
  });

  return NextResponse.json({ images });
}

export async function DELETE(request: Request) {
  const session = await getAdminSessionFromCookieStore(await cookies());
  if (!session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
  }

  const imageName = new URL(request.url).searchParams.get("name")?.trim();
  if (!imageName) {
    return NextResponse.json({ error: "Missing image name" }, { status: 400 });
  }

  const { error } = await supabase.storage.from(STORAGE_BUCKET).remove([imageName]);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
