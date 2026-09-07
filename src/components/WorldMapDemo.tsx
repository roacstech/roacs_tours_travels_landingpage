"use client";

import WorldMap from "@/components/ui/world-map";

export function WorldMapDemo() {
  return (
    <section className="w-full pt-2 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-8 2xl:px-12 bg-slate-50/50">
      
      {/* Contained Laser-Etched Line */}
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent mb-6 sm:mb-8" />

      {/* Elevated Editorial Header */}
      <div className="flex flex-col items-center justify-center mb-8 sm:mb-12 px-4 text-center">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-sm mb-3">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700">
            Global Footprint
          </span>
        </div>
        <h2 className="text-2xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-extrabold tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight">
          Cross-border engineering squads deployed worldwide.
        </h2>
      </div>

      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 overflow-hidden max-h-[340px] sm:max-h-[460px] lg:max-h-[540px] 2xl:max-h-[620px]">
        <WorldMap
          lineColor="#fe2c6a"
          gradientStart="#fe2c6a"
          gradientEnd="#f97316"
          dots={[
            {
              start: { lat: 37.7749, lng: -122.4194, label: "USA" },
              end: { lat: -15.7975, lng: -47.8919, label: "Brazil" },
            },
            {
              start: { lat: 37.7749, lng: -122.4194, label: "USA" },
              end: { lat: 51.5074, lng: -0.1278, label: "UK" },
            },
            {
              start: { lat: -15.7975, lng: -47.8919, label: "Brazil" },
              end: { lat: 41.1579, lng: -8.6291, label: "Portugal" },
            },
            {
              start: { lat: 51.5074, lng: -0.1278, label: "UK" },
              end: { lat: 55.7558, lng: 37.6173, label: "Russia" },
            },
            {
              start: { lat: 51.5074, lng: -0.1278, label: "UK" },
              end: { lat: 25.2048, lng: 55.2708, label: "UAE" },
            },
            {
              start: { lat: 25.2048, lng: 55.2708, label: "UAE" },
              end: { lat: 28.6139, lng: 77.2090, label: "India" },
            },
            {
              start: { lat: 28.6139, lng: 77.2090, label: "India" },
              end: { lat: -1.2921, lng: 36.8219, label: "Kenya" },
            },
            {
              start: { lat: 28.6139, lng: 77.2090, label: "India" },
              end: { lat: 35.6762, lng: 139.6503, label: "Japan" },
            },
          ]}
        />
      </div>
    </section>
  );
}
