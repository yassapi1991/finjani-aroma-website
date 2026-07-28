import type { Session, User } from "@supabase/supabase-js";
import { getAnonSupabase } from "@/lib/supabase/server";

export const ADMIN_ACCESS_TOKEN_COOKIE = "finjani_admin_access_token";
export const ADMIN_REFRESH_TOKEN_COOKIE = "finjani_admin_refresh_token";
export const ADMIN_LOGIN_PATH = "/admin/login";
export const ADMIN_DASHBOARD_PATH = "/admin/dashboard";

const ADMIN_REFRESH_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

interface CookieStoreLike {
  get: (name: string) => { value: string } | undefined;
}

interface CookieWriterLike {
  cookies: {
    set: (options: {
      name: string;
      value: string;
      httpOnly: boolean;
      secure: boolean;
      sameSite: "lax";
      path: string;
      maxAge: number;
    }) => void;
  };
}

interface AdminSessionState {
  user: User | null;
  session: Session | null;
}

function hasConfiguredEnv(value: string | undefined) {
  if (!value) return false;
  if (value.includes("YOUR_PROJECT")) return false;
  if (value.includes("YOUR_ANON_KEY")) return false;
  return true;
}

export function isAdminAuthConfigured() {
  return (
    hasConfiguredEnv(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    (hasConfiguredEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) || hasConfiguredEnv(process.env.SUPABASE_SERVICE_ROLE_KEY))
  );
}

export function isAdminUser(user: User | null | undefined) {
  return Boolean(user?.app_metadata?.role === "admin");
}

export function applyAdminSessionCookies(response: CookieWriterLike, session: Session) {
  const now = Math.floor(Date.now() / 1000);
  const accessMaxAge = Math.max((session.expires_at ?? now + 60 * 60) - now, 60);

  response.cookies.set({
    name: ADMIN_ACCESS_TOKEN_COOKIE,
    value: session.access_token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: accessMaxAge,
  });

  response.cookies.set({
    name: ADMIN_REFRESH_TOKEN_COOKIE,
    value: session.refresh_token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_REFRESH_COOKIE_MAX_AGE_SECONDS,
  });
}

export function clearAdminSessionCookies(response: CookieWriterLike) {
  response.cookies.set({
    name: ADMIN_ACCESS_TOKEN_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  response.cookies.set({
    name: ADMIN_REFRESH_TOKEN_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function getAdminSessionFromCookieStore(cookieStore: CookieStoreLike): Promise<AdminSessionState> {
  const accessToken = cookieStore.get(ADMIN_ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = cookieStore.get(ADMIN_REFRESH_TOKEN_COOKIE)?.value;

  if (!accessToken || !refreshToken) {
    return { user: null, session: null };
  }

  const supabase = getAnonSupabase();
  if (!supabase) {
    return { user: null, session: null };
  }

  const { data, error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (error || !data.session || !isAdminUser(data.user)) {
    return { user: null, session: null };
  }

  return {
    user: data.user,
    session: data.session,
  };
}
