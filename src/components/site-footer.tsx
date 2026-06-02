import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-gray-100 px-6 py-8 text-sm text-gray-400">
      <div className="mx-auto flex max-w-5xl flex-col gap-2">
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          <Link href="/terms" className="hover:text-gray-700">
            Terms of Service
          </Link>
          <Link href="/privacy" className="hover:text-gray-700">
            Privacy Policy
          </Link>
          <Link href="/refund" className="hover:text-gray-700">
            Refund Policy
          </Link>
          <Link
            href="https://hannune.ai"
            className="hover:text-gray-700"
          >
            hannune.ai
          </Link>
        </div>
        <p>© 2026 Hannune (한누네). Seoul, Republic of Korea.</p>
        <p className="text-xs">
          Subscription payments are processed by Polar as Merchant of Record.
        </p>
      </div>
    </footer>
  );
}
