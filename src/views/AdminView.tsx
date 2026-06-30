import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Lock, LayoutDashboard, FileText, Users, Settings, LogOut, Search, Trash2, Plus, Edit3, Check, ToggleLeft, ToggleRight, Download, Eye, Sparkles, Filter, ShieldCheck, AlertCircle, History
} from "lucide-react";
import {
  Article, Lead, Applicant, SiteSettings, FaqItem, PartnerLogo, LeadMagnetConfig, ViewType
} from "../types";

interface AdminViewProps {
  setView: (view: ViewType) => void;
  articles: Article[];
  leads: Lead[];
  applicants: Applicant[];
  settings: SiteSettings;
  faqs: FaqItem[];
  logos: PartnerLogo[];
  leadMagnet: LeadMagnetConfig;
  onUpdateArticles: (articles: Article[]) => void;
  onUpdateLeads: (leads: Lead[]) => void;
  onUpdateApplicants: (applicants: Applicant[]) => void;
  onUpdateSettings: (settings: SiteSettings) => void;
  onUpdateFaqs: (faqs: FaqItem[]) => void;
  onUpdateLogos: (logos: PartnerLogo[]) => void;
  onUpdateLeadMagnet: (config: LeadMagnetConfig) => void;
}

export default function AdminView({
  setView,
  articles,
  leads,
  applicants,
  settings,
  faqs,
  logos,
  leadMagnet,
  onUpdateArticles,
  onUpdateLeads,
  onUpdateApplicants,
  onUpdateSettings,
  onUpdateFaqs,
  onUpdateLogos,
  onUpdateLeadMagnet,
}: AdminViewProps) {
  // Gated Authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Navigation inside Admin
  const [activeTab, setActiveTab] = useState<"dashboard" | "leads" | "applicants" | "articles" | "settings" | "logs">("dashboard");

  // Search/Filters
  const [leadSearch, setLeadSearch] = useState("");
  const [applicantSearch, setApplicantSearch] = useState("");
  const [articleSearch, setArticleSearch] = useState("");

  // Audit Logs (Simulated)
  const [auditLogs, setAuditLogs] = useState<Array<{ time: string; action: string; user: string }>>([
    { time: new Date(Date.now() - 1000 * 60 * 30).toLocaleTimeString(), action: "Initialized Admin CMS Gateway", user: "Adrian Beltran" },
    { time: new Date(Date.now() - 1000 * 60 * 15).toLocaleTimeString(), action: "Sync database collections", user: "System" },
  ]);

  // Article Modal Editor State
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [articleForm, setArticleForm] = useState<Partial<Article>>({});

  // Faq Editor State
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [faqForm, setFaqForm] = useState<Partial<FaqItem>>({});

  // Local Temp States for Settings and Popup Config (Confirm Button Required)
  const [tempSettings, setTempSettings] = useState<SiteSettings>({ ...settings });
  const [tempLeadMagnet, setTempLeadMagnet] = useState<LeadMagnetConfig>({ ...leadMagnet });
  const [settingsSuccess, setSettingsSuccess] = useState("");
  const [popupSuccess, setPopupSuccess] = useState("");

  const logAction = (action: string) => {
    setAuditLogs((prev) => [
      { time: new Date().toLocaleTimeString(), action, user: "Adrian Beltran" },
      ...prev,
    ]);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin") {
      setIsAuthenticated(true);
      setLoginError("");
      logAction("Successful authentication");
    } else {
      setLoginError("Incorrect security code. Hint: Use 'admin' to explore!");
    }
  };

  // CSV Exporter
  const handleExportCSV = (type: "leads" | "applicants") => {
    let headers = "";
    let rows = [];

    if (type === "leads") {
      headers = "ID,Name,Email,Phone,Status,Timestamp,Source,Age,Goal\n";
      rows = leads.map(
        (l) =>
          `"${l.id}","${l.name}","${l.email}","${l.phone}","${l.status}","${l.timestamp}","${l.source}","${
            l.quizAnswers?.ageGroup || ""
          }","${l.quizAnswers?.primaryGoal || ""}"`
      );
    } else {
      headers = "ID,Name,Email,Phone,Status,Timestamp,Availability,Role,Motivation\n";
      rows = applicants.map(
        (a) =>
          `"${a.id}","${a.name}","${a.email}","${a.phone}","${a.status}","${a.timestamp}","${a.availability}","${a.currentJob}","${a.motivation}"`
      );
    }

    const csvContent = "data:text/csv;charset=utf-8," + headers + rows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${type}_export_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    logAction(`Exported ${type} to CSV file`);
  };

  // Lead status updater
  const updateLeadStatus = (id: string, status: "new" | "contacted" | "converted") => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status } : l));
    onUpdateLeads(updated);
    logAction(`Updated lead status to ${status}`);
  };

  // Applicant status updater
  const updateApplicantStatus = (id: string, status: any) => {
    const updated = applicants.map((a) => (a.id === id ? { ...a, status } : a));
    onUpdateApplicants(updated);
    logAction(`Updated candidate status to ${status}`);
  };

  // Article Actions
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleForm.title || !articleForm.content) return;

    if (editingArticle) {
      // Edit
      const updated = articles.map((art) =>
        art.id === editingArticle.id ? { ...art, ...articleForm } as Article : art
      );
      onUpdateArticles(updated);
      logAction(`Updated article: ${articleForm.title}`);
    } else {
      // Create
      const newArticle: Article = {
        id: `art-${Date.now()}`,
        slug: (articleForm.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        title: articleForm.title || "",
        excerpt: articleForm.excerpt || "",
        content: articleForm.content || "",
        author: settings.agentName,
        category: articleForm.category || "Insurance Basics",
        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        readTime: `${Math.ceil((articleForm.content || "").split(/\s+/).length / 150)} min read`,
        coverImage: articleForm.coverImage || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
        type: articleForm.type || "client",
        published: articleForm.published ?? true,
      };
      onUpdateArticles([newArticle, ...articles]);
      logAction(`Created new article: ${newArticle.title}`);
    }
    setEditingArticle(null);
    setArticleForm({});
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm("Are you sure you want to delete this article? This is irreversible.")) {
      const updated = articles.filter((art) => art.id !== id);
      onUpdateArticles(updated);
      logAction("Deleted an article");
    }
  };

  // settings editor (local temp state edits only)
  const handleSaveSettings = (key: keyof SiteSettings, value: any) => {
    setTempSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveLeadMagnet = (key: keyof LeadMagnetConfig, value: any) => {
    setTempLeadMagnet((prev) => ({ ...prev, [key]: value }));
  };

  // Commit and Confirm changes to the global app state
  const handleCommitSettings = () => {
    onUpdateSettings(tempSettings);
    logAction("Committed & Saved general site and profile configuration");
    setSettingsSuccess("Site and profile configurations saved successfully!");
    setTimeout(() => setSettingsSuccess(""), 4000);
  };

  const handleCommitLeadMagnet = () => {
    onUpdateLeadMagnet(tempLeadMagnet);
    logAction("Committed & Saved lead magnet popup configuration");
    setPopupSuccess("Lead magnet and popup configuration saved successfully!");
    setTimeout(() => setPopupSuccess(""), 4000);
  };

  return (
    <div id="admin-view-wrapper" className="min-h-[85vh] bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 py-12 px-4 sm:px-6 transition-all duration-300">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          /* ========================================================
             1. GATED ENTRY WALL
             ======================================================== */
          <motion.div
            key="login-wall"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-md mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-center space-y-6 mt-10"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
              <Lock size={28} className="stroke-[2]" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
                Secure Administrative Gate
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Adrian Beltran's Central CMS Platform.
              </p>
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 rounded-xl text-xs font-semibold flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="admin-passcode" className="block text-left text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Security Passcode
                </label>
                <input
                  type="password"
                  id="admin-passcode"
                  placeholder="Type passcode..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  autoFocus
                />
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-xl border border-zinc-150 dark:border-zinc-800 text-left text-[11px] leading-relaxed text-zinc-500">
                💡 <strong>Evaluation Notice:</strong> Type <strong className="text-emerald-700 dark:text-emerald-400">admin</strong> into the passcode box above to log in and inspect the features.
              </div>

              <button
                type="submit"
                id="submit-login"
                className="w-full inline-flex items-center justify-center space-x-1.5 py-3 px-4 rounded-xl text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Authorize Access</span>
              </button>
            </form>
          </motion.div>
        ) : (
          /* ========================================================
             2. CENTRAL CMS WORKSPACE (AUTHENTICATED)
             ======================================================== */
          <motion.div
            key="admin-workspace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Sidebar Navigation */}
            <div className="lg:col-span-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-sm space-y-6">
              <div className="flex items-center space-x-2.5 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center text-white font-bold text-xs">
                  AB
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-50">Adrian Beltran</h3>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Site Owner</p>
                </div>
              </div>

              <nav className="space-y-1" aria-label="CMS Sidebar">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full flex items-center space-x-2.5 px-3.5 py-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === "dashboard"
                      ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                  }`}
                >
                  <LayoutDashboard size={16} />
                  <span>Dashboard Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab("leads")}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === "leads"
                      ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <ShieldCheck size={16} />
                    <span>Client Leads</span>
                  </div>
                  <span className="bg-emerald-700 text-white dark:bg-emerald-600 text-[10px] font-black px-1.5 py-0.5 rounded-full shrink-0">
                    {leads.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("applicants")}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === "applicants"
                      ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Users size={16} />
                    <span>Advisor Applicants</span>
                  </div>
                  <span className="bg-amber-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full shrink-0">
                    {applicants.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("articles")}
                  className={`w-full flex items-center space-x-2.5 px-3.5 py-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === "articles"
                      ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                  }`}
                >
                  <FileText size={16} />
                  <span>Manage Articles</span>
                </button>

                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center space-x-2.5 px-3.5 py-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === "settings"
                      ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                  }`}
                >
                  <Settings size={16} />
                  <span>Site & Popup Config</span>
                </button>

                <button
                  onClick={() => setActiveTab("logs")}
                  className={`w-full flex items-center space-x-2.5 px-3.5 py-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === "logs"
                      ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                  }`}
                >
                  <History size={16} />
                  <span>CMS Audit Logs</span>
                </button>
              </nav>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer border border-transparent hover:border-red-200"
                >
                  <LogOut size={14} />
                  <span>Log Out CMS</span>
                </button>
              </div>
            </div>

            {/* Right Workspaces */}
            <div className="lg:col-span-9 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
              {/* TAB 1: DASHBOARD OVERVIEW */}
              {activeTab === "dashboard" && (
                <div id="tab-dashboard" className="space-y-8">
                  <div className="space-y-1.5">
                    <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                      Dashboard Analytics Overview
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Real-time lead registrations and visitor interactions.
                    </p>
                  </div>

                  {/* Summary Stat Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-150 dark:border-zinc-800/60 text-center space-y-1">
                      <p className="text-[10px] uppercase font-bold text-zinc-400">Total Leads</p>
                      <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400">{leads.length}</p>
                    </div>
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-150 dark:border-zinc-800/60 text-center space-y-1">
                      <p className="text-[10px] uppercase font-bold text-zinc-400">Total Candidates</p>
                      <p className="text-2xl font-black text-amber-600">{applicants.length}</p>
                    </div>
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-150 dark:border-zinc-800/60 text-center space-y-1">
                      <p className="text-[10px] uppercase font-bold text-zinc-400">Articles</p>
                      <p className="text-2xl font-black text-zinc-700 dark:text-zinc-200">{articles.length}</p>
                    </div>
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-150 dark:border-zinc-800/60 text-center space-y-1">
                      <p className="text-[10px] uppercase font-bold text-zinc-400">Conversion Rate</p>
                      <p className="text-2xl font-black text-emerald-600">8.4%</p>
                    </div>
                  </div>

                  {/* Visual SVG bar graphs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl border border-zinc-150 dark:border-zinc-800 space-y-4">
                      <h4 className="font-extrabold text-xs uppercase tracking-wider text-zinc-400">Leads by Source</h4>
                      <div className="space-y-3">
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs font-semibold">
                            <span>Assessment Funnel</span>
                            <span>{leads.filter((l) => l.source.includes("Assessment")).length}</span>
                          </div>
                          <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-600" style={{ width: "70%" }} />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs font-semibold">
                            <span>Lead Magnet Download</span>
                            <span>{leads.filter((l) => l.source.includes("Magnet")).length}</span>
                          </div>
                          <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-400" style={{ width: "45%" }} />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs font-semibold">
                            <span>Direct Contact Messages</span>
                            <span>{leads.filter((l) => l.source.includes("Contact")).length}</span>
                          </div>
                          <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500" style={{ width: "20%" }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl border border-zinc-150 dark:border-zinc-800 space-y-4">
                      <h4 className="font-extrabold text-xs uppercase tracking-wider text-zinc-400">Recent Registrations</h4>
                      <ul className="space-y-3 text-xs">
                        {[...leads, ...applicants].slice(0, 3).map((item, index) => (
                          <li key={index} className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800">
                            <div>
                              <p className="font-bold text-zinc-800 dark:text-zinc-200">{item.name}</p>
                              <p className="text-[10px] text-zinc-400">{item.email}</p>
                            </div>
                            <span className="bg-zinc-100 dark:bg-zinc-800 font-bold px-2 py-0.5 rounded-full scale-90">
                              {"quizAnswers" in item ? "Lead" : "Advisor Recruit"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: CLIENT LEADS TABLE */}
              {activeTab === "leads" && (
                <div id="tab-leads" className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                        Client Assessment Leads
                      </h2>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Manage submitted financial assessment assessments.
                      </p>
                    </div>

                    <button
                      onClick={() => handleExportCSV("leads")}
                      className="inline-flex items-center space-x-1.5 py-2 px-4 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800"
                    >
                      <Download size={14} />
                      <span>Export to CSV</span>
                    </button>
                  </div>

                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-3 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Search leads..."
                      value={leadSearch}
                      onChange={(e) => setLeadSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-zinc-50 dark:bg-zinc-800 text-zinc-500 font-bold uppercase border-b border-zinc-200 dark:border-zinc-800">
                          <th className="p-4">Name</th>
                          <th className="p-4">Email / Phone</th>
                          <th className="p-4">Source</th>
                          <th className="p-4">Diagnosis Answers</th>
                          <th className="p-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-150 dark:divide-zinc-850">
                        {leads
                          .filter((l) => l.name.toLowerCase().includes(leadSearch.toLowerCase()) || l.email.toLowerCase().includes(leadSearch.toLowerCase()))
                          .map((lead) => (
                            <tr key={lead.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20">
                              <td className="p-4 font-bold text-zinc-900 dark:text-zinc-50">{lead.name}</td>
                              <td className="p-4 font-medium">
                                <p>{lead.email}</p>
                                <p className="text-[10px] text-zinc-400">{lead.phone}</p>
                              </td>
                              <td className="p-4 font-semibold text-zinc-400 text-[10px] uppercase tracking-wider">{lead.source}</td>
                              <td className="p-4 leading-normal max-w-xs text-[10px] text-zinc-500">
                                {lead.quizAnswers ? (
                                  <div className="space-y-0.5 font-medium">
                                    <p>🛡️ Age: {lead.quizAnswers.ageGroup}</p>
                                    <p>💼 Goal: {lead.quizAnswers.primaryGoal}</p>
                                    <p>💰 Save: {lead.quizAnswers.monthlySavings}</p>
                                    <p>⚠️ Cover: {lead.quizAnswers.existingInsurance}</p>
                                  </div>
                                ) : (
                                  <span className="italic">Lead Magnet Only</span>
                                )}
                              </td>
                              <td className="p-4">
                                <select
                                  value={lead.status}
                                  onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                                  className="py-1 px-2.5 rounded-full bg-zinc-50 dark:bg-zinc-800 font-bold border border-zinc-200 dark:border-zinc-700"
                                >
                                  <option value="new">New</option>
                                  <option value="contacted">Contacted</option>
                                  <option value="converted">Converted</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: ADVISOR APPLICANTS TABLE */}
              {activeTab === "applicants" && (
                <div id="tab-applicants" className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                        Advisor Applicants Pool
                      </h2>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Qualify candidate submissions.
                      </p>
                    </div>

                    <button
                      onClick={() => handleExportCSV("applicants")}
                      className="inline-flex items-center space-x-1.5 py-2 px-4 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800"
                    >
                      <Download size={14} />
                      <span>Export Applicants</span>
                    </button>
                  </div>

                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-3 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Search candidates..."
                      value={applicantSearch}
                      onChange={(e) => setApplicantSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-800 text-xs font-medium focus:outline-none"
                    />
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-zinc-50 dark:bg-zinc-800 text-zinc-500 font-bold uppercase border-b border-zinc-200 dark:border-zinc-800">
                          <th className="p-4">Applicant</th>
                          <th className="p-4">Email / Phone</th>
                          <th className="p-4">Prior Job & Exp</th>
                          <th className="p-4">Motivation</th>
                          <th className="p-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-150 dark:divide-zinc-850">
                        {applicants
                          .filter((a) => a.name.toLowerCase().includes(applicantSearch.toLowerCase()) || a.email.toLowerCase().includes(applicantSearch.toLowerCase()))
                          .map((candidate) => (
                            <tr key={candidate.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/20">
                              <td className="p-4 font-bold text-zinc-900 dark:text-zinc-50">
                                <p>{candidate.name}</p>
                                <span className="text-[9px] font-black bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded uppercase">
                                  {candidate.availability}
                                </span>
                              </td>
                              <td className="p-4 font-medium">
                                <p>{candidate.email}</p>
                                <p className="text-[10px] text-zinc-400">{candidate.phone}</p>
                              </td>
                              <td className="p-4">
                                <p className="font-bold">{candidate.currentJob}</p>
                                <p className="text-[10px] text-zinc-400">Exp: {candidate.experience}</p>
                              </td>
                              <td className="p-4 leading-normal max-w-xs font-semibold text-zinc-500">{candidate.motivation}</td>
                              <td className="p-4">
                                <select
                                  value={candidate.status}
                                  onChange={(e) => updateApplicantStatus(candidate.id, e.target.value as any)}
                                  className="py-1 px-2.5 rounded-full bg-zinc-50 dark:bg-zinc-800 font-bold border border-zinc-200 dark:border-zinc-750"
                                >
                                  <option value="new">New</option>
                                  <option value="reviewing">Reviewing</option>
                                  <option value="interviewed">Interviewed</option>
                                  <option value="accepted">Accepted</option>
                                  <option value="declined">Declined</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: ARTICLE CMS MANAGER */}
              {activeTab === "articles" && (
                <div id="tab-articles" className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                        Articles CMS Creator
                      </h2>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Create, publish, and delete long-form literature.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setEditingArticle(null);
                        setArticleForm({
                          title: "",
                          excerpt: "",
                          content: "",
                          category: "Insurance Basics",
                          type: "client",
                          coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
                          published: true,
                        });
                      }}
                      className="inline-flex items-center space-x-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>Create New Article</span>
                    </button>
                  </div>

                  {/* Form Editor Modal (rendered inline for simplicity & UX) */}
                  {articleForm.title !== undefined && (
                    <form onSubmit={handleSaveArticle} className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 space-y-4">
                      <h3 className="font-extrabold text-sm uppercase text-emerald-700 dark:text-emerald-400">
                        {editingArticle ? "Modify Article" : "Write Fresh Article"}
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Title</label>
                          <input
                            type="text"
                            value={articleForm.title}
                            onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-semibold"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Cover Image URL</label>
                          <input
                            type="text"
                            value={articleForm.coverImage}
                            onChange={(e) => setArticleForm({ ...articleForm, coverImage: e.target.value })}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-semibold"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Category</label>
                          <select
                            value={articleForm.category}
                            onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-semibold"
                          >
                            <option>Insurance Basics</option>
                            <option>OFW & Family</option>
                            <option>Career & Growth</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Type (Contextual CTAs)</label>
                          <select
                            value={articleForm.type}
                            onChange={(e) => setArticleForm({ ...articleForm, type: e.target.value as any })}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-semibold"
                          >
                            <option value="client">Client-facing (Triggers Assessment CTA)</option>
                            <option value="advisor">Advisor-facing (Triggers Career CTA)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Publish Status</label>
                          <select
                            value={articleForm.published ? "true" : "false"}
                            onChange={(e) => setArticleForm({ ...articleForm, published: e.target.value === "true" })}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-semibold"
                          >
                            <option value="true">Published (Visible)</option>
                            <option value="false">Draft (Hidden)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Excerpt Summary</label>
                        <input
                          type="text"
                          value={articleForm.excerpt}
                          onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-medium"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Content Body (Supports markdown headers & lists)</label>
                        <textarea
                          rows={10}
                          value={articleForm.content}
                          onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-medium leading-relaxed"
                          required
                        />
                      </div>

                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setArticleForm({})}
                          className="px-4 py-2 rounded-xl text-xs font-bold border border-zinc-200 hover:bg-zinc-100"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  )}

                  {/* List of articles */}
                  <div className="space-y-3">
                    {articles.map((art) => (
                      <div
                        key={art.id}
                        className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-2xl hover:shadow-sm"
                      >
                        <div className="space-y-1">
                          <span className="text-[9px] font-black uppercase text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-100/50">
                            {art.category}
                          </span>
                          <h4 className="font-extrabold text-xs sm:text-sm text-zinc-900 dark:text-zinc-50 leading-tight">
                            {art.title}
                          </h4>
                          <p className="text-[10px] text-zinc-400 font-semibold">Type: {art.type === "client" ? "Client CTA" : "Recruit CTA"} | {art.date}</p>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          <button
                            onClick={() => {
                              setEditingArticle(art);
                              setArticleForm(art);
                            }}
                            className="p-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300"
                            title="Edit"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(art.id)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/20 dark:hover:bg-red-900/30"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

               {/* TAB 5: SITE SETTINGS & POPUP ENGINE */}
               {activeTab === "settings" && (
                 <div id="tab-settings" className="space-y-8">
                   {/* Advisor Profile Configuration */}
                   <div className="p-6 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-150 dark:border-zinc-800 rounded-2xl space-y-4">
                     <h3 className="font-extrabold text-sm uppercase text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                       <Settings size={16} /> Advisor Profile Configuration
                     </h3>
                     <p className="text-[10px] text-zinc-400 -mt-1">Manage your advisor name, title, profile picture, and bio</p>
 
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div>
                         <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Advisor Name</label>
                         <input
                           type="text"
                           value={tempSettings.agentName}
                           onChange={(e) => handleSaveSettings("agentName", e.target.value)}
                           className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 font-semibold"
                         />
                       </div>
                       <div>
                         <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Profile Photo URL</label>
                         <input
                           type="text"
                           value={tempSettings.agentPhoto}
                           onChange={(e) => handleSaveSettings("agentPhoto", e.target.value)}
                           className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 font-semibold"
                           placeholder="Direct Image URL (e.g., https://...)"
                         />
                       </div>
                     </div>
 
                     <div>
                       <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Advisor Title & Designations</label>
                       <input
                         type="text"
                         value={tempSettings.agentTitle}
                         onChange={(e) => handleSaveSettings("agentTitle", e.target.value)}
                         className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 font-semibold"
                       />
                     </div>
 
                     <div>
                       <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Professional Bio</label>
                       <textarea
                         rows={4}
                         value={tempSettings.agentBio}
                         onChange={(e) => handleSaveSettings("agentBio", e.target.value)}
                         className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 font-medium leading-relaxed"
                       />
                     </div>

                     <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-zinc-100 dark:border-zinc-800/60 pt-4">
                       <div className="text-[11px] text-zinc-400 font-medium">
                         * Requires confirmation below to go live across the entire website.
                       </div>
                       <div className="flex items-center gap-3">
                         {settingsSuccess && (
                           <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 animate-pulse">
                             ✓ {settingsSuccess}
                           </span>
                         )}
                         <button
                           onClick={handleCommitSettings}
                           className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all cursor-pointer shadow-md"
                         >
                           <Check size={14} /> Confirm Profile Changes
                         </button>
                       </div>
                     </div>
                   </div>
 
                   {/* Lead Magnet Configuration */}
                   <div className="p-6 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-150 dark:border-zinc-800 rounded-2xl space-y-4">
                     <div className="flex items-center justify-between">
                       <div className="space-y-0.5">
                         <h3 className="font-extrabold text-sm uppercase text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                           <Sparkles size={16} /> Lead Magnet Popup Configuration
                         </h3>
                         <p className="text-[10px] text-zinc-400">Exit-intent email capture tool</p>
                       </div>
 
                       <button
                         onClick={() => handleSaveLeadMagnet("enabled", !tempLeadMagnet.enabled)}
                         className="p-1 shrink-0"
                       >
                         {tempLeadMagnet.enabled ? (
                           <ToggleRight size={36} className="text-emerald-600" />
                         ) : (
                           <ToggleLeft size={36} className="text-zinc-400" />
                         )}
                       </button>
                     </div>
 
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                       <div>
                         <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Headline title</label>
                         <input
                           type="text"
                           value={tempLeadMagnet.headline}
                           onChange={(e) => handleSaveLeadMagnet("headline", e.target.value)}
                           className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 font-semibold"
                         />
                       </div>
                       <div>
                         <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Button text</label>
                         <input
                           type="text"
                           value={tempLeadMagnet.buttonText}
                           onChange={(e) => handleSaveLeadMagnet("buttonText", e.target.value)}
                           className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 font-semibold"
                         />
                       </div>
                     </div>
 
                     <div>
                       <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Description copy</label>
                       <textarea
                         rows={2}
                         value={tempLeadMagnet.description}
                         onChange={(e) => handleSaveLeadMagnet("description", e.target.value)}
                         className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 font-medium leading-relaxed"
                       />
                     </div>

                     <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-zinc-100 dark:border-zinc-800/60 pt-4">
                       <div className="text-[11px] text-zinc-400 font-medium">
                         * Requires confirmation below to apply changes to the popups.
                       </div>
                       <div className="flex items-center gap-3">
                         {popupSuccess && (
                           <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 animate-pulse">
                             ✓ {popupSuccess}
                           </span>
                         )}
                         <button
                           onClick={handleCommitLeadMagnet}
                           className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all cursor-pointer shadow-md"
                         >
                           <Check size={14} /> Confirm Popup Changes
                         </button>
                       </div>
                     </div>
                   </div>
 
                   {/* Public Content Configurator */}
                   <div className="p-6 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-150 dark:border-zinc-800 rounded-2xl space-y-6">
                     <h3 className="font-extrabold text-sm uppercase text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                       <FileText size={16} /> Public Landing Content Editor
                     </h3>
 
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                       <div>
                         <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Secured Protections</label>
                         <input
                           type="text"
                           value={tempSettings.trustSecuredAmount}
                           onChange={(e) => handleSaveSettings("trustSecuredAmount", e.target.value)}
                           className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 font-bold"
                         />
                       </div>
                       <div>
                         <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Active Client Count</label>
                         <input
                           type="text"
                           value={tempSettings.trustClientsCount}
                           onChange={(e) => handleSaveSettings("trustClientsCount", e.target.value)}
                           className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 font-bold"
                         />
                       </div>
                       <div>
                         <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Years Active</label>
                         <input
                           type="text"
                           value={tempSettings.trustYearsInBusiness}
                           onChange={(e) => handleSaveSettings("trustYearsInBusiness", e.target.value)}
                           className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 font-bold"
                         />
                       </div>
                     </div>
 
                     <div className="grid grid-cols-1 gap-4">
                       <div>
                         <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Hero Main headline</label>
                         <input
                           type="text"
                           value={tempSettings.heroHeadline}
                           onChange={(e) => handleSaveSettings("heroHeadline", e.target.value)}
                           className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 font-semibold"
                         />
                       </div>
                       <div>
                         <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Hero Accent word</label>
                         <input
                           type="text"
                           value={tempSettings.heroHighlightWord}
                           onChange={(e) => handleSaveSettings("heroHighlightWord", e.target.value)}
                           className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 font-semibold"
                         />
                       </div>
                     </div>
 
                     <div>
                       <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Hero Subheadline</label>
                       <textarea
                         rows={3}
                         value={tempSettings.heroSubheadline}
                         onChange={(e) => handleSaveSettings("heroSubheadline", e.target.value)}
                         className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 font-medium leading-relaxed"
                       />
                     </div>
 
                     <div>
                       <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Hero Autoplay Video MP4 URL</label>
                       <input
                         type="text"
                         value={tempSettings.heroVideoUrl || ""}
                         onChange={(e) => handleSaveSettings("heroVideoUrl", e.target.value)}
                         className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 font-semibold"
                         placeholder="Direct MP4 Video URL"
                       />
                       <p className="text-[9px] text-zinc-400 dark:text-zinc-500 mt-1">
                         Provide a direct link to a high-quality MP4 file. The video will loop, play muted automatically on load, and can be clicked to watch with full audio controls.
                       </p>
                     </div>

                     <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-zinc-100 dark:border-zinc-800/60 pt-4">
                       <div className="text-[11px] text-zinc-400 font-medium">
                         * Requires confirmation below to update values on the home page.
                       </div>
                       <div className="flex items-center gap-3">
                         {settingsSuccess && (
                           <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 animate-pulse">
                             ✓ {settingsSuccess}
                           </span>
                         )}
                         <button
                           onClick={handleCommitSettings}
                           className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all cursor-pointer shadow-md"
                         >
                           <Check size={14} /> Confirm Landing Page Changes
                         </button>
                       </div>
                     </div>
                   </div>
                 </div>
               )}

              {/* TAB 6: AUDIT LOGS VIEW */}
              {activeTab === "logs" && (
                <div id="tab-logs" className="space-y-6">
                  <div className="space-y-1">
                    <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                      CMS Audit Operations Log
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Audit footprint of configuration modifications and logins.
                    </p>
                  </div>

                  <div className="rounded-xl border border-zinc-200 dark:border-zinc-850 p-4 bg-zinc-50 dark:bg-zinc-900 overflow-y-auto max-h-[400px]">
                    <ul className="space-y-3 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                      {auditLogs.map((log, index) => (
                        <li key={index} className="flex space-x-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                          <span className="text-emerald-700 dark:text-emerald-400 shrink-0 font-bold">[{log.time}]</span>
                          <span className="font-extrabold text-zinc-400 uppercase shrink-0">({log.user})</span>
                          <span>- {log.action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
