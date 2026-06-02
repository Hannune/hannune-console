/**
 * Server-only Supabase client using the service_role key. BYPASSES RLS.
 * Use ONLY inside server actions / route handlers for privileged ops the user
 * cannot do directly (issuing/revoking keys). NEVER import into client code.
 *
 * Every caller MUST scope queries to the authenticated user's id — RLS is off
 * for this client, so authorization is the caller's responsibility.
 */
import "server-only";
import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase admin client misconfigured: missing URL or SUPABASE_SERVICE_KEY",
    );
  }
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
