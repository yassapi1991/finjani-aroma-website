import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function isPlaceholder(value: string) {
  return (
    value.includes("YOUR_PROJECT") ||
    value.includes("YOUR_ANON_KEY") ||
    value.includes("YOUR_SERVICE_ROLE_KEY")
  );
}

export function getServiceSupabase() {
  if (!supabaseUrl || !serviceKey || isPlaceholder(supabaseUrl) || isPlaceholder(serviceKey)) {
    return null;
  }

  return createClient(supabaseUrl, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export function getAnonSupabase() {
  if (!supabaseUrl || !anonKey || isPlaceholder(supabaseUrl) || isPlaceholder(anonKey)) {
    return null;
  }

  return createClient(supabaseUrl, anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
