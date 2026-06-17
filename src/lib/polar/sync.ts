/**
 * Polar subscription webhook -> Supabase 동기화. Server-only (service_role).
 *
 * Multi-service: tier 는 account_services (account_id, service) 에 박힘.
 * 옛 accounts.tier 단일 컬럼은 안 건드림 (legacy, 옛 ER API 코드와 호환용).
 */
import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { resolveTierByProductId } from "@/lib/polar/products";

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
    externalId,
    periodEnd,
  };
}

/** active -> account_services 의 그 service 의 tier 박음. */
export async function grantSubscription(sub: AnySub): Promise<void> {
  const { subscriptionId, productId, polarCustomerId, externalId, periodEnd } =
    pick(sub);
  if (!externalId || !productId) return;
  const mapping = resolveTierByProductId(productId);
  if (!mapping) return;

  const admin = createAdminClient();

  // account_services 의 그 (account, service) row upsert.
  await admin.from("account_services").upsert(
    {
      account_id: externalId,
      service: mapping.service,
      tier: mapping.tier,
      polar_customer_id: polarCustomerId ?? null,
      polar_subscription_id: subscriptionId ?? null,
      cancel_at_period_end: false,
    },
    { onConflict: "account_id,service" },
  );

  // subscriptions 테이블 (옛 ER API 와 호환). 한 sub 당 1 row.
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

/** revoked -> 그 service 만 free 로 drop. 다른 service tier 는 그대로. */
export async function revokeSubscription(sub: AnySub): Promise<void> {
  const { subscriptionId, productId, externalId } = pick(sub);
  if (!externalId) return;
  const admin = createAdminClient();

  let service: string | undefined;
  if (productId) {
    const mapping = resolveTierByProductId(productId);
    service = mapping?.service;
  }
  if (!service && subscriptionId) {
    // productId 없으면 subscription_id 로 service 역추적
    const { data } = await admin
      .from("account_services")
      .select("service")
      .eq("polar_subscription_id", subscriptionId)
      .limit(1)
      .maybeSingle();
    service = data?.service;
  }

  if (service) {
    await admin
      .from("account_services")
      .update({
        tier: "free",
        polar_subscription_id: null,
        cancel_at_period_end: false,
      })
      .eq("account_id", externalId)
      .eq("service", service);
  }

  if (subscriptionId) {
    await admin
      .from("subscriptions")
      .update({ status: "revoked" })
      .eq("polar_subscription_id", subscriptionId);
  }
}

/** 예약 cancel (period end 까지 tier 유지). cancel_at_period_end 만 마킹. */
export async function markCanceled(sub: AnySub): Promise<void> {
  const { subscriptionId } = pick(sub);
  if (!subscriptionId) return;
  const admin = createAdminClient();

  await admin
    .from("account_services")
    .update({ cancel_at_period_end: true })
    .eq("polar_subscription_id", subscriptionId);

  await admin
    .from("subscriptions")
    .update({ status: "canceled" })
    .eq("polar_subscription_id", subscriptionId);
}
