export enum ViewType {
  Home = "home",
  FreeAssessment = "free-assessment",
  BecomeAnAdvisor = "become-an-advisor",
  About = "about",
  Articles = "articles",
  ArticleDetail = "article-detail",
  FAQ = "faq",
  Contact = "contact",
  Admin = "admin",
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  date: string;
  readTime: string;
  coverImage: string;
  type: "client" | "advisor";
  published: boolean;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "new" | "contacted" | "converted";
  timestamp: string;
  quizAnswers?: {
    ageGroup: string;
    primaryGoal: string;
    monthlySavings: string;
    hasDependents: string;
    existingInsurance: string;
  };
  source: string; // e.g. "Lead Magnet", "Free Assessment Step 2"
}

export interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "new" | "reviewing" | "interviewed" | "accepted" | "declined";
  timestamp: string;
  motivation: string;
  experience: string;
  availability: string;
  currentJob: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "insurance" | "career" | "general";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  type: "client" | "advisor";
}

export interface PartnerLogo {
  id: string;
  name: string;
  imageUrl: string;
  visible: boolean;
}

export interface LeadMagnetConfig {
  enabled: boolean;
  headline: string;
  description: string;
  triggerTimeSeconds: number;
  scrollDepthPercent: number;
  buttonText: string;
  assetUrl: string;
}

export interface SiteSettings {
  agentName: string;
  agentTitle: string;
  agentBio: string;
  agentPhoto: string;
  agentCredentials: string[];
  agencyName: string;
  heroHeadline: string;
  heroHighlightWord: string;
  heroSubheadline: string;
  heroCTA: string;
  trustSecuredAmount: string;
  trustClientsCount: string;
  trustYearsInBusiness: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  calendlyUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  heroVideoUrl: string;
}
