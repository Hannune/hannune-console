"use client";

import { useState, useTransition } from "react";
import {
  createCheckout,
  openBillingPortal,
} from "@/app/dashboard/[service]/billing";

export type PlanTier = {
  id: string;
  name: string;
  priceUsd: number;
  features: string[];
  contactSales?: boolean;
};

const SALES_EMAIL = "contact@hannune.ai";

export default function PlanSelector({
  service,
  currentTier,
  tiers,
  canManage,
}: {
  service: string;
  currentTier: string;
  tiers: PlanTier[];
  canManage: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [busyTier, setBusyTier] = useState<string | null>(null);

  function upgrade(tier: string) {
    setError(null);
    setBusyTier(tier);
    startTransition(async () => {
      const res = await createCheckout(service, tier);
      if (!res.ok) {
        setError(res.error);
        setBusyTier(null);
        return;
      }
      window.location.href = res.url;
    });
  }

  function manage() {
    setError(null);
    startTransition(async () => {
      const res = await openBillingPortal();
      if (!res.ok) {
        setError(res.error);
        return;
      }
      window.location.href = res.url;
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Plans</h2>
        {canManage && (
          <button
            onClick={manage}
            disabled={pending}
            className="text-sm text-gray-600 underline hover:text-olive disabled:opacity-50"
          >
            Manage subscription
          </button>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiers.map((t) => {
          const isCurrent = t.id === currentTier;
          const isFree = !t.contactSales && t.priceUsd === 0;
          return (
            <div
              key={t.id}
              className={`rounded-lg border p-4 ${
                isCurrent ? "border-olive" : "border-olive/15"
              }`}
            >
              <div className="font-medium">{t.name}</div>
              <div className="mt-1 text-sm text-gray-500">
                {t.contactSales ? (
                  "Custom"
                ) : (
                  <>
                    {isFree ? "$0" : `$${t.priceUsd}`}
                    <span className="text-gray-400">/mo</span>
                  </>
                )}
              </div>
              <ul className="mt-3 space-y-1 text-xs text-gray-500">
                {t.features.map((f) => (
                  <li key={f}>· {f}</li>
                ))}
              </ul>
              <div className="mt-4">
                {t.contactSales ? (
                  <a
                    href={`mailto:${SALES_EMAIL}?subject=${encodeURIComponent(
                      `${service} Enterprise inquiry`,
                    )}`}
                    className="inline-block w-full rounded-md border border-olive px-3 py-1.5 text-center text-sm font-medium text-olive hover:bg-olive/5"
                  >
                    Contact sales
                  </a>
                ) : isCurrent ? (
                  <span className="inline-block rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                    Current plan
                  </span>
                ) : isFree ? (
                  <span className="text-xs text-gray-400">
                    Cancel via Manage
                  </span>
                ) : (
                  <button
                    onClick={() => upgrade(t.id)}
                    disabled={pending}
                    className="w-full rounded-md bg-olive px-3 py-1.5 text-sm font-medium text-cream hover:bg-olive-hover disabled:opacity-50"
                  >
                    {busyTier === t.id ? "Redirecting…" : "Choose"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
