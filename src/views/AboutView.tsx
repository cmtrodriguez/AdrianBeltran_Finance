import { ViewType, SiteSettings } from "../types";
import { Award, ShieldCheck, HeartHandshake, HelpCircle, ArrowRight, UserCheck, CheckCircle2, Star } from "lucide-react";

interface AboutViewProps {
  setView: (view: ViewType) => void;
  settings: SiteSettings;
}

export default function AboutView({ setView, settings }: AboutViewProps) {
  const navigateTo = (view: ViewType) => {
    setView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const principles = [
    {
      icon: <ShieldCheck className="text-emerald-700 dark:text-emerald-400" size={24} />,
      title: "Budget-First Design",
      desc: "We never design premium options that break your household bank. A starter ₱50/day active safety net is vastly better than a massive plan you end up canceling.",
    },
    {
      icon: <HeartHandshake className="text-emerald-700 dark:text-emerald-400" size={24} />,
      title: "No-Jargon Guarantee",
      desc: "We speak plain, simple English and Tagalog. We focus on how many months your salary is secured, and what illnesses are fully protected. No confusing corporate clauses.",
    },
    {
      icon: <UserCheck className="text-emerald-700 dark:text-emerald-400" size={24} />,
      title: "Your Permanent Claim Advocate",
      desc: "When emergencies happen, your family doesn't want to call a 1-800 automated corporate toll. Adrian Beltran manages 100% of your filings, claims reviews, and claim checks.",
    },
  ];

  return (
    <div id="about-view" className="space-y-16 py-12 md:py-20 text-zinc-800 dark:text-zinc-200">
      {/* Bio and Photo Section */}
      <section id="about-bio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Photo with Frame */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative group w-full max-w-[320px] md:max-w-[350px]">
            <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-800 opacity-20 blur-sm animate-pulse" />
            <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl">
              <img
                src={settings.agentPhoto}
                alt={settings.agentName}
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                <p className="font-bold text-lg">{settings.agentName}</p>
                <p className="text-xs text-amber-400 font-semibold">{settings.agentTitle}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Text Bio */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/50">
            <Award size={12} className="fill-current text-emerald-600" /> THE ADRIAN BELTRAN STORY
          </span>

          <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
            Planning Done Over Kitchen Tables. Not Boardroom High-Rises.
          </h1>

          <div className="space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
            <p>{settings.agentBio}</p>
            <p>
              "Too many advisors act as high-pressure commission-hungry salespeople. They focus on complex riders you don't understand, or try to sell you investments that don't match your risk parameters. I founded my advisory on a simple rule: if I cannot explain a protection plan in 3 direct sentences, I won't recommend it."
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Professional Credentials</h3>
            <ul className="space-y-2.5 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
              {settings.agentCredentials.map((cred, i) => (
                <li key={i} className="flex items-start space-x-2.5">
                  <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{cred}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Core Principles Section */}
      <section id="about-principles" className="bg-zinc-50 dark:bg-zinc-900/50 border-y border-zinc-150 dark:border-zinc-800/80 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Adrian's Planning Manifesto
            </h2>
            <p className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
              Three Principles of Honest Wealth Planning
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              We operate under strict ethical rules to ensure your family's savings remain secure and protected without breaking your budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {principles.map((princ, i) => (
              <div
                key={i}
                className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 p-6 rounded-2xl shadow-sm space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shadow-inner shrink-0">
                  {princ.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="font-extrabold text-sm md:text-base text-zinc-900 dark:text-zinc-50 tracking-tight">
                    {princ.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {princ.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Action / Outreach CTA */}
      <section id="about-outreach-cta" className="max-w-4xl mx-auto px-4">
        <div className="bg-emerald-700 dark:bg-emerald-800 rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/30 rounded-full blur-3xl pointer-events-none" />
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-600 border border-emerald-500 text-emerald-50">
            <Star size={12} className="fill-current text-amber-400" /> TAKE CONTROL OF YOUR INCOME
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight max-w-xl mx-auto text-white">
            Ready to calculate your real financial protection numbers?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-lg mx-auto leading-relaxed font-medium">
            Our 2-minute Readiness Assessment reviews your current dependency risks, calculates your required critical illness cash reserves, and schedules a zero-pressure call.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <button
              id="about-action-assessment"
              onClick={() => navigateTo(ViewType.FreeAssessment)}
              className="px-8 py-3.5 rounded-full text-sm font-bold text-emerald-900 bg-white hover:bg-emerald-50 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Start Free Assessment
            </button>
            <button
              id="about-action-contact"
              onClick={() => navigateTo(ViewType.Contact)}
              className="px-8 py-3.5 rounded-full text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 border border-emerald-600 transition-all cursor-pointer"
            >
              Book Direct Call
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
