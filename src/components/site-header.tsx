import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-gray-100">
      <div className="mx-auto flex h-14 max-w-5xl items-center px-6">
        <Link href="/" aria-label="Hannune — home" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Hannune" className="h-7 w-auto" />
        </Link>
      </div>
    </header>
  );
}
