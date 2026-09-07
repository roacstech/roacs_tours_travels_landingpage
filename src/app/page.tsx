import Hero from "@/components/Hero";
import MetricsBar from "@/components/MetricsBar";
import { BentoGridDemo } from "@/components/BentoGridDemo";
import { TestimonialsWithCarousel } from "@/components/TestimonialsWithCarousel";
import { LogoCloudMarquee } from "@/components/LogoCloudMarquee";
import { WorldMapDemo } from "@/components/WorldMapDemo";
import ReadyToStart from "@/components/ReadyToStart";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50/70 text-slate-900 selection:bg-teal-400 selection:text-black relative overflow-hidden">
      
      {/* ================= ATMOSPHERE & LIGHTING ================= */}
      {/* 1. Top Primary Ambient Glow (Brand Blue & Teal hues) */}
      <div 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full opacity-60 blur-3xl z-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(37, 99, 235, 0.16), rgba(13, 148, 136, 0.10), transparent 70%)",
        }}
      />

      {/* 2. Delicate Precision Engineering Grid (Fades out naturally) */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 h-[850px]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: "4rem 4rem",
          WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 50% 12%, black 25%, transparent 80%)",
          maskImage: "radial-gradient(ellipse 70% 50% at 50% 12%, black 25%, transparent 80%)",
        }}
      />

      {/* 3. Subtle Mid-Page Ambient Light Bloom behind Portfolio */}
      <div 
        className="pointer-events-none absolute top-[1100px] left-1/2 -translate-x-1/2 w-[1100px] h-[650px] rounded-full opacity-35 blur-3xl z-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.12), rgba(99, 102, 241, 0.05), transparent 70%)",
        }}
      />

      {/* 4. Soft Bottom Glow for Global Footprint Map */}
      <div 
        className="pointer-events-none absolute bottom-32 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full opacity-30 blur-3xl z-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(254, 44, 106, 0.09), rgba(249, 115, 22, 0.06), transparent 70%)",
        }}
      />

      {/* Page Content Layers */}
      <div className="relative z-10">
        <Hero />
        <BentoGridDemo />
        <MetricsBar />
        <TestimonialsWithCarousel />
        <LogoCloudMarquee />
        <WorldMapDemo />
        <ReadyToStart />
        <Footer />
      </div>
    </main>
  );
}
