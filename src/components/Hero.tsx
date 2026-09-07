"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Rocket, Smartphone, Settings, Headset, CheckCircle2, Loader2, Clock, Mail, RotateCcw } from "lucide-react";

const TRAVEL_CATEGORIES = [
  "Tours & Travels",
  "Travel Agency",
  "Tour Operator",
  "Holiday Packages",
  "Destination Booking",
  "Adventure Travel",
];

const FEATURE_ITEMS = [
  {
    id: "launch",
    icon: Rocket,
    label: "Launch in 72 Hrs",
    gradient: "from-[#fe2c6a] to-[#f43f5e]",
    shadow: "shadow-pink-500/25",
  },
  {
    id: "mobile",
    icon: Smartphone,
    label: "Mobile & SEO Ready",
    gradient: "from-[#10b981] to-[#059669]",
    shadow: "shadow-emerald-500/25",
  },
  {
    id: "manage",
    icon: Settings,
    label: "Easy to Manage",
    gradient: "from-[#6366f1] to-[#4f46e5]",
    shadow: "shadow-indigo-500/25",
  },
  {
    id: "support",
    icon: Headset,
    label: "Unlimited Support",
    gradient: "from-[#f97316] to-[#ea580c]",
    shadow: "shadow-orange-500/25",
  },
];

function AnimatedFeatureIcon({
  idx,
  active,
  item,
}: {
  idx: number;
  active: boolean;
  item: typeof FEATURE_ITEMS[0];
}) {
  const Icon = item.icon;

  return (
    <div className="relative shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
      {/* Gentle, contained radiating pulse that stays well within bounds */}
      {active && (
        <motion.span
          initial={{ scale: 0.95, opacity: 0.5 }}
          animate={{ scale: 1.25, opacity: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          className={`absolute inset-0.5 rounded-full bg-gradient-to-br ${item.gradient} pointer-events-none`}
        />
      )}

      {/* Main Gradient Icon Circle */}
      <div
        className={`relative z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-sm ${item.shadow} transition-transform duration-300 ${
          active ? "scale-105" : "group-hover:scale-105"
        }`}
      >
        {idx === 0 && (
          <motion.div
            animate={
              active
                ? { y: [0, -3, 0], rotate: [0, -4, 0] }
                : { y: 0, rotate: 0 }
            }
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Rocket className="w-4 h-4 sm:w-[17px] sm:h-[17px]" />
          </motion.div>
        )}

        {idx === 1 && (
          <motion.div
            animate={
              active
                ? { scale: [1, 1.14, 1] }
                : { scale: 1 }
            }
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Smartphone className="w-4 h-4 sm:w-[17px] sm:h-[17px]" />
          </motion.div>
        )}

        {idx === 2 && (
          <motion.div
            animate={
              active
                ? { rotate: 360 }
                : { rotate: [0, 90, 0] }
            }
            transition={
              active
                ? { duration: 5, repeat: Infinity, ease: "linear" }
                : { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <Settings className="w-4 h-4 sm:w-[17px] sm:h-[17px]" />
          </motion.div>
        )}

        {idx === 3 && (
          <motion.div
            animate={
              active
                ? { scale: [1, 1.1, 1], rotate: [-4, 4, -4] }
                : { scale: 1, rotate: 0 }
            }
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Headset className="w-4 h-4 sm:w-[17px] sm:h-[17px]" />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);

  // Quick Contact Form state (configured to send to Vignesh's email)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          subject: `Hero Inquiry - Travel Website for ${formData.name}`,
        }),
      });

      const data = await res.json();
      if (res.ok && (data.success || !data.error)) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || "Failed to send inquiry. Please try again.");
      }
    } catch (err) {
      console.error("Inquiry error:", err);
      setErrorMsg("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategoryIndex((prev) => (prev + 1) % TRAVEL_CATEGORIES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setActiveFeatureIdx((prev) => (prev + 1) % 4);
    }, 3200);
    return () => clearInterval(featureInterval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden pt-6 sm:pt-8 pb-6 sm:pb-10 isolate">
      {/* Kovai.co Exact Ambient Mesh Gradient Background (Ice Blue Left, Periwinkle Center, Lavender/Purple Right, fading to White) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{
          background: `
            linear-gradient(180deg, rgba(255, 255, 255, 0) 10%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.95) 85%, #ffffff 100%),
            linear-gradient(90deg, #d6e6f5 0%, #bfd1f4 40%, #c4b8e8 100%)
          `,
        }}
      >
        {/* Subtle Fine Grain / Tactile Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Soft bottom edge blend */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-50 to-transparent" />
      </div>

      {/* Top Left Brand Logo */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 sm:mb-7">
        <Link href="/" className="inline-block group">
          <Image
            src="/roacs-logo.png"
            alt="Roacs Corporation"
            width={130}
            height={38}
            className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105"
            priority
          />
        </Link>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ================= LEFT SIDE: Content ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col text-center lg:text-left items-center lg:items-start"
          >
            {/* Hero Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-[2.1rem] xl:text-[2.5rem] font-black tracking-tight text-slate-900 leading-[1.2] text-center lg:text-left">
              Launch Your
              <span className="block my-1 sm:my-1.5 min-h-[1.25em] sm:min-h-[1.3em]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={TRAVEL_CATEGORIES[currentCategoryIndex]}
                    initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="inline-block bg-gradient-to-r from-[#ff1577] via-[#f43f5e] to-[#f97316] bg-clip-text text-transparent"
                  >
                    {TRAVEL_CATEGORIES[currentCategoryIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="block">
                Website Within 72 Hrs.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl text-center lg:text-left mx-auto lg:mx-0 font-normal">
              High-converting, mobile-ready websites built for travel agencies and tour operators. Go live in 72 hours with unlimited pages and 24/7 tech support.
            </p>

            {/* Animated Feature Strip (No White Card Container) */}
            <div className="mt-6 sm:mt-7 w-full">
              {/* Desktop 4-column */}
              <div className="hidden sm:flex sm:items-center sm:justify-between gap-4">
                {FEATURE_ITEMS.map((item, idx) => {
                  const isActive = activeFeatureIdx === idx;
                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setActiveFeatureIdx(idx)}
                      className="flex items-center gap-3.5 py-1 cursor-pointer group"
                    >
                      <AnimatedFeatureIcon idx={idx} active={isActive} item={item} />
                      <div className="text-left">
                        <div className="text-xs sm:text-[13px] font-bold tracking-tight text-slate-800 group-hover:text-slate-900 transition-colors whitespace-nowrap">
                          {item.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile clean 2x2 grid */}
              <div className="grid grid-cols-2 gap-x-5 gap-y-3 sm:hidden">
                {FEATURE_ITEMS.map((item, idx) => {
                  const isActive = activeFeatureIdx === idx;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveFeatureIdx(idx)}
                      className="flex items-center gap-3 py-1 cursor-pointer"
                    >
                      <AnimatedFeatureIcon idx={idx} active={isActive} item={item} />
                      <div className="text-left min-w-0">
                        <div className="text-xs font-bold text-slate-800 leading-tight">
                          {item.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </motion.div>

          {/* ================= RIGHT SIDE: Simplified Quick Contact Form ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none lg:mx-0 mt-2 lg:mt-0"
          >
            <div className="rounded-xl bg-white/90 backdrop-blur-md border border-slate-200/90 p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.06)]">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="py-2 px-1 text-center flex flex-col items-center"
                >
                  {/* Glowing Animated Celebration Icon */}
                  <div className="relative mb-3 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.15, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -inset-2 rounded-2xl bg-emerald-500/25 blur-md pointer-events-none"
                    />
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.08 }}
                      className="relative size-12 sm:size-13 rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/30"
                    >
                      <CheckCircle2 className="size-6 sm:size-7 stroke-[2.3]" />
                    </motion.div>
                  </div>

                  <motion.h3
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                    className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-1"
                  >
                    Inquiry Received!
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.3 }}
                    className="text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-xs"
                  >
                    Thank you, <strong className="text-slate-900 font-bold">{formData.name || "there"}</strong>! Your requirements have been dispatched to our travel tech squad.
                  </motion.p>

                  {/* Structured Status / Confirmation Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, duration: 0.3 }}
                    className="w-full my-3.5 rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 text-left text-xs space-y-2.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Status
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100/90 text-emerald-800 border border-emerald-200/60">
                        <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
                        Queued for Review
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Response window: <strong className="text-slate-800">Within 2 Hours</strong></span>
                    </div>

                    <div className="flex items-center gap-2.5 text-slate-600">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">Confirmation: <strong className="text-slate-800 truncate">{formData.email || "roacstech@gmail.com"}</strong></span>
                    </div>
                  </motion.div>

                  {/* Same Brand Gradient Button with Clean Hover Animations */}
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.34, duration: 0.3 }}
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", message: "" });
                    }}
                    className="w-full group relative inline-flex items-center justify-center gap-2 h-10 rounded-md text-xs sm:text-sm font-bold text-white shadow-md shadow-pink-500/20 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95 cursor-pointer"
                  >
                    {/* Brand Gradient Background */}
                    <span className="absolute inset-0 bg-gradient-to-r from-[#fe2c6a] to-[#f98337] rounded-md transition-all group-hover:brightness-110" />

                    {/* Clean Shimmer Sweep Effect on Hover */}
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent ease-out" />

                    {/* Content */}
                    <span className="relative z-10 flex items-center gap-2">
                      <RotateCcw className="w-3.5 h-3.5 transition-transform duration-500 ease-out group-hover:-rotate-180" />
                      Submit Another Inquiry
                    </span>
                  </motion.button>

                  <p className="text-[10px] text-center text-slate-400 pt-2">
                    🔒 100% Confidential • NDA Protected • Direct Support
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Form Heading */}
                  <div className="mb-4 text-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                      Contact
                    </h3>
                  </div>

                  {/* Only 3 Fields: Name, Email, Message */}
                  <form onSubmit={handleSubmit} className="space-y-3">
                  {errorMsg && (
                    <div className="p-2 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center font-medium">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full h-9.5 px-3 rounded-md bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#fe2c6a] focus:bg-white focus:ring-2 focus:ring-[#fe2c6a]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full h-9.5 px-3 rounded-md bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#fe2c6a] focus:bg-white focus:ring-2 focus:ring-[#fe2c6a]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us briefly about your travel business or website requirements..."
                      className="w-full p-2.5 rounded-md bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#fe2c6a] focus:bg-white focus:ring-2 focus:ring-[#fe2c6a]/20 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full group relative inline-flex items-center justify-center gap-1.5 h-10 rounded-md text-xs sm:text-sm font-bold text-white shadow-md shadow-pink-500/20 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95 mt-1 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#fe2c6a] to-[#f98337] rounded-md transition-all group-hover:brightness-110" />
                    <span className="relative z-10 flex items-center gap-1.5">
                      {loading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Sending Inquiry...
                        </>
                      ) : (
                        <>
                          Send Inquiry
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>

                  <p className="text-[10px] text-center text-slate-400 pt-0.5">
                    🔒 100% Confidential • NDA Protected
                  </p>
                </form>
              </>
            )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}