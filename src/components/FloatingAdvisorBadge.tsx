import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, Calendar, UserCheck, Briefcase, HelpCircle } from "lucide-react";
import { SiteSettings, ViewType } from "../types";

interface FloatingAdvisorBadgeProps {
  settings: SiteSettings;
  setView: (view: ViewType) => void;
}

export default function FloatingAdvisorBadge({ settings, setView }: FloatingAdvisorBadgeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleNavigate = (view: ViewType) => {
    setView(view);
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 font-sans">
      <AnimatePresence>
        {isExpanded ? (
          /* Expanded Advisor Dashboard Card */
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-[320px] rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 shadow-2xl overflow-hidden text-zinc-800 dark:text-zinc-200"
          >
            {/* Header Block */}
            <div className="relative p-5 bg-gradient-to-br from-emerald-800 to-emerald-950 text-white">
              {/* Close Button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-zinc-100"
                title="Collapse Panel"
              >
                <X size={14} />
              </button>

              <div className="flex items-center space-x-3">
                <div className="relative shrink-0">
                  <img
                    src={settings.agentPhoto || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120&h=120"}
                    alt={settings.agentName}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-white/30 shadow-md"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-emerald-900 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-black tracking-tight leading-tight uppercase text-emerald-300">
                    Your Wealth Advisor
                  </h4>
                  <h3 className="text-sm font-black tracking-tight">
                    {settings.agentName}
                  </h3>
                  <p className="text-[10px] text-zinc-200/90 font-medium leading-tight line-clamp-1 mt-0.5">
                    {settings.agentTitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Consultation Navigation Body */}
            <div className="p-5 space-y-3.5">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  How can I guide you today?
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                  Plan for protection, build durable wealth, or join our fast-growing elite life insurance agency.
                </p>
              </div>

              {/* Navigation Options */}
              <div className="space-y-2">
                <button
                  onClick={() => handleNavigate(ViewType.FreeAssessment)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/30 transition-all text-left font-bold text-xs cursor-pointer group"
                >
                  <div className="flex items-center space-x-2.5">
                    <ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Get Free Assessment</span>
                  </div>
                  <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
                </button>

                <button
                  onClick={() => handleNavigate(ViewType.Contact)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/30 dark:border-zinc-700/30 transition-all text-left font-bold text-xs cursor-pointer group"
                >
                  <div className="flex items-center space-x-2.5">
                    <Calendar size={16} className="text-zinc-500 dark:text-zinc-400 shrink-0" />
                    <span>Book a Clarity Call</span>
                  </div>
                  <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 group-hover:translate-x-1 transition-transform">→</span>
                </button>

                <button
                  onClick={() => handleNavigate(ViewType.BecomeAnAdvisor)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/30 dark:border-zinc-700/30 transition-all text-left font-bold text-xs cursor-pointer group"
                >
                  <div className="flex items-center space-x-2.5">
                    <Briefcase size={16} className="text-zinc-500 dark:text-zinc-400 shrink-0" />
                    <span>Join Agency Team</span>
                  </div>
                  <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>

            {/* Footer Affiliations */}
            <div className="px-5 py-3 bg-zinc-50 dark:bg-zinc-850/40 border-t border-zinc-150 dark:border-zinc-800 flex items-center justify-between text-[9px] text-zinc-400 dark:text-zinc-500">
              <span className="uppercase tracking-wider font-extrabold font-display">
                PRU LIFE UK × Eastspring
              </span>
              <span className="font-medium">Direct Access</span>
            </div>
          </motion.div>
        ) : (
          /* Collapsed Floating Bubble Trigger */
          <motion.button
            key="collapsed-bubble"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(true)}
            className="flex items-center space-x-2 p-2.5 pr-4 rounded-full bg-emerald-700 dark:bg-emerald-600 text-white shadow-2xl border border-emerald-600/30 dark:border-emerald-500/30 cursor-pointer select-none"
            title="Talk to Wealth Advisor"
          >
            <div className="relative shrink-0">
              <img
                src={settings.agentPhoto || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120&h=120"}
                alt={settings.agentName}
                className="w-8 h-8 rounded-full object-cover border border-white/20"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-emerald-700 animate-pulse" />
            </div>
            <div className="text-left font-sans shrink-0">
              <p className="text-[8px] font-black tracking-widest text-emerald-200 uppercase leading-none">
                Advisor Online
              </p>
              <p className="text-[11px] font-black tracking-tight leading-tight mt-0.5">
                Talk with Adrian
              </p>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
