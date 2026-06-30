import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Rocket, Award, Star, ArrowRight, ShieldCheck, CheckCircle2, TrendingUp, Sparkles, BookOpen, Clock, HeartHandshake, Briefcase, Mail, Phone, FileText } from "lucide-react";
import { ViewType, SiteSettings, Testimonial } from "../types";

interface BecomeAdvisorViewProps {
  setView: (view: ViewType) => void;
  settings: SiteSettings;
  testimonials: Testimonial[];
  onAddApplicant: (applicantData: {
    name: string;
    email: string;
    phone: string;
    motivation: string;
    experience: string;
    availability: string;
    currentJob: string;
  }) => void;
}

export default function BecomeAdvisorView({
  setView,
  settings,
  testimonials,
  onAddApplicant,
}: BecomeAdvisorViewProps) {
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentJob, setCurrentJob] = useState("");
  const [experience, setExperience] = useState("");
  const [availability, setAvailability] = useState("Part-time (evenings/weekends)");
  const [motivation, setMotivation] = useState("");

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!name.trim()) errors.name = "Full name is required.";
    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Valid email is required.";
    }
    if (!phone.trim()) {
      errors.phone = "Phone number is required.";
    }
    if (!motivation.trim()) {
      errors.motivation = "Please tell us what drives you.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onAddApplicant({
      name,
      email,
      phone,
      motivation,
      experience,
      availability,
      currentJob,
    });

    setSubmitted(true);
  };

  const advisorTestimonials = testimonials.filter((t) => t.type === "advisor");

  const valueProps = [
    {
      icon: <TrendingUp className="text-amber-500 shrink-0" size={24} />,
      title: "Uncapped Earnings Potential",
      desc: "Earn through active commissions and lifetime passive renewals. Our average advisor doubles their previous corporate income within 18 months.",
    },
    {
      icon: <Clock className="text-amber-500 shrink-0" size={24} />,
      title: "Absolute Schedule Freedom",
      desc: "Choose your own working hours. Manage family and work commitments on your own terms with no time-clocks or bosses.",
    },
    {
      icon: <Award className="text-amber-500 shrink-0" size={24} />,
      title: "Strategic Leadership Mentorship",
      desc: "Learn directly from Engr. Adrian Beltran, CIA, an experienced Unit Manager. Gain access to elite systems that guarantee high performance.",
    },
    {
      icon: <BookOpen className="text-amber-500 shrink-0" size={24} />,
      title: "Full Pre-Licensing Academy",
      desc: "Don't worry about licensing. We provide reviewers, interactive practice mock exams, and process 100% of your government filings for Traditional & VUL.",
    },
  ];

  return (
    <div id="become-advisor-view" className="space-y-16 py-12 md:py-20 text-zinc-800 dark:text-zinc-200">
      {/* 1. Hero / Introduction */}
      <section id="career-hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100/80 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/40">
            <Rocket size={12} className="text-amber-600 dark:text-amber-400 fill-current" /> CAREER OPPORTUNITY · MENTORSHIP PROGRAM
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
            Build a High-Impact Career. Mentored by a{" "}
            <span className="text-amber-600 dark:text-amber-500 relative">
              Unit Manager.
              <svg className="absolute -bottom-1.5 left-0 w-full h-1.5 text-amber-200 dark:text-amber-900" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,5 Q50,10 100,5" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
            Escape corporate burnout and design a life of financial sovereignty. Join Adrian's premier wealth planning agency, unlock passive cashflows, and protect Filipino families.
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0 text-left pt-2">
            <div className="flex items-start space-x-2">
              <CheckCircle2 size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300">Uncapped active commissions</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle2 size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300">Passive residual revenues</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle2 size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300">Free licensing review modules</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle2 size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300">Global travel incentives</span>
            </div>
          </div>
        </div>

        {/* Right graphic box */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative group w-full max-w-[320px] md:max-w-[350px]">
            <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-700 opacity-20 group-hover:opacity-30 blur-sm" />
            <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-inner">
                  <Sparkles size={20} className="fill-current" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-50 leading-tight">Engr. Adrian Beltran, CIA</h3>
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">Agency Mentor</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-150 dark:border-zinc-800 text-[11px] leading-relaxed">
                  "Real financial planning isn't just about selling policies—it's about building long-term, high-trust careers where your income matches your impact."
                </div>
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-150 dark:border-zinc-800 text-[11px] leading-relaxed">
                  🛡️ <strong>Agency Passing Rate:</strong> Our pre-licensing reviewers ensure a <strong>95% first-time passing rate</strong> for التقليدية Conventional and VUL exams.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Value Proposition Grid */}
      <section id="career-value-props" className="bg-zinc-50 dark:bg-zinc-900/50 border-y border-zinc-150 dark:border-zinc-800/80 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Why Join Adrian's Team?
            </h2>
            <p className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
              Uncapped Career Sovereignty
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Other agencies leave you with a phone list and a booklet. Adrian provides structured pre-licensing training and elite coaching designed to secure career milestone targets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {valueProps.map((prop, i) => (
              <div
                key={i}
                className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 p-6 rounded-2xl shadow-sm flex items-start space-x-4"
              >
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-amber-600 dark:text-amber-400 shrink-0">
                  {prop.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm md:text-base text-zinc-900 dark:text-zinc-50 tracking-tight">
                    {prop.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {prop.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Advisor Testimonials */}
      {advisorTestimonials.length > 0 && (
        <section id="advisor-testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Advisor Testimonials
            </h2>
            <p className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
              Stories From Our Mentored Advisors
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Read how former corporate professionals, bankers, and medical representatives shifted to full-time financial advisory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {advisorTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 p-6 rounded-2xl shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-current text-amber-500 shrink-0" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-5 mt-5 border-t border-zinc-100 dark:border-zinc-800">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-50 leading-tight">
                      {testimonial.name}
                    </h4>
                    <p className="text-[10px] text-zinc-400 font-semibold">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Mini-Quiz / Application Intake Form */}
      <section id="recruitment-form-section" className="max-w-3xl mx-auto px-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="apply-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-inner">
                    <Rocket size={24} className="stroke-[2.5]" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                    Apply for Adrian's Mentorship Program
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
                    Take the first step. Fill out our qualifying application form below, and Adrian will reach out personally inside 48 hours for a quick Zoom interview.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="recruit-name" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                        Full Name
                      </label>
                      <div className="relative">
                        <FileText size={16} className="absolute left-3.5 top-3.5 text-zinc-400" />
                        <input
                          type="text"
                          id="recruit-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Adrian Beltran"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                            formErrors.name ? "border-red-500 focus:ring-red-500" : "border-zinc-200 dark:border-zinc-700"
                          }`}
                        />
                      </div>
                      {formErrors.name && <p className="text-xs text-red-500 font-semibold mt-1">{formErrors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="recruit-email" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-3.5 text-zinc-400" />
                        <input
                          type="email"
                          id="recruit-email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="faith.roxas@example.com"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                            formErrors.email ? "border-red-500" : "border-zinc-200 dark:border-zinc-700"
                          }`}
                        />
                      </div>
                      {formErrors.email && <p className="text-xs text-red-500 font-semibold mt-1">{formErrors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="recruit-phone" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                        Phone / Mobile Number
                      </label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3.5 top-3.5 text-zinc-400" />
                        <input
                          type="tel"
                          id="recruit-phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="09171234567"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                            formErrors.phone ? "border-red-500" : "border-zinc-200 dark:border-zinc-700"
                          }`}
                        />
                      </div>
                      {formErrors.phone && <p className="text-xs text-red-500 font-semibold mt-1">{formErrors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="recruit-job" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                        Current Employment / Role
                      </label>
                      <div className="relative">
                        <Briefcase size={16} className="absolute left-3.5 top-3.5 text-zinc-400" />
                        <input
                          type="text"
                          id="recruit-job"
                          value={currentJob}
                          onChange={(e) => setCurrentJob(e.target.value)}
                          placeholder="Corporate Manager / Sales Rep"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-medium bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="recruit-availability" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                        Target Availability
                      </label>
                      <select
                        id="recruit-availability"
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-semibold bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option>Part-time (evenings/weekends)</option>
                        <option>Full-time transition inside 3 months</option>
                        <option>Full-time transition immediately</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="recruit-experience" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                        Prior Sales or Advisory Experience?
                      </label>
                      <input
                        type="text"
                        id="recruit-experience"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        placeholder="None, but willing to learn!"
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-medium bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="recruit-motivation" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                      What drives you to become a Financial Planner?
                    </label>
                    <textarea
                      id="recruit-motivation"
                      rows={3}
                      value={motivation}
                      onChange={(e) => setMotivation(e.target.value)}
                      placeholder="I want more schedule freedom and uncapped income to provide better for my family..."
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                        formErrors.motivation ? "border-red-500 focus:ring-red-500" : "border-zinc-200 dark:border-zinc-700"
                      }`}
                    />
                    {formErrors.motivation && <p className="text-xs text-red-500 font-semibold mt-1">{formErrors.motivation}</p>}
                  </div>

                  <button
                    type="submit"
                    id="submit-qualification"
                    className="w-full inline-flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl text-sm font-bold text-zinc-900 bg-amber-400 hover:bg-amber-500 hover:shadow-lg shadow-amber-400/25 transition-all active:scale-95 cursor-pointer mt-4"
                  >
                    <Rocket size={16} />
                    <span>See If I Qualify today</span>
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="apply-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6 max-w-md mx-auto"
              >
                <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
                  <HeartHandshake size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                    Application Received, {name.split(" ")[0]}!
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Thank you for applying. We have registered your application in Engr. Adrian Beltran's mentorship candidate pool. Adrian or our recruiting coordinator will evaluate your details and schedule an interview within 48 hours.
                  </p>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-150 dark:border-zinc-800 rounded-2xl p-4 text-xs font-semibold text-zinc-600 dark:text-zinc-400 text-left space-y-1.5">
                  <p>📝 <strong>Candidate:</strong> {name}</p>
                  <p>📧 <strong>Email:</strong> {email}</p>
                  <p>🕒 <strong>Availability:</strong> {availability}</p>
                  <p>💬 <strong>Status:</strong> Under Review (adrian.beltran@topglobalsummit.com)</p>
                </div>

                <button
                  type="button"
                  id="return-home-career"
                  onClick={() => setView(ViewType.Home)}
                  className="inline-flex items-center space-x-1.5 px-6 py-3 rounded-full text-sm font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-amber-200 dark:border-amber-800 transition-all cursor-pointer"
                >
                  <span>Return to Homepage</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
