import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
