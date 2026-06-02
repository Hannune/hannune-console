import Link from "next/link";

export default function SiteHeader() {
  // Matches hannune.ai: dark-olive bar, cream content, the pale gradient logo
  // (which is designed to sit on this dark background).
  return (
    <header className="bg-olive shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
      <div className="mx-auto flex h-14 max-w-5xl items-center px-6">
        <Link href="/" aria-label="Hannune home" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Hannune" className="h-8 w-auto" />
        </Link>
      </div>
    </header>
  );
}
