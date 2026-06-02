/**
 * Server-side Supabase client bound to the request cookies.
 * Uses the anon key + the user's session cookie, so RLS still applies.
 * Use inside server components, route handlers, and server actions.
 */
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // setAll can be called from a Server Component where mutating
            // cookies is not allowed; the middleware refresh handles that case.
          }
        },
      },
    },
  );
}
