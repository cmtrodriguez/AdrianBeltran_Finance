import { ViewType, SiteSettings } from "../types";
import { Mail, Phone, MapPin, Facebook, Linkedin, ShieldAlert, Award } from "lucide-react";

interface FooterProps {
  setView: (view: ViewType) => void;
  setSelectedArticleSlug: (slug: string | null) => void;
  settings: SiteSettings;
}

export default function Footer({ setView, setSelectedArticleSlug, settings }: FooterProps) {
  const handleNav = (view: ViewType) => {
    setView(view);
    setSelectedArticleSlug(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="main-footer"
      className="bg-zinc-900 text-zinc-300 dark:bg-black border-t border-zinc-800 pt-16 pb-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Profile / Agency */}
        <div id="footer-profile-column" className="md:col-span-1.5 space-y-4">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNav(ViewType.Home)}>
            <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
              AB
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-tight flex items-center gap-1">
                {settings.agentName}
              </span>
              <p className="text-[10px] text-zinc-400 font-medium tracking-wider -mt-1 uppercase">
                {settings.agentTitle}
              </p>
            </div>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
            Providing custom, honest, and jargon-free financial planning solutions for families, corporate professionals, and Overseas Filipino Workers (OFWs).
          </p>
          <div className="flex space-x-3 pt-2">
            <a
              id="footer-facebook-link"
              href={settings.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-zinc-800 hover:bg-emerald-700 hover:text-white transition-all text-zinc-400"
              aria-label="Visit Facebook profile"
            >
              <Facebook size={18} />
            </a>
            <a
              id="footer-linkedin-link"
              href={settings.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-zinc-800 hover:bg-emerald-700 hover:text-white transition-all text-zinc-400"
              aria-label="Visit LinkedIn profile"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div id="footer-quicklinks-column" className="space-y-4">
          <h3 className="text-sm font-bold uppercase text-white tracking-widest text-emerald-500">Quick Links</h3>
          <ul className="space-y-2 text-sm font-medium">
            <li>
              <button
                id="footer-link-home"
                onClick={() => handleNav(ViewType.Home)}
                className="hover:text-emerald-400 transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button
                id="footer-link-about"
                onClick={() => handleNav(ViewType.About)}
                className="hover:text-emerald-400 transition-colors"
              >
                About Adrian
              </button>
            </li>
            <li>
              <button
                id="footer-link-articles"
                onClick={() => handleNav(ViewType.Articles)}
                className="hover:text-emerald-400 transition-colors"
              >
                Financial Articles
              </button>
            </li>
            <li>
              <button
                id="footer-link-faq"
                onClick={() => handleNav(ViewType.FAQ)}
                className="hover:text-emerald-400 transition-colors"
              >
                Honest FAQ
              </button>
            </li>
          </ul>
        </div>

        {/* Advisor Career Opportunity (Recruiting Secondary Focus) */}
        <div id="footer-career-column" className="space-y-4">
          <h3 className="text-sm font-bold uppercase text-white tracking-widest text-emerald-500">Career & Growth</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Want to escape corporate burnout? Build an independent, uncapped career as a certified financial advisor under premier mentorship.
          </p>
          <button
            id="footer-career-cta"
            onClick={() => handleNav(ViewType.BecomeAnAdvisor)}
            className="inline-flex items-center space-x-1 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors group"
          >
            <span>Learn About Becoming an Advisor</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* Contact Info */}
        <div id="footer-contact-column" className="space-y-4">
          <h3 className="text-sm font-bold uppercase text-white tracking-widest text-emerald-500">Contact & Office</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start space-x-2.5">
              <Mail size={16} className="text-emerald-500 shrink-0 mt-0.5" />
              <a href={`mailto:${settings.contactEmail}`} className="hover:text-emerald-400 transition-colors break-all">
                {settings.contactEmail}
              </a>
            </li>
            <li className="flex items-start space-x-2.5">
              <Phone size={16} className="text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-zinc-300">{settings.contactPhone}</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <MapPin size={16} className="text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-zinc-400 leading-relaxed text-xs">{settings.contactAddress}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Regulatory Disclaimer (Required for licensed advisors) */}
          <div className="flex items-start space-x-3 max-w-2xl text-[11px] text-zinc-500 leading-relaxed text-center md:text-left">
            <ShieldAlert size={14} className="text-zinc-600 shrink-0 mt-0.5 hidden sm:block" />
            <p>
              <strong>Disclaimer & Disclosure:</strong> {settings.agentName} is an active and licensed Financial Advisor in the Philippines, operating under strict regulations of the Insurance Commission of the Philippines. Financial advisor credentials and Million Dollar Round Table (MDRT) qualifications are validated. This website is a professional personal brand platform intended strictly for educational and lead-generation purposes. All plans, proposals, and advisory solutions are customized strictly based on physical/digital client KYC evaluations.
            </p>
          </div>

          <div className="text-center md:text-right shrink-0">
            <p className="text-xs text-zinc-500">
              © {new Date().getFullYear()} {settings.agentName}. All rights reserved.
            </p>
            <button
              id="footer-admin-link"
              onClick={() => handleNav(ViewType.Admin)}
              className="text-[10px] text-zinc-600 hover:text-emerald-500 transition-colors mt-1 font-medium underline"
            >
              🔒 Internal CMS Admin Access
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
