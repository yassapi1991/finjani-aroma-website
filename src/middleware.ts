import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_DASHBOARD_PATH,
  ADMIN_LOGIN_PATH,
  applyAdminSessionCookies,
  clearAdminSessionCookies,
  getAdminSessionFromCookieStore,
  isAdminAuthConfigured,
} from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminPageRoute = pathname.startsWith("/admin");
  const isProtectedApiRoute =
    pathname.startsWith("/api/admin") || pathname.startsWith("/api/products") || pathname.startsWith("/api/categories");

  if (!isAdminPageRoute && !isProtectedApiRoute) {
    return NextResponse.next();
  }

  if (!isAdminAuthConfigured()) {
    return NextResponse.next();
  }

  const sessionState = await getAdminSessionFromCookieStore(request.cookies);
  const isAuthenticated = Boolean(sessionState.user);
  const isLoginRoute = pathname === ADMIN_LOGIN_PATH;

  if (isAdminPageRoute && !isAuthenticated && !isLoginRoute) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = ADMIN_LOGIN_PATH;
    loginUrl.searchParams.set("redirect", pathname);
    const response = NextResponse.redirect(loginUrl);
    clearAdminSessionCookies(response);
    return response;
  }

  if (isAdminPageRoute && isAuthenticated && isLoginRoute) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = ADMIN_DASHBOARD_PATH;
    dashboardUrl.search = "";
    const response = NextResponse.redirect(dashboardUrl);
    if (sessionState.session) {
      applyAdminSessionCookies(response, sessionState.session);
    }
    return response;
  }

  const response = NextResponse.next();

  if (sessionState.session) {
    applyAdminSessionCookies(response, sessionState.session);
  } else if (
    request.cookies.get("finjani_admin_access_token")?.value ||
    request.cookies.get("finjani_admin_refresh_token")?.value
  ) {
    clearAdminSessionCookies(response);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/products/:path*", "/api/categories/:path*"],
};
