"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

// Smooth animated counting number (0 -> target)
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1], // snappy ease-out expo
        onUpdate: (latest) => {
          setDisplayValue(Math.round(latest));
        },
      });
      return () => controls.stop();
    }
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

// 4 metrics representing Roacs Corporation as a website development company
const metrics = [
  {
    target: 50,
    suffix: "+",
    label: "Travel & Tours Websites",
  },
  {
    target: 12500,
    suffix: "+",
    label: "Web Development Hours",
  },
  {
    target: 40,
    suffix: "+",
    label: "Travel Agency Clients",
  },
  {
    target: 20,
    suffix: "+",
    label: "Booking & Payment Integrations",
  },
];

export default function MetricsBar() {
  return (
    <section className="relative w-full border-t border-slate-200/80 bg-slate-50/50 pt-8 pb-4 sm:pt-10 sm:pb-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Elevated Editorial Header */}
        <div className="flex flex-col items-center justify-center mb-6 sm:mb-8 px-4 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs mb-2">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-slate-700">
              Delivery Track Record
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 max-w-xl mx-auto leading-snug">
            Measurable results delivered at scale.
          </h2>
        </div>

        {/* 4 Clean Animated Counters: 4 cols on desktop, 2x2 on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center text-center"
            >
              {/* Animated Counting Number */}
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-center text-teal-600">
                <AnimatedCounter value={item.target} suffix={item.suffix} />
              </div>

              {/* Stat Label */}
              <div className="text-xs sm:text-sm font-bold text-slate-800 mt-2 tracking-tight text-center">
                {item.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
