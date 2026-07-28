import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin-cms/admin-shell";
import { ADMIN_LOGIN_PATH, getAdminSessionFromCookieStore } from "@/lib/admin-auth";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSessionFromCookieStore(await cookies());

  if (!session.user) {
    redirect(ADMIN_LOGIN_PATH);
  }

  return <AdminShell>{children}</AdminShell>;
}
