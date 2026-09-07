"use client";

import React from "react";

export default function ReadyToStart() {
  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("inquiry-form");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      const nameInput = target.querySelector<HTMLInputElement>("input#name");
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 600);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-12 sm:py-16 px-4 bg-gradient-to-r from-[#e11d48] via-[#fe2c6a] to-[#f97316] relative overflow-hidden">
      {/* Subtle depth lighting */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-15 mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 50%, white 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wider text-white uppercase leading-tight">
          SO, READY TO START?
        </h2>

        <a
          href="#inquiry-form"
          onClick={scrollToForm}
          className="mt-5 sm:mt-6 inline-flex items-center justify-center px-8 py-3 rounded-lg bg-white text-slate-900 hover:bg-slate-100 hover:text-black font-bold text-xs sm:text-sm tracking-widest uppercase shadow-md hover:shadow-xl hover:scale-105 active:scale-98 transition-all duration-200 cursor-pointer"
        >
          GET IN TOUCH
        </a>
      </div>
    </section>
  );
}
