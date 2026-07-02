/**
 * Polar product <-> (service, tier) mapping.
 *
 * Product IDs are environment-specific (sandbox vs production differ), so they
 * live in the POLAR_PRODUCTS env var (JSON), NOT in committed code. Shape:
 *
 *   POLAR_PRODUCTS = {
 *     "entity-resolution": { "starter": "prod_xxx", "pro": "prod_yyy", "business": "prod_zzz" }
 *   }
 *
 * Multi-service: add another top-level service key, nothing else changes.
 * Server-only (reads a non-public env var).
 */
import "server-only";

type ProductMap = Record<string, Record<string, string>>;

/**
 * Legacy env-key aliases. The ownership URL slug was renamed
 * "ownership-api" -> "ownership" (2026-06-28), but the POLAR_PRODUCTS env var
 * (Vercel / local) may still use the old key. Accept both directions so a
 * stale env never breaks checkout or webhook tier mapping.
 */
const LEGACY_ENV_KEYS: Record<string, string[]> = {
  ownership: ["ownership-api"],
};

const CANONICAL_SERVICE: Record<string, string> = {
  "ownership-api": "ownership",
};

let _cache: ProductMap | null = null;

function load(): ProductMap {
  if (_cache) return _cache;
  const raw = process.env.POLAR_PRODUCTS;
  if (!raw) {
    _cache = {};
    return _cache;
  }
  try {
    _cache = JSON.parse(raw) as ProductMap;
  } catch {
    throw new Error("POLAR_PRODUCTS is not valid JSON");
  }
  return _cache;
}

/** (service, tier) -> Polar product id. undefined if not configured (e.g. free tier). */
export function getProductId(service: string, tier: string): string | undefined {
  const map = load();
  const direct = map[service]?.[tier];
  if (direct) return direct;
  for (const legacyKey of LEGACY_ENV_KEYS[service] ?? []) {
    const viaLegacy = map[legacyKey]?.[tier];
    if (viaLegacy) return viaLegacy;
  }
  return undefined;
}

/** Polar product id -> { service, tier }. undefined if the product is unknown. */
export function resolveTierByProductId(
  productId: string,
): { service: string; tier: string } | undefined {
  const map = load();
  for (const service of Object.keys(map)) {
    for (const tier of Object.keys(map[service])) {
      if (map[service][tier] === productId) {
        // Env may use a legacy service key; always return the canonical slug
        // so account_services rows match the registry slug the dashboard reads.
        return { service: CANONICAL_SERVICE[service] ?? service, tier };
      }
    }
  }
  return undefined;
}
