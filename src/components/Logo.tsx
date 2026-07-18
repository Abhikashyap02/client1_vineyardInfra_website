import React from "react";

interface LogoProps {
  /**
   * - "horizontal": Icon next to the company name "VINEYARD INFRA REALCON LLP" (default)
   * - "stacked": Centered icon above the stacked company name
   * - "iconOnly": Just the premium building/roof gold emblem
   */
  variant?: "horizontal" | "stacked" | "iconOnly";
  className?: string;
  height?: number | string;
  iconSize?: number | string;
  textColor?: string;
}

export function Logo({
  variant = "horizontal",
  className = "",
  height,
  iconSize,
  textColor = "text-white",
}: LogoProps) {
  const renderIcon = (sizeClass: string) => (
    <svg
      viewBox="0 0 200 200"
      className={`${sizeClass} shrink-0`}
      style={iconSize ? { width: iconSize, height: iconSize } : undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-gold-light" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FAEBD7" />
          <stop offset="50%" stopColor="#F5D77F" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        <linearGradient id="logo-gold-medium" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5D77F" />
          <stop offset="50%" stopColor="#C59B27" />
          <stop offset="100%" stopColor="#9A7B1C" />
        </linearGradient>
      </defs>

      {/* Circular Arch */}
      <path
        d="M 32,130 A 75,75 0 1,1 168,130"
        fill="none"
        stroke="url(#logo-gold-light)"
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* Buildings (Behind Roof) */}
      {/* Left Tower */}
      <polygon points="68,55 78,60 78,113.75 68,120" fill="url(#logo-gold-light)" />
      <polygon points="78,60 88,65 88,107.5 78,113.75" fill="url(#logo-gold-medium)" />

      {/* Right Tower */}
      <polygon points="112,70 122,75 122,113.75 112,107.5" fill="url(#logo-gold-light)" />
      <polygon points="122,75 132,80 132,120 122,113.75" fill="url(#logo-gold-medium)" />

      {/* Center Tower */}
      <polygon points="88,35 100,41 100,100 88,107.5" fill="url(#logo-gold-light)" />
      <polygon points="100,41 112,47 112,107.5 100,100" fill="url(#logo-gold-medium)" />

      {/* Roof Chevron (In Front of Buildings) */}
      <polygon points="20,150 100,100 180,150 175,153 100,106 25,153" fill="url(#logo-gold-light)" />

      {/* Window (Under Roof) */}
      <rect x="91" y="116" width="7" height="7" fill="url(#logo-gold-light)" rx="0.5" />
      <rect x="102" y="116" width="7" height="7" fill="url(#logo-gold-light)" rx="0.5" />
      <rect x="91" y="127" width="7" height="7" fill="url(#logo-gold-light)" rx="0.5" />
      <rect x="102" y="127" width="7" height="7" fill="url(#logo-gold-light)" rx="0.5" />
    </svg>
  );

  if (variant === "iconOnly") {
    return renderIcon(className || "w-12 h-12");
  }

  if (variant === "stacked") {
    return (
      <div
        className={`flex flex-col items-center text-center gap-2 ${className}`}
        style={height ? { height } : undefined}
      >
        {renderIcon("w-16 h-16 md:w-20 md:h-20")}
        <div className="leading-tight flex flex-col items-center">
          <div className="font-serif text-[15px] md:text-lg font-medium tracking-[0.2em] text-gold uppercase">
            Vineyard Infra
          </div>
          <div className={`font-serif text-[10px] md:text-xs font-light tracking-[0.25em] ${textColor} opacity-80 uppercase mt-1`}>
            Realcon LLP
          </div>
        </div>
      </div>
    );
  }

  // default: horizontal
  return (
    <div
      className={`flex items-center gap-3.5 select-none ${className}`}
      style={height ? { height } : undefined}
    >
      {renderIcon("w-12 h-12 md:w-14 md:h-14")}
      <div className="leading-none flex flex-col justify-center">
        <div className={`font-serif text-[15px] md:text-[17px] font-semibold tracking-[0.18em] ${textColor} uppercase whitespace-nowrap`}>
          Vineyard Infra
        </div>
        <div className="font-serif text-[9.5px] md:text-[10.5px] font-semibold tracking-[0.28em] text-gold uppercase mt-1.5 whitespace-nowrap">
          Realcon LLP
        </div>
      </div>
    </div>
  );
}
