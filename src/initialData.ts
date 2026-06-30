import { Article, FaqItem, Testimonial, PartnerLogo, LeadMagnetConfig, SiteSettings, Lead, Applicant } from "./types";

export const initialArticles: Article[] = [
  {
    id: "art-1",
    slug: "why-ofw-families-fail-to-retain-wealth",
    title: "Why OFW Families Struggle with Wealth Retention (And How to Stop the Cycle)",
    excerpt: "Over 60% of Overseas Filipino Workers return home with no long-term savings. Here are the three conversations you need to have with your family today.",
    content: `Many Overseas Filipino Workers (OFWs) spend decades working abroad, enduring separation and loneliness, with a single goal: to provide a better future for their families. Yet, industry statistics show that a staggering number of OFWs return to the Philippines without significant savings, forced to look for work again or depend on others.

Why does this happen, and how can we break this painful cycle?

### 1. The "Padala" Trap
Often, families back home perceive remittance as an endless stream of income. Without a structured budget, money is spent on consumable items, high-end gadgets, and lifestyle upgrades, rather than assets.
*   **The Solution:** Agree on a fixed "padala" amount. Anything earned beyond that should be channeled directly into an investment or insurance vehicle that cannot be easily withdrawn for impulsive purchases.

### 2. Lack of Coordinated Goals
When the breadwinner is abroad, communication is often restricted to emotional check-ins. Financial goals are rarely aligned.
*   **The Solution:** Hold a family financial meeting. Define what the money is for—education, a house, retirement—and assign timelines.

### 3. Exposure to Emergencies
One major illness in the family back home can instantly wipe out years of hard-earned savings. Because many OFWs do not have local health insurance or critical illness riders, they become the emergency fund.
*   **The Solution:** Setting up a critical illness protection plan for both the OFW and the primary dependents back home. For as low as ₱1,500 a month, a family can secure a ₱1,000,000 safety net.

### The Honest Next Step
If you are an OFW or a family member, don't wait for your contract to end before planning. Take our free Financial Readiness Assessment today to evaluate your current standing and map out a realistic path to permanent retirement back home.`,
    author: "Engr. Adrian Beltran, CIA",
    category: "OFW & Family",
    date: "June 25, 2026",
    readTime: "4 min read",
    coverImage: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
    type: "client",
    published: true,
  },
  {
    id: "art-2",
    slug: "3-life-insurance-lies-holding-you-back",
    title: "3 Life Insurance Lies You've Been Told (And the Honest Truth)",
    excerpt: "Let's talk about the uncomfortable truths that insurance companies hide behind jargon. Here is how to avoid buying what you don't actually need.",
    content: `Let's bypass the standard corporate sales pitch. Many people hate discussing life insurance because they feel they are being sold something they don't understand, or they believe common myths spread by aggressive salespeople.

Here are the three most common myths busted, plain and simple:

### Lie #1: "Insurance is an investment, you'll get rich from it."
Let's be completely transparent: **Insurance is primary protection, not a get-rich-quick scheme.** While Variable Universal Life (VUL) plans do have a fund accumulation element, their principal job is to protect your income. If your main goal is high-yield wealth generation, you might be better off splitting your budget between pure term insurance and mutual funds.
*   **When a VUL makes sense:** If you want a disciplined, automated "forced savings" tool that guarantees your dependents get a multi-million payout if something happens to you while your funds grow passively.

### Lie #2: "I'm young and healthy, I don't need it yet."
This is the ultimate paradox. The exact moment you are most qualified to get cheap, premium-grade insurance is when you feel you need it least. Insurance companies price their contracts based on risk. A 23-year-old non-smoker can secure a ₱2,000,000 critical illness plan for the price of a couple of coffees per week. At 45, that same plan will cost three times more, or worse—you might be declined due to pre-existing conditions.

### Lie #3: "My company health insurance (HMO) is enough."
HMOs are excellent for minor outpatient care and basic hospital stays. However, if you are diagnosed with a critical illness like cancer or stroke, standard company HMOs usually max out at ₱150,000 to ₱200,000. Real critical treatments can easily cost ₱1,500,000+. Furthermore, if you lose your job or retire, your HMO coverage terminates immediately, leaving you completely unprotected when you need it most.

### Finding the Right Fit
You do not need to over-insure yourself. Our objective is to calculate your exact Income Replacement Value—insuring only what your family would lose if your paycheck disappeared. Take our free 2-minute assessment to discover your specific number.`,
    author: "Engr. Adrian Beltran, CIA",
    category: "Insurance Basics",
    date: "June 18, 2026",
    readTime: "5 min read",
    coverImage: "adrian.png",
    type: "client",
    published: true,
  },
  {
    id: "art-3",
    slug: "the-accidental-financial-advisor-career",
    title: "The Accidental Financial Advisor: How I Replaced My Corporate Burnout",
    excerpt: "I was working 60 hours a week in a high-stress corporate job with zero control over my schedule. Here is the exact path I used to pivot to full-time financial advisory.",
    content: `Six years ago, I was sitting in traffic on EDSA, exhausted and dreading another long day at my corporate desk. I was earning a decent salary, but I was completely burned out. I felt like a small, replaceable cog in a massive machine, with no control over my time or my earning potential.

Then, quite by accident, I entered the world of financial advisory.

Here is the unfiltered truth about what this career entails, what it pays, and who it is actually for.

### What We Actually Do (It's Not Cold Calling)
Many people think financial advisors are just glorified insurance agents who annoy their friends on social media.
*   **The Reality:** Modern financial planning is an educational, relationship-driven profession. We act as coaches. We help clients audit their debts, budget their expenses, construct emergency funds, and protect their dependents. You succeed not by "selling," but by building long-term trust and solving real structural problems.

### The Earning Potential: Uncapped vs. Fixed
In a corporate job, your raise is capped at 5% to 10% a year, regardless of how hard you work.
*   **As an Advisor:** Your income is directly tied to the impact you create. Through commissions, renewal income, and leadership overrides, successful advisors often double or triple their corporate income within their first 18 months. Moreover, the industry offers lifetime passive renewal commissions—meaning you get paid for years for a relationship you established today.

### The Ultimate Benefit: Absolute Sovereignty
The greatest reward isn't the financial bonuses or the incentive trips to Europe (though those are wonderful). It's **time freedom**.
*   You choose when you work, who you work with, and how you design your days. If you have young children, you don't need to ask permission to attend their school play or take them to the doctor.

### Is This Career for You?
This is not a get-rich-quick scheme. It is a highly professional business. It requires discipline, constant learning, and deep empathy. If you are looking for an easy, passive ride, this isn't it. But if you want to build a career where your income matches your effort and you sleep well knowing you protected a family's future, this might be your path.

We are currently recruiting prospective advisors for our mentorship program under a premier Unit Manager. Read our "Become an Advisor" page to see if you qualify.`,
    author: "Engr. Adrian Beltran, CIA",
    category: "Career & Growth",
    date: "May 30, 2026",
    readTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
    type: "advisor",
    published: true,
  },
];

export const initialFaqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "Do I really need insurance if I don't have kids or dependents?",
    answer: "Yes, but your plan should look different. If you have no dependents, you don't need a massive death benefit. Instead, your primary threat is Critical Illness (cancer, heart attack, stroke). If you get sick, you cannot work—meaning your paycheck stops, but medical bills start. A critical illness plan pays you cash directly to replace your income and pay for treatment, keeping you independent.",
    category: "insurance",
  },
  {
    id: "faq-2",
    question: "I want to start saving, but my budget is tight. Isn't insurance too expensive?",
    answer: "This is a very common concern. The honest truth is that insurance should never break your bank—if it does, it's poorly designed. We practice 'budget-first planning.' We can start a basic, high-value starter protection plan for as low as ₱50 a day (₱1,500/month). It's better to have a small, active safety net than a perfect one you can't afford to keep.",
    category: "insurance",
  },
  {
    id: "faq-3",
    question: "Why should I work with you instead of just buying a policy directly online or through my bank?",
    answer: "When you buy online or through a bank teller, you get an automated product, not a relationship. When an emergency happens, your family doesn't want to call a 1-800 hotline or talk to a chatbot. They need a human who will handle the paperwork, coordinate with the insurance company, and bring the check to their doorstep. I act as your personal advocate during your worst days, ensuring your claims are processed without hassle.",
    category: "insurance",
  },
  {
    id: "faq-4",
    question: "Is financial advisory commission-based? How do I know you won't just sell me the most expensive plan?",
    answer: "Yes, I am compensated via commissions by the insurance provider, not by you. To ensure absolute honesty, I always present 3 customized options during our proposal: a Starter plan, a Recommended plan, and a Premium plan. I explain the exact trade-offs of each. My business relies entirely on long-term client referrals—if I oversell you a plan that you end up lapsing because it's too expensive, I lose your trust and my business dies. Your financial safety is my business security.",
    category: "general",
  },
  {
    id: "faq-5",
    question: "Can I become a financial advisor part-time while keeping my full-time corporate job?",
    answer: "Absolutely! Over 70% of our most successful advisors started part-time. We have structured weekend and evening training sessions. This allows you to learn the systems, acquire your licensing, and build your initial client base without risking your primary source of income. Once your passive renewal commissions and active commission stream match your corporate salary, you can make the decision to go full-time.",
    category: "career",
  },
  {
    id: "faq-6",
    question: "What are the licensing requirements to become a financial advisor in the Philippines?",
    answer: "To practice legally, you must pass the licensing examinations administered by the Insurance Commission of the Philippines (Traditional Life Insurance and Variable/VUL examinations). Don't worry about the complexity—our agency provides a comprehensive, structured pre-licensing reviewer, interactive practice exams, and handles all your physical and digital registration paperwork. We have a 95% first-time passing rate for our recruits.",
    category: "career",
  },
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Maria Santos",
    role: "Senior Nurse, United Kingdom (OFW)",
    content: "Working with Adrian completely changed how I send money home. We finally set boundaries, established my critical illness plan, and we are now building our retirement home in Cavite. No more wasted padala!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
    type: "client",
  },
  {
    id: "test-2",
    name: "John Paul Lim",
    role: "IT Specialist & Father of Two",
    content: "I always avoided insurance because of the pushy agents. Adrian was different. She calculated my exact income replacement number, showed me where I was over-spending, and set up a plan that fit my exact budget.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    type: "client",
  },
  {
    id: "test-3",
    name: "Carla Jimenez",
    role: "Former Corporate Manager, now Full-time Advisor",
    content: "Joining Adrian's advisory team was the best career decision I ever made. The mentorship under an experienced Unit Manager helped me hit my corporate income level within 10 months, and now I have total control over my mornings.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
    type: "advisor",
  },
];

export const initialLogos: PartnerLogo[] = [
  { id: "logo-1", name: "AIA Philippines", imageUrl: "AIA", visible: true },
  { id: "logo-2", name: "Million Dollar Round Table (MDRT)", imageUrl: "MDRT", visible: true },
  { id: "logo-3", name: "Insurance Commission", imageUrl: "IC", visible: true },
  { id: "logo-4", name: "Sun Life Financial", imageUrl: "SUN", visible: true },
  { id: "logo-5", name: "AXA Philippines", imageUrl: "AXA", visible: true },
  { id: "logo-6", name: "BPI-AIA", imageUrl: "BPIAIA", visible: true },
];

export const initialLeadMagnet: LeadMagnetConfig = {
  enabled: true,
  headline: "Get the Free OFW Wealth Preservation Guide",
  description: "Learn the exact 3-step boundary system to protect your overseas earnings and plan your permanent homecoming without losing family trust.",
  triggerTimeSeconds: 15,
  scrollDepthPercent: 40,
  buttonText: "Download Guide (Free)",
  assetUrl: "https://example.com/assets/ofw-guide.pdf",
};

export const initialSettings: SiteSettings = {
  agentName: "Engr. Adrian Beltran, CIA",
  agentTitle: "Unit Manager | Top Global Summit Life Insurance Agency Inc. | PRU LIFE UK & Eastspring Investments",
  agentBio: "I transitioned from engineering and internal auditing to financial wealth management because I realized that the ultimate structure we need to build and secure is our family's financial future. As a Unit Manager at Top Global Summit Life Insurance Agency representing PRU LIFE Corp. of UK & Eastspring Investments, I combine my analytical and auditing background with deep empathy to build custom, jargon-free wealth preservation plans.",
  agentPhoto: "/adrian.png",
  agentCredentials: [
    "Certified Internal Auditor (CIA) & Professional Engineer",
    "Unit Manager at Top Global Summit Life Insurance Agency Inc.",
    "Licensed under PRU LIFE Corp. of UK & Eastspring Investments",
    "8+ Years of Advisory and Risk Auditing Experience",
    "Successfully Guided Hundreds of OFW Families and Professionals",
  ],
  agencyName: "Top Global Summit Life Insurance Agency Inc.",
  heroHeadline: "Protect your income. Secure your family's future. With zero",
  heroHighlightWord: "b.s. jargon.",
  heroSubheadline: "Get honest, plain-language financial planning designed to match your real budget. Secure a multi-million safety net starting at just ₱50 a day.",
  heroCTA: "Take Free Assessment",
  trustSecuredAmount: "₱320,000,000+",
  trustClientsCount: "1,200+",
  trustYearsInBusiness: "8+",
  contactEmail: "adrian.beltran@topglobalsummit.com",
  contactPhone: "+63 917 123 4567",
  contactAddress: "Unit 1204, One Corporate Plaza, Ortigas Center, Pasig City, Metro Manila",
  calendlyUrl: "https://calendly.com/adrian-beltran/clarity-call",
  facebookUrl: "https://facebook.com/adrianbeltran.wealthmanager",
  linkedinUrl: "https://linkedin.com/in/adrianbeltran-pru",
  heroVideoUrl: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0543f24b9e3d9e37f22d1124230d605&profile_id=139&oauth2_token_id=57447761",
};

export const initialLeads: Lead[] = [
  {
    id: "lead-1",
    name: "Juan dela Cruz",
    email: "juan.delacruz@gmail.com",
    phone: "09179876543",
    status: "new",
    timestamp: "2026-06-29T14:30:00Z",
    source: "Lead Magnet",
  },
  {
    id: "lead-2",
    name: "Remedios Lopez",
    email: "remy_lopez_ofw@yahoo.com",
    phone: "+971 50 123 4567",
    status: "contacted",
    timestamp: "2026-06-28T10:15:00Z",
    source: "Free Assessment",
    quizAnswers: {
      ageGroup: "31-45",
      primaryGoal: "Secure my family & retire comfortably",
      monthlySavings: "₱5,000 - ₱10,000",
      hasDependents: "Yes, 3 or more",
      existingInsurance: "None at all",
    },
  },
];

export const initialApplicants: Applicant[] = [
  {
    id: "app-1",
    name: "Alvin Mercado",
    email: "alvin.mercado.sales@gmail.com",
    phone: "09181234567",
    status: "reviewing",
    timestamp: "2026-06-29T11:20:00Z",
    motivation: "I want to escape corporate burnout, manage my own schedule, and increase my income based on my actual effort.",
    experience: "5 years in pharmaceutical sales as medical representative",
    availability: "Part-time initially (evenings/weekends)",
    currentJob: "Medical Representative at GSK",
  },
];
