import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // hannune.ai/pricing.html redirects here; per-service pricing lives on
        // the landing's service pages, so send visitors to the landing.
        source: "/pricing",
        destination: "/",
        permanent: false,
      },
      {
        source: "/ownership-api",
        destination: "/ownership",
        permanent: true,
      },
      {
        source: "/ownership-api/:path*",
        destination: "/ownership/:path*",
        permanent: true,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  silent: true, // no build-time noise
  // source map upload needs SENTRY_AUTH_TOKEN (skipped for now → minified stacks)
  org: "hannune",
  project: "javascript-nextjs",
});
