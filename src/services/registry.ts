/**
 * Service registry — the heart of the Hannune console's multi-service design.
 *
 * Services are defined as DATA here. Pages, pricing, docs, billing, and key
 * issuance all read from this registry. Never hardcode a single service into the
 * UI/billing/auth code. Adding a new service (e.g. 2asy) = one entry here + its
 * content + a Polar product. No changes to page templates / billing / keys.
 *
 * See website/console/CONSOLE_DESIGN.md.
 */

export type TierDef = {
  id: string; // 'free' | 'starter' | 'pro' | 'business' | 'enterprise'
  name: string;
  priceUsd: number; // monthly (0 for free; ignored when contactSales)
  monthlyQuota: number; // matches/month (0 = custom/unlimited for contactSales)
  ratePerMin: number;
  features: string[];
  polarProductId?: string; // Polar product per service x tier (filled at billing step)
  contactSales?: boolean; // no self-serve checkout; "Contact sales" instead
};

export type ServiceDef = {
  slug: string; // URL + api path segment, e.g. 'entity-resolution'
  name: string;
  tagline: string;
  description: string;
  apiBaseUrl: string; // machine endpoint, e.g. https://api.hannune.ai/entity-resolution/v1
  tiers: TierDef[];
  enabled: boolean;
};

// ---- Entity Resolution API (first tenant) ----
const ENTITY_RESOLUTION: ServiceDef = {
  slug: "entity-resolution",
  name: "Entity Resolution API",
  tagline: "Resolve messy entity names to canonical IDs.",
  description:
    "Splink + LLM hybrid entity resolution. Map varied surface forms " +
    '("Samsung Elec", "삼성전자") to one canonical entity, with multilingual ' +
    "and abbreviation handling. API-first, no self-hosting.",
  apiBaseUrl: "https://api.hannune.ai/entity-resolution/v1",
  tiers: [
    {
      id: "free",
      name: "Free",
      priceUsd: 0,
      monthlyQuota: 1000,
      ratePerMin: 10,
      features: ["1,000 matches/mo", "10 req/min", "Core resolution"],
    },
    {
      id: "starter",
      name: "Starter",
      priceUsd: 19,
      monthlyQuota: 10000,
      ratePerMin: 60,
      features: ["10,000 matches/mo", "60 req/min", "CSV upload"],
    },
    {
      id: "pro",
      name: "Pro",
      priceUsd: 99,
      monthlyQuota: 100000,
      ratePerMin: 300,
      features: [
        "100,000 matches/mo",
        "300 req/min",
        "LLM disambiguation",
        "Graph RAG presets",
      ],
    },
    {
      id: "business",
      name: "Business",
      priceUsd: 499,
      monthlyQuota: 1000000,
      ratePerMin: 1000,
      features: [
        "1,000,000 matches/mo",
        "1,000 req/min",
        "All Pro features",
        "Priority support",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      priceUsd: 0, // custom; see contactSales
      monthlyQuota: 0, // custom / unlimited
      ratePerMin: 0,
      contactSales: true,
      features: [
        "Over 1,000,000 matches/mo",
        "Custom rate limits",
        "SSO, SLA, on-prem option",
        "Dedicated support",
      ],
    },
  ],
  enabled: true,
};

// ---- Ownership API (Northeast Asia 5%-rule + acquisition disclosures) ----
const OWNERSHIP_API: ServiceDef = {
  slug: "ownership-api",
  name: "Ownership API",
  tagline:
    "Northeast Asia 5%-rule + acquisition disclosures, one cross-lingual ownership graph.",
  description:
    "Unifies 5%-rule and acquisition disclosures from Korea (OpenDART), " +
    "Japan (EDINET), China (CNINFO), Hong Kong (HKEX), Taiwan (TWSE), and " +
    "US (SEC EDGAR ADRs) into a single ownership graph. Cross-lingual entity " +
    "linking via Hannune's Entity Resolution canonical IDs. Daily polling.",
  apiBaseUrl: "https://api.hannune.ai/ownership-api/v1",
  tiers: [
    {
      id: "free",
      name: "Free",
      priceUsd: 0,
      monthlyQuota: 100,
      ratePerMin: 10,
      features: ["100 calls/mo", "Depth 2 ownership tree", "60-min cache"],
    },
    {
      id: "developer",
      name: "Developer",
      priceUsd: 29,
      monthlyQuota: 5000,
      ratePerMin: 60,
      features: [
        "5,000 calls/mo",
        "Depth 3 ownership tree",
        "200 history rows / call",
        "Evidence quotes",
      ],
    },
    {
      id: "professional",
      name: "Professional",
      priceUsd: 149,
      monthlyQuota: 50000,
      ratePerMin: 300,
      features: [
        "50,000 calls/mo",
        "Depth 4 ownership tree",
        "Unlimited history rows",
        "Monthly jsonl bulk export",
        "On-demand new-company ingestion",
      ],
    },
    {
      id: "business",
      name: "Business",
      priceUsd: 699,
      monthlyQuota: 500000,
      ratePerMin: 1000,
      features: [
        "500,000 calls/mo",
        "Depth 4 ownership tree",
        "Daily jsonl bulk export",
        "Priority new-source onboarding",
        "Webhook push on ownership-percentage changes",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      priceUsd: 0,
      monthlyQuota: 0,
      ratePerMin: 0,
      contactSales: true,
      features: [
        "Unlimited calls",
        "Custom rate limits",
        "SLA, on-premise option, custom polling cadence",
        "Dedicated support",
      ],
    },
  ],
  enabled: true,
};

// New services append here (e.g. TWOASY). Nothing else in the codebase changes.
export const SERVICES: ServiceDef[] = [ENTITY_RESOLUTION, OWNERSHIP_API];

export function getService(slug: string): ServiceDef | undefined {
  return SERVICES.find((s) => s.slug === slug && s.enabled);
}

export function enabledServices(): ServiceDef[] {
  return SERVICES.filter((s) => s.enabled);
}
