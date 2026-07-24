import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions — Vineyard Infra" },
      {
        name: "description",
        content: "Review the terms and conditions governing the use of the Vineyard Infra portal, property disclaimers, and site visit regulations.",
      },
    ],
  }),
  component: TermsAndConditionsPage,
});

const SECTIONS = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "usage", title: "2. Website Usage" },
  { id: "listings", title: "3. Property Listings & Accuracy" },
  { id: "disclaimers", title: "4. Pricing & Availability Disclaimers" },
  { id: "bookings", title: "5. Booking & Transaction Policy" },
  { id: "site-visits", title: "6. Site Visit Policy" },
  { id: "third-party", title: "7. Third-Party Links" },
  { id: "copyright", title: "8. Intellectual Property & Copyright" },
  { id: "liability", title: "9. Limitation of Liability" },
  { id: "user-resp", title: "10. User Responsibilities" },
  { id: "governing-law", title: "11. Governing Law & Jurisdiction" },
  { id: "contact", title: "12. Contact Information" },
];

function TermsAndConditionsPage() {
  return (
    <LegalLayout title="Terms & Conditions" lastUpdated="July 23, 2026" sections={SECTIONS}>
      <section id="acceptance" className="space-y-4">
        <h2 className="font-display text-xl md:text-2xl font-bold text-navy-deep">1. Acceptance of Terms</h2>
        <p>
          Welcome to vineyardinfra.com. These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you,&quot; &quot;user,&quot; or &quot;buyer&quot;), and Vineyard Infra Realcon LLP (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), concerning your access to and use of our digital platforms, advisory assets, and consulting services.
        </p>
        <p>
          By accessing the website, scheduling site visits, or sending lead submissions, you agree that you have read, understood, and agree to be bound by all of these Terms and Conditions. If you do not agree with all of these terms, you are expressly prohibited from using our site.
        </p>
      </section>

      <section id="usage" className="space-y-4 pt-6">
        <h2 className="font-display text-xl md:text-2xl font-bold text-navy-deep">2. Website Usage</h2>
        <p>
          You are granted a non-exclusive, non-transferable, revocable license to access our online materials strictly for property search and evaluation. You agree not to:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Use scraping bots, automated spiders, or extraction software to copy property pictures, circle rate sheets, or blog databases from our website.</li>
          <li>Post false or misleading information on our enquiry forms or pretend to represent another buyer.</li>
          <li>Attempt to disrupt website operations, upload code injections, or bypass network host securities.</li>
        </ul>
      </section>

      <section id="listings" className="space-y-4 pt-6">
        <h2 className="font-display text-xl md:text-2xl font-bold text-navy-deep">3. Property Listings & Accuracy</h2>
        <p>
          We curate residential villas, commercial plots, and agricultural land listings in Dehradun. While we exercise caution to verify documents, legal title deeds, and developer specifications:
        </p>
        <p>
          All pictures, elevations, architectural render diagrams, carpet areas, and location highlights displayed on this website are conceptual approximations. They serve as references and should not be treated as final legal promises. Buyers are strictly advised to inspect actual site boundaries and RERA layout approvals prior to financial commitments.
        </p>
      </section>

      <section id="disclaimers" className="space-y-4 pt-6">
        <h2 className="font-display text-xl md:text-2xl font-bold text-navy-deep">4. Pricing & Availability Disclaimers</h2>
        <p>
          Real estate market values are subject to sudden adjustments.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Pricing Disclaimer:</strong> Property prices listed on our pages are indicators based on developer brochures. Final transaction prices may alter depending on premium location charges (PLC), floor selections, stamp registry costs, and taxes. We do not guarantee listing prices until a written agreement is executed.</li>
          <li><strong>Availability Disclaimer:</strong> Inventory availability moves dynamically. A plot or apartment marked &quot;Available&quot; on our website may be reserved by a builder or private seller. We disclaim liability for any losses incurred due to inventory alterations.</li>
        </ul>
      </section>

      <section id="bookings" className="space-y-4 pt-6">
        <h2 className="font-display text-xl md:text-2xl font-bold text-navy-deep">5. Booking & Transaction Policy</h2>
        <p>
          Any booking payments, token transfers, or advance checks paid toward securing a property are processed directly into the developer&apos;s RERA-specified escrow account or the seller&apos;s legal bank account. Vineyard Infra does not hold transaction deposits unless explicitly specified in a written consulting contract. Booking cancellations and refund policies conform to the terms defined in the developer&apos;s builder-buyer agreement.
        </p>
      </section>

      <section id="site-visits" className="space-y-4 pt-6">
        <h2 className="font-display text-xl md:text-2xl font-bold text-navy-deep">6. Site Visit Policy</h2>
        <p>
          To ensure safety during guided tours of under-construction projects:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>All visits must be coordinated in advance through our site visit forms or helpline.</li>
          <li>Visitors must wear prescribed safety helmets and footwear when visiting construction zones.</li>
          <li>Children and pets are not permitted near high-risk excavation structures.</li>
          <li>We reserve the right to cancel or postpone site visits due to heavy rainfall, landslide reports in hilly terrains, or builder restrictions.</li>
        </ul>
      </section>

      <section id="third-party" className="space-y-4 pt-6">
        <h2 className="font-display text-xl md:text-2xl font-bold text-navy-deep">7. Third-Party Links</h2>
        <p>
          Our web pages may link to third-party portals, including Google Maps, RERA Uttarakhand tracking sites, and banking portals. We do not review, control, or take responsibility for the privacy practices, layout safety, or transaction handling on external websites.
        </p>
      </section>

      <section id="copyright" className="space-y-4 pt-6">
        <h2 className="font-display text-xl md:text-2xl font-bold text-navy-deep">8. Intellectual Property & Copyright</h2>
        <p>
          The layout code, graphic designs, logos, custom typography tokens, and authored blog texts are the intellectual property of Vineyard Infra and protected under Indian copyright and trademark regulations. You may not reproduce, copy, distribute, or publish our branding materials without explicit written permission from our executive board.
        </p>
      </section>

      <section id="liability" className="space-y-4 pt-6">
        <h2 className="font-display text-xl md:text-2xl font-bold text-navy-deep">9. Limitation of Liability</h2>
        <p>
          To the maximum extent allowed by Indian law, Vineyard Infra, its partners, and employees shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from your use of this website, listing inaccuracies, delays in construction updates, or loss of booking deposits paid directly to developer partners.
        </p>
      </section>

      <section id="user-resp" className="space-y-4 pt-6">
        <h2 className="font-display text-xl md:text-2xl font-bold text-navy-deep">10. User Responsibilities</h2>
        <p>
          You warrant that all phone numbers, email IDs, and details submitted on our enquiry channels are authentic and belong to you. You agree to use our real estate advisory services in good faith and carry out independent verifications of properties before signing registration deeds.
        </p>
      </section>

      <section id="governing-law" className="space-y-4 pt-6">
        <h2 className="font-display text-xl md:text-2xl font-bold text-navy-deep">11. Governing Law & Jurisdiction</h2>
        <p>
          These Terms and Conditions and any transactions initiated through our advisory services shall be governed by and interpreted in accordance with the laws of India. Any legal disputes or claims arising out of this agreement shall be subject to the exclusive jurisdiction of the competent courts in Dehradun, Uttarakhand, India.
        </p>
      </section>

      <section id="contact" className="space-y-4 pt-6">
        <h2 className="font-display text-xl md:text-2xl font-bold text-navy-deep">12. Contact Information</h2>
        <p>
          If you have questions regarding these terms, disclaimers, or your transactions, please write to us:
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
