import Link from "next/link";
import { enabledServices } from "@/services/registry";

export default function Home() {
  const services = enabledServices();
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight">Hannune Console</h1>
        <p className="mt-2 text-base text-gray-500">
          APIs and services by Hannune. One account, all services.
        </p>
      </header>

      <section className="grid gap-5 sm:grid-cols-2">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/${s.slug}`}
            className="block rounded-xl border border-olive/15 p-6 transition hover:border-olive/40 hover:shadow-sm"
          >
            <h2 className="text-lg font-medium">{s.name}</h2>
            <p className="mt-1 text-sm text-gray-500">{s.tagline}</p>
            <span className="mt-4 inline-block text-sm font-medium text-olive-hover">
              View &rarr;
            </span>
          </Link>
        ))}
      </section>

      <footer className="mt-16 border-t border-olive/10 pt-6 text-sm text-gray-400">
        <Link href="https://hannune.ai" className="hover:text-gray-600">
          Hannune
        </Link>
        {" · "}
        <Link href="/login" className="hover:text-gray-600">
          Sign in
        </Link>
      </footer>
    </main>
  );
}
