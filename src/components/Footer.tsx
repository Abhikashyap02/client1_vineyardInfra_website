import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, ChevronUp, ArrowRight, ExternalLink } from "lucide-react";
import { Logo } from "./Logo";
import { useQuery } from "@tanstack/react-query";
import { searchProperties } from "@/api/properties";
import { getAvailableLocations } from "@/lib/locationUtils";

export function Footer() {
  const { data: dbProperties = [] } = useQuery({
    queryKey: ["properties"],
    queryFn: () => searchProperties(),
  });

  const availableLocations = getAvailableLocations(dbProperties);
  const hasSahastradhara = availableLocations.includes("Sahastradhara Road");
  const hasDehradun = dbProperties.length > 0;

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer id="contact" className="bg-navy-deep text-white border-t border-white/10 mt-auto">
      {/* Upper Grid Area */}
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 grid gap-10 md:grid-cols-2 lg:grid-cols-12">
        {/* Column 1: Company Logo & Links */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          <Link to="/" className="inline-block hover:scale-[1.01] transition-transform duration-300 origin-left">
            <Logo variant="horizontal" />
          </Link>
          <p className="text-sm text-white/60 max-w-sm leading-relaxed">
            Vineyard Infra Realcon LLP offers trusted, end-to-end real estate advisory and development consulting across Dehradun's finest hill stations.
          </p>
          <div className="flex gap-3 pt-2">
            <a
              href="https://www.facebook.com/vineyardinfra"
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-9 place-items-center rounded bg-white/5 border border-white/10 text-gold hover:bg-gold hover:text-navy-deep hover:border-gold transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook className="size-4" />
            </a>
            <a
              href="https://www.instagram.com/vineyardinfra/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-9 place-items-center rounded bg-white/5 border border-white/10 text-gold hover:bg-gold hover:text-navy-deep hover:border-gold transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href="https://www.youtube.com/@vineyardinfra1900"
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-9 place-items-center rounded bg-white/5 border border-white/10 text-gold hover:bg-gold hover:text-navy-deep hover:border-gold transition-all duration-300"
              aria-label="YouTube"
            >
              <Youtube className="size-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Company Navigation */}
        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold text-gold tracking-widest uppercase mb-6 pb-2 border-b border-white/10">
            Company
          </h4>
          <ul className="space-y-3.5 text-sm text-white/70">
            <li>
              <Link to="/about" className="hover:text-gold transition-colors flex items-center gap-1">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold transition-colors flex items-center gap-1">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/properties" className="hover:text-gold transition-colors flex items-center gap-1">
                Properties
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-gold transition-colors flex items-center gap-1">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Property Types */}
        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold text-gold tracking-widest uppercase mb-6 pb-2 border-b border-white/10">
            Property Types
          </h4>
          <ul className="space-y-3.5 text-sm text-white/70">
            <li>
              <Link
                to="/properties"
                search={{ type: "Plot" }}
                className="hover:text-gold transition-colors"
              >
                Plots & Land
              </Link>
            </li>
            <li>
              <Link
                to="/properties"
                search={{ type: "Villa" }}
                className="hover:text-gold transition-colors"
              >
                Luxury Villas
              </Link>
            </li>
            <li>
              <Link
                to="/properties"
                search={{ type: "Flat / Apartment" }}
                className="hover:text-gold transition-colors"
              >
                Apartments
              </Link>
            </li>
            <li>
              <Link
                to="/properties"
                search={{ type: "Commercial Space" }}
                className="hover:text-gold transition-colors"
              >
                Commercial
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Resources & Areas */}
        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold text-gold tracking-widest uppercase mb-6 pb-2 border-b border-white/10">
            Resources
          </h4>
          <ul className="space-y-3.5 text-sm text-white/70">
            <li>
              <Link to="/privacy-policy" className="hover:text-gold transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-and-conditions" className="hover:text-gold transition-colors">
                Terms & Conditions
              </Link>
            </li>
            {hasSahastradhara && (
              <li>
                <Link to="/sahastradhara-road" className="hover:text-gold transition-colors">
                  Sahastradhara Road Hub
                </Link>
              </li>
            )}
            {hasDehradun && (
              <li>
                <Link to="/dehradun" className="hover:text-gold transition-colors">
                  Dehradun Investment Hub
                </Link>
              </li>
            )}
            <li>
              <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                Sitemap
              </a>
            </li>
          </ul>
        </div>

        {/* Column 5: Contact Address Info */}
        <div className="lg:col-span-2 flex flex-col space-y-4 text-sm text-white/80">
          <h4 className="text-xs font-bold text-gold tracking-widest uppercase mb-2 pb-2 border-b border-white/10">
            Contact
          </h4>
          <div className="flex items-start gap-2.5">
            <MapPin className="size-4 text-gold shrink-0 mt-0.5" />
            <span className="text-xs text-white/70 leading-relaxed">
              AMAN VIHAR SAHASTRADHARA ROAD,<br />Dehradun 248001
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Phone className="size-4 text-gold shrink-0" />
            <a href="tel:+916397688989" className="text-xs text-white/70 hover:text-gold transition-colors">
              +91 63976 88989
            </a>
          </div>
          <div className="flex items-center gap-2.5">
            <Mail className="size-4 text-gold shrink-0" />
            <a href="mailto:vineyardinfra005@gmail.com" className="text-xs text-white/70 hover:text-gold transition-colors">
              vineyardinfra005@gmail.com
            </a>
          </div>
          <div className="pt-2">
            <a
              href="https://www.google.com/maps/place/Vineyard+Infra+%7C+Construction+Company+in+Dehradun/@30.350669,78.0747649,17z/data=!4m14!1m7!3m6!1s0x3908d713b0382577:0xb00ba938afbc2032!2sVineyard+Infra+%7C+Construction+Company+in+Dehradun!8m2!3d30.350669!4d78.0773398!16s%2Fg%2F11h_wp3tsq!3m5!1s0x3908d713b0382577:0xb00ba938afbc2032!8m2!3d30.350669!4d78.0773398!16s%2Fg%2F11h_wp3tsq?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-gold font-semibold hover:underline"
            >
              Google Maps Location <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Lower Copyright & Scroll-To-Top Row */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50 text-center sm:text-left">
            © {new Date().getFullYear()} Vineyard Infra Realcon LLP. All Rights Reserved.
          </p>
          
          <button
            onClick={handleBackToTop}
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-gold transition-colors duration-300 bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-full border border-white/10 cursor-pointer shadow-sm"
          >
            BACK TO TOP <ChevronUp className="size-3.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}
