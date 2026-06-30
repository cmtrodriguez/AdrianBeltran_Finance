import { useState, useEffect } from "react";
import { ViewType, Article, Lead, Applicant, SiteSettings, FaqItem, PartnerLogo, LeadMagnetConfig } from "./types";
import {
  initialArticles,
  initialFaqs,
  initialTestimonials,
  initialLogos,
  initialLeadMagnet,
  initialSettings,
  initialLeads,
  initialApplicants,
} from "./initialData";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import LeadMagnetPopup from "./components/LeadMagnetPopup";
import FloatingAdvisorBadge from "./components/FloatingAdvisorBadge";

// Views
import HomeView from "./views/HomeView";
import FreeAssessmentView from "./views/FreeAssessmentView";
import BecomeAdvisorView from "./views/BecomeAdvisorView";
import AboutView from "./views/AboutView";
import ArticlesView from "./views/ArticlesView";
import FaqView from "./views/FaqView";
import ContactView from "./views/ContactView";
import AdminView from "./views/AdminView";

export default function App() {
  // Page Routing & Selected Article Detail States
  const [activeView, setView] = useState<ViewType>(ViewType.Home);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);

  // Light/Dark Theme State
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Database / Settings states initialized from localStorage or initialData
  const [articles, setArticles] = useState<Article[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [logos, setLogos] = useState<PartnerLogo[]>([]);
  const [leadMagnet, setLeadMagnet] = useState<LeadMagnetConfig>(initialLeadMagnet);

  // 1. Theme Configuration Sync
  useEffect(() => {
    const savedTheme = localStorage.getItem("app_theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("app_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // 2. Data Persistence Hydration
  useEffect(() => {
    const fetchOrInit = <T,>(key: string, defaultData: T): T => {
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return defaultData;
        }
      }
      localStorage.setItem(key, JSON.stringify(defaultData));
      return defaultData;
    };

    setArticles(fetchOrInit("cms_articles", initialArticles));
    setLeads(fetchOrInit("cms_leads", initialLeads));
    setApplicants(fetchOrInit("cms_applicants", initialApplicants));
    const loadedSettings = fetchOrInit("site_settings", initialSettings);
    if (loadedSettings.agentPhoto && loadedSettings.agentPhoto.includes("unsplash.com") && loadedSettings.agentPhoto.includes("544168190")) {
      loadedSettings.agentPhoto = "/adrian.png";
      localStorage.setItem("site_settings", JSON.stringify(loadedSettings));
    }
    setSettings(loadedSettings);
    setFaqs(fetchOrInit("site_faqs", initialFaqs));
    setLogos(fetchOrInit("site_partner_logos", initialLogos));
    setLeadMagnet(fetchOrInit("lead_magnet_config", initialLeadMagnet));
  }, []);

  // Sync methods that update local states & localStorage simultaneously
  const updateArticles = (newArticles: Article[]) => {
    setArticles(newArticles);
    localStorage.setItem("cms_articles", JSON.stringify(newArticles));
  };

  const updateLeads = (newLeads: Lead[]) => {
    setLeads(newLeads);
    localStorage.setItem("cms_leads", JSON.stringify(newLeads));
  };

  const updateApplicants = (newApplicants: Applicant[]) => {
    setApplicants(newApplicants);
    localStorage.setItem("cms_applicants", JSON.stringify(newApplicants));
  };

  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    localStorage.setItem("site_settings", JSON.stringify(newSettings));
  };

  const updateFaqs = (newFaqs: FaqItem[]) => {
    setFaqs(newFaqs);
    localStorage.setItem("site_faqs", JSON.stringify(newFaqs));
  };

  const updateLogos = (newLogos: PartnerLogo[]) => {
    setLogos(newLogos);
    localStorage.setItem("site_partner_logos", JSON.stringify(newLogos));
  };

  const updateLeadMagnet = (newConfig: LeadMagnetConfig) => {
    setLeadMagnet(newConfig);
    localStorage.setItem("lead_magnet_config", JSON.stringify(newConfig));
  };

  // 3. User Submissions Helpers
  const handleAddNewLead = (leadData: {
    name: string;
    email: string;
    phone: string;
    source: string;
    quizAnswers?: any;
  }) => {
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      status: "new",
      timestamp: new Date().toISOString(),
      source: leadData.source,
      quizAnswers: leadData.quizAnswers,
    };
    updateLeads([newLead, ...leads]);
  };

  const handleAddNewApplicant = (applicantData: {
    name: string;
    email: string;
    phone: string;
    motivation: string;
    experience: string;
    availability: string;
    currentJob: string;
  }) => {
    const newApplicant: Applicant = {
      id: `app-${Date.now()}`,
      name: applicantData.name,
      email: applicantData.email,
      phone: applicantData.phone,
      status: "new",
      timestamp: new Date().toISOString(),
      motivation: applicantData.motivation,
      experience: applicantData.experience,
      availability: applicantData.availability,
      currentJob: applicantData.currentJob,
    };
    updateApplicants([newApplicant, ...applicants]);
  };

  // 4. View Router
  const renderActiveView = () => {
    switch (activeView) {
      case ViewType.Home:
        return (
          <HomeView
            setView={setView}
            setSelectedArticleSlug={setSelectedArticleSlug}
            settings={settings}
            articles={articles}
            faqs={faqs}
            testimonials={initialTestimonials}
            logos={logos}
          />
        );
      case ViewType.FreeAssessment:
        return (
          <FreeAssessmentView
            setView={setView}
            settings={settings}
            onAddLead={handleAddNewLead}
          />
        );
      case ViewType.BecomeAnAdvisor:
        return (
          <BecomeAdvisorView
            setView={setView}
            settings={settings}
            testimonials={initialTestimonials}
            onAddApplicant={handleAddNewApplicant}
          />
        );
      case ViewType.About:
        return <AboutView setView={setView} settings={settings} />;
      case ViewType.FAQ:
        return <FaqView setView={setView} faqs={faqs} />;
      case ViewType.Contact:
        return (
          <ContactView
            setView={setView}
            settings={settings}
            onAddLead={handleAddNewLead}
          />
        );
      case ViewType.Articles:
      case ViewType.ArticleDetail:
        return (
          <ArticlesView
            setView={setView}
            articles={articles}
            selectedArticleSlug={selectedArticleSlug}
            setSelectedArticleSlug={setSelectedArticleSlug}
          />
        );
      case ViewType.Admin:
        return (
          <AdminView
            setView={setView}
            articles={articles}
            leads={leads}
            applicants={applicants}
            settings={settings}
            faqs={faqs}
            logos={logos}
            leadMagnet={leadMagnet}
            onUpdateArticles={updateArticles}
            onUpdateLeads={updateLeads}
            onUpdateApplicants={updateApplicants}
            onUpdateSettings={updateSettings}
            onUpdateFaqs={updateFaqs}
            onUpdateLogos={updateLogos}
            onUpdateLeadMagnet={updateLeadMagnet}
          />
        );
      default:
        return (
          <HomeView
            setView={setView}
            setSelectedArticleSlug={setSelectedArticleSlug}
            settings={settings}
            articles={articles}
            faqs={faqs}
            testimonials={initialTestimonials}
            logos={logos}
          />
        );
    }
  };

  return (
    <div
      id="app-root-container"
      className="min-h-screen flex flex-col justify-between bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 transition-colors duration-300"
    >
      {/* 1. Header Sticky Nav */}
      <Header
        activeView={activeView}
        setView={setView}
        setSelectedArticleSlug={setSelectedArticleSlug}
        theme={theme}
        toggleTheme={toggleTheme}
        heroCTA={settings.heroCTA}
      />

      {/* 2. Page Render Area */}
      <main id="main-content-area" className="flex-grow">
        {renderActiveView()}
      </main>

      {/* 3. Exit Intent / Timer lead magnet popup */}
      <LeadMagnetPopup
        config={leadMagnet}
        activeView={activeView}
        onSubmitLead={(name, email, source) => handleAddNewLead({ name, email, phone: "No phone", source })}
      />

      {/* Floating Advisor Consultation Badge (Bottom Left, persistent) */}
      <FloatingAdvisorBadge
        settings={settings}
        setView={setView}
      />

      {/* 4. Footer */}
      <Footer
        setView={setView}
        setSelectedArticleSlug={setSelectedArticleSlug}
        settings={settings}
      />
    </div>
  );
}
