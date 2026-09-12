import React from "react";

interface SigmaBackgroundProps {
  density?: number;
  glyphs?: number;
  className?: string;
}

export const SigmaBackground: React.FC<SigmaBackgroundProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`pointer-events-none fixed inset-0 overflow-hidden z-0 bg-[#060813] ${className}`}
      aria-hidden="true"
    >
      {/* Subtle, soft deep ambient lighting without messy patterns, glyphs, or grids */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-cyan-900/10 blur-[150px]" />
      <div className="absolute top-1/2 -right-40 h-[600px] w-[600px] rounded-full bg-blue-950/20 blur-[160px]" />
      <div className="absolute -bottom-40 left-1/4 h-[600px] w-[600px] rounded-full bg-indigo-950/20 blur-[160px]" />
    </div>
  );
};

