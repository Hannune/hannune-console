import LegalShell from "@/components/legal-shell";

export const metadata = {
  title: "Terms of Service — Hannune",
  description:
    "Terms of Service for Hannune's Entity Resolution API. Governing law: Republic of Korea.",
};

export default function TermsPage() {
  return (
    <LegalShell
      eyebrow="Legal · Terms"
      title="Terms of Service"
      effective="Effective date: June 2, 2026 · Last updated: June 2, 2026"
    >
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and use
        of the services provided by <strong>Hannune</strong> (한누네), a sole
        proprietorship registered in the Republic of Korea (&quot;we&quot;,
        &quot;us&quot;, or &quot;Hannune&quot;). By accessing our website,
        purchasing our services, or using our API, you agree to be bound by these
        Terms.
      </p>

      <h2>1. Acceptance of terms</h2>
      <p>
        By accessing app.hannune.ai, signing a Statement of Work with us, or
        subscribing to any of our products, you confirm that you have read,
        understood, and agree to be bound by these Terms. If you do not agree, do
        not use our services.
      </p>
      <p>
        If you are entering into these Terms on behalf of a company or other legal
        entity, you represent that you have authority to bind that entity. The
        term &quot;Customer&quot; refers to you and any entity you represent.
      </p>

      <h2>2. Services provided</h2>
      <h3>2.1 Entity Resolution API</h3>
      <p>
        A cloud-based developer API for resolving messy entity names and surface
        forms to canonical identifiers (entity resolution / record linkage),
        offered on a subscription basis with a free tier and paid tiers.
      </p>
      <p>
        For consulting services (Graph RAG engagements, ops retainers), please
        visit <a href="https://hannune.ai">hannune.ai</a>. Consulting fees are
        invoiced directly and are not processed through our Merchant of Record.
      </p>

      <h2>3. Accounts and eligibility</h2>
      <p>
        You must be at least 18 years old or the age of majority in your
        jurisdiction, whichever is greater, to use our services. You are
        responsible for maintaining the confidentiality of your account
        credentials and API keys, and for all activity under your account.
      </p>
      <p>
        You agree to provide accurate, current, and complete information during
        registration and to update such information as needed. We reserve the
        right to suspend or terminate accounts that contain false, misleading, or
        incomplete information.
      </p>

      <h2>4. Payment and billing</h2>
      <h3>4.1 Subscriptions</h3>
      <p>
        <strong>Merchant of Record notice.</strong> All payments for paid API
        subscriptions are processed by <strong>Polar</strong> (
        <a href="https://polar.sh">polar.sh</a>), acting as our Merchant of
        Record. Polar handles payment processing, fraud protection, and the
        collection and remittance of applicable taxes (including VAT, GST, and
        sales tax) where required. By subscribing, you additionally agree to
        Polar&apos;s applicable terms (
        <a href="https://polar.sh/legal/terms">polar.sh/legal/terms</a>).
      </p>
      <p>
        Paid subscriptions renew automatically on a monthly basis at the plan
        rate in effect at the time of renewal. You may cancel your subscription
        at any time via your account dashboard; cancellations take effect at the
        end of the current billing period.
      </p>
      <h3>4.2 Quota enforcement</h3>
      <p>
        Each tier includes a monthly quota of matches. When you reach your quota,
        further match requests are declined until the next billing cycle or until
        you upgrade to a higher tier. We do not bill surprise overage charges.
      </p>
      <h3>4.3 Currency</h3>
      <p>
        All prices are published in United States Dollars (USD). Payments in other
        currencies are converted at prevailing exchange rates at the time of
        invoicing.
      </p>

      <h2>5. Acceptable use</h2>
      <p>You agree not to use our services to:</p>
      <ul>
        <li>Violate any applicable law, regulation, or third-party right</li>
        <li>
          Process data you do not have lawful authority to process, including
          personal data collected without a lawful basis
        </li>
        <li>
          Attempt to reverse-engineer, decompile, or circumvent the security of
          our API or systems
        </li>
        <li>
          Use the API in a manner designed to exceed rate limits or evade quota
          enforcement
        </li>
        <li>
          Resell or sublicense access to our API without prior written agreement
        </li>
        <li>Upload or transmit malware, viruses, or other malicious code</li>
        <li>
          Generate content that is illegal, defamatory, harassing, or that
          infringes intellectual property rights
        </li>
      </ul>
      <p>
        We reserve the right to suspend or terminate access for violations,
        without refund of prepaid fees for the period of violation.
      </p>

      <h2>6. Intellectual property</h2>
      <h3>6.1 Our intellectual property</h3>
      <p>
        The Hannune name, logo, website content, API documentation, and all
        software and underlying technology are the exclusive property of Hannune.
        These Terms do not transfer any ownership rights to you; you receive only
        a limited, non-exclusive, non-transferable license to use our services
        during the term of your subscription.
      </p>
      <h3>6.2 Customer data</h3>
      <p>
        You retain all rights, title, and interest in the data you submit to our
        services (&quot;Customer Data&quot;). You grant us a limited license to
        process Customer Data solely to provide the services.
      </p>
      <h3>6.3 Feedback</h3>
      <p>
        If you provide feedback, suggestions, or ideas regarding our services, you
        grant us a perpetual, irrevocable, royalty-free license to use that
        feedback for any purpose without attribution or compensation.
      </p>

      <h2>7. Confidentiality</h2>
      <p>
        Each party agrees to protect the other&apos;s confidential information
        with the same degree of care it uses for its own confidential
        information, but in no case less than reasonable care. Confidential
        information does not include information that is publicly known,
        independently developed, or rightfully received from a third party.
      </p>
      <p>
        Hannune will not disclose Customer Data or account details without written
        permission, except to the extent required by law.
      </p>

      <h2>8. Warranties and disclaimers</h2>
      <p>
        Except as expressly stated, all services are provided{" "}
        <strong>&quot;as is&quot;</strong> without warranties of any kind, either
        express or implied. We do not warrant that the services will be
        uninterrupted, error-free, or meet your specific requirements. We disclaim
        all implied warranties including merchantability, fitness for a particular
        purpose, and non-infringement, to the maximum extent permitted by law.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by applicable law, our total aggregate
        liability to you for any claim arising out of or related to these Terms or
        the services shall not exceed the amount paid by you to Hannune in the
        twelve (12) months preceding the claim.
      </p>
      <p>
        In no event shall Hannune be liable for any indirect, incidental, special,
        consequential, or punitive damages, including lost profits, lost revenue,
        lost data, or business interruption, even if advised of the possibility of
        such damages.
      </p>
      <p>
        Nothing in these Terms limits liability for gross negligence, willful
        misconduct, or any liability that cannot be excluded under applicable law.
      </p>

      <h2>10. Termination</h2>
      <p>
        You may cancel your subscription at any time via your account dashboard.
        We may suspend or terminate your access immediately for material breach of
        these Terms, non-payment, or conduct that threatens the security or
        integrity of our services. Upon termination, your right to use the
        services ceases immediately. Sections relating to intellectual property,
        confidentiality, warranties, limitation of liability, and governing law
        survive termination.
      </p>

      <h2>11. Governing law and dispute resolution</h2>
      <p>
        These Terms are governed by the laws of the Republic of Korea, without
        regard to its conflict-of-laws principles. Any dispute arising out of or
        related to these Terms shall be subject to the exclusive jurisdiction of
        the Seoul Central District Court (서울중앙지방법원), except that Hannune
        may seek injunctive relief in any court of competent jurisdiction to
        protect its intellectual property or confidential information.
      </p>
      <p>
        For Customers in the European Union, you may also have the right to bring
        proceedings in the courts of your country of residence as provided by
        applicable consumer protection law.
      </p>

      <h2>12. Changes to these terms</h2>
      <p>
        We may update these Terms from time to time. Material changes will be
        communicated via email to registered account holders at least 30 days
        before taking effect. Your continued use of the services after the
        effective date constitutes acceptance of the revised Terms.
      </p>

      <h2>13. Contact</h2>
      <p>
        <strong>Hannune (한누네)</strong>
        <br />
        Sole proprietor: TaeHo Kim (김태호)
        <br />
        Business registration number: 636-29-01401
        <br />
        Email: <a href="mailto:contact@hannune.ai">contact@hannune.ai</a>
        <br />
        Location: Seoul, Republic of Korea
      </p>
    </LegalShell>
  );
}
