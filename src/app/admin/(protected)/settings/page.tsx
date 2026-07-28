import { headers } from "next/headers";

function maskSecret(value: string | undefined) {
  if (!value) return "Not configured";
  if (value.length <= 8) return "********";
  return `${value.slice(0, 4)}********${value.slice(-4)}`;
}

export default async function SettingsPage() {
  const host = (await headers()).get("host") || "localhost:3000";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `http://${host}`;

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h2>
        <p className="mt-1 text-sm text-slate-600">Configuration summary and security guidance for administrators.</p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Environment</h3>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="grid gap-1 sm:grid-cols-[220px_1fr]">
            <dt className="font-medium text-slate-500">Public site URL</dt>
            <dd className="text-slate-900">{siteUrl}</dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[220px_1fr]">
            <dt className="font-medium text-slate-500">Supabase URL</dt>
            <dd className="text-slate-900">{process.env.NEXT_PUBLIC_SUPABASE_URL || "Not configured"}</dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[220px_1fr]">
            <dt className="font-medium text-slate-500">Service key status</dt>
            <dd className="text-slate-900">{maskSecret(process.env.SUPABASE_SERVICE_ROLE_KEY)}</dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[220px_1fr]">
            <dt className="font-medium text-slate-500">Admin authentication</dt>
            <dd className="text-slate-900">Supabase Auth (email/password)</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Change Admin Password</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Open Supabase Dashboard, then Authentication and Users.</li>
          <li>Select the administrator user and reset password.</li>
          <li>Keep the user marked as admin in app metadata (role = admin).</li>
          <li>No application restart is required after password change.</li>
        </ol>
      </section>
    </div>
  );
}
