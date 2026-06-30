import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, Video, Calendar, Sparkles } from "lucide-react";
import { ViewType, SiteSettings } from "../types";

interface ContactViewProps {
  setView: (view: ViewType) => void;
  settings: SiteSettings;
  onAddLead: (leadData: { name: string; email: string; phone: string; source: string }) => void;
}

export default function ContactView({ setView, settings, onAddLead }: ContactViewProps) {
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
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
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onAddLead({
      name: `${firstName} ${lastName}`,
      email,
      phone,
      source: `Contact Us: ${message.slice(0, 50)}...`,
    });

    setSubmitted(true);
  };

  return (
    <div id="contact-view" className="max-w-6xl mx-auto px-4 py-12 md:py-20 space-y-12">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/50">
          <Sparkles size={11} className="fill-current text-emerald-600" /> PERSONAL ADVOCATE COORDINATES
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
          Let's Start a Conversation
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Have a general question, claim inquiry, or want to explore our planning products? Fill out the form below or pick a slot directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Coordinates */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Direct Contact Channels
            </h3>

            <ul className="space-y-5 text-sm">
              <li className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
                  <Mail size={18} />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] uppercase font-bold text-zinc-400">Email Address</p>
                  <a href={`mailto:${settings.contactEmail}`} className="font-semibold text-zinc-800 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 break-all transition-colors">
                    {settings.contactEmail}
                  </a>
                </div>
              </li>

              <li className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
                  <Phone size={18} />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] uppercase font-bold text-zinc-400">Mobile / WhatsApp</p>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {settings.contactPhone}
                  </span>
                </div>
              </li>

              <li className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
                  <MapPin size={18} />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] uppercase font-bold text-zinc-400">Agency Office Address</p>
                  <p className="font-semibold text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {settings.contactAddress}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick audit guarantee card */}
          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 rounded-3xl p-6 space-y-3">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-50 text-sm flex items-center gap-1.5">
              🛡️ Adrian's Personal Guarantee
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              We return all contact and claim inquiries inside 24 business hours. No automated robotic loops, no ticketing systems. Just direct, honest replies.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Direct Message Intake Form */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 p-6 sm:p-10 rounded-3xl shadow-lg space-y-6">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <div className="space-y-1">
                    <h3 className="font-black text-lg text-zinc-900 dark:text-zinc-50 tracking-tight">
                      Send a Direct Message
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Submit your general inquiry below.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-first-name" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="contact-first-name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Adrian"
                          className={`w-full px-4 py-3 rounded-xl border text-sm font-medium bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                            formErrors.firstName ? "border-red-500" : "border-zinc-200 dark:border-zinc-700"
                          }`}
                        />
                        {formErrors.firstName && <p className="text-xs text-red-500 font-semibold mt-1">{formErrors.firstName}</p>}
                      </div>

                      <div>
                        <label htmlFor="contact-last-name" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="contact-last-name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Beltran"
                          className={`w-full px-4 py-3 rounded-xl border text-sm font-medium bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                            formErrors.lastName ? "border-red-500" : "border-zinc-200 dark:border-zinc-700"
                          }`}
                        />
                        {formErrors.lastName && <p className="text-xs text-red-500 font-semibold mt-1">{formErrors.lastName}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="faith@example.com"
                          className={`w-full px-4 py-3 rounded-xl border text-sm font-medium bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                            formErrors.email ? "border-red-500" : "border-zinc-200 dark:border-zinc-700"
                          }`}
                        />
                        {formErrors.email && <p className="text-xs text-red-500 font-semibold mt-1">{formErrors.email}</p>}
                      </div>

                      <div>
                        <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                          Phone / Mobile
                        </label>
                        <input
                          type="tel"
                          id="contact-phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="09171234567"
                          className={`w-full px-4 py-3 rounded-xl border text-sm font-medium bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                            formErrors.phone ? "border-red-500" : "border-zinc-200 dark:border-zinc-700"
                          }`}
                        />
                        {formErrors.phone && <p className="text-xs text-red-500 font-semibold mt-1">{formErrors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                        Your Inquiry or Message
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="I would like to receive some traditional term insurance rates for my parents..."
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm font-medium text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      id="submit-contact"
                      className="w-full inline-flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all shadow-md active:scale-95 cursor-pointer mt-2"
                    >
                      <Send size={16} />
                      <span>Send Direct Message</span>
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-6 max-w-sm mx-auto"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle size={32} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                      Message Dispatched!
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                      Thank you for reaching out, {firstName}! We have successfully logged your inquiry. Adrian Beltran or our coordinator will follow up directly at <strong>{email}</strong> within 24 business hours.
                    </p>
                  </div>
                  <button
                    type="button"
                    id="contact-success-assess"
                    onClick={() => setView(ViewType.FreeAssessment)}
                    className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all cursor-pointer shadow-md"
                  >
                    Start Free Assessment Instead
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
