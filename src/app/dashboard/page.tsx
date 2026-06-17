import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { enabledServices } from "@/services/registry";
import Link from "next/link";

export const metadata = { title: "Dashboard — Hannune Console" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // middleware already guards this, but double-check server-side.
  if (!user) redirect("/login?next=/dashboard");

  // 사용자가 가진 service 별 tier list (account_services).
  const { data: rows } = await supabase
    .from("account_services")
    .select("service, tier")
    .eq("account_id", user.id);
  const tierByService: Record<string, string> = {};
  for (const r of rows ?? []) {
    tierByService[r.service] = r.tier;
  }

  const services = enabledServices();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="rounded-md border border-olive/25 px-3 py-1.5 text-sm hover:bg-olive/5"
          >
            Sign out
          </button>
        </form>
      </div>

      <p className="mt-2 text-sm text-gray-500">
        Signed in as {user.email}
      </p>

      <h2 className="mt-10 text-sm font-medium uppercase tracking-wide text-gray-400">
        Your services
      </h2>
      <div className="mt-4 grid gap-4">
        {services.map((s) => {
          const tier = tierByService[s.slug] ?? "free";
          return (
            <Link
              key={s.slug}
              href={`/dashboard/${s.slug}`}
              className="rounded-lg border border-olive/15 p-5 hover:border-olive/40"
            >
              <div className="flex items-center justify-between">
                <div className="font-medium">{s.name}</div>
                <span className="rounded-full border border-olive/25 px-2 py-0.5 text-xs uppercase tracking-wide text-gray-600">
                  {tier}
                </span>
              </div>
              <div className="mt-1 text-sm text-gray-500">{s.tagline}</div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
