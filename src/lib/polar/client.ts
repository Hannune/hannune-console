/**
 * Polar SDK client (server-only). Uses the organization access token.
 * `server` is env-driven so we can point at sandbox during dev and production
 * for live, without code changes. Defaults to production.
 */
import "server-only";
import { Polar } from "@polar-sh/sdk";

export function polarServer(): "sandbox" | "production" {
  return process.env.POLAR_SERVER === "sandbox" ? "sandbox" : "production";
}

export function createPolar() {
  const accessToken = process.env.POLAR_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("POLAR_ACCESS_TOKEN not set");
  }
  return new Polar({ accessToken, server: polarServer() });
}
