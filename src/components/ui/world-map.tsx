"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  gradientStart?: string;
  gradientEnd?: string;
  dotColor?: string;
}

export default function WorldMap({
  dots = [],
  lineColor = "#fe2c6a",
  gradientStart = "#fe2c6a",
  gradientEnd = "#f97316",
  dotColor = "#00000028",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const map = new DottedMap({ width: 200, height: 100, grid: "diagonal" });

  const svgMap = map.getSVG({
    radius: 0.22,
    color: dotColor,
    shape: "circle",
    backgroundColor: "transparent",
  });

  const projectPoint = (lat: number, lng: number) => {
    try {
      // Use exact map projection from DottedMap
      const pin = typeof map.getPin === "function" ? map.getPin({ lat, lng }) : null;
      if (pin && typeof pin.x === "number" && typeof pin.y === "number") {
        // Map viewBox 200x100 to overlay SVG viewBox 800x400
        return {
          x: (pin.x / 200) * 800,
          y: (pin.y / 100) * 400,
        };
      }
    } catch {
      // Fallback projection below
    }

    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="w-full aspect-[2/1] bg-transparent rounded-lg relative font-sans overflow-hidden">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent_0%,white_15%,white_85%,transparent_100%)] pointer-events-none select-none"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1.5"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.4 * i,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatType: "loop",
                  repeatDelay: 2,
                }}
                key={`start-upper-${i}`}
              />
            </g>
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={gradientStart || lineColor} stopOpacity="0" />
            <stop offset="10%" stopColor={gradientStart || lineColor} stopOpacity="1" />
            <stop offset="90%" stopColor={gradientEnd || lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor={gradientEnd || lineColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Unique Location Dots with Crisp Halo Labels */}
        {Array.from(
          dots
            .reduce((acc, dot) => {
              const p1Key = `${dot.start.lat.toFixed(2)},${dot.start.lng.toFixed(2)}`;
              const p2Key = `${dot.end.lat.toFixed(2)},${dot.end.lng.toFixed(2)}`;
              if (!acc.has(p1Key)) acc.set(p1Key, dot.start);
              if (!acc.has(p2Key)) acc.set(p2Key, dot.end);
              return acc;
            }, new Map<string, { lat: number; lng: number; label?: string }>())
            .values()
        ).map((point, idx) => {
          const pt = projectPoint(point.lat, point.lng);
          const pinColor = gradientStart || lineColor;
          return (
            <g key={`unique-point-${idx}`}>
              <circle cx={pt.x} cy={pt.y} r="3" fill={pinColor} />
              <circle cx={pt.x} cy={pt.y} r="1" fill="#ffffff" />
              <circle cx={pt.x} cy={pt.y} r="3" fill={pinColor} opacity="0.6">
                <animate
                  attributeName="r"
                  from="3"
                  to="10"
                  dur="2s"
                  begin={`${idx * 0.3}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.6"
                  to="0"
                  dur="2s"
                  begin={`${idx * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>
              {point.label && (
                <text
                  x={pt.x}
                  y={pt.y + 11}
                  textAnchor="middle"
                  fill="#334155"
                  fontSize="7.5"
                  fontWeight="600"
                  className="select-none pointer-events-none tracking-tight font-sans"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  paintOrder="stroke fill"
                >
                  {point.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export { WorldMap };
