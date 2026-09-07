"use client";

import React, { useRef } from "react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

// Authentic Client Testimonials matching Roacs Corporation portfolio
const testimonials: Testimonial[] = [
  {
    name: "Abdi Hassan",
    role: "Founder, Yazi Travels",
    quote:
      "Roacs engineered our intelligent flight booking engine and travel search platform. Their squad delivered sub-second response times and rock-solid scalability for thousands of travelers.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
  },
  {
    name: "Pravin Kumar",
    role: "Managing Director, BEC Global",
    quote:
      "Their Snowflake data cloud engineering and custom portal streamlined thousands of student admissions worldwide. Roacs is an indispensable technology partner for our global operations.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
  },
  {
    name: "David Mwangi",
    role: "Operations Director, Splendid Movers",
    quote:
      "Roacs developed our complete moving logistics and fleet dispatch web platform in Nairobi. The operational efficiency gains and customer booking conversion have been exceptional.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
  },
  {
    name: "Elena Rostova",
    role: "Co-Founder & Product Lead, BetterAge",
    quote:
      "The UI/UX craftsmanship and cloud architecture Roacs brought to BetterAge transformed our digital wellness platform. Truly world-class engineers who care deeply about product quality.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
  },
  {
    name: "Omar Farah",
    role: "Managing Partner, Jadeed Communications",
    quote:
      "From brand presence to enterprise digital infrastructure, Roacs delivered a responsive, modern platform that positions us at the forefront of East African media and corporate relations.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&auto=format&fit=crop&q=80",
  },
  {
    name: "Vanessa K.",
    role: "Creator & Executive Producer, Tetas",
    quote:
      "Roacs built a stunning, high-performance streaming platform for our audio and video storytelling. The listener engagement and subscriber retention have doubled since launch.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80",
  },
];

export function TestimonialsWithCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const card = container.firstElementChild as HTMLElement | null;
      const step = card ? card.offsetWidth + 24 : 340;

      if (direction === "right") {
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft >= maxScroll - 15) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: step, behavior: "smooth" });
        }
      } else {
        if (container.scrollLeft <= 15) {
          container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
        } else {
          container.scrollBy({ left: -step, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <section className="w-full pt-4 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Contained Laser-Etched Line */}
        <div className="max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent mb-6 sm:mb-8" />

        {/* Header with Centered Title & Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 sm:mb-6 px-2">
          {/* Invisible spacer for balanced symmetry on desktop */}
          <div className="w-24 hidden sm:block" />

          {/* Centered Editorial Heading */}
          <div className="flex-1 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs mb-2">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-slate-700">
                Testimonials
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 max-w-xl mx-auto leading-snug">
              Trusted by visionary founders
            </h2>
          </div>

          {/* Carousel Manual Navigation Arrows */}
          <div className="flex items-center justify-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous testimonials"
              className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-slate-300/80 bg-white text-slate-700 transition duration-200 hover:bg-slate-100 hover:text-slate-900 active:scale-95 cursor-pointer shadow-2xs"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-4 sm:size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Next testimonials"
              className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-slate-300/80 bg-white text-slate-700 transition duration-200 hover:bg-slate-100 hover:text-slate-900 active:scale-95 cursor-pointer shadow-2xs"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-4 sm:size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Track with Manual Smooth Scrolling */}
        <div
          ref={scrollRef}
          className="flex gap-5 lg:gap-6 overflow-x-auto pt-10 pb-6 px-1 snap-x snap-mandatory scrollbar-none no-scrollbar scroll-smooth touch-pan-x"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="relative w-[85vw] max-w-[340px] sm:w-[calc((100%-20px)/2)] sm:max-w-none lg:w-[calc((100%-48px)/3)] shrink-0 snap-start bg-[#ea9e2c] rounded-[28px] p-6 sm:p-7 pt-7 sm:pt-8 text-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between select-none min-h-[220px] sm:min-h-[230px]"
            >
              {/* Top-Left Overlapping Circular Avatar */}
              <div className="absolute -top-7 sm:-top-8 left-6 sm:left-7 size-18 sm:size-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-white shrink-0">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Top-Right Double Quotation Mark */}
              <div className="absolute top-4 right-5 sm:right-6 text-white/80 select-none pointer-events-none font-serif text-5xl sm:text-6xl leading-none">
                “
              </div>

              {/* Header (Name & Role) offset to accommodate avatar */}
              <div className="pl-18 sm:pl-20 pr-8 min-h-[48px] flex flex-col justify-center">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-tight">
                  {item.name}
                </h3>
                <p className="text-[11px] sm:text-xs font-semibold text-white/85 mt-0.5">
                  {item.role}
                </p>
              </div>

              {/* Body Quote Text */}
              <p className="mt-4 sm:mt-5 text-xs sm:text-[13.5px] font-normal text-white/95 leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

