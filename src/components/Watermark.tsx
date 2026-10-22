'use client';

import React from 'react';

interface WatermarkProps {
  className?: string;
  showLogo?: boolean;
}

export function Watermark({ className = '', showLogo = true }: WatermarkProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 overflow-hidden select-none z-0 ${className}`}
    >
      {/* 
        Atmospheric Background reproducing exact colour grading from reference image:
        - Warm coffee-brown and taupe tones
        - Soft beige and champagne highlights
        - Muted golden-amber lighting
        - Deep, natural olive-green shadows
        - Soft, organic gradients with a slightly textured, atmospheric appearance
      */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            /* 1. Deep natural olive-green shadows at top edges and corners */
            radial-gradient(ellipse 95% 45% at 50% -5%, rgba(26, 32, 24, 0.22) 0%, rgba(20, 25, 18, 0.10) 50%, transparent 80%),
            radial-gradient(circle 55% at 92% 8%, rgba(32, 40, 30, 0.18) 0%, transparent 65%),
            radial-gradient(circle 50% at 8% 12%, rgba(28, 35, 27, 0.16) 0%, transparent 65%),
            
            /* 2. Muted golden-amber lighting diffused from the left/mid-lower (matching reference) */
            radial-gradient(ellipse 75% 60% at 15% 68%, rgba(198, 124, 48, 0.22) 0%, rgba(160, 92, 34, 0.10) 45%, transparent 75%),
            
            /* 3. Soft champagne and beige highlights in the center/upper-mid */
            radial-gradient(ellipse 70% 55% at 65% 36%, rgba(248, 240, 230, 0.65) 0%, rgba(234, 220, 204, 0.35) 45%, transparent 80%),
            radial-gradient(circle 50% at 35% 42%, rgba(244, 234, 220, 0.50) 0%, transparent 70%),
            
            /* 4. Warm coffee-brown and taupe depth at the lower right and base */
            radial-gradient(ellipse 85% 65% at 85% 82%, rgba(94, 70, 52, 0.22) 0%, rgba(68, 48, 34, 0.12) 50%, transparent 80%),
            
            /* 5. Foundation multi-stop linear gradient matching reference vertical colour balance */
            linear-gradient(
              180deg,
              #E2D9CD 0%,
              #ECE2D5 18%,
              #E8DCCB 40%,
              #DDD0BD 65%,
              #CEBAA0 85%,
              #BFAB92 100%
            )
          `
        }}
      />

      {/* Atmospheric subtle texture / fine film grain */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035] mix-blend-overlay pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="innovanta-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#innovanta-grain)" />
      </svg>

      {/* Subtle vignette for natural photographic depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(28, 22, 18, 0.12) 100%)'
        }}
      />

      {/* 
        Original INNOVANTA infinity logo as a large, subtle watermark (Event page):
        - Preserves original purple-to-amber gradient and white centre
        - Naturally integrated into the background
        - High readability of foreground text
      */}
      {showLogo && (
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl opacity-[0.14] pointer-events-none select-none">
          <img
            src="/images/innovanta-symbol.png"
            alt=""
            className="w-full h-auto object-contain drop-shadow-[0_4px_24px_rgba(44,30,22,0.12)]"
          />
        </div>
      )}
    </div>
  );
}
