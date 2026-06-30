import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp, Search, ShieldAlert, Sparkles, Filter } from "lucide-react";
import { FaqItem, ViewType } from "../types";

interface FaqViewProps {
  setView: (view: ViewType) => void;
  faqs: FaqItem[];
}

export default function FaqView({ setView, faqs }: FaqViewProps) {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "insurance" | "career" | "general">("all");

  const categories = [
    { label: "All Questions", value: "all" },
    { label: "Insurance Protection", value: "insurance" },
    { label: "Advisor Careers", value: "career" },
    { label: "Fees & Methods", value: "general" },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="faq-view" className="max-w-4xl mx-auto px-4 py-12 md:py-20 space-y-12">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/50">
          <Sparkles size={11} className="fill-current text-emerald-600" /> HONEST REPLIES ONLY
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
          Objections & Honest Answers
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          No corporate talking points or evasive definitions. We believe in speaking in plain language about fees, commission, payouts, and career truths.
        </p>
      </div>

      {/* Filters & Search Control */}
      <div className="space-y-4 max-w-2xl mx-auto">
        {/* Search Bar */}
        <div className="relative">
          <Search size={18} className="absolute left-4 top-3.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search objections (e.g. 'commissions', 'HMO', 'part-time')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setActiveCategory(cat.value as any);
                setActiveFaq(null);
              }}
              className={`py-2 px-4 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                activeCategory === cat.value
                  ? "bg-emerald-700 text-white border-emerald-700 dark:bg-emerald-600 dark:border-emerald-600"
                  : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-emerald-500"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isExpanded = activeFaq === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(isExpanded ? null : faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-50 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 ml-4 transition-transform duration-300">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: isExpanded ? "auto" : 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 pt-0 border-t border-zinc-100 dark:border-zinc-800 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 space-y-3">
            <ShieldAlert size={36} className="mx-auto text-zinc-400" />
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              No answers matches your query. Try searching for 'VUL', 'term', 'HMO', or 'MDRT'.
            </p>
          </div>
        )}
      </div>

      {/* CTA helper */}
      <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <h4 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-50">Have a personal, specific doubt?</h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed">
            Every household financial audit is unique. Schedule a secure, private 1-on-1 Zoom or phone Clarity Call directly.
          </p>
        </div>
        <button
          id="faq-schedule-clarity"
          onClick={() => setView(ViewType.FreeAssessment)}
          className="inline-flex items-center space-x-1.5 px-6 py-3 rounded-full text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all shadow-md shrink-0 cursor-pointer active:scale-95"
        >
          <span>Schedule Free Call</span>
        </button>
      </div>
    </div>
  );
}
