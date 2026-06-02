/**
 * Apply Polar subscription webhook events to Supabase (accounts.tier +
 * subscriptions). Server-only, uses the service_role admin client.
 *
 * Field access is defensive (camelCase from the SDK validator, snake_case from
 * raw API) so it survives either shape.
 */
import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { resolveTierByProductId } from "@/lib/polar/products";

// Polar's subscription object is loosely typed across SDK versions; read both cases.
type AnySub = Record<string, unknown> & {
  id?: string;
  status?: string;
  productId?: string;
  product_id?: string;
  customerId?: string;
  customer_id?: string;
  customerExternalId?: string;
  currentPeriodEnd?: string | Date | null;
  current_period_end?: string | Date | null;
  cancelAtPeriodEnd?: boolean;
  cancel_at_period_end?: boolean;
  customer?: {
    id?: string | null;
    externalId?: string | null;
    external_id?: string | null;
  } | null;
};

function pick(sub: AnySub) {
  const productId = sub.productId ?? sub.product_id;
  const polarCustomerId = sub.customerId ?? sub.customer_id ?? sub.customer?.id;
  const externalId =
    sub.customerExternalId ??
    sub.customer?.externalId ??
    sub.customer?.external_id;
  const periodEndRaw = sub.currentPeriodEnd ?? sub.current_period_end ?? null;
  const periodEnd =
    periodEndRaw instanceof Date
      ? periodEndRaw.toISOString()
      : (periodEndRaw as string | null);
  return {
    subscriptionId: sub.id,
    status: sub.status,
    productId,
    polarCustomerId,
    externalId, // our Supabase user id
    periodEnd,
  };
}

/** Subscription is now active -> grant the tier. */
export async function grantSubscription(sub: AnySub): Promise<void> {
  const { subscriptionId, productId, polarCustomerId, externalId, periodEnd } =
    pick(sub);
  if (!externalId || !productId) return;
  const mapping = resolveTierByProductId(productId);
  if (!mapping) return; // unknown product, ignore

  const admin = createAdminClient();

  // 1. set the account tier + remember the Polar customer id (for the portal)
  await admin
    .from("accounts")
    .update({
      tier: mapping.tier,
      ...(polarCustomerId ? { polar_customer_id: polarCustomerId } : {}),
    })
    .eq("id", externalId);

  // 2. upsert the subscription row (one active sub per account+service)
  await admin.from("subscriptions").upsert(
    {
      account_id: externalId,
      service: mapping.service,
      polar_subscription_id: subscriptionId ?? null,
      tier: mapping.tier,
      status: "active",
      current_period_end: periodEnd,
    },
    { onConflict: "polar_subscription_id" },
  );
}

/** Subscription definitively ended -> drop to free. */
export async function revokeSubscription(sub: AnySub): Promise<void> {
  const { subscriptionId, externalId } = pick(sub);
  if (!externalId) return;
  const admin = createAdminClient();

  await admin.from("accounts").update({ tier: "free" }).eq("id", externalId);
  if (subscriptionId) {
    await admin
      .from("subscriptions")
      .update({ status: "revoked" })
      .eq("polar_subscription_id", subscriptionId);
  }
}

/** Scheduled cancel (still active until period end) -> mark, keep tier. */
export async function markCanceled(sub: AnySub): Promise<void> {
  const { subscriptionId } = pick(sub);
  if (!subscriptionId) return;
  const admin = createAdminClient();
  await admin
    .from("subscriptions")
    .update({ status: "canceled" })
    .eq("polar_subscription_id", subscriptionId);
}
