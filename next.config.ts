import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withSentryConfig(nextConfig, {
  silent: true, // no build-time noise
  // source map upload needs SENTRY_AUTH_TOKEN (skipped for now → minified stacks)
  org: "hannune",
  project: "javascript-nextjs",
});
