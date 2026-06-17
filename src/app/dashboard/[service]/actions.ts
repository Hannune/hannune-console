"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateKey, hashKey, keyPrefix } from "@/lib/keys";
import { getService } from "@/services/registry";

type IssueResult =
  | { ok: true; plaintext: string; prefix: string }
  | { ok: false; error: string };

/**
 * Issue a new API key for the signed-in user, scoped to one service.
 * The plaintext is returned once and never stored.
 */
export async function issueKey(
  service: string,
  name: string,
): Promise<IssueResult> {
  const svc = getService(service);
  if (!svc) return { ok: false, error: "unknown service" };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "not authenticated" };

  // account_services 의 그 service tier snapshot (RLS: own row only)
  const { data: acctSvc } = await supabase
    .from("account_services")
    .select("tier")
    .eq("account_id", user.id)
    .eq("service", svc.slug)
    .maybeSingle();
  const tier = acctSvc?.tier ?? "free";

  const plaintext = generateKey();
  const admin = createAdminClient();
  const { error } = await admin.from("api_keys").insert({
    account_id: user.id,
    key_hash: hashKey(plaintext),
    key_prefix: keyPrefix(plaintext),
    tier,
    name: name?.trim() || null,
    service: svc.slug,
  });
  if (error) return { ok: false, error: error.message };

  revalidatePath(`/dashboard/${svc.slug}`);
  return { ok: true, plaintext, prefix: keyPrefix(plaintext) };
}

/**
 * Revoke a key. Scoped to the signed-in user's own keys (defense in depth:
 * the admin client bypasses RLS, so we filter by account_id explicitly).
 */
export async function revokeKey(
  service: string,
  keyId: string,
): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "not authenticated" };

  const admin = createAdminClient();
  const { error } = await admin
    .from("api_keys")
    .update({ revoked_at: new Date().toISOString() })
    .eq("id", keyId)
    .eq("account_id", user.id) // must own it
    .is("revoked_at", null);
  if (error) return { ok: false, error: error.message };

  revalidatePath(`/dashboard/${service}`);
  return { ok: true };
}
