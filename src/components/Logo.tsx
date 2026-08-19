import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  variant?: "horizontal" | "vertical" | "icon-only";
}

export default function Logo({
  className = "",
  size = "md",
  showText = true,
  variant = "horizontal",
}: LogoProps) {
  // Dimensions for icon
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const textSizes = {
    sm: "text-base tracking-[0.18em]",
    md: "text-lg tracking-[0.2em]",
    lg: "text-2xl tracking-[0.22em]",
    xl: "text-3xl tracking-[0.25em]",
  };

  return (
    <div
      className={`flex ${
        variant === "vertical"
          ? "flex-col items-center text-center gap-3"
          : "items-center gap-3"
      } ${className}`}
    >
      {/* Precision Vector SVG Logo matching Automata IQ AI Ligature */}
      <div className={`relative flex-shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]"
        >
          <defs>
            {/* Glow Filter */}
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Cyan Gradient for Lines */}
            <linearGradient id="cyanLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#00e5ff" />
            </linearGradient>

            {/* Node Fill Gradient */}
            <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#0891b2" />
            </radialGradient>
          </defs>

          {/* Background Rounded Glow Card (Subtle) */}
          <rect
            width="200"
            height="200"
            rx="32"
            fill="#030712"
            fillOpacity="0.6"
            stroke="#0e7490"
            strokeOpacity="0.3"
            strokeWidth="1.5"
          />

          {/* Outer 'A' Structure */}
          {/* Left Leg & Top Apex */}
          <path
            d="M 46 154 L 94 42 C 96 37 104 37 106 42 L 154 154"
            stroke="url(#cyanLineGrad)"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#neonGlow)"
          />

          {/* Inner Neural Circuit Curve (Intertwined AI Swoop) */}
          <path
            d="M 68 126 C 96 126 102 96 116 70 C 124 54 136 44 148 44 C 158 44 164 52 164 64 L 164 154"
            stroke="url(#cyanLineGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#neonGlow)"
          />

          {/* Neural Connection Bridge to Bottom Right */}
          <path
            d="M 124 100 L 150 144"
            stroke="url(#cyanLineGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="1 0"
          />

          {/* Horizontal Cross Connection */}
          <line
            x1="70"
            y1="126"
            x2="128"
            y2="108"
            stroke="url(#cyanLineGrad)"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Glowing Neural Network Node Points (Circles) */}
          {/* Node 1: Top of 'i' (Stem Top Node) */}
          <circle
            cx="156"
            cy="44"
            r="9.5"
            fill="url(#nodeGrad)"
            stroke="#cffafe"
            strokeWidth="3"
            filter="url(#neonGlow)"
          />

          {/* Node 2: Left Crossbar Node on 'A' */}
          <circle
            cx="70"
            cy="126"
            r="8"
            fill="url(#nodeGrad)"
            stroke="#cffafe"
            strokeWidth="2.5"
            filter="url(#neonGlow)"
          />

          {/* Node 3: Center Intersecting Node */}
          <circle
            cx="108"
            cy="84"
            r="7"
            fill="url(#nodeGrad)"
            stroke="#cffafe"
            strokeWidth="2.5"
          />

          {/* Node 4: Lower Right Base Node */}
          <circle
            cx="150"
            cy="146"
            r="8"
            fill="url(#nodeGrad)"
            stroke="#cffafe"
            strokeWidth="2.5"
            filter="url(#neonGlow)"
          />
        </svg>
      </div>

      {/* Typography: AUTOMATA IQ */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black text-white uppercase font-sans ${textSizes[size]} select-none`}
              style={{
                fontFamily:
                  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                letterSpacing: "0.18em",
              }}
            >
              AUTOMATA <span className="text-cyan-400">IQ</span>
            </span>
          </div>
          {variant !== "vertical" && size !== "sm" && (
            <span className="text-[11px] text-slate-400 font-medium tracking-wide">
              هندسة الأتمتة والذكاء الاصطناعي
            </span>
          )}
        </div>
      )}
    </div>
  );
}
