/**
 * Polar webhook receiver. Verifies the signature (via POLAR_WEBHOOK_SECRET)
 * and syncs subscription state to Supabase.
 *
 * Activate tier on: subscription.created / .active / .uncanceled
 * Schedule cancel (keep tier until period end) on: subscription.canceled
 * Drop to free on: subscription.revoked
 */
import { Webhooks } from "@polar-sh/nextjs";
import {
  grantSubscription,
  revokeSubscription,
  markCanceled,
} from "@/lib/polar/sync";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onSubscriptionCreated: async (p) => grantSubscription(p.data),
  onSubscriptionActive: async (p) => grantSubscription(p.data),
  onSubscriptionUpdated: async (p) => {
    // catch-all: re-grant if active, drop if revoked
    const status = (p.data as { status?: string }).status;
    if (status === "active") await grantSubscription(p.data);
    else if (status === "revoked") await revokeSubscription(p.data);
  },
  onSubscriptionCanceled: async (p) => markCanceled(p.data),
  onSubscriptionRevoked: async (p) => revokeSubscription(p.data),
});
