import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getService } from "@/services/registry";
import KeysManager from "@/components/keys-manager";
import PlanSelector from "@/components/plan-selector";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const svc = getService(service);
  return { title: `${svc?.name ?? "Service"} — Dashboard` };
}

function currentMonthUTC(): string {
  const d = new Date();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${d.getUTCFullYear()}-${mm}`;
}

export default async function ServiceDashboard({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const svc = getService(service);
  if (!svc) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=/dashboard/${service}`);

  // account tier -> quota for this service
  const { data: account } = await supabase
    .from("accounts")
    .select("tier, polar_customer_id")
    .eq("id", user.id)
    .single();
  const tierId = account?.tier ?? "free";
  const tier = svc.tiers.find((t) => t.id === tierId) ?? svc.tiers[0];

  // keys for this user + service (RLS: own rows only)
  const { data: allKeys } = await supabase
    .from("api_keys")
    .select("id, key_prefix, name, tier, created_at, last_used_at, revoked_at")
    .eq("service", svc.slug)
    .order("created_at", { ascending: false });

  const keys = allKeys ?? [];
  const activeKeys = keys.filter((k) => !k.revoked_at);

  // usage this month across this user's keys for this service
  const month = currentMonthUTC();
  const keyIds = keys.map((k) => k.id);
  let matchesUsed = 0;
  let requestsUsed = 0;
  if (keyIds.length > 0) {
    const { data: usage } = await supabase
      .from("usage_monthly")
      .select("matches, requests")
      .eq("month", month)
      .in("api_key_id", keyIds);
    for (const u of usage ?? []) {
      matchesUsed += u.matches ?? 0;
      requestsUsed += u.requests ?? 0;
    }
  }
  const quota = tier.monthlyQuota;
  const pct = quota > 0 ? Math.min(100, Math.round((matchesUsed / quota) * 100)) : 0;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/dashboard"
            className="text-sm text-gray-500 hover:text-olive"
          >
            ← Dashboard
          </Link>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            {svc.name}
          </h1>
        </div>
        <span className="rounded-full border border-olive/25 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-600">
          {tier.name} plan
        </span>
      </div>

      {/* usage */}
      <section className="mt-8 rounded-lg border border-olive/15 p-5">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-medium">Usage this month ({month})</span>
          <span className="text-gray-500">
            {matchesUsed.toLocaleString()} / {quota.toLocaleString()} matches
          </span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-olive"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-gray-400">
          {requestsUsed.toLocaleString()} requests · {tier.ratePerMin} req/min
          limit
        </p>
      </section>

      {/* plans */}
      <section className="mt-8">
        <PlanSelector
          service={svc.slug}
          currentTier={tierId}
          canManage={Boolean(account?.polar_customer_id)}
          tiers={svc.tiers.map((t) => ({
            id: t.id,
            name: t.name,
            priceUsd: t.priceUsd,
            features: t.features,
            contactSales: t.contactSales,
          }))}
        />
      </section>

      {/* keys */}
      <section className="mt-8">
        <KeysManager
          service={svc.slug}
          apiBaseUrl={svc.apiBaseUrl}
          initialKeys={activeKeys.map((k) => ({
            id: k.id,
            keyPrefix: k.key_prefix,
            name: k.name,
            createdAt: k.created_at,
            lastUsedAt: k.last_used_at,
          }))}
        />
      </section>
    </main>
  );
}
