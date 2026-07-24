import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Vineyard Infra" },
      {
        name: "description",
        content: "Read our privacy policy to understand how Vineyard Infra collects, uses, protects, and retains your personal information in Dehradun.",
      },
    ],
  }),
  component: PrivacyPolicyPage,
});

const SECTIONS = [
  { id: "introduction", title: "1. Introduction" },
  { id: "info-collect", title: "2. Information We Collect" },
  { id: "cookies", title: "3. Cookies & Tracking" },
  { id: "analytics", title: "4. Google Analytics" },
  { id: "third-party", title: "5. Third-Party Services" },
  { id: "data-security", title: "6. Data Security" },
  { id: "data-use", title: "7. How We Use Data" },
  { id: "data-retention", title: "8. Data Retention" },
  { id: "your-rights", title: "9. Your Rights" },
  { id: "policy-updates", title: "10. Policy Updates" },
  { id: "contact-info", title: "11. Contact Information" },
];

function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="July 23, 2026" sections={SECTIONS}>
      <section id="introduction" className="space-y-4">
        <h2 className="font-display text-xl md:text-2xl font-bold text-navy-deep">1. Introduction</h2>
        <p>
          At Vineyard Infra (referred to as &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed to protecting the privacy, confidentiality, and security of the personal data of our users, clients, and partners. This Privacy Policy explains how we collect, use, process, and safeguard your personal information when you visit our website (vineyardinfra.com) or interact with our advisory and property search services.
        </p>
        <p>
          By using our website, submitting enquiry forms, or initiating communication with our team, you explicitly agree to the terms outlined in this Privacy Policy.
        </p>
      </section>

      <section id="info-collect" className="space-y-4 pt-6">
        <h2 className="font-display text-xl md:text-2xl font-bold text-navy-deep">2. Information We Collect</h2>
        <p>
          We collect various types of information to serve you better, customize your search experience, and comply with real estate service regulations.
        </p>

        <h3 className="font-display text-base md:text-lg font-semibold text-navy-deep mt-4">2.1 Personal Information</h3>
        <p>
          Personal information refers to details that can identify you directly. This includes your full name, telephone/mobile number, email address, postal address, financial capability/budget configuration, and preferred property specifications.
        </p>

        <h3 className="font-display text-base md:text-lg font-semibold text-navy-deep mt-4">2.2 Property Enquiry Forms</h3>
        <p>
          When you express interest in specific properties, plots, or developer listings via our website, we record your name, contact details, stamp duty region of interest, and your specific requirements. This allows our real estate advisors to fetch matching inventory.
        </p>

        <h3 className="font-display text-base md:text-lg font-semibold text-navy-deep mt-4">2.3 Site Visit Forms</h3>
        <p>
          For clients scheduling property inspections or guided site visits in Dehradun, we collect logistical information including preferred visit dates, times, pick-up address coordination, and number of accompanying visitors to facilitate guided tours and security validation.
        </p>

        <h3 className="font-display text-base md:text-lg font-semibold text-navy-deep mt-4">2.4 WhatsApp Communication</h3>
        <p>
          If you initiate chats through the WhatsApp integrations on our website, we collect your phone number, profile name, and chat history. These details are used solely to offer quick support regarding layouts, price quotes, and location brochures.
        </p>
      </section>

      <section id="cookies" className="space-y-4 pt-6">
        <h2 className="font-display text-xl md:text-2xl font-bold text-navy-deep">3. Cookies & Tracking</h2>
        <p>
          Our website uses cookies (small text files saved on your browser) to ensure proper navigation flow, remember user options, and measure page loading performance. You can choose to disable cookies in your web browser settings, although some interactive features of our portals may become restricted.
        </p>
      </section>

      <section id="analytics" className="space-y-4 pt-6">
        <h2 className="font-display text-xl md:text-2xl font-bold text-navy-deep">4. Google Analytics</h2>
        <p>
          We implement Google Analytics to understand web traffic behaviors, device statistics, user referral origins, and bounce rates. Google Analytics generates anonymous reports. No personally identifiable details are passed to Google Analytics, and it functions strictly to help us improve the digital user experience.
        </p>
      </section>

      <section id="third-party" className="space-y-4 pt-6">
        <h2 className="font-display text-xl md:text-2xl font-bold text-navy-deep">5. Third-Party Services</h2>
        <p>
          We do not sell, rent, or lease your private database records to third-party telemarketers. However, we share necessary data with trusted legal advisors, RERA filing offices, banking institutions for mortgage processing, and verified developer partners directly involved in your transaction, subject to strict confidentiality agreements.
        </p>
      </section>

      <section id="data-security" className="space-y-4 pt-6">
        <h2 className="font-display text-xl md:text-2xl font-bold text-navy-deep">6. Data Security</h2>
        <p>
          We apply multi-layered administrative, physical, and digital security measures to defend your files against unauthorized access, alterations, disclosure, or destruction. However, please recognize that no system transmitting details over the internet is completely risk-free, and we cannot guarantee absolute data transfer protection.
        </p>
      </section>

      <section id="data-use" className="space-y-4 pt-6">
        <h2 className="font-display text-xl md:text-2xl font-bold text-navy-deep">7. How We Use Data</h2>
        <p>
          Your information is utilized for the following operational workflows:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Delivering property listings, location maps, and pricing options matching your requests.</li>
          <li>Coordinating guided physical and virtual site visits in Dehradun.</li>
          <li>Sending periodic email journals, construction progress status reports, and promotional developer offers.</li>
          <li>Fulfilling legal regulatory requirements, stamp registration filings, and RERA disclosures.</li>
          <li>Enhancing website speed, layout responsive scaling, and service reliability.</li>
        </ul>
      </section>

      <section id="data-retention" className="space-y-4 pt-6">
        <h2 className="font-display text-xl md:text-2xl font-bold text-navy-deep">8. Data Retention</h2>
        <p>
          We store your personal details only for as long as is necessary to fulfill our business services, resolve disputes, coordinate ongoing construction contracts, or satisfy regulatory storage requirements under RERA and local Indian laws.
        </p>
      </section>

      <section id="your-rights" className="space-y-4 pt-6">
        <h2 className="font-display text-xl md:text-2xl font-bold text-navy-deep">9. Your Rights</h2>
        <p>
          You have full rights over your personal database records:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Access:</strong> You can request a summary of the personal files we store about you.</li>
          <li><strong>Correction:</strong> You can ask us to update inaccurate or outdated mobile numbers, emails, or specifications.</li>
          <li><strong>Deletion:</strong> You can request the removal of your personal profiles from our marketing mailing lists at any time by contacting our privacy officer.</li>
        </ul>
      </section>

      <section id="policy-updates" className="space-y-4 pt-6">
        <h2 className="font-display text-xl md:text-2xl font-bold text-navy-deep">10. Policy Updates</h2>
        <p>
          We reserve the right to modify or adjust this privacy regulation policy at our discretion to match changing digital regulations and company policies. The updated publication timestamp will be clearly shown under the &quot;Last Updated&quot; text at the top of this page.
        </p>
      </section>

      <section id="contact-info" className="space-y-4 pt-6">
        <h2 className="font-display text-xl md:text-2xl font-bold text-navy-deep">11. Contact Information</h2>
        <p>
          If you have questions, data correction requests, or concerns regarding your privacy protections, please contact our support desk:
        </p>
        <p className="font-semibold text-navy-deep">
          Vineyard Infra Realcon LLP
        </p>
        <p className="text-slate-soft">
          AMAN VIHAR SAHASTRADHARA ROAD, Dehradun 248001<br />
          Email: <a href="mailto:vineyardinfra005@gmail.com" className="text-gold hover:underline">vineyardinfra005@gmail.com</a><br />
          Phone: <a href="tel:+916397688989" className="text-gold hover:underline">+91 63976 88989</a>
        </p>
      </section>
    </LegalLayout>
  );
}
