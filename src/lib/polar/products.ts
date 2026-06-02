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
  return load()[service]?.[tier];
}

/** Polar product id -> { service, tier }. undefined if the product is unknown. */
export function resolveTierByProductId(
  productId: string,
): { service: string; tier: string } | undefined {
  const map = load();
  for (const service of Object.keys(map)) {
    for (const tier of Object.keys(map[service])) {
      if (map[service][tier] === productId) return { service, tier };
    }
  }
  return undefined;
}
