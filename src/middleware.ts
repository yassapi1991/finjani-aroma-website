import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_DASHBOARD_PATH,
  ADMIN_LOGIN_PATH,
  isAdminAuthConfigured,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (!isAdminAuthConfigured()) {
    return NextResponse.next();
  }

  const token = request.cookies.get("finjani_admin_session")?.value;
  const session = await verifyAdminSessionToken(token);
  const isAuthenticated = Boolean(session);
  const isLoginRoute = pathname === ADMIN_LOGIN_PATH;

  if (!isAuthenticated && !isLoginRoute) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = ADMIN_LOGIN_PATH;
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && isLoginRoute) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = ADMIN_DASHBOARD_PATH;
    dashboardUrl.search = "";
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
