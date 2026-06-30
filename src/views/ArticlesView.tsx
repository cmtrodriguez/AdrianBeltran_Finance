import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ArrowRight, ArrowLeft, Clock, Calendar, Sparkles, Shield, Rocket, User, Share2 } from "lucide-react";
import { Article, ViewType } from "../types";

interface ArticlesViewProps {
  setView: (view: ViewType) => void;
  articles: Article[];
  selectedArticleSlug: string | null;
  setSelectedArticleSlug: (slug: string | null) => void;
}

export default function ArticlesView({
  setView,
  articles,
  selectedArticleSlug,
  setSelectedArticleSlug,
}: ArticlesViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { label: "All Insights", value: "all" },
    { label: "OFW & Family", value: "OFW & Family" },
    { label: "Insurance Basics", value: "Insurance Basics" },
    { label: "Career & Growth", value: "Career & Growth" },
  ];

  // Filter logic
  const publishedArticles = articles.filter((a) => a.published);

  const filteredArticles = publishedArticles.filter((art) => {
    const matchesCategory = selectedCategory === "all" || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleArticleClick = (slug: string) => {
    setSelectedArticleSlug(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToList = () => {
    setSelectedArticleSlug(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Find active article
  const activeArticle = publishedArticles.find((art) => art.slug === selectedArticleSlug);

  // Suggest 2 related articles
  const relatedArticles = publishedArticles
    .filter((art) => art.slug !== selectedArticleSlug)
    .slice(0, 2);

  return (
    <div id="articles-view-wrapper" className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <AnimatePresence mode="wait">
        {!selectedArticleSlug || !activeArticle ? (
          /* ========================================================
             1. INDEX LIST VIEW
             ======================================================== */
          <motion.div
            key="articles-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12"
          >
            {/* Header */}
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/50">
                <Sparkles size={11} className="fill-current text-emerald-600" /> HONEST INSIGHTS
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                Advisory & Career Insights
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Educational, jargon-free literature designed to protect family paychecks and outline independent growth paths.
              </p>
            </div>

            {/* Filter controls */}
            <div className="max-w-xl mx-auto space-y-4">
              <div className="relative">
                <Search size={18} className="absolute left-4 top-3.5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
                />
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`py-2 px-4 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                      selectedCategory === cat.value
                        ? "bg-emerald-700 text-white border-emerald-700 dark:bg-emerald-600 dark:border-emerald-600"
                        : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-emerald-500"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    onClick={() => handleArticleClick(article.slug)}
                    className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800/80 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between h-full"
                  >
                    <div className="space-y-4">
                      {/* Cover Cover */}
                      <div className="relative aspect-video overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 font-bold uppercase tracking-wider text-[9px] px-2.5 py-1 rounded-full border border-emerald-150/40 dark:border-emerald-900/40 shadow-sm">
                          {article.category}
                        </span>
                      </div>

                      {/* Info Area */}
                      <div className="px-5 pb-2 space-y-2">
                        <div className="flex items-center space-x-2 text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase">
                          <span>{article.date}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>
                        <h2 className="font-extrabold text-base md:text-lg text-zinc-900 dark:text-zinc-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors tracking-tight line-clamp-2">
                          {article.title}
                        </h2>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-3">
                      <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        <span>Read Full Guide</span>
                        <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-150 dark:border-zinc-800 rounded-3xl max-w-lg mx-auto">
                <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                  No articles matched your search filters.
                </p>
              </div>
            )}
          </motion.div>
        ) : (
          /* ========================================================
             2. ARTICLE DETAIL VIEW
             ======================================================== */
          <motion.div
            key="article-detail"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            {/* Back to index link */}
            <button
              onClick={handleBackToList}
              className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-zinc-500 hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span>Back to all insights</span>
            </button>

            {/* Article Meta */}
            <div className="space-y-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-150 dark:border-emerald-900/50">
                {activeArticle.category}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
                {activeArticle.title}
              </h1>

              {/* Author Byline */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400 pt-1 border-b border-zinc-100 dark:border-zinc-850 pb-5">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-[10px]">
                    FR
                  </div>
                  <span>Written by <strong>{activeArticle.author}</strong></span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>{activeArticle.date}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>
            </div>

            {/* Cover image */}
            <div className="aspect-video rounded-3xl overflow-hidden shadow-md bg-zinc-150 dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-800">
              <img
                src={activeArticle.coverImage}
                alt={activeArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Body */}
            <div
              id="article-body"
              className="prose dark:prose-invert prose-emerald max-w-none text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed space-y-6 pt-2 font-medium"
            >
              {/* Splitting standard markdown headers & bullet points for pixel-perfect JSX rendering */}
              {activeArticle.content.split("\n\n").map((para, i) => {
                if (para.startsWith("### ")) {
                  return (
                    <h3 key={i} className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight pt-4">
                      {para.replace("### ", "")}
                    </h3>
                  );
                } else if (para.startsWith("* ")) {
                  return (
                    <ul key={i} className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-300">
                      {para.split("\n").map((li, index) => (
                        <li key={index} className="text-xs sm:text-sm font-semibold">
                          {li.replace("* ", "").replace("**", "").replace("**", "")}
                        </li>
                      ))}
                    </ul>
                  );
                } else {
                  return (
                    <p key={i} className="leading-relaxed">
                      {para}
                    </p>
                  );
                }
              })}
            </div>

            {/* Dynamic call-to-actions based on Category/Type */}
            <div id="article-contextual-cta" className="pt-6">
              {activeArticle.type === "client" ? (
                /* Client Protection CTA */
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
                  <div className="space-y-2 text-center md:text-left">
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
                      <Shield size={12} className="stroke-[2]" /> Gap Analysis Assessment
                    </span>
                    <h3 className="font-extrabold text-base text-zinc-900 dark:text-zinc-50 tracking-tight">
                      Calculate Your True Income Protection Gaps
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed font-medium">
                      Curious to discover your exact risk score? Our 2-minute Readiness Assessment reviews your dependents, covers medical emergencies, and outlines customized starter safety nets.
                    </p>
                  </div>
                  <button
                    onClick={() => setView(ViewType.FreeAssessment)}
                    className="w-full md:w-auto inline-flex items-center justify-center space-x-1.5 px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all shadow-md shrink-0 cursor-pointer"
                  >
                    <span>Take Free Assessment</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                /* Advisor Recruiting CTA */
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
                  <div className="space-y-2 text-center md:text-left">
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-amber-800 dark:text-amber-400">
                      <Rocket size={12} className="stroke-[2]" /> Mentorship Application
                    </span>
                    <h3 className="font-extrabold text-base text-zinc-900 dark:text-zinc-50 tracking-tight">
                      Launch an Independent Advisor Career
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed font-medium">
                      Want to escape corporate burnout? Learn how to acquire licensing reviews and get mentored directly by Engr. Adrian Beltran, CIA, an experienced Unit Manager. Check qualification requirements.
                    </p>
                  </div>
                  <button
                    onClick={() => setView(ViewType.BecomeAnAdvisor)}
                    className="w-full md:w-auto inline-flex items-center justify-center space-x-1.5 px-6 py-3.5 rounded-xl text-xs font-bold text-zinc-800 bg-amber-100 hover:bg-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:hover:bg-amber-900 transition-all shadow-md shrink-0 cursor-pointer"
                  >
                    <span>Explore Advisor Paths</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* Related Articles Footer */}
            <div id="related-articles-footer" className="pt-8 border-t border-zinc-100 dark:border-zinc-800/80 space-y-6">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-zinc-400">Related Insights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => handleArticleClick(rel.slug)}
                    className="group flex gap-4 items-start cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/30 p-3 rounded-2xl border border-transparent hover:border-zinc-150 transition-all duration-200"
                  >
                    <div className="w-20 aspect-video rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 shrink-0">
                      <img
                        src={rel.coverImage}
                        alt={rel.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">
                        {rel.category}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-50 leading-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 line-clamp-2 transition-colors">
                        {rel.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
