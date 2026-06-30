import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon, Shield, Award } from "lucide-react";
import { ViewType } from "../types";

interface HeaderProps {
  activeView: ViewType;
  setView: (view: ViewType) => void;
  setSelectedArticleSlug: (slug: string | null) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  heroCTA: string;
}

export default function Header({
  activeView,
  setView,
  setSelectedArticleSlug,
  theme,
  toggleTheme,
  heroCTA,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateTo = (view: ViewType) => {
    setView(view);
    setSelectedArticleSlug(null);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const menuItems = [
    { label: "Home", view: ViewType.Home },
    { label: "About", view: ViewType.About },
    { label: "Articles", view: ViewType.Articles },
    { label: "FAQ", view: ViewType.FAQ },
    { label: "Contact", view: ViewType.Contact },
  ];

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-zinc-900/95 shadow-md backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div
            id="header-logo-container"
            onClick={() => navigateTo(ViewType.Home)}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-700 dark:bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-inner group-hover:scale-105 transition-transform">
              <Shield size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
                Adrian Beltran, CIA
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 uppercase tracking-widest">
                  <Award size={10} className="mr-0.5 fill-emerald-500 text-emerald-500" /> Unit Manager
                </span>
              </span>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium tracking-wide -mt-1">
                PRU LIFE UK & Eastspring Investments
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
            {menuItems.map((item) => (
              <button
                key={item.view}
                id={`nav-link-${item.view}`}
                onClick={() => navigateTo(item.view)}
                className={`px-3.5 py-2 rounded-full text-sm font-medium tracking-wide transition-colors ${
                  activeView === item.view
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-semibold"
                    : "text-zinc-600 dark:text-zinc-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Become an Advisor secondary link */}
            <button
              id="nav-link-recruit"
              onClick={() => navigateTo(ViewType.BecomeAnAdvisor)}
              className={`px-3.5 py-2 rounded-full text-sm font-medium tracking-wide transition-colors ${
                activeView === ViewType.BecomeAnAdvisor
                  ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-semibold"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
              }`}
            >
              Career
            </button>
          </nav>

          {/* Action Area (Theme Toggler + CTA Button) */}
          <div id="header-action-area" className="hidden md:flex items-center space-x-4">
            <button
              id="theme-toggle-desktop"
              onClick={toggleTheme}
              className="p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button
              id="header-cta-button"
              onClick={() => navigateTo(ViewType.FreeAssessment)}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all shadow-md shadow-emerald-700/10 active:scale-95"
            >
              {heroCTA}
            </button>

            {/* Admin entry point link (unobtrusive key/lock) */}
            <button
              id="header-admin-entry"
              onClick={() => navigateTo(ViewType.Admin)}
              className={`p-2 rounded-full transition-colors ${
                activeView === ViewType.Admin
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-zinc-300 dark:text-zinc-600 hover:text-zinc-500 dark:hover:text-zinc-400"
              }`}
              title="Admin CMS"
              aria-label="Admin CMS Dashboard"
            >
              <span className="sr-only">Admin CMS</span>
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Actions: Hamburguer & Theme Toggle */}
          <div id="mobile-header-actions" className="flex items-center space-x-2 md:hidden">
            <button
              id="theme-toggle-mobile"
              onClick={toggleTheme}
              className="p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button
              id="mobile-menu-button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 px-4 pt-2 pb-6 space-y-2"
          >
            {menuItems.map((item) => (
              <button
                key={item.view}
                id={`mobile-nav-link-${item.view}`}
                onClick={() => navigateTo(item.view)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  activeView === item.view
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-bold"
                    : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              id="mobile-nav-link-career"
              onClick={() => navigateTo(ViewType.BecomeAnAdvisor)}
              className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                activeView === ViewType.BecomeAnAdvisor
                  ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-bold"
                  : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              }`}
            >
              Become an Advisor
            </button>

            <button
              id="mobile-nav-link-admin"
              onClick={() => navigateTo(ViewType.Admin)}
              className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                activeView === ViewType.Admin
                  ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-bold"
                  : "text-zinc-400 dark:text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              }`}
            >
              🔑 Admin Dashboard (CMS)
            </button>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <button
                id="mobile-cta-button"
                onClick={() => navigateTo(ViewType.FreeAssessment)}
                className="w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl text-base font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all shadow-md active:scale-95"
              >
                {heroCTA}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
