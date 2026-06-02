import Link from "next/link";
import { notFound } from "next/navigation";
import { enabledServices, getService } from "@/services/registry";

// Pre-render one page per enabled service (template reused for every service).
export function generateStaticParams() {
  return enabledServices().map((s) => ({ service: s.slug }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params; // Next 16: params is async
  const svc = getService(service);
  if (!svc) notFound();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <nav className="mb-10 text-sm text-gray-400">
        <Link href="/" className="hover:text-gray-600">
          Console
        </Link>
        {" / "}
        <span className="text-gray-600">{svc.name}</span>
      </nav>

      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight">{svc.name}</h1>
        <p className="mt-2 text-lg text-gray-500">{svc.tagline}</p>
        <p className="mt-4 max-w-2xl text-base text-gray-600">{svc.description}</p>
        <div className="mt-6 flex gap-3">
          <Link
            href={`/login?next=/dashboard/${svc.slug}`}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Get API key
          </Link>
          <Link
            href={`/${svc.slug}/docs`}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-400"
          >
            Docs
          </Link>
        </div>
        <p className="mt-3 font-mono text-xs text-gray-400">{svc.apiBaseUrl}</p>
      </header>

      <section>
        <h2 className="mb-6 text-xl font-semibold">Pricing</h2>
        <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-5">
          {svc.tiers.map((t) => (
            <div
              key={t.id}
              className="flex flex-col rounded-xl border border-gray-200 p-6"
            >
              <h3 className="text-base font-medium">{t.name}</h3>
              <p className="mt-2 text-3xl font-semibold">
                {t.contactSales ? (
                  <span className="text-2xl">Custom</span>
                ) : (
                  <>
                    ${t.priceUsd}
                    <span className="text-sm font-normal text-gray-400">
                      /mo
                    </span>
                  </>
                )}
              </p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-gray-600">
                {t.features.map((f) => (
                  <li key={f}>· {f}</li>
                ))}
              </ul>
              {t.contactSales ? (
                <a
                  href={`mailto:contact@hannune.ai?subject=${encodeURIComponent(
                    `${svc.slug} Enterprise inquiry`,
                  )}`}
                  className="mt-6 rounded-lg border border-gray-900 px-4 py-2 text-center text-sm font-medium hover:bg-gray-50"
                >
                  Contact sales
                </a>
              ) : (
                <Link
                  href={`/login?next=/dashboard/${svc.slug}`}
                  className="mt-6 rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium hover:border-gray-400"
                >
                  {t.priceUsd === 0 ? "Start free" : "Choose"}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
