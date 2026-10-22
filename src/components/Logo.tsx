'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  asLink?: boolean;
  variant?: 'light' | 'dark'; // 'light' means placed on light surface (coffee text), 'dark' means placed on dark/video surface (white text)
}

export function Logo({
  className = '',
  size = 'md',
  showTagline = false,
  asLink = true,
  variant = 'light',
}: LogoProps) {
  const sizeClasses = {
    sm: 'text-base tracking-[0.22em]',
    md: 'text-xl sm:text-2xl tracking-[0.25em]',
    lg: 'text-3xl sm:text-4xl tracking-[0.3em]',
    xl: 'text-5xl sm:text-7xl md:text-8xl tracking-[0.3em]',
  };

  const markSizes = {
    sm: 'w-8 h-4.5',
    md: 'w-11 h-6',
    lg: 'w-20 h-11',
    xl: 'w-32 h-17',
  };

  const isLightSurface = variant === 'light';

  const content = (
    <div className={`inline-flex flex-col items-start select-none group ${className}`}>
      <div className="flex items-center gap-2.5">
        {/* Actual INNOVANTA Infinity Symbol */}
        <div className={`relative ${markSizes[size]} flex items-center justify-center flex-shrink-0 bg-[#1C1410] rounded-sm px-1 py-0.5 shadow-xs`}>
          <img
            src="/images/innovanta-symbol.png"
            alt="INNOVANTA Symbol"
            className="w-full h-full object-contain mix-blend-screen group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Brand Typography */}
        <span
          className={`font-black uppercase font-mono tracking-widest transition-colors duration-200 ${
            isLightSurface ? 'text-[#2C1E16] group-hover:text-[#C87D32]' : 'text-[#FAF8F5] group-hover:text-[#FAF8F5]'
          } ${sizeClasses[size]}`}
        >
          INNOVANTA
        </span>
      </div>

      {showTagline && (
        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#C87D32] font-bold mt-1 pl-11">
          MANIFEST. BUILD. IMPACT.
        </span>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link
        href="/"
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C87D32] rounded-sm"
        aria-label="INNOVANTA Home"
      >
        {content}
      </Link>
    );
  }

  return content;
}
