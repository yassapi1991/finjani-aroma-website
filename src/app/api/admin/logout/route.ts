import { NextResponse } from "next/server";
import { ADMIN_LOGIN_PATH, clearAdminSessionCookies } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url), { status: 303 });
  clearAdminSessionCookies(response);

  return response;
}
