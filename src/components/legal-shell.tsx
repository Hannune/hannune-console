import Link from "next/link";

export default function LegalShell({
  eyebrow,
  title,
  effective,
  children,
}: {
  eyebrow: string;
  title: string;
  effective: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <Link href="/" className="text-sm text-gray-400 hover:text-gray-700">
        ← Console
      </Link>
      <p className="mt-6 text-xs font-medium uppercase tracking-wide text-gray-400">
        {eyebrow}
      </p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-gray-500">{effective}</p>
      <article className="prose prose-sm mt-8 max-w-none prose-headings:font-semibold prose-h2:mt-8 prose-h2:text-lg prose-h3:text-base prose-a:text-olive-hover">
        {children}
      </article>
    </main>
  );
}
