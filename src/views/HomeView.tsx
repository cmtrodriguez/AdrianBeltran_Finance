import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  Rocket,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Star,
  Award,
  Sparkles,
  TrendingUp,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Maximize2,
  X
} from "lucide-react";
import { ViewType, SiteSettings, Article, FaqItem, Testimonial, PartnerLogo } from "../types";
import LogoStrip from "../components/LogoStrip";

interface HomeViewProps {
  setView: (view: ViewType) => void;
  setSelectedArticleSlug: (slug: string | null) => void;
  settings: SiteSettings;
  articles: Article[];
  faqs: FaqItem[];
  testimonials: Testimonial[];
  logos: PartnerLogo[];
}

export default function HomeView({
  setView,
  setSelectedArticleSlug,
  settings,
  articles,
  faqs,
  testimonials,
  logos,
}: HomeViewProps) {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  
  // Custom Video Player States
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showCinematic, setShowCinematic] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  // Sync state to actual video element ref
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // Autoplay protection may prevent playback occasionally, fail silently
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isMuted, isPlaying]);

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const openCinematicVideo = () => {
    setShowCinematic(true);
    setIsPlaying(false); // Pause inline video while modal is active
  };

  const closeCinematicVideo = () => {
    setShowCinematic(false);
    setIsPlaying(true); // Resume inline preview
  };

  const navigateTo = (view: ViewType) => {
    setView(view);
    setSelectedArticleSlug(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleArticleClick = (slug: string) => {
    setSelectedArticleSlug(slug);
    setView(ViewType.ArticleDetail);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Keep client-facing testimonials for home, or a balanced mix
  const homeTestimonials = testimonials.slice(0, 3);
  const homeArticles = articles.filter((a) => a.published).slice(0, 3);
  // Keep first 4 FAQs for the home accordion
  const homeFaqs = faqs.slice(0, 4);

  return (
    <div id="home-view" className="space-y-0 text-zinc-800 dark:text-zinc-200">
      {/* Cinematic Modal Player Overlay */}
      <AnimatePresence>
        {showCinematic && (
          <motion.div
            id="cinematic-video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md"
            onClick={closeCinematicVideo}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-4xl rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header inside modal */}
              <div className="flex items-center justify-between p-4 bg-zinc-950 border-b border-zinc-800">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-xs font-bold text-zinc-400 tracking-wider uppercase font-display">
                    FAITH ROXAS • ADVISORY PREVIEW
                  </span>
                </div>
                <button
                  onClick={closeCinematicVideo}
                  className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Close Video"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Video Player */}
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <video
                  ref={modalVideoRef}
                  src={settings.heroVideoUrl}
                  autoPlay
                  controls
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Footer info in modal */}
              <div className="p-5 bg-zinc-950/80 text-left border-t border-zinc-850 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <h4 className="text-sm font-bold text-white font-display">
                    Welcome to Top Global Summit Life Insurance Agency
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Watch as Engr. Adrian Beltran, CIA, breaks down the exact 3-step budget-first wealth protection plan we use for thousands of OFW families and young professionals.
                  </p>
                </div>
                <div className="flex items-center justify-start md:justify-end">
                  <button
                    onClick={() => {
                      closeCinematicVideo();
                      navigateTo(ViewType.FreeAssessment);
                    }}
                    className="w-full md:w-auto inline-flex items-center justify-center space-x-1.5 py-2.5 px-5 rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-colors cursor-pointer"
                  >
                    <span>Start assessment (2 min)</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Hero Section (Elevated UI/UX Pinterest-inspired layout) */}
      <section
        id="hero-section"
        className="relative bg-gradient-to-b from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900/40 dark:to-zinc-950 py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-100 dark:border-zinc-900 transition-colors duration-300 overflow-hidden"
      >
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
        <div className="absolute top-1/4 -left-1/4 w-[40rem] h-[40rem] rounded-full bg-emerald-500/5 dark:bg-emerald-500/[0.02] filter blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-1/4 w-[35rem] h-[35rem] rounded-full bg-amber-500/5 dark:bg-amber-500/[0.02] filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column Text (Pinterest Typography) */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
            {/* Tagline Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
              FREE ASSESSMENT • SECURE IN 2 MIN
            </span>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5.5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight max-w-2xl mx-auto lg:mx-0 font-display">
              {settings.heroHeadline}{" "}
              <span className="relative inline-block text-emerald-700 dark:text-emerald-400 italic font-medium">
                {settings.heroHighlightWord}
                <span className="absolute left-0 right-0 -bottom-1 h-1 bg-emerald-200 dark:bg-emerald-800/80 rounded-full" />
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              {settings.heroSubheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-primary-cta"
                onClick={() => navigateTo(ViewType.FreeAssessment)}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-lg shadow-emerald-700/25 dark:shadow-emerald-950/20 active:scale-95 transition-all cursor-pointer"
              >
                <span>{settings.heroCTA}</span>
                <ArrowRight size={16} />
              </button>

              <button
                id="hero-secondary-cta"
                onClick={() => navigateTo(ViewType.Contact)}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:text-emerald-700 dark:hover:text-emerald-400 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 shadow-sm transition-colors cursor-pointer"
              >
                Book Free Call
              </button>
            </div>

            {/* Trust Indicator Row */}
            <div className="pt-8 border-t border-zinc-150 dark:border-zinc-800 flex flex-wrap gap-x-6 gap-y-4 justify-center lg:justify-start text-center lg:text-left">
              <div className="space-y-0.5 min-w-[100px]">
                <p className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-400 font-display whitespace-nowrap">
                  {settings.trustSecuredAmount}
                </p>
                <p className="text-[9px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">
                  secured payout
                </p>
              </div>
              <div className="h-8 w-px bg-zinc-250 dark:bg-zinc-850 hidden sm:block self-center" />
              <div className="space-y-0.5 min-w-[80px]">
                <p className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-400 font-display">
                  {settings.trustClientsCount}
                </p>
                <p className="text-[9px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">
                  active clients
                </p>
              </div>
              <div className="h-8 w-px bg-zinc-250 dark:bg-zinc-850 hidden sm:block self-center" />
              <div className="space-y-0.5 min-w-[80px]">
                <p className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-400 font-display">
                  {settings.trustYearsInBusiness}
                </p>
                <p className="text-[9px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">
                  years active
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Strategic Autoplay Video & Portrait Layout */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6">
            
            {/* 1. Ambient Hero Video Player Block */}
            <div 
              id="hero-video-card"
              onClick={openCinematicVideo}
              className="relative group w-full max-w-[380px] md:max-w-[420px] rounded-3xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800 shadow-2xl bg-zinc-100 dark:bg-zinc-900 cursor-pointer aspect-video md:aspect-[16/10] transition-all duration-500 hover:shadow-emerald-700/10 dark:hover:shadow-zinc-500/5"
            >
              {/* Muted Autoplay Video Element */}
              <video
                ref={videoRef}
                src={settings.heroVideoUrl}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover filter brightness-[0.95] group-hover:scale-[1.015] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Modern Glassmorphic Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 opacity-80 transition-opacity group-hover:opacity-90" />

              {/* Center Play Button (Glassmorphic Pulsating) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/20 dark:bg-black/40 border border-white/40 backdrop-blur-md flex items-center justify-center text-white shadow-xl transform transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:border-emerald-400">
                  <Play size={20} className="fill-current text-white translate-x-0.5" />
                </div>
              </div>

              {/* Bottom Navigation Control Bar */}
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-end">
                {/* Instant Inline Audio / Play Toggles */}
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={handleTogglePlay}
                    className="p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-colors"
                    title={isPlaying ? "Pause Preview" : "Play Preview"}
                  >
                    {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                  </button>
                  <button
                    onClick={handleToggleMute}
                    className="p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-colors"
                    title={isMuted ? "Unmute Sound" : "Mute Sound"}
                  >
                    {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openCinematicVideo();
                    }}
                    className="p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-colors"
                    title="Fullscreen Mode"
                  >
                    <Maximize2 size={12} />
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Overlapping / Connected Profile Portrait */}
            <div 
              id="hero-portrait-sub-card"
              onClick={() => navigateTo(ViewType.About)}
              className="flex items-center space-x-4 p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-150 dark:border-zinc-800 shadow-lg w-full max-w-[340px] cursor-pointer hover:border-emerald-600/35 transition-all group"
            >
              <img
                src={settings.agentPhoto}
                alt={settings.agentName}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-zinc-100 dark:border-zinc-800 group-hover:scale-105 transition-transform"
              />
              <div className="flex-grow min-w-0">
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
                  {settings.agentName}
                </p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium tracking-wide">
                  {settings.agentTitle}
                </p>
                <p className="text-[9px] text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider mt-0.5">
                  About Adrian Beltran Story →
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Logo Strip (Horizontal Marquee) */}
      <LogoStrip logos={logos} title="Licensed affiliations & trusted protections" />

      {/* 3. Two Ways to Work Section (Split Paths: Client vs Advisor Recruits) */}
      <section
        id="two-paths-section"
        className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-900/50 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Clear & Direct Solutions
            </h2>
            <p className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
              Two Ways We Build Financial Freedom
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Whether you are looking to secure your household or launch an independent advisory career, choose the customized path that meets your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Path A: Client Protection */}
            <div
              id="two-path-client"
              className="relative overflow-hidden group bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/50 dark:border-zinc-800 p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 dark:bg-emerald-950/20 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              <div className="space-y-5 relative">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 flex items-center justify-center shadow-inner">
                  <Shield size={24} className="stroke-[2.5]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    For Clients: Protect Your Family
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    Calculate your exact income protection replacement value, cover high-cost critical illness risks, and design a starter safety net that matches your actual savings budget.
                  </p>
                </div>
                <ul className="space-y-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 pt-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Free Financial Readiness Assessment</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Budget-First customized protection options</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>1-on-1 personal advocate claims support</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 relative">
                <button
                  id="path-client-button"
                  onClick={() => navigateTo(ViewType.FreeAssessment)}
                  className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all shadow-md group-hover:shadow-lg shadow-emerald-700/10 cursor-pointer"
                >
                  <span>Start Free Assessment (2 min)</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Path B: Advisor Recruits */}
            <div
              id="two-path-advisor"
              className="relative overflow-hidden group bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/50 dark:border-zinc-800 p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 dark:bg-amber-950/20 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              <div className="space-y-5 relative">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 flex items-center justify-center shadow-inner">
                  <Rocket size={24} className="stroke-[2.5]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
                    For Advisors: Build a Career
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    Escape corporate burnout. Unlock uncapped income streams through active commissions, lifetime renewal overrides, and get mentored directly by a premier Unit Manager.
                  </p>
                </div>
                <ul className="space-y-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 pt-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={14} className="text-amber-600 dark:text-amber-500 shrink-0" />
                    <span>Direct mentorship under Adrian Beltran</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={14} className="text-amber-600 dark:text-amber-500 shrink-0" />
                    <span>Part-time startup reviewer & reviewer tools</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={14} className="text-amber-600 dark:text-amber-500 shrink-0" />
                    <span>Uncapped commissions & passive overrides</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 relative">
                <button
                  id="path-advisor-button"
                  onClick={() => navigateTo(ViewType.BecomeAnAdvisor)}
                  className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-bold text-zinc-800 bg-amber-100 hover:bg-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:hover:bg-amber-900/60 transition-all shadow-md group-hover:shadow-lg cursor-pointer"
                >
                  <span>Explore Career Path</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works (Timeline section) */}
      <section
        id="how-it-works"
        className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-900 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Honest Workflow
            </h2>
            <p className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
              A 3-Step Clear Assessment
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              No pressure, no hard sales pitches. We figure out if there is a gap first, and customize the protection only to your budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
            {/* Timeline connectors (desktop only) */}
            <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-0.5 bg-zinc-100 dark:bg-zinc-800 z-0" />

            {/* Step 1 */}
            <div className="space-y-4 text-center relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center border-2 border-emerald-600 font-extrabold text-base shadow-md">
                1
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-zinc-900 dark:text-zinc-50">Take Free Test</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto leading-relaxed">
                  Provide simple details about your age, dependents, and goals. It takes 2 minutes and evaluates your readiness.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-4 text-center relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center border-2 border-emerald-600 font-extrabold text-base shadow-md">
                2
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-zinc-900 dark:text-zinc-50">Get Clarity Call</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto leading-relaxed">
                  Book a quick 1-on-1 Zoom or phone call. We review your gap analysis, with zero pressure and zero jargon.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-4 text-center relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center border-2 border-emerald-600 font-extrabold text-base shadow-md">
                3
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-zinc-900 dark:text-zinc-50">Choose Your Plan</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto leading-relaxed">
                  We present starter, recommended, and premium options. Select what matches your comfort level and activate coverage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Client Testimonials Carousel / Grid */}
      <section
        id="testimonials-section"
        className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-900/50 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Social Proof
            </h2>
            <p className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
              Honest Feedback From Clients
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Read real stories from families and corporate professionals who secured their financial future without being pressured into massive premiums.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {homeTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200/50 dark:border-zinc-800 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Rating */}
                  <div className="flex space-x-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-current text-amber-500 text-amber-500 shrink-0" />
                    ))}
                  </div>
                  {/* Review Content */}
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800/80">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-800 shrink-0"
                  />
                  <div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
                      {testimonial.name}
                    </p>
                    <p className="text-[10px] text-zinc-400 font-semibold">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Featured Articles System */}
      <section
        id="featured-articles"
        className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-900 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-3">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                Advisory Insights
              </h2>
              <p className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
                Latest Financial Articles
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xl">
                Read our latest insights about life insurance, family boundaries, wealth preservation for OFWs, and career shifts.
              </p>
            </div>
            <button
              id="view-all-articles-top"
              onClick={() => navigateTo(ViewType.Articles)}
              className="inline-flex items-center space-x-1 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 shrink-0 group"
            >
              <span>See all articles</span>
              <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {homeArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => handleArticleClick(article.slug)}
                className="group bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full justify-between"
              >
                <div className="space-y-4">
                  {/* Card Cover */}
                  <div className="relative aspect-video overflow-hidden bg-zinc-200 dark:bg-zinc-800 shrink-0">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter brightness-100 group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 font-bold uppercase tracking-wider text-[9px] px-2.5 py-1 rounded-full border border-emerald-100/50 dark:border-emerald-900/50 shadow-sm">
                      {article.category}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="px-5 pb-2 space-y-2">
                    <div className="flex items-center space-x-2 text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="font-extrabold text-base md:text-lg text-zinc-900 dark:text-zinc-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors tracking-tight line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Read Link */}
                <div className="px-5 pb-5 pt-3">
                  <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    <span>Read Article</span>
                    <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Accordion FAQ Summary */}
      <section
        id="faq-accordion-section"
        className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-900/50 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Objections Answered
            </h2>
            <p className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
              The Doubts Worth Saying Out Loud
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Let's speak in plain language. Here are honest answers to the questions other financial advisors usually dodge behind confusing definitions.
            </p>
          </div>

          {/* Accordion List */}
          <div className="max-w-3xl mx-auto space-y-4">
            {homeFaqs.map((item) => {
              const isExpanded = activeFaq === item.id;
              return (
                <div
                  key={item.id}
                  id={`faq-home-item-${item.id}`}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
                >
                  <button
                    onClick={() => setActiveFaq(isExpanded ? null : item.id)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-sm md:text-base text-zinc-900 dark:text-zinc-50 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    <span>{item.question}</span>
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
                      {item.answer}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button
              id="view-all-faq-button"
              onClick={() => navigateTo(ViewType.FAQ)}
              className="inline-flex items-center space-x-1.5 px-6 py-3 rounded-full text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 transition-all cursor-pointer"
            >
              <span>See All Honest FAQ Objections</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 8. Recruiting Teaser Banner Above Footer */}
      <section id="recruiting-teaser-banner" className="relative overflow-hidden bg-zinc-900 dark:bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-amber-400">
              <TrendingUp size={12} /> Advisor Mentorship Program
            </span>
            <h3 className="text-lg md:text-xl font-black tracking-tight text-white leading-tight">
              Looking for a high-impact, independent career instead?
            </h3>
            <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
              Join Adrian's wealth planning team. Secure access to premier licensing review materials, un-capped sales overrides, and one-on-one personal coaching. See if you qualify today.
            </p>
          </div>
          <button
            id="recruiting-teaser-cta"
            onClick={() => navigateTo(ViewType.BecomeAnAdvisor)}
            className="w-full md:w-auto inline-flex items-center justify-center space-x-1.5 px-6 py-3 rounded-xl text-xs font-bold text-zinc-900 bg-amber-400 hover:bg-amber-500 transition-all shrink-0 shadow-lg cursor-pointer active:scale-95"
          >
            <span>See Qualification Rules</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </div>
  );
}
