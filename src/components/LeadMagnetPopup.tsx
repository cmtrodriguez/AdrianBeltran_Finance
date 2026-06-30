import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, ShieldCheck, Download, Sparkles } from "lucide-react";
import { LeadMagnetConfig, ViewType } from "../types";

interface LeadMagnetPopupProps {
  config: LeadMagnetConfig;
  activeView: ViewType;
  onSubmitLead: (name: string, email: string, source: string) => void;
}

export default function LeadMagnetPopup({ config, activeView, onSubmitLead }: LeadMagnetPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  // Trigger rules check
  useEffect(() => {
    if (!config.enabled) return;

    // Suppressed on crucial active views
    const suppressedViews = [
      ViewType.FreeAssessment,
      ViewType.BecomeAnAdvisor,
      ViewType.Admin,
      ViewType.Contact,
    ];
    if (suppressedViews.includes(activeView)) return;

    const isHome = activeView === ViewType.Home;

    if (!isHome) {
      // Check localStorage cooldown for non-home views
      const lastDismissed = localStorage.getItem("lead_magnet_dismissed_time");
      const hasAlreadySubscribed = localStorage.getItem("lead_magnet_subscribed");

      if (hasAlreadySubscribed) return;

      if (lastDismissed) {
        const dismissedDate = new Date(lastDismissed);
        const now = new Date();
        // Cooldown for 7 days
        const diffTime = Math.abs(now.getTime() - dismissedDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 7) return;
      }
    }

    let timer: NodeJS.Timeout;
    let scrollListener: () => void;
    let mouseLeaveListener: (e: MouseEvent) => void;

    const triggerPopup = () => {
      setIsOpen(true);
      // Remove listeners once triggered
      if (scrollListener) window.removeEventListener("scroll", scrollListener);
      if (mouseLeaveListener) document.removeEventListener("mouseleave", mouseLeaveListener);
      clearTimeout(timer);
    };

    // 1. Time-on-page trigger (forced to 5s if on Home screen)
    const triggerDelay = isHome ? 5000 : config.triggerTimeSeconds * 1000;
    timer = setTimeout(() => {
      triggerPopup();
    }, triggerDelay);

    if (!isHome) {
      // 2. Scroll-depth trigger
      scrollListener = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight <= 0) return;
        const scrollPercent = (window.scrollY / scrollHeight) * 100;
        if (scrollPercent >= config.scrollDepthPercent) {
          triggerPopup();
        }
      };
      window.addEventListener("scroll", scrollListener);

      // 3. Exit intent trigger (desktop)
      mouseLeaveListener = (e: MouseEvent) => {
        if (e.clientY < 20) {
          triggerPopup();
        }
      };
      document.addEventListener("mouseleave", mouseLeaveListener);
    }

    return () => {
      clearTimeout(timer);
      if (scrollListener) window.removeEventListener("scroll", scrollListener);
      if (mouseLeaveListener) document.removeEventListener("mouseleave", mouseLeaveListener);
    };
  }, [config, activeView]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("lead_magnet_dismissed_time", new Date().toISOString());
  };

  const validate = () => {
    const tempErrors: { name?: string; email?: string } = {};
    if (!name.trim()) tempErrors.name = "Please provide your first name.";
    if (!email.trim()) {
      tempErrors.email = "Please provide your email address.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Please provide a valid email address.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmitLead(name, email, `Lead Magnet: ${config.headline}`);
    setSubmitted(true);
    localStorage.setItem("lead_magnet_subscribed", "true");

    // Auto trigger download download after short delay
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          {/* Dismiss Click Overlay */}
          <div className="absolute inset-0" onClick={handleClose} />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-2xl z-10"
          >
            {/* Top decorative accent bar */}
            <div className="h-2 bg-emerald-700 dark:bg-emerald-600 w-full" />

            {/* Close Button */}
            <button
              id="close-lead-magnet"
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 transition-colors z-20"
              aria-label="Close dialog"
            >
              <X size={16} />
            </button>

            <div className="p-6 sm:p-8">
              {!submitted ? (
                <div className="space-y-5">
                  {/* Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/50">
                    <Sparkles size={12} className="text-amber-500 fill-amber-500" /> FREE GUIDE · TAKES 30 SECONDS
                  </span>

                  {/* Copy */}
                  <div className="space-y-2">
                    <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
                      {config.headline}
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {config.description}
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                    <div>
                      <label htmlFor="lead-name" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="lead-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Adrian"
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                          errors.name
                            ? "border-red-500 focus:ring-red-500"
                            : "border-zinc-200 dark:border-zinc-700 focus:border-emerald-500"
                        }`}
                      />
                      {errors.name && <p className="text-xs font-semibold text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="lead-email" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                        Your Best Email Address
                      </label>
                      <input
                        type="email"
                        id="lead-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                          errors.email
                            ? "border-red-500 focus:ring-red-500"
                            : "border-zinc-200 dark:border-zinc-700 focus:border-emerald-500"
                        }`}
                      />
                      {errors.email && <p className="text-xs font-semibold text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <button
                      type="submit"
                      id="submit-lead-magnet"
                      className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-700/10 active:scale-95 cursor-pointer"
                    >
                      <Download size={16} />
                      <span>{config.buttonText}</span>
                    </button>
                  </form>

                  {/* Trust Footer */}
                  <div className="flex items-center justify-center space-x-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                    <ShieldCheck size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>No spam. Honest financial tools. Unsubscribe anytime.</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner">
                    <Mail size={24} className="animate-bounce" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                      Check your inbox, {name}!
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm">
                      We've sent you the download link. Your financial journey starts now. No spam. Just honest tools.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
