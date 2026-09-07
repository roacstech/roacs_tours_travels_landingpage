"use client";

import React from "react";

// Distinct shuffled orders for Row 1 and Row 2 so identical logos NEVER align
export const rowOneLogos = [
  { name: "Yazi", src: "/logo/YAZI.webp" },
  { name: "Splendid Movers", src: "/logo/splendid.svg" },
  { name: "BetterAge", src: "/logo/betterage.svg" },
  { name: "Jadeed Communications", src: "/logo/jadeed.webp" },
  { name: "Tetas Podcast", src: "/logo/Tetas.svg" },
  { name: "BEC Global", src: "/logo/BEC.jpg" },
];

export const rowTwoLogos = [
  { name: "BetterAge", src: "/logo/betterage.svg" },
  { name: "BEC Global", src: "/logo/BEC.jpg" },
  { name: "Yazi", src: "/logo/YAZI.webp" },
  { name: "Tetas Podcast", src: "/logo/Tetas.svg" },
  { name: "Jadeed Communications", src: "/logo/jadeed.webp" },
  { name: "Splendid Movers", src: "/logo/splendid.svg" },
];

export function LogoCloudMarquee() {
  // Repeat array for seamless infinite marquee loop
  const rowOne = [...rowOneLogos, ...rowOneLogos, ...rowOneLogos, ...rowOneLogos];
  const rowTwo = [...rowTwoLogos, ...rowTwoLogos, ...rowTwoLogos, ...rowTwoLogos];

  return (
    <section className="w-full pt-2 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 2xl:px-12 bg-slate-50/50">

      {/* Contained Laser-Etched Line */}
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent mb-6 sm:mb-8" />

      {/* Elevated Editorial Header */}
      <div className="flex flex-col items-center justify-center mb-8 sm:mb-12 px-4 text-center">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-sm mb-3">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700">
            Trusted Partners
          </span>
        </div>
        <h2 className="text-2xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-extrabold tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight">
          Powering ambitious digital businesses.
        </h2>
      </div>

      {/* Contained Container with Soft Left & Right Fade */}
      <div
        className="max-w-7xl 2xl:max-w-[1440px] mx-auto relative overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      >
        {/* Hardware-safe dual gradient fade shields to guarantee zero cropping */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-28 z-20"
          style={{
            background: "linear-gradient(to right, rgba(248, 250, 252, 1) 0%, rgba(248, 250, 252, 0.7) 50%, rgba(248, 250, 252, 0) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-28 z-20"
          style={{
            background: "linear-gradient(to left, rgba(248, 250, 252, 1) 0%, rgba(248, 250, 252, 0.7) 50%, rgba(248, 250, 252, 0) 100%)",
          }}
        />

        {/* Row 1: Forward Marquee (Stops on hover, speed: 36s) */}
        <div className="relative w-full overflow-hidden group cursor-pointer">
          <div
            className="animate-marquee group-hover:[animation-play-state:paused] flex items-center gap-8 sm:gap-12 py-3.5"
            style={{ animationDuration: "36s" }}
          >
            {rowOne.map((item, idx) => (
              <div
                key={`${item.name}-r1-${idx}`}
                className="shrink-0 flex items-center justify-center px-2 sm:px-3"
              >
                <img
                  src={item.src}
                  alt={item.name}
                  className="h-9 sm:h-11 lg:h-12 w-auto max-w-[160px] 2xl:max-w-[190px] object-contain select-none pointer-events-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Reverse Marquee (Stops on hover, desynchronized speed: 27s, offset delay: -7s) */}
        <div className="relative w-full overflow-hidden mt-4 sm:mt-6 group cursor-pointer">
          <div
            className="animate-marquee-reverse group-hover:[animation-play-state:paused] flex items-center gap-8 sm:gap-12 py-3.5"
            style={{ animationDuration: "27s", animationDelay: "-7s" }}
          >
            {rowTwo.map((item, idx) => (
              <div
                key={`${item.name}-r2-${idx}`}
                className="shrink-0 flex items-center justify-center px-2 sm:px-3"
              >
                <img
                  src={item.src}
                  alt={item.name}
                  className="h-9 sm:h-11 lg:h-12 w-auto max-w-[160px] 2xl:max-w-[190px] object-contain select-none pointer-events-none"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
