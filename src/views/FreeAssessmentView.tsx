import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, ArrowRight, ArrowLeft, Calendar, Clock, Video, CheckCircle, AlertTriangle, Sparkles, User, Mail, Phone } from "lucide-react";
import { ViewType, SiteSettings } from "../types";

interface FreeAssessmentViewProps {
  setView: (view: ViewType) => void;
  settings: SiteSettings;
  onAddLead: (leadData: {
    name: string;
    email: string;
    phone: string;
    source: string;
    quizAnswers: {
      ageGroup: string;
      primaryGoal: string;
      monthlySavings: string;
      hasDependents: string;
      existingInsurance: string;
    };
  }) => void;
}

export default function FreeAssessmentView({ setView, settings, onAddLead }: FreeAssessmentViewProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Quiz Answers State
  const [ageGroup, setAgeGroup] = useState("");
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [monthlySavings, setMonthlySavings] = useState("");
  const [hasDependents, setHasDependents] = useState("");
  const [existingInsurance, setExistingInsurance] = useState("");

  // Contact Info State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Booking Scheduler State
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const quizOptions = {
    ageGroup: ["Under 25", "25 - 30", "31 - 45", "46 - 60", "Over 60"],
    primaryGoal: [
      "Protect my family's survival if I'm gone",
      "Cover high-cost Critical Illness / Medical bills",
      "Fund my children's college education",
      "Build a retirement fund / OFW home return",
      "Grow my savings with passive funds",
    ],
    monthlySavings: ["Under ₱1,500/mo (₱50/day)", "₱1,500 - ₱3,000/mo (₱100/day)", "₱3,000 - ₱5,000/mo (₱160/day)", "₱5,000 - ₱10,000/mo", "Over ₱10,000/mo"],
    hasDependents: ["Yes, children under 18", "Yes, aging parents or siblings", "No, just myself & spouse", "No, single with no dependents"],
    existingInsurance: ["None at all - fully unprotected", "Company HMO only (maxes out around ₱150k)", "I have a small plan, but not sure what it covers", "Fully covered with active term or VUL policies"],
  };

  const handleNextQuiz = () => {
    if (!ageGroup || !primaryGoal || !monthlySavings || !hasDependents || !existingInsurance) {
      alert("Please answer all questions to calculate your readiness gap accurately.");
      return;
    }
    setStep(2);
  };

  const validateContact = () => {
    const errors: { [key: string]: string } = {};
    if (!firstName.trim()) errors.firstName = "First name is required.";
    if (!lastName.trim()) errors.lastName = "Last name is required.";
    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Valid email is required.";
    }
    if (!phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!/^[0-9+\-\s]{10,15}$/.test(phone)) {
      errors.phone = "Provide a valid phone number (e.g. 09171234567).";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContact()) return;

    // Save lead
    onAddLead({
      name: `${firstName} ${lastName}`,
      email,
      phone,
      source: "Free Assessment Funnel",
      quizAnswers: {
        ageGroup,
        primaryGoal,
        monthlySavings,
        hasDependents,
        existingInsurance,
      },
    });

    setStep(3);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert("Please pick a convenient date and time.");
      return;
    }
    setBookingConfirmed(true);
  };

  // Basic diagnostic calculations based on answers
  const isHighRisk =
    existingInsurance.includes("None at all") ||
    existingInsurance.includes("Company HMO only");

  const isOFWFocused =
    primaryGoal.includes("OFW") || primaryGoal.includes("retirement");

  const displayGapReportTeaser = () => {
    return (
      <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/40 dark:border-amber-900/40 rounded-2xl p-5 space-y-3.5">
        <div className="flex items-center space-x-2.5 text-amber-800 dark:text-amber-400">
          <AlertTriangle size={20} className="shrink-0" />
          <h4 className="font-extrabold text-sm uppercase tracking-wide">Emergency Gap Diagnosed</h4>
        </div>
        <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 space-y-2 leading-relaxed">
          {isHighRisk && (
            <p>
              ⚠️ <strong>Critical Coverage Gap:</strong> Your current insurance is listed as '{existingInsurance}'. A serious diagnosis (like cancer, stroke, or heart attack) could exhaust your savings inside 3 months.
            </p>
          )}
          {isOFWFocused && (
            <p>
              🌍 <strong>OFW Financial Loop Hole:</strong> Your savings goal requires structured, non-liquid protection so remittance isn't fully drained by consumables back home.
            </p>
          )}
          <p>
            🛡️ <strong>Recommended Protection Level:</strong> Based on savings capacity of <strong>{monthlySavings}</strong>, we can design a customized contract securing <strong>₱1,500,000 to ₱3,000,000</strong> in cash benefits without stressing your lifestyle.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div id="free-assessment-view" className="max-w-4xl mx-auto px-4 py-12 md:py-16 space-y-10 min-h-[70vh]">
      {/* Header and Step Indicators */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/50">
          <Sparkles size={11} className="fill-current text-emerald-600" /> JARGON-FREE ANALYSIS
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
          Financial Readiness Assessment
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Discover your exact coverage gaps and let's calculate a protection plan that matches your real budget.
        </p>

        {/* Step progress pills */}
        <div className="flex items-center justify-center space-x-3 pt-4">
          <div className="flex items-center space-x-1.5">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step >= 1 ? "bg-emerald-700 dark:bg-emerald-600 text-white" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"
              }`}
            >
              1
            </span>
            <span className={`text-xs font-bold ${step === 1 ? "text-emerald-700 dark:text-emerald-400" : "text-zinc-400"}`}>
              Audits
            </span>
          </div>
          <div className="w-8 h-0.5 bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex items-center space-x-1.5">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step >= 2 ? "bg-emerald-700 dark:bg-emerald-600 text-white" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"
              }`}
            >
              2
            </span>
            <span className={`text-xs font-bold ${step === 2 ? "text-emerald-700 dark:text-emerald-400" : "text-zinc-400"}`}>
              Clarity Lead
            </span>
          </div>
          <div className="w-8 h-0.5 bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex items-center space-x-1.5">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step >= 3 ? "bg-emerald-700 dark:bg-emerald-600 text-white" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"
              }`}
            >
              3
            </span>
            <span className={`text-xs font-bold ${step === 3 ? "text-emerald-700 dark:text-emerald-400" : "text-zinc-400"}`}>
              Schedule Call
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Gap Questionnaire */}
        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8"
          >
            <div className="space-y-6">
              {/* Question 1 */}
              <div id="quiz-question-age" className="space-y-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  1. What is your age group? (Calculates insurance cost bracket)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {quizOptions.ageGroup.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setAgeGroup(opt)}
                      className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        ageGroup === opt
                          ? "bg-emerald-700 text-white border-emerald-700 dark:bg-emerald-600 dark:border-emerald-600"
                          : "bg-zinc-50 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-emerald-500"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div id="quiz-question-goal" className="space-y-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  2. What is your primary financial goal? (Structures rider selections)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {quizOptions.primaryGoal.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setPrimaryGoal(opt)}
                      className={`p-3.5 rounded-xl text-xs sm:text-sm font-bold border text-left transition-all cursor-pointer ${
                        primaryGoal === opt
                          ? "bg-emerald-700 text-white border-emerald-700 dark:bg-emerald-600 dark:border-emerald-600"
                          : "bg-zinc-50 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-emerald-500"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div id="quiz-question-savings" className="space-y-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  3. How much are you comfortably able to save per month? (Limits proposal size)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {quizOptions.monthlySavings.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setMonthlySavings(opt)}
                      className={`p-3 rounded-xl text-xs font-bold border text-left transition-all cursor-pointer ${
                        monthlySavings === opt
                          ? "bg-emerald-700 text-white border-emerald-700 dark:bg-emerald-600 dark:border-emerald-600"
                          : "bg-zinc-50 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-emerald-500"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 4 */}
              <div id="quiz-question-dependents" className="space-y-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  4. Do you have children or other family dependents? (Triggers income backup necessity)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {quizOptions.hasDependents.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setHasDependents(opt)}
                      className={`p-3.5 rounded-xl text-xs sm:text-sm font-bold border text-left transition-all cursor-pointer ${
                        hasDependents === opt
                          ? "bg-emerald-700 text-white border-emerald-700 dark:bg-emerald-600 dark:border-emerald-600"
                          : "bg-zinc-50 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-emerald-500"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 5 */}
              <div id="quiz-question-insurance" className="space-y-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  5. What is your current life or health insurance coverage? (Identifies protection gaps)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {quizOptions.existingInsurance.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setExistingInsurance(opt)}
                      className={`p-3.5 rounded-xl text-xs sm:text-sm font-bold border text-left transition-all cursor-pointer ${
                        existingInsurance === opt
                          ? "bg-emerald-700 text-white border-emerald-700 dark:bg-emerald-600 dark:border-emerald-600"
                          : "bg-zinc-50 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-emerald-500"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
              <button
                id="quiz-submit-step1"
                onClick={handleNextQuiz}
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Calculate My Readiness Gap</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Contact Details Gated Form */}
        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-lg font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                Unlock Your Personal Readiness Gap Report
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                We've evaluated your answers. Provide your direct contact details below so Adrian can pre-populate your Gap Analysis Report prior to scheduling a Clarity Call. No spam, ever.
              </p>
            </div>

            {/* Display Teaser Calculations */}
            {displayGapReportTeaser()}

            <form onSubmit={handleContactSubmit} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quiz-first-name" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                    First Name
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-3.5 text-zinc-400" />
                    <input
                      type="text"
                      id="quiz-first-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Adrian"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                        formErrors.firstName ? "border-red-500" : "border-zinc-200 dark:border-zinc-700"
                      }`}
                    />
                  </div>
                  {formErrors.firstName && <p className="text-xs text-red-500 font-semibold mt-1">{formErrors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="quiz-last-name" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                    Last Name
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-3.5 text-zinc-400" />
                    <input
                      type="text"
                      id="quiz-last-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Beltran"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                        formErrors.lastName ? "border-red-500" : "border-zinc-200 dark:border-zinc-700"
                      }`}
                    />
                  </div>
                  {formErrors.lastName && <p className="text-xs text-red-500 font-semibold mt-1">{formErrors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quiz-email" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-3.5 text-zinc-400" />
                    <input
                      type="email"
                      id="quiz-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="faith.roxas@example.com"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                        formErrors.email ? "border-red-500" : "border-zinc-200 dark:border-zinc-700"
                      }`}
                    />
                  </div>
                  {formErrors.email && <p className="text-xs text-red-500 font-semibold mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <label htmlFor="quiz-phone" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-3.5 text-zinc-400" />
                    <input
                      type="tel"
                      id="quiz-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="09171234567"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                        formErrors.phone ? "border-red-500" : "border-zinc-200 dark:border-zinc-700"
                      }`}
                    />
                  </div>
                  {formErrors.phone && <p className="text-xs text-red-500 font-semibold mt-1">{formErrors.phone}</p>}
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-between gap-4">
                <button
                  type="button"
                  id="quiz-back-step1"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center space-x-1 px-5 py-3 rounded-full text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 transition-all cursor-pointer"
                >
                  <ArrowLeft size={14} />
                  <span>Back to Audits</span>
                </button>

                <button
                  type="submit"
                  id="quiz-submit-step2"
                  className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <span>Submit & Save Results</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Step 3: Interactive Call Scheduler */}
        {step === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8"
          >
            {!bookingConfirmed ? (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                    <ShieldCheck size={24} />
                  </div>
                  <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                    Assessment Complete! Schedule Your Clarity Call
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
                    We've saved your questionnaire responses! Pick a convenient 15-minute slot below to connect with Engr. Adrian Beltran, CIA and receive your fully detailed Gap Report via PDF.
                  </p>
                </div>

                {/* Meeting Details Card */}
                <div className="bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl p-5 border border-zinc-100 dark:border-zinc-800 max-w-md mx-auto grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <Clock size={16} className="text-emerald-600 dark:text-emerald-400 mx-auto" />
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Duration</p>
                    <p className="text-xs font-bold text-zinc-700 dark:text-zinc-200">15 Mins</p>
                  </div>
                  <div className="space-y-1">
                    <Video size={16} className="text-emerald-600 dark:text-emerald-400 mx-auto" />
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Medium</p>
                    <p className="text-xs font-bold text-zinc-700 dark:text-zinc-200">Zoom / Call</p>
                  </div>
                  <div className="space-y-1">
                    <ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-400 mx-auto" />
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Price</p>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">100% Free</p>
                  </div>
                </div>

                {/* Scheduler Form Mockup */}
                <form onSubmit={handleBookingSubmit} className="max-w-md mx-auto space-y-4 pt-2">
                  <div>
                    <label htmlFor="booking-date" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                      1. Pick Date
                    </label>
                    <input
                      type="date"
                      id="booking-date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-semibold bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                      2. Pick Best Time Slot (Manila Standard Time)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {["09:00 AM", "10:30 AM", "01:30 PM", "03:00 PM", "04:30 PM", "07:00 PM"].map((timeSlot) => (
                        <button
                          key={timeSlot}
                          type="button"
                          onClick={() => setSelectedTime(timeSlot)}
                          className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            selectedTime === timeSlot
                              ? "bg-emerald-700 text-white border-emerald-700 dark:bg-emerald-600 dark:border-emerald-600"
                              : "bg-zinc-50 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-emerald-500"
                          }`}
                        >
                          {timeSlot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    id="submit-booking"
                    className="w-full inline-flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all shadow-md active:scale-95 cursor-pointer mt-4"
                  >
                    <Calendar size={16} />
                    <span>Secure My Clarity Slot</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-8 space-y-6 max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle size={32} className="animate-bounce" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                    Clarity Call Secured!
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Amazing! Your calendar slot is booked for <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong>. We have sent a calendar invite with Zoom coordinates to your email at <strong>{email}</strong>.
                  </p>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-150 dark:border-zinc-800 rounded-2xl p-4 text-xs font-semibold text-zinc-600 dark:text-zinc-400 text-left space-y-1.5">
                  <p>🗓️ <strong>Event:</strong> Engr. Adrian Beltran 1-on-1 Clarity Call</p>
                  <p>🕒 <strong>Time:</strong> {selectedDate} @ {selectedTime}</p>
                  <p>📍 <strong>Coordinates:</strong> Zoom link enclosed in email</p>
                  <p>💡 <strong>Note:</strong> Adrian will call your phone directly if Zoom is unreachable.</p>
                </div>

                <button
                  type="button"
                  id="booking-return-home"
                  onClick={() => setView(ViewType.Home)}
                  className="inline-flex items-center space-x-1.5 px-6 py-3 rounded-full text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 transition-all cursor-pointer"
                >
                  <span>Return to Homepage</span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
