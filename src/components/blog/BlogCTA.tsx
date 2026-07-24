import { useState } from "react";
import { ArrowRight, Mail, Phone, Calendar, Sparkles, ShieldCheck, User } from "lucide-react";
import { toast } from "sonner";
import { submitLead } from "@/api/leads";

// --- NEWSLETTER CTA ---
export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API call for newsletter
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
    }, 1000);
  };

  return (
    <div className="relative rounded-2xl bg-navy-deep text-white p-8 md:p-12 overflow-hidden border border-gold/20 shadow-elevated">
      {/* Ambient backgrounds */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-20 -right-20 size-80 rounded-full bg-gold blur-3xl" />
        <div className="absolute -bottom-20 -left-20 size-80 rounded-full bg-navy blur-3xl" />
      </div>

      <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold/30 bg-white/5 text-[10px] uppercase tracking-[0.15em] text-gold mb-4">
            <Sparkles className="size-3" /> Stay Updated
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight">
            Subscribe to the Vineyard Journal
          </h3>
          <p className="mt-3 text-sm text-white/70 max-w-lg leading-relaxed">
            Get exclusive market reports, off-market project launches, and luxury real estate insights in Dehradun directly in your inbox.
          </p>
        </div>

        <div className="lg:col-span-5 w-full">
          {subscribed ? (
            <div className="rounded-lg border border-gold/40 bg-white/5 p-6 text-center animate-fade-up">
              <p className="text-sm font-semibold text-gold">🎉 Welcome to the Club!</p>
              <p className="mt-1 text-xs text-white/60">You have successfully subscribed to the Vineyard Journal.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 inset-y-0 my-auto size-4 text-white/40" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 bg-white/5 border border-white/15 focus:border-gold focus:outline-none rounded-lg text-sm placeholder:text-white/40 text-white"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="h-12 px-6 bg-gold text-navy-deep font-semibold rounded-lg hover:bg-gold-soft transition-all duration-300 flex items-center justify-center gap-2 text-xs uppercase tracking-wider shrink-0 cursor-pointer disabled:opacity-50"
                style={{ background: "var(--gradient-gold)" }}
              >
                {loading ? "SUBSCRIBING..." : (<>SUBSCRIBE <ArrowRight className="size-3.5" /></>)}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// --- BOOK FREE PROPERTY CONSULTATION CTA ---
export function ConsultationCTA() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interestedIn: "Villas",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error("Please fill in your name and phone number.");
      return;
    }

    setLoading(true);
    try {
      await submitLead({
        full_name: formData.name,
        phone: formData.phone,
        email: formData.email || null,
        interested_in: formData.interestedIn,
        source: "Blog Consultation",
        message: "Requested a free property consultation from the Blog detail page.",
      });

      setSubmitted(true);
      toast.success("Consultation requested successfully!");
      setFormData({ name: "", phone: "", email: "", interestedIn: "Villas" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit request. Please try again or call directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-gold/25 bg-white p-6 shadow-card hover:shadow-elevated transition-all duration-300">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center size-10 rounded-full bg-gold/10 text-gold mb-3">
          <Calendar className="size-5" />
        </div>
        <h4 className="font-display text-lg font-bold text-navy-deep">
          Free Property Consultation
        </h4>
        <p className="text-slate-soft text-xs mt-1 leading-relaxed">
          Speak with our top Dehradun real estate experts and find the perfect villa, plot, or commercial project.
        </p>
      </div>

      {submitted ? (
        <div className="rounded-lg border border-gold/30 bg-gold/5 p-5 text-center animate-fade-up">
          <p className="text-sm font-semibold text-navy-deep">Request Received!</p>
          <p className="mt-2 text-xs text-slate-soft">An expert advisor will call you within the next 24 hours.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 text-xs font-bold text-gold uppercase tracking-wider hover:underline cursor-pointer"
          >
            Submit another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-navy-deep uppercase tracking-wider mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 inset-y-0 my-auto size-3.5 text-slate-soft" />
              <input
                type="text"
                required
                placeholder="Abhishek Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-10 pl-9 pr-3 rounded border border-slate-soft/20 focus:border-gold focus:outline-none text-xs text-navy-deep placeholder:text-slate-soft/50 bg-warm-bg/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-navy-deep uppercase tracking-wider mb-1">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 inset-y-0 my-auto size-3.5 text-slate-soft" />
              <input
                type="tel"
                required
                placeholder="+91 99999 88888"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full h-10 pl-9 pr-3 rounded border border-slate-soft/20 focus:border-gold focus:outline-none text-xs text-navy-deep placeholder:text-slate-soft/50 bg-warm-bg/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-navy-deep uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 inset-y-0 my-auto size-3.5 text-slate-soft" />
              <input
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-10 pl-9 pr-3 rounded border border-slate-soft/20 focus:border-gold focus:outline-none text-xs text-navy-deep placeholder:text-slate-soft/50 bg-warm-bg/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-navy-deep uppercase tracking-wider mb-1">
              Interested In
            </label>
            <select
              value={formData.interestedIn}
              onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
              className="w-full h-10 px-3 rounded border border-slate-soft/20 focus:border-gold focus:outline-none text-xs text-navy-deep/80 bg-warm-bg/50 cursor-pointer"
            >
              <option value="Villas">Luxury Villas</option>
              <option value="Apartments">Premium Apartments</option>
              <option value="Plots">Residential Land / Plots</option>
              <option value="Commercial">Commercial Investments</option>
            </select>
          </div>

          <div className="flex items-start gap-2 pt-1">
            <ShieldCheck className="size-3.5 text-gold shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-soft leading-normal">
              Your details are protected under our privacy regulations. No spam guaranteed.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-gold text-navy-deep font-bold rounded hover:bg-gold-soft transition-all duration-300 flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50"
            style={{ background: "var(--gradient-gold)" }}
          >
            {loading ? "BOOKING..." : "BOOK FREE CONSULTATION"}
          </button>
        </form>
      )}
    </div>
  );
}
