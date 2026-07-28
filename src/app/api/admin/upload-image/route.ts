import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminSessionFromCookieStore } from "@/lib/admin-auth";
import { getServiceSupabase } from "@/lib/supabase/server";

const MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024;
const STORAGE_BUCKET = "product-images";

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
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

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
  }

  if (file.size <= 0 || file.size > MAX_UPLOAD_SIZE_BYTES) {
    return NextResponse.json({ error: "Le fichier doit faire moins de 5 MB" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Seules les images sont autorisées" }, { status: 400 });
  }

  const path = `${Date.now()}-${sanitizeFileName(file.name)}`;
  const bytes = await file.arrayBuffer();

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, bytes, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return NextResponse.json({ imageUrl: data.publicUrl });
}
