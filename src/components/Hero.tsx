"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Smartphone, ShieldCheck, Headset, CheckCircle2, Loader2, Clock, Mail, RotateCcw, ChevronRight } from "lucide-react";

const TRAVEL_CATEGORIES = [
  "Tours & Travels",
  "Travel Agency",
  "Tour Operator",
  "Holiday Packages",
  "Destination Booking",
  "Adventure Travel",
];

const COUNTRIES_DATA = [
  {
    name: "Kenya",
    code: "KE",
    flag: (
      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 rounded-full shrink-0 shadow-2xs" viewBox="0 0 32 32">
        <clipPath id="flagCircleKenya"><circle cx="16" cy="16" r="16" /></clipPath>
        <g clipPath="url(#flagCircleKenya)">
          <rect width="32" height="10" fill="#000000" />
          <rect y="10" width="32" height="2" fill="#ffffff" />
          <rect y="12" width="32" height="8" fill="#bb0000" />
          <rect y="20" width="32" height="2" fill="#ffffff" />
          <rect y="22" width="32" height="10" fill="#006600" />
          <ellipse cx="16" cy="16" rx="3.5" ry="6.5" fill="#800000" stroke="#ffffff" strokeWidth="0.8" />
          <circle cx="16" cy="16" r="1.2" fill="#ffffff" />
        </g>
      </svg>
    ),
  },
  {
    name: "USA",
    code: "US",
    flag: (
      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 rounded-full shrink-0 shadow-2xs" viewBox="0 0 32 32">
        <clipPath id="flagCircleUSA"><circle cx="16" cy="16" r="16" /></clipPath>
        <g clipPath="url(#flagCircleUSA)">
          <rect width="32" height="32" fill="#b22234" />
          <rect y="2.5" width="32" height="2.5" fill="#ffffff" />
          <rect y="7.5" width="32" height="2.5" fill="#ffffff" />
          <rect y="12.5" width="32" height="2.5" fill="#ffffff" />
          <rect y="17.5" width="32" height="2.5" fill="#ffffff" />
          <rect y="22.5" width="32" height="2.5" fill="#ffffff" />
          <rect y="27.5" width="32" height="2.5" fill="#ffffff" />
          <rect width="14" height="15" fill="#3c3b6e" />
          <circle cx="4" cy="4" r="0.9" fill="#ffffff" />
          <circle cx="10" cy="4" r="0.9" fill="#ffffff" />
          <circle cx="7" cy="7.5" r="0.9" fill="#ffffff" />
          <circle cx="4" cy="11" r="0.9" fill="#ffffff" />
          <circle cx="10" cy="11" r="0.9" fill="#ffffff" />
        </g>
      </svg>
    ),
  },
  {
    name: "Chile",
    code: "CL",
    flag: (
      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 rounded-full shrink-0 shadow-2xs" viewBox="0 0 32 32">
        <clipPath id="flagCircleChile"><circle cx="16" cy="16" r="16" /></clipPath>
        <g clipPath="url(#flagCircleChile)">
          <rect width="32" height="16" fill="#ffffff" />
          <rect y="16" width="32" height="16" fill="#d52b1e" />
          <rect width="14" height="16" fill="#0039a6" />
          <path
            d="M7 4.5l1.2 3.8h4l-3.2 2.3 1.2 3.8-3.2-2.4-3.2 2.4 1.2-3.8-3.2-2.3h4z"
            fill="#ffffff"
            transform="scale(0.8) translate(1.8, 1.8)"
          />
        </g>
      </svg>
    ),
  },
  {
    name: "India",
    code: "IN",
    flag: (
      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 rounded-full shrink-0 shadow-2xs" viewBox="0 0 32 32">
        <clipPath id="flagCircleIndia"><circle cx="16" cy="16" r="16" /></clipPath>
        <g clipPath="url(#flagCircleIndia)">
          <rect width="32" height="10.66" fill="#ff9933" />
          <rect y="10.66" width="32" height="10.66" fill="#ffffff" />
          <rect y="21.33" width="32" height="10.66" fill="#138808" />
          <circle cx="16" cy="16" r="3.6" fill="none" stroke="#000080" strokeWidth="0.9" />
          <circle cx="16" cy="16" r="0.9" fill="#000080" />
        </g>
      </svg>
    ),
  },
];

const FEATURE_ITEMS = [
  {
    id: "mobile",
    icon: Smartphone,
    label: "100% Mobile Responsive",
    gradient: "from-[#10b981] to-[#059669]",
    shadow: "shadow-emerald-500/25",
  },
  {
    id: "confidentiality",
    icon: ShieldCheck,
    label: "Data Confidentiality",
    gradient: "from-[#6366f1] to-[#4f46e5]",
    shadow: "shadow-indigo-500/25",
  },
  {
    id: "support",
    icon: Headset,
    label: "Unlimited Technical Support",
    gradient: "from-[#f97316] to-[#ea580c]",
    shadow: "shadow-orange-500/25",
  },
  {
    id: "email",
    icon: Mail,
    label: "Professional Domain Email",
    gradient: "from-[#0284c7] to-[#0369a1]",
    shadow: "shadow-sky-500/25",
  },
];

function AnimatedFeatureIcon({
  active,
  item,
}: {
  active: boolean;
  item: typeof FEATURE_ITEMS[0];
}) {
  return (
    <div
      style={{ aspectRatio: "1 / 1" }}
      className="relative flex-none w-10 h-10 sm:w-11 sm:h-11 2xl:w-12 2xl:h-12 aspect-square flex items-center justify-center"
    >
      {/* Clean, visible beacon ping when active */}
      {active && (
        <>
          {/* Subtle soft backdrop halo that breathes smoothly */}
          <motion.span
            animate={{ opacity: [0.12, 0.28, 0.12] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ aspectRatio: "1 / 1" }}
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${item.gradient} filter blur-[3px] pointer-events-none`}
          />
          {/* Smooth expanding radar ring that loops seamlessly with zero flashing */}
          <motion.span
            animate={{
              scale: [0.95, 1.42],
              opacity: [0, 0.45, 0],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.35, 1],
            }}
            style={{ aspectRatio: "1 / 1" }}
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${item.gradient} pointer-events-none`}
          />
        </>
      )}

      {/* Main Gradient Icon Circle - Guaranteed 100% Circular 1:1 Aspect Ratio */}
      <div
        style={{ aspectRatio: "1 / 1" }}
        className={`relative z-10 w-full h-full aspect-square rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-md ${item.shadow} transition-transform duration-300 flex-none ${
          active ? "scale-105" : "group-hover:scale-105"
        }`}
      >
        {item.id === "mobile" && (
          <motion.div
            animate={
              active
                ? { scale: [1, 1.12, 1] }
                : { scale: 1 }
            }
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center justify-center leading-none"
          >
            <Smartphone className="w-5 h-5 sm:w-5 sm:h-5 2xl:w-6 2xl:h-6 block shrink-0" />
          </motion.div>
        )}

        {item.id === "confidentiality" && (
          <motion.div
            animate={
              active
                ? { scale: [1, 1.12, 1] }
                : { scale: 1 }
            }
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center justify-center leading-none"
          >
            <ShieldCheck className="w-5 h-5 sm:w-5 sm:h-5 2xl:w-6 2xl:h-6 block shrink-0" />
          </motion.div>
        )}

        {item.id === "support" && (
          <motion.div
            animate={
              active
                ? { scale: [1, 1.12, 1], rotate: [-4, 4, -4] }
                : { scale: 1, rotate: 0 }
            }
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center justify-center leading-none"
          >
            <Headset className="w-5 h-5 sm:w-5 sm:h-5 2xl:w-6 2xl:h-6 block shrink-0" />
          </motion.div>
        )}

        {item.id === "email" && (
          <motion.div
            animate={
              active
                ? { scale: [1, 1.12, 1], y: [-2, 2, -2] }
                : { scale: 1, y: 0 }
            }
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center justify-center leading-none"
          >
            <Mail className="w-5 h-5 sm:w-5 sm:h-5 2xl:w-6 2xl:h-6 block shrink-0" />
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
          subject: `New Inquiry - Travel Website for ${formData.name}`,
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
      setActiveFeatureIdx((prev) => (prev + 1) % FEATURE_ITEMS.length);
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

      {/* ================= ANIMATED MULTI-FLIGHT TRAJECTORIES (NO DOTS) ================= */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
        <svg
          viewBox="0 0 1200 480"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients for the 3 distinct airplanes */}
            <linearGradient id="planeGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fe2c6a" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>

            <linearGradient id="planeGradSky" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            <linearGradient id="planeGradSunset" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>

            {/* Subtle Glow Filters */}
            <filter id="planeGlowPrimary" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#fe2c6a" floodOpacity="0.4" />
            </filter>
            <filter id="planeGlowSky" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0284c7" floodOpacity="0.4" />
            </filter>
            <filter id="planeGlowSunset" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#f43f5e" floodOpacity="0.4" />
            </filter>

            {/* Flight Motion Trajectories (Smooth monotonic curves, no angle wobble) */}
            {/* 1. Primary Flight: Southwest to Northeast ascent */}
            <path id="flight-route-1" d="M -120 380 C 320 400, 720 190, 1320 50" />

            {/* 2. High Altitude Flight: Northwest to East/Southeast gentle cruise */}
            <path id="flight-route-2" d="M -120 90 C 380 70, 800 160, 1320 220" />

            {/* 3. Opposite Direction Return Flight: East/Southeast to Northwest */}
            <path id="flight-route-3" d="M 1320 340 C 900 310, 480 180, -120 110" />
          </defs>

          {/* FLIGHT 1: SW -> NE Ascent (Brand Primary Rose/Orange) */}
          <g>
            <animateMotion
              dur="38s"
              repeatCount="indefinite"
              rotate="auto"
              keyPoints="0; 1; 1"
              keyTimes="0; 0.88; 1"
              calcMode="linear"
            >
              <mpath href="#flight-route-1" />
            </animateMotion>

            <animate
              attributeName="opacity"
              values="0; 1; 1; 0; 0"
              keyTimes="0; 0.05; 0.85; 0.88; 1"
              dur="38s"
              repeatCount="indefinite"
              calcMode="linear"
            />

            <g transform="scale(1) translate(-12, -12)" filter="url(#planeGlowPrimary)">
              <path
                d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                fill="url(#planeGradPrimary)"
                transform="rotate(90 12 12)"
              />
            </g>
          </g>

          {/* FLIGHT 2: NW -> SE High Altitude Cruise (Sky Blue, slightly smaller scale) */}
          <g>
            <animateMotion
              dur="46s"
              repeatCount="indefinite"
              rotate="auto"
              keyPoints="0; 0; 1; 1"
              keyTimes="0; 0.12; 0.88; 1"
              calcMode="linear"
            >
              <mpath href="#flight-route-2" />
            </animateMotion>

            <animate
              attributeName="opacity"
              values="0; 0; 0.8; 0.8; 0; 0"
              keyTimes="0; 0.12; 0.17; 0.85; 0.88; 1"
              dur="46s"
              repeatCount="indefinite"
              calcMode="linear"
            />

            <g transform="scale(0.75) translate(-12, -12)" filter="url(#planeGlowSky)">
              <path
                d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                fill="url(#planeGradSky)"
                transform="rotate(90 12 12)"
              />
            </g>
          </g>

          {/* FLIGHT 3: SE -> NW Reverse Crossing Flight (Warm Sunset Coral) */}
          <g>
            <animateMotion
              dur="42s"
              repeatCount="indefinite"
              rotate="auto"
              keyPoints="0; 0; 1; 1"
              keyTimes="0; 0.22; 0.88; 1"
              calcMode="linear"
            >
              <mpath href="#flight-route-3" />
            </animateMotion>

            <animate
              attributeName="opacity"
              values="0; 0; 0.88; 0.88; 0; 0"
              keyTimes="0; 0.22; 0.27; 0.85; 0.88; 1"
              dur="42s"
              repeatCount="indefinite"
              calcMode="linear"
            />

            <g transform="scale(0.82) translate(-12, -12)" filter="url(#planeGlowSunset)">
              <path
                d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                fill="url(#planeGradSunset)"
                transform="rotate(90 12 12)"
              />
            </g>
          </g>
        </svg>
      </div>

      {/* Top Header: Logo on Left, Country Flow on Right End Side (Clean & Fully Mobile Responsive) */}
      <div className="relative z-20 max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 mb-4 sm:mb-6 lg:mb-8 flex items-center justify-between gap-2 sm:gap-6 lg:gap-12">
        <Link href="/" className="inline-block group shrink-0">
          <Image
            src="/roacs-logo.png"
            alt="Roacs Corporation"
            width={140}
            height={42}
            className="h-6 sm:h-8 lg:h-9 2xl:h-10 w-auto object-contain transition-transform group-hover:scale-105"
            priority
          />
        </Link>

        {/* Global Countries: Just Flag and Text (Pure Static, Clean & Fully Mobile Responsive) */}
        <div className="flex items-center gap-2.5 sm:gap-4 md:gap-6 lg:gap-8 shrink-0 select-none">
          {COUNTRIES_DATA.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-1 sm:gap-1.5 md:gap-2 select-none"
            >
              {/* Flag Icon */}
              <span className="flex items-center drop-shadow-2xs shrink-0">
                {item.flag}
              </span>

              {/* Country Name: Solid Black Text */}
              <span className="text-[10px] sm:text-xs md:text-sm font-black tracking-wide sm:tracking-wider uppercase text-slate-950">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 items-center">
          
          {/* ================= LEFT SIDE: Content ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col text-center lg:text-left items-center lg:items-start"
          >
            {/* Hero Heading - Bold, commanding typography across mobile and desktop */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black tracking-tight text-slate-900 leading-[1.14] sm:leading-[1.1] text-center lg:text-left">
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
            <p className="mt-5 text-base sm:text-lg lg:text-xl 2xl:text-2xl text-slate-600 leading-relaxed max-w-2xl 2xl:max-w-3xl text-center lg:text-left mx-auto lg:mx-0 font-normal">
              High-converting, mobile-ready websites built for travel agencies and tour operators. Go live in 72 hours with unlimited pages and 24/7 tech support.
            </p>

            {/* Animated Feature Strip */}
            <div className="mt-7 sm:mt-8 2xl:mt-10 w-full max-w-2xl 2xl:max-w-3xl">
              {/* Tablet & Desktop 2x2 Grid with wide center spacing */}
              <div className="hidden sm:grid sm:grid-cols-2 gap-x-10 sm:gap-x-12 lg:gap-x-14 xl:gap-x-16 gap-y-4 sm:gap-y-4.5">
                {FEATURE_ITEMS.map((item, idx) => {
                  const isActive = activeFeatureIdx === idx;
                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setActiveFeatureIdx(idx)}
                      className="flex items-center gap-3.5 py-1 cursor-pointer group"
                    >
                      <AnimatedFeatureIcon active={isActive} item={item} />
                      <div className="text-left min-w-0">
                        <div className="text-sm sm:text-base lg:text-[15px] 2xl:text-[16px] font-bold tracking-tight text-slate-800 group-hover:text-slate-900 transition-colors whitespace-nowrap">
                          {item.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile clean responsive list */}
              <div className="grid grid-cols-1 gap-y-2.5 sm:hidden max-w-xs mx-auto">
                {FEATURE_ITEMS.map((item, idx) => {
                  const isActive = activeFeatureIdx === idx;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveFeatureIdx(idx)}
                      className="flex items-center gap-3 py-1 cursor-pointer"
                    >
                      <AnimatedFeatureIcon active={isActive} item={item} />
                      <div className="text-left min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-slate-800 leading-tight whitespace-nowrap">
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
            id="inquiry-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 w-full max-w-md lg:max-w-lg 2xl:max-w-xl mx-auto lg:mx-0 mt-4 lg:mt-0 scroll-mt-24"
          >
            <div className="relative rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 p-5 sm:p-6 lg:p-7 2xl:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.07)]">
              {/* Floating Trust Guarantee Badge pinned to corner */}
              <div className="absolute -top-3.5 right-3 sm:-top-4 sm:-right-3 z-30 select-none pointer-events-none">
                <motion.div
                  animate={{
                    scale: [1, 1.035, 1],
                    boxShadow: [
                      "0 4px 12px rgba(254, 44, 106, 0.3)",
                      "0 6px 20px rgba(254, 44, 106, 0.55)",
                      "0 4px 12px rgba(254, 44, 106, 0.3)",
                    ],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative flex items-center gap-2 sm:gap-2.5 pl-2 pr-3 sm:pl-2.5 sm:pr-3.5 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-[#fe2c6a] to-[#f98337] text-white"
                >
                  {/* Shield icon container - dark translucent fill, zero white border or haze */}
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black/15 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-100 stroke-[2.5]" />
                  </div>

                  {/* Text details */}
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-[10px] sm:text-[11px] font-black tracking-wider uppercase text-white drop-shadow-2xs">
                      100% Refundable
                    </span>
                    <span className="text-[8px] sm:text-[9px] text-rose-100 font-medium tracking-tight mt-0.5">
                      If you&apos;re not satisfied
                    </span>
                  </div>
                </motion.div>
              </div>

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
                  <div className="mb-4 sm:mb-5 text-center">
                    <h3 className="text-xl sm:text-2xl 2xl:text-3xl font-bold text-slate-900 tracking-tight">
                      Contact Us
                    </h3>
                  </div>

                  {/* Only 3 Fields: Name, Email, Message */}
                  <form onSubmit={handleSubmit} className="space-y-3.5 2xl:space-y-4">
                  {errorMsg && (
                    <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm text-center font-medium">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs sm:text-[13px] 2xl:text-sm font-semibold text-slate-700 mb-1.5">
                      Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full h-10 sm:h-11 2xl:h-12 px-3.5 rounded-lg bg-slate-50 border border-slate-200 text-base sm:text-sm 2xl:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#fe2c6a] focus:bg-white focus:ring-2 focus:ring-[#fe2c6a]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-[13px] 2xl:text-sm font-semibold text-slate-700 mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full h-10 sm:h-11 2xl:h-12 px-3.5 rounded-lg bg-slate-50 border border-slate-200 text-base sm:text-sm 2xl:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#fe2c6a] focus:bg-white focus:ring-2 focus:ring-[#fe2c6a]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-[13px] 2xl:text-sm font-semibold text-slate-700 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us briefly about your travel business or website requirements..."
                      className="w-full p-3 sm:p-3.5 2xl:p-4 rounded-lg bg-slate-50 border border-slate-200 text-base sm:text-sm 2xl:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#fe2c6a] focus:bg-white focus:ring-2 focus:ring-[#fe2c6a]/20 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full group relative inline-flex items-center justify-center gap-2 h-11 sm:h-12 2xl:h-13 rounded-lg text-sm sm:text-base font-bold text-white shadow-md shadow-pink-500/20 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 active:scale-98 mt-1 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#fe2c6a] to-[#f98337] rounded-lg transition-all group-hover:brightness-110" />
                    <span className="relative z-10 flex items-center gap-2">
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending Inquiry...
                        </>
                      ) : (
                        <>
                          Send Inquiry
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>

                  <p className="text-[11px] 2xl:text-xs text-center text-slate-400 pt-1">
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