import LegalShell from "@/components/legal-shell";

export const metadata = {
  title: "Refund Policy — Hannune",
  description:
    "14-day money-back guarantee for Hannune's Entity Resolution API subscriptions.",
};

export default function RefundPage() {
  return (
    <LegalShell
      eyebrow="Legal · Refunds"
      title="Refund Policy"
      effective="Effective date: June 2, 2026 · Last updated: June 2, 2026"
    >
      <p>
        This Refund Policy describes when and how you may receive a refund for
        services purchased from Hannune (한누네) via app.hannune.ai. It applies to
        all API customers worldwide and supplements the consumer protection rights
        that may apply under your local law.
      </p>

      <h2>1. API subscriptions</h2>
      <h3>1.1 First subscription: 14-day guarantee</h3>
      <p>
        <strong>A full refund is available for your first paid subscription</strong>{" "}
        within 14 days of the initial payment, for any reason. This satisfies the
        EU Consumer Rights Directive and exceeds most industry standards. No
        explanation required.
      </p>
      <h3>1.2 Subsequent billing periods</h3>
      <p>
        After the initial 14-day window, subscriptions are billed monthly and
        non-refundable for billing periods already started. You may cancel at any
        time to prevent future charges; cancellation takes effect at the end of
        the current billing period, and you retain access to the service until
        then.
      </p>
      <h3>1.3 Quota</h3>
      <p>
        Tiers include a fixed monthly match quota. When the quota is reached,
        further match requests are declined until the next cycle or until you
        upgrade. We do not bill overage charges, so there are no overage amounts
        to refund.
      </p>
      <h3>1.4 Annual plans (if applicable)</h3>
      <p>
        If annual pricing is introduced, prorated refunds will be available within
        the first 14 days of the annual term. After 14 days, annual plans are
        non-refundable for the remainder of the term.
      </p>
      <h3>1.5 Service outages</h3>
      <p>
        Enterprise customers with a contracted SLA are eligible for service
        credits in the event of verified downtime exceeding the agreed threshold.
        Service credits are applied to future billing periods and cannot be
        exchanged for cash.
      </p>

      <h2>2. How to request a refund</h2>
      <ol>
        <li>
          <strong>Email us.</strong> Send your refund request to{" "}
          <a href="mailto:support@hannune.ai">support@hannune.ai</a> with your
          account email, order/invoice number, and the reason (reason is optional
          for the 14-day guarantee).
        </li>
        <li>
          <strong>We acknowledge within 2 business days</strong> and confirm
          eligibility. For subscription refunds, we may ask Polar to initiate the
          refund on our behalf.
        </li>
        <li>
          <strong>Refund is processed within 5–10 business days</strong> after
          approval. Payment card refunds typically appear in 3–5 additional
          business days depending on your bank.
        </li>
        <li>
          <strong>You receive confirmation by email</strong> once the refund is
          issued.
        </li>
      </ol>
      <p>
        <strong>Payment method.</strong> Refunds are issued to the original
        payment method used at checkout, processed by Polar. We cannot issue
        refunds to a different card or account.
      </p>

      <h2>3. What is not refundable</h2>
      <ul>
        <li>
          Subscription fees beyond the initial 14-day guarantee window
        </li>
        <li>
          Promotional discounts after the discounted period has been consumed
        </li>
        <li>Third-party costs passed through at cost (e.g., LLM API usage)</li>
      </ul>

      <h2>4. Chargebacks and disputes</h2>
      <p>
        If you have a concern about a charge, please contact us first at{" "}
        <a href="mailto:support@hannune.ai">support@hannune.ai</a>. We aim to
        resolve all billing issues amicably. Initiating a chargeback without first
        contacting us may result in suspension of your account.
      </p>
      <p>
        For subscriptions processed by Polar, Polar&apos;s dispute resolution
        procedures apply in addition to these terms.
      </p>

      <h2>5. EU consumer rights</h2>
      <p>
        If you are a consumer resident in the European Union or the United
        Kingdom, you have additional rights under the Consumer Rights Directive,
        including a statutory 14-day right of withdrawal for most digital
        purchases. Our 14-day money-back guarantee meets or exceeds these
        requirements.
      </p>

      <h2>6. Korean consumers</h2>
      <p>
        Customers who are consumers resident in the Republic of Korea benefit from
        the protections of the <strong>Act on the Consumer Protection in
        Electronic Commerce</strong> (전자상거래 등에서의 소비자보호에 관한
        법률), including the right to cancel digital content purchases under the
        conditions specified therein.
      </p>

      <h2>7. Changes to this policy</h2>
      <p>
        We may update this Refund Policy from time to time. Material changes will
        be notified to registered users by email at least 30 days before taking
        effect. The policy version in effect at the time of your purchase governs
        that purchase.
      </p>

      <h2>8. Contact</h2>
      <p>
        <strong>Hannune Support</strong>
        <br />
        Email: <a href="mailto:support@hannune.ai">support@hannune.ai</a>
        <br />
        General inquiries:{" "}
        <a href="mailto:contact@hannune.ai">contact@hannune.ai</a>
        <br />
        Location: Seoul, Republic of Korea
      </p>
    </LegalShell>
  );
}
