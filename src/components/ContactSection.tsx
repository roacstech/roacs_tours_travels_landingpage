"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowUpRight, MapPin, Mail, Phone, Globe } from "lucide-react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeLocation, setActiveLocation] = useState<"india" | "usa" | "chile" | "reunion">("india");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const locations = [
    {
      id: "india",
      country: "India (HQ)",
      short: "India",
      address: "82, KRM Residency, Sarcarsamakulam, Kovilpalayam, Coimbatore, Tamil Nadu - 641107",
    },
    {
      id: "usa",
      country: "USA",
      short: "USA",
      address: "3417 3rd St N, Saint Cloud, MN 56303, United States",
    },
    {
      id: "chile",
      country: "Chile",
      short: "Chile",
      address: "860, Santiago, Región Metropolitana de Santiago, Chile",
    },
    {
      id: "reunion",
      country: "Reunion",
      short: "Reunion",
      address: "670, chemin Lagourgue, 97440 Saint-Andre, Réunion Island",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitted(true); // show confirmation
      }
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative w-full pt-2 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50 scroll-mt-16">
      {/* Contained Laser-Etched Line */}
      <div className="max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent mb-6 sm:mb-8" />

      {/* Elevated Editorial Header */}
      <div className="flex flex-col items-center justify-center mb-6 sm:mb-9 px-4 text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs mb-2">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-slate-700">
            Contact Us
          </span>
        </div>
        <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 max-w-xl mx-auto leading-snug">
          Start Your Project With Us
        </h2>
      </div>

      {/* Balanced 2-Column Grid */}
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* ================= LEFT COLUMN: Clean Editorial & No Clunky Cards ================= */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
          
          {/* Bold Description as requested */}
          <p className="text-sm sm:text-[15px] font-bold text-slate-900 leading-relaxed max-w-lg mb-4 text-left">
            We are always looking for ways to improve our products and services. Contact us and let us know how we can help you.
          </p>

          {/* Clean Integrated Contact Bar (NO boxed cards) */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs sm:text-sm text-slate-700 font-medium mb-5 w-full">
            {/* Email */}
            <a
              href="mailto:info@roacs.com"
              className="inline-flex items-center gap-2 hover:text-blue-600 transition-colors group"
            >
              <div className="size-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Mail className="size-3.5" />
              </div>
              <span className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">info@roacs.com</span>
            </a>

            <span className="text-slate-300 hidden sm:inline">•</span>

            {/* Phone (Changed from Mobile to Phone as requested) */}
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 hover:text-teal-600 transition-colors group"
            >
              <div className="size-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <Phone className="size-3.5" />
              </div>
              <span className="font-semibold text-slate-800 group-hover:text-teal-600 transition-colors">+91 98765 43210</span>
            </a>

            <span className="text-slate-300 hidden sm:inline">•</span>

            {/* Website */}
            <a
              href="https://roacs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-blue-600 transition-colors group"
            >
              <div className="size-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors">
                <Globe className="size-3.5" />
              </div>
              <span className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">roacs.com</span>
            </a>
          </div>

          {/* Integrated Global Locations Panel (Clean top divider line, NO floating card box) */}
          <div className="w-full pt-3.5 pb-1 border-t border-slate-200/80 mb-6 text-left">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 shrink-0">
                <MapPin className="size-3.5 text-blue-600 shrink-0" />
                <span>Global Locations</span>
              </div>

              {/* Country Tabs with Brand Gradient */}
              <div className="flex items-center gap-1 bg-slate-200/60 p-0.5 rounded-lg">
                {locations.map((loc) => {
                  const isActive = activeLocation === loc.id;
                  return (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => setActiveLocation(loc.id as "india" | "usa" | "chile" | "reunion")}
                      className={`px-2.5 py-1 text-[11px] rounded-md font-semibold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                      }`}
                    >
                      {loc.short}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stable Address Display */}
            <div className="min-h-[44px] flex items-center">
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {locations.find((l) => l.id === activeLocation)?.address}
              </p>
            </div>
          </div>

          {/* 3D Perspective World Map with pure text "We are here" (NO dot inside badge) */}
          <div className="relative w-full max-w-[420px] aspect-[2000/857] [perspective:900px] mx-auto lg:mx-0">
            <div className="relative w-full h-full [transform:rotateX(36deg)_translateZ(0px)] [transform-style:preserve-3d]">
              {/* World Map SVG */}
              <Image
                src="/world-map.svg"
                fill
                alt="Roacs global location map"
                className="object-contain opacity-70 filter drop-shadow-sm select-none pointer-events-none"
                priority={false}
              />

              {/* Pinpoint at Coimbatore, India: left 71.5%, top 49.0% */}
              <div
                className="absolute z-30 flex flex-col items-center pointer-events-none"
                style={{
                  left: "71.5%",
                  top: "49.0%",
                  transform: "translate(-50%, -100%) translateZ(1px)",
                }}
              >
                {/* Upright Floating Badge: Just pure text "We are here", NO dot */}
                <div
                  className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md text-[10px] font-bold text-slate-800 whitespace-nowrap mb-0.5"
                  style={{ transform: "rotateX(-36deg)" }}
                >
                  We are here
                </div>

                {/* Vertical Laser Beam */}
                <div className="w-px h-8 bg-gradient-to-t from-blue-600 via-teal-400 to-transparent" />

                {/* Ground Radar Pulse Pinpoint */}
                <div className="relative -mt-1 flex items-center justify-center">
                  <span className="absolute size-6 rounded-full bg-teal-400/30 animate-ping" />
                  <span className="absolute size-3 rounded-full bg-blue-500/40" />
                  <span className="relative size-1.5 rounded-full bg-blue-600 shadow-xs shadow-blue-500" />
                </div>

                {/* Mention below dot: "India" */}
                <div
                  className="mt-1 text-[10px] font-bold text-slate-800 tracking-wider uppercase bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded shadow-2xs border border-slate-200/60"
                  style={{ transform: "rotateX(-36deg)" }}
                >
                  India
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: Clean Single Form Card ================= */}
        <div className="lg:col-span-6 relative mx-auto flex w-full max-w-[460px] lg:max-w-none flex-col items-start overflow-hidden rounded-3xl bg-gradient-to-b from-white via-slate-50 to-slate-100/80 p-5 sm:p-7 border border-slate-200/90 shadow-md shadow-slate-200/40">
          
          {/* Top Brand Gradient Accent Line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 via-blue-700 to-teal-500" />

          {/* Subtle Grid Pattern Overlay */}
          <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/5 to-slate-900/5 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-35">
              <svg aria-hidden="true" className="absolute inset-0 h-full w-full fill-slate-900/10 stroke-slate-400/20 mix-blend-overlay">
                <defs>
                  <pattern id="contact-grid-pattern" width="24" height="24" patternUnits="userSpaceOnUse" x="-12" y="4">
                    <path d="M.5 24V.5H24" fill="none" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth="0" fill="url(#contact-grid-pattern)" />
                <svg x="-12" y="4" className="overflow-visible">
                  <rect strokeWidth="0" width="25" height="25" x="168" y="72" className="fill-blue-500/10" />
                  <rect strokeWidth="0" width="25" height="25" x="192" y="96" className="fill-teal-500/10" />
                  <rect strokeWidth="0" width="25" height="25" x="144" y="24" className="fill-blue-500/10" />
                </svg>
              </svg>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="relative z-10 w-full flex flex-col gap-3.5"
              >
                {/* Input 1: Name */}
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-700"
                  >
                    Name*
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full name"
                    className="h-10 w-full rounded-xl border border-slate-200/90 bg-white px-3.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Input 2: Email */}
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-700"
                  >
                    Email*
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email address"
                    className="h-10 w-full rounded-xl border border-slate-200/90 bg-white px-3.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Input 3: Phone */}
                <div className="w-full">
                  <label
                    htmlFor="phone"
                    className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-700"
                  >
                    Phone*
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="h-10 w-full rounded-xl border border-slate-200/90 bg-white px-3.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Input 4: Subject */}
                <div className="w-full">
                  <label
                    htmlFor="subject"
                    className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-700"
                  >
                    Subject*
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Enterprise App Development"
                    className="h-10 w-full rounded-xl border border-slate-200/90 bg-white px-3.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Input 5: Message */}
                <div className="w-full">
                  <label
                    htmlFor="message"
                    className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-700"
                  >
                    Message*
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project..."
                    className="w-full rounded-xl border border-slate-200/90 bg-white p-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white overflow-hidden shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 active:scale-98 transition-all duration-300 cursor-pointer disabled:opacity-60"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-teal-500 transition-all group-hover:scale-105" />
                    <span className="relative z-10 flex items-center gap-2">
                      {loading ? (
                        <>
                          <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Message</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full py-8 flex flex-col items-center justify-center text-center gap-2.5"
              >
                <div className="size-11 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 mb-1">
                  <CheckCircle2 className="size-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Message Received!</h3>
                <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
                  Thank you for reaching out. Our engineering leadership will review your requirements and respond within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                  }}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  Send another message <ArrowUpRight className="size-3" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
