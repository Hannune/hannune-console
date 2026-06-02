import LegalShell from "@/components/legal-shell";

export const metadata = {
  title: "Privacy Policy — Hannune",
  description:
    "How Hannune collects, uses, and protects information for the Entity Resolution API. PIPA, GDPR, CCPA.",
};

export default function PrivacyPage() {
  return (
    <LegalShell
      eyebrow="Legal · Privacy"
      title="Privacy Policy"
      effective="Effective date: June 2, 2026 · Last updated: June 2, 2026"
    >
      <h2>1. Introduction</h2>
      <p>
        Hannune (한누네, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
        respects your privacy. This Privacy Policy explains how we collect, use,
        disclose, and protect information when you visit app.hannune.ai or
        subscribe to our Entity Resolution API.
      </p>
      <p>
        We comply with the{" "}
        <strong>Personal Information Protection Act of the Republic of Korea</strong>{" "}
        (PIPA, 개인정보 보호법), the{" "}
        <strong>EU General Data Protection Regulation</strong> (GDPR), and the{" "}
        <strong>California Consumer Privacy Act</strong> (CCPA) as applicable.
      </p>

      <h2>2. Information we collect</h2>
      <h3>2.1 Information you provide</h3>
      <ul>
        <li>
          <strong>Account information:</strong> email address and password when
          you register for the API.
        </li>
        <li>
          <strong>Payment information:</strong> billing address and tax
          identifiers. Payment card details are collected and processed directly
          by Polar (our Merchant of Record) and are never stored on our systems.
        </li>
        <li>
          <strong>Communications:</strong> messages you send to us via email or
          contact forms.
        </li>
      </ul>
      <h3>2.2 Customer data submitted to the API</h3>
      <p>
        When you use the API, you submit records (e.g., names, company names) for
        the purpose of entity resolution. This data may contain personal
        information of your customers, employees, or other data subjects.
      </p>
      <p>
        <strong>Processing model.</strong> For the API, Hannune acts as a{" "}
        <strong>data processor</strong>; you are the data controller responsible
        for ensuring a lawful basis for processing. Customer Data is processed to
        produce the API response and is not retained for purposes other than
        providing the service, except in logs kept briefly for debugging and abuse
        prevention.
      </p>
      <h3>2.3 Automatically collected information</h3>
      <ul>
        <li>
          <strong>Usage data:</strong> API request counts, endpoints accessed,
          response times, error rates.
        </li>
        <li>
          <strong>Device and log data:</strong> IP address, browser type,
          operating system, timestamps, referring URLs.
        </li>
      </ul>

      <h2>3. How we use information</h2>
      <ul>
        <li>Provide, operate, and maintain our services</li>
        <li>Process payments and send billing notifications</li>
        <li>Respond to inquiries and provide customer support</li>
        <li>Send service announcements, security alerts, and administrative messages</li>
        <li>Monitor and analyze usage to improve service quality</li>
        <li>Detect, investigate, and prevent fraud, abuse, and security incidents</li>
        <li>Comply with legal obligations and enforce our Terms</li>
        <li>
          With your consent, send marketing communications (you may opt out at any
          time)
        </li>
      </ul>

      <h2>4. Legal basis for processing (GDPR)</h2>
      <ul>
        <li>
          <strong>Contract:</strong> processing necessary to provide services you
          have requested.
        </li>
        <li>
          <strong>Legitimate interests:</strong> improving our services, securing
          our systems, and communicating with customers.
        </li>
        <li>
          <strong>Legal obligation:</strong> compliance with tax, accounting, and
          other statutory requirements.
        </li>
        <li>
          <strong>Consent:</strong> where you have given explicit consent, such as
          for marketing emails.
        </li>
      </ul>

      <h2>5. How we share information</h2>
      <p>We do not sell personal information. We share information only as follows:</p>
      <ul>
        <li>
          <strong>Service providers:</strong> third-party sub-processors that help
          us operate the services (see section 6).
        </li>
        <li>
          <strong>Legal requirements:</strong> when required by law, court order,
          or to protect rights, property, or safety.
        </li>
        <li>
          <strong>Business transfers:</strong> in the event of a merger,
          acquisition, or sale of assets, subject to the successor honoring this
          policy.
        </li>
        <li>
          <strong>With your consent:</strong> for any other purpose disclosed to
          you at the time of collection.
        </li>
      </ul>

      <h2>6. Sub-processors</h2>
      <p>We engage the following third parties to process data on our behalf:</p>
      <table>
        <thead>
          <tr>
            <th>Sub-processor</th>
            <th>Purpose</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Polar</td>
            <td>Payment processing, Merchant of Record, tax compliance</td>
            <td>USA / EU</td>
          </tr>
          <tr>
            <td>Vercel</td>
            <td>Console web hosting (app.hannune.ai)</td>
            <td>Global edge</td>
          </tr>
          <tr>
            <td>Railway</td>
            <td>API hosting (api.hannune.ai)</td>
            <td>USA</td>
          </tr>
          <tr>
            <td>Supabase</td>
            <td>Authentication, account database</td>
            <td>Asia-Pacific</td>
          </tr>
          <tr>
            <td>OpenRouter</td>
            <td>LLM routing for the disambiguation layer</td>
            <td>USA</td>
          </tr>
        </tbody>
      </table>
      <p>
        An updated list of current sub-processors is available upon request at{" "}
        <a href="mailto:contact@hannune.ai">contact@hannune.ai</a>. Enterprise
        clients may request a signed Data Processing Addendum (DPA) by emailing{" "}
        <a href="mailto:contact@hannune.ai?subject=DPA%20request">
          contact@hannune.ai
        </a>{" "}
        with subject &quot;DPA request&quot;.
      </p>

      <h2>7. Data retention</h2>
      <ul>
        <li>
          <strong>Account data:</strong> retained while your account is active and
          for 3 years after closure for tax and legal compliance, then deleted or
          anonymized.
        </li>
        <li>
          <strong>API customer data:</strong> processed to produce responses;
          debugging logs are kept briefly and then deleted.
        </li>
        <li>
          <strong>Billing records:</strong> retained for 7 years as required by
          Korean tax law (국세기본법).
        </li>
        <li>
          <strong>Marketing contact data:</strong> retained until you unsubscribe.
        </li>
      </ul>

      <h2>8. Security</h2>
      <p>
        We implement appropriate technical and organizational measures to protect
        personal data, including TLS encryption for data in transit, encryption at
        rest for stored data, access controls, audit logging, and regular security
        reviews.
      </p>
      <p>
        No system is 100% secure. If we become aware of a personal data breach
        affecting you, we will notify you and applicable regulators without undue
        delay as required by law.
      </p>

      <h2>9. Your rights</h2>
      <p>
        Depending on your jurisdiction, you have the right to access, rectify,
        erase, restrict, port, and object to processing of your personal data. To
        exercise your rights, email{" "}
        <a href="mailto:contact@hannune.ai?subject=Privacy%20request">
          contact@hannune.ai
        </a>{" "}
        with subject &quot;Privacy request&quot;. We will respond within 30 days.
      </p>
      <h3>9.1 California residents (CCPA)</h3>
      <p>
        California residents have additional rights including the right to know
        what personal information is collected, the right to delete, and the right
        to non-discrimination for exercising these rights.{" "}
        <strong>We do not sell personal information.</strong>
      </p>

      <h2>10. International data transfers</h2>
      <p>
        Hannune is based in the Republic of Korea. Some of our sub-processors are
        located outside Korea. Where we transfer personal data outside the EEA or
        the UK, we rely on Standard Contractual Clauses (SCCs) or equivalent
        safeguards.
      </p>

      <h2>11. Cookies</h2>
      <p>
        Our website uses minimal cookies: essential cookies required for
        authentication and account functionality. We do not use advertising
        cookies or third-party tracking.
      </p>

      <h2>12. Children&apos;s privacy</h2>
      <p>
        Our services are not directed to individuals under 18 years of age. We do
        not knowingly collect personal information from children. If you believe we
        have collected information from a child, please contact us and we will
        delete it promptly.
      </p>

      <h2>13. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Material changes will
        be notified via email to registered users and posted on this page with a
        new &quot;Last updated&quot; date.
      </p>

      <h2>14. Contact us</h2>
      <p>
        <strong>Hannune (한누네)</strong>
        <br />
        Privacy &amp; general inquiries:{" "}
        <a href="mailto:contact@hannune.ai?subject=Privacy">contact@hannune.ai</a>
        <br />
        Location: Seoul, Republic of Korea
      </p>
      <p>
        <strong>
          Personal Information Protection Officer (개인정보 보호책임자)
        </strong>
        <br />
        Name: TaeHo Kim (김태호)
        <br />
        Email: <a href="mailto:contact@hannune.ai?subject=Privacy">contact@hannune.ai</a>
      </p>
      <p>
        For residents of the Republic of Korea, you may also contact the Personal
        Information Protection Commission (개인정보보호위원회) at{" "}
        <a href="https://privacy.go.kr">privacy.go.kr</a>.
      </p>
    </LegalShell>
  );
}
