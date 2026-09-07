"use client";

import React from "react";

const items = [
  { src: "/yazi.png", alt: "Yazi Travels", position: "object-top" },
  { src: "/travel-explore.jpg", alt: "Explore Travel Platform", position: "object-center" },
  { src: "/bec.png", alt: "BEC Global", position: "object-top" },
  { src: "/travel-sunset.jpg", alt: "Sunset Tours & Travel Platform", position: "object-center" },
  { src: "/travel-anytime.webp", alt: "Plan Your Travel Platform", position: "object-center" },
  { src: "/jadeed.png", alt: "Jadeed Communications", position: "object-top" },
];

export function BentoGridDemo() {
  return (
    <section id="work" className="w-full pt-2 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 2xl:px-12 bg-slate-50/50">
      {/* Contained Laser-Etched Line */}
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent mb-6 sm:mb-8" />

      {/* Elevated Editorial Header */}
      <div className="flex flex-col items-center justify-center mb-8 sm:mb-12 px-4 text-center">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-sm mb-3">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700">
            Featured Projects
          </span>
        </div>
        <h2 className="text-2xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-extrabold tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight">
          Built for scale. Trusted in production.
        </h2>
      </div>

      {/* 3-Column Image Cards Grid: Only images, zoom inside card on hover, no overflow, no links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 2xl:gap-8 max-w-7xl 2xl:max-w-[1440px] mx-auto">
        {items.map((item, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-2xl bg-slate-100 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 aspect-[16/10]"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 select-none pointer-events-none"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
