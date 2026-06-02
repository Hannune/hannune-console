"use server";

import { createClient } from "@/lib/supabase/server";
import { createPolar } from "@/lib/polar/client";
import { getProductId } from "@/lib/polar/products";
import { getService } from "@/services/registry";

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:51300";
}

type UrlResult = { ok: true; url: string } | { ok: false; error: string };

/**
 * Start a Polar checkout for (service, tier). The signed-in user's id is set as
 * customerExternalId server-side so the webhook can map the subscription back.
 */
export async function createCheckout(
  service: string,
  tier: string,
): Promise<UrlResult> {
  const svc = getService(service);
  if (!svc) return { ok: false, error: "unknown service" };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "not authenticated" };

  const productId = getProductId(service, tier);
  if (!productId) {
    return { ok: false, error: `no Polar product configured for ${tier}` };
  }

  try {
    const polar = createPolar();
    const checkout = await polar.checkouts.create({
      products: [productId],
      externalCustomerId: user.id,
      customerEmail: user.email ?? undefined,
      successUrl: `${siteUrl()}/dashboard/${service}?upgraded=1`,
    });
    return { ok: true, url: checkout.url };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "checkout failed" };
  }
}

/**
 * Open the Polar customer portal for the signed-in user (manage/cancel).
 * Requires a stored polar_customer_id (set once a subscription webhook arrives).
 */
export async function openBillingPortal(): Promise<UrlResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "not authenticated" };

  const { data: account } = await supabase
    .from("accounts")
    .select("polar_customer_id")
    .eq("id", user.id)
    .single();
  const customerId = account?.polar_customer_id;
  if (!customerId) {
    return { ok: false, error: "no active subscription to manage yet" };
  }

  try {
    const polar = createPolar();
    const session = await polar.customerSessions.create({ customerId });
    return { ok: true, url: session.customerPortalUrl };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "portal failed" };
  }
}
