import Link from "next/link";
import { notFound } from "next/navigation";
import { enabledServices, getService } from "@/services/registry";

export function generateStaticParams() {
  return enabledServices().map((s) => ({ service: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const svc = getService(service);
  return { title: `${svc?.name ?? "Service"} — Docs` };
}

function Code({ children }: { children: string }) {
  return (
    <pre className="mt-3 overflow-x-auto rounded-lg bg-olive p-4 text-xs leading-relaxed text-gray-100">
      <code>{children}</code>
    </pre>
  );
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const svc = getService(service);
  if (!svc) notFound();
  const base = svc.apiBaseUrl;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <nav className="text-sm text-gray-400">
        <Link href="/" className="hover:text-gray-700">
          Console
        </Link>
        {" / "}
        <Link href={`/${svc.slug}`} className="hover:text-gray-700">
          {svc.name}
        </Link>
        {" / "}
        <span className="text-gray-600">Docs</span>
      </nav>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight">
        {svc.name} — API reference
      </h1>
      <p className="mt-2 text-gray-600">{svc.description}</p>

      <h2 className="mt-10 text-xl font-semibold">Base URL</h2>
      <Code>{base}</Code>

      <h2 className="mt-10 text-xl font-semibold">Authentication</h2>
      <p className="mt-2 text-gray-600">
        All requests require an API key as a Bearer token. Create a key in your{" "}
        <Link
          href={`/login?next=/dashboard/${svc.slug}`}
          className="text-olive-hover underline"
        >
          dashboard
        </Link>
        .
      </p>
      <Code>{`Authorization: Bearer erk_live_xxxxxxxxxxxxxxxx`}</Code>

      <h2 className="mt-10 text-xl font-semibold">Resolve one entity</h2>
      <p className="mt-2 text-gray-600">
        <code>POST /match</code> — resolve a single surface form to a canonical
        entity. Counts as one match against your monthly quota when a match is
        found.
      </p>
      <Code>{`curl -X POST ${base}/match \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "entity_name": "Samsung Elec",
    "entity_type": "organization"
  }'`}</Code>
      <p className="mt-3 text-sm text-gray-500">Response</p>
      <Code>{`{
  "tier": "free",
  "match_found": true,
  "resolved_entity": "Samsung Electronics",
  "resolved_id": "company_samsung_electronics",
  "match_type": "exact_alias",
  "confidence": 1.0,
  "normalized_name": "samsung elec",
  "candidate_pool": 13371
}`}</Code>
      <p className="mt-3 text-sm text-gray-600">
        Optional fields: <code>context</code> (a short string to help
        disambiguation) and <code>registry_id</code> (to match against a custom
        registry instead of the default).
      </p>

      <h2 className="mt-10 text-xl font-semibold">Check usage</h2>
      <p className="mt-2 text-gray-600">
        <code>GET /usage</code> — current month usage and limits for your key.
      </p>
      <Code>{`curl ${base}/usage -H "Authorization: Bearer $API_KEY"`}</Code>
      <Code>{`{
  "tier": "free",
  "month": "2026-06",
  "matches_used": 12,
  "matches_limit": 1000,
  "requests_this_month": 20,
  "rate_per_min": 10
}`}</Code>

      <h2 className="mt-10 text-xl font-semibold">Plans &amp; limits</h2>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-gray-400">
            <tr>
              <th className="py-2 pr-4">Plan</th>
              <th className="py-2 pr-4">Matches / mo</th>
              <th className="py-2 pr-4">Rate limit</th>
              <th className="py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {svc.tiers.map((t) => (
              <tr key={t.id} className="border-t border-olive/10">
                <td className="py-2 pr-4 font-medium">{t.name}</td>
                <td className="py-2 pr-4">
                  {t.contactSales
                    ? "Custom"
                    : t.monthlyQuota.toLocaleString()}
                </td>
                <td className="py-2 pr-4">
                  {t.contactSales ? "Custom" : `${t.ratePerMin}/min`}
                </td>
                <td className="py-2">
                  {t.contactSales ? "Contact sales" : `$${t.priceUsd}/mo`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Errors</h2>
      <ul className="mt-2 space-y-1 text-sm text-gray-600">
        <li>
          <code>401</code> — missing or invalid API key.
        </li>
        <li>
          <code>402</code> — monthly quota exceeded. Upgrade your plan to
          continue.
        </li>
        <li>
          <code>429</code> — rate limit exceeded. Retry after a short delay.
        </li>
      </ul>

      <div className="mt-10">
        <Link
          href={`/login?next=/dashboard/${svc.slug}`}
          className="rounded-lg bg-olive px-5 py-2.5 text-sm font-medium text-cream hover:bg-olive-hover"
        >
          Get an API key
        </Link>
      </div>
    </main>
  );
}
