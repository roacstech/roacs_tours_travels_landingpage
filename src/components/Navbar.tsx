"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Services", href: "#services" },
  { name: "Our Work", href: "#work" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3"
          : "bg-white/80 backdrop-blur-md border-b border-slate-200/60 py-3.5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Roacs Brand Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/roacs-logo.png"
            alt="Roacs Corporation"
            width={120}
            height={36}
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop Links with Smooth Gliding Pill */}
        <div
          onMouseLeave={() => setHoveredIdx(null)}
          className="hidden lg:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/60 ml-auto mr-6"
        >
          {navLinks.map((item, idx) => (
            <Link
              key={item.name}
              href={item.href}
              onMouseEnter={() => setHoveredIdx(idx)}
              className="relative px-5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              {hoveredIdx === idx && (
                <motion.span
                  layoutId="hoverPillLight"
                  className="absolute inset-0 rounded-full bg-white shadow-sm border border-slate-200/70"
                  transition={{ type: "spring", stiffness: 420, damping: 27 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Right Side Actions (Button + Hamburger cleanly grouped together) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#contact"
            className="hidden sm:inline-flex group relative items-center gap-1.5 text-xs font-semibold text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full overflow-hidden transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30"
          >
            {/* Colorful Brand Gradient: Royal Blue to Vibrant Teal */}
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-teal-500 rounded-full transition-all group-hover:scale-105" />
            <span className="relative z-10 flex items-center gap-1.5">
              Contact Us
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </a>

          {/* Mobile & Tablet Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-blue-600" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full inset-x-0 bg-white/95 backdrop-blur-2xl border-b border-slate-200 p-5 shadow-xl lg:hidden z-50"
          >
            <div className="max-w-md mx-auto flex flex-col gap-2">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all flex items-center justify-between"
                >
                  {item.name}
                  <span className="text-teal-500 text-xs font-bold">↗</span>
                </Link>
              ))}

              <div className="pt-3 border-t border-slate-100 mt-1">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-white px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 shadow-md shadow-blue-500/20"
                >
                  Contact Us
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
