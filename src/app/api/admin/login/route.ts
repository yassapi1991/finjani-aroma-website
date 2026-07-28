import { NextResponse } from "next/server";
import {
  applyAdminSessionCookies,
  clearAdminSessionCookies,
  isAdminAuthConfigured,
  isAdminUser,
} from "@/lib/admin-auth";
import { getAnonSupabase } from "@/lib/supabase/server";

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { error: "Supabase Auth admin configuration is incomplete." },
      { status: 500 }
    );
  }

  const supabase = getAnonSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase Auth client is not configured." }, { status: 500 });
  }

  const body = (await request.json().catch(() => null)) as
    | { email?: string; password?: string }
    | null;

  const email = body?.email?.trim() ?? "";
  const password = body?.password ?? "";

  if (!email || !password) {
    return NextResponse.json({ error: "Email et mot de passe requis." }, { status: 400 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user || !data.session) {
    return NextResponse.json({ error: "Identifiants invalides." }, { status: 401 });
  }

  if (!isAdminUser(data.user)) {
    const response = NextResponse.json({ error: "Acces admin refuse pour cet utilisateur." }, { status: 403 });
    clearAdminSessionCookies(response);
    return response;
  }

  const response = NextResponse.json({
    success: true,
    email: data.user.email,
  });
  applyAdminSessionCookies(response, data.session);

  return response;
}
