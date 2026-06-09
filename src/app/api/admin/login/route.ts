import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_TTL_SECONDS,
  createAdminSessionToken,
  isAdminAuthConfigured,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { error: "Configuration admin incomplète côté serveur." },
      { status: 500 }
    );
  }

  const body = (await request.json().catch(() => null)) as
    | { email?: string; password?: string }
    | null;

  const email = body?.email?.trim() ?? "";
  const password = body?.password ?? "";

  if (!email || !password) {
    return NextResponse.json({ error: "Email et mot de passe requis." }, { status: 400 });
  }

  const ok = await verifyAdminCredentials(email, password);
  if (!ok) {
    return NextResponse.json({ error: "Identifiants invalides." }, { status: 401 });
  }

  const token = await createAdminSessionToken(email.toLowerCase());
  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_TTL_SECONDS,
  });

  return response;
}
