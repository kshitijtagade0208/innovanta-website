'use client';

import React from 'react';

// ─── Inline Hand-Drawn Sketch Elements ───────────────────────────────────────

/**
 * Dynamic hand-drawn sketch circle/oval that wraps around roles of any length
 */
function SketchCircle({
  color = '#C58B45',
  className = '',
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <path
        d="M 8,50 C 6,22 26,8 54,7 C 82,6 95,18 94,50 C 93,82 78,94 48,95 C 18,96 5,82 7,46 C 8,24 24,11 50,9"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        opacity="0.88"
      />
    </svg>
  );
}

/**
 * Hand-drawn curved arrow pointing to labels or photos
 */
function SketchArrow({
  direction = 'down-right',
  color = '#987452',
  className = '',
}: {
  direction?: 'down-right' | 'down-left';
  color?: string;
  className?: string;
}) {
  if (direction === 'down-left') {
    return (
      <svg
        viewBox="0 0 54 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pointer-events-none select-none ${className}`}
        aria-hidden="true"
      >
        <path
          d="M 48 6 C 36 8, 16 18, 10 36"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 20 35 L 9 37 L 8 26"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 54 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <path
        d="M 6 6 C 18 8, 38 18, 44 36"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 34 35 L 45 37 L 46 26"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Hand-drawn masking tape accent lightly adhering photo corners
 */
function TapeAccent({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`h-4 w-12 sm:w-16 bg-[#E9DCC9]/90 backdrop-blur-xs border-y border-[#CBB79D]/70 shadow-2xs pointer-events-none select-none ${className}`}
      style={{
        clipPath: 'polygon(3% 0%, 97% 0%, 100% 100%, 0% 100%)',
      }}
    />
  );
}

/**
 * Hand-drawn sparkle / asterisk doodle
 */
function SketchSparkle({
  color = '#C58B45',
  className = '',
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <path
        d="M 10 1 L 10 19 M 1 10 L 19 10 M 3.5 3.5 L 16.5 16.5 M 16.5 3.5 L 3.5 16.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Profile-specific decorative doodle sketches
 */
function RoleDoodle({ type, color = '#987452' }: { type: string; color?: string }) {
  if (type === 'coffee') {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 pointer-events-none select-none"
        aria-hidden="true"
      >
        <path
          d="M 6 12 L 8 24 C 8.5 27 11 29 15 29 C 19 29 21.5 27 22 24 L 24 12 Z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 23 14 C 27 14 28 17 28 18 C 28 20 26 21 22.5 21"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M 11 6 C 11 8, 12 9, 12 10 M 15 5 C 15 7, 16 8, 16 10 M 19 6 C 19 8, 20 9, 20 10"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === 'phone') {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 pointer-events-none select-none"
        aria-hidden="true"
      >
        <rect
          x="10"
          y="6"
          width="12"
          height="22"
          rx="3"
          stroke={color}
          strokeWidth="1.8"
        />
        <line x1="12" y1="10" x2="20" y2="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="24" r="1.5" fill={color} />
        <line x1="12" y1="6" x2="10" y2="2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'lemon') {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 pointer-events-none select-none"
        aria-hidden="true"
      >
        <ellipse cx="16" cy="16" rx="10" ry="8" transform="rotate(-15 16 16)" stroke={color} strokeWidth="1.8" />
        <path d="M 6 16 C 5 15 5 14 6 13" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 26 17 C 27 18 27 19 26 20" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="14" cy="15" r="1" fill={color} />
        <circle cx="18" cy="17" r="1" fill={color} />
      </svg>
    );
  }

  if (type === 'scroll') {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 pointer-events-none select-none"
        aria-hidden="true"
      >
        <path
          d="M 7 8 C 7 6.5 8.5 5 10 5 L 23 5 C 24.5 5 26 6.5 26 8 L 26 23 C 26 24.5 24.5 26 23 26 L 9 26 C 7.5 26 6 24.5 6 23 C 6 20 8 18 10 18 L 24 18"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="11" y1="10" x2="21" y2="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="11" y1="14" x2="18" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 pointer-events-none select-none"
      aria-hidden="true"
    >
      <path
        d="M 18 3 L 9 17 L 16 17 L 13 29 L 24 14 L 17 14 Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Main About Page Component ───────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#F7F0E5] text-[#38271F] pt-28 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">

      {/* ── Natural Warm Editorial Background Canvas ── */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden"
      >
        {/* Full background image: warm natural stucco wall with sunlight and organic branch */}
        <img
          src="/images/about-background.jpg"
          alt=""
          className="w-full h-full object-cover object-top sm:object-center select-none"
        />

        {/* Gentle, soft warm atmospheric tone overlay preserving texture while ensuring readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(247, 240, 229, 0.22) 0%, rgba(247, 240, 229, 0.40) 45%, rgba(233, 220, 201, 0.50) 100%)',
          }}
        />

        {/* Subtle organic film grain texture */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.025] mix-blend-overlay pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="about-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#about-grain)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ═══════════════════════════════════════════════════════════
            HERO HEADER
        ═══════════════════════════════════════════════════════════ */}
        <header className="text-center pt-6 pb-12 sm:pb-16">
          <div className="mb-3 inline-flex items-center gap-2">
            <SketchSparkle color="#987452" className="opacity-80" />
            <span className="font-caveat text-2xl sm:text-3xl text-[#68452F]">
              community, culture &amp; craft
            </span>
            <SketchSparkle color="#68452F" className="opacity-80" />
          </div>

          <h1 className="font-black font-mono text-3xl sm:text-5xl md:text-6xl uppercase tracking-[0.16em] text-[#38271F] leading-tight">
            ABOUT INNOVANTA
          </h1>

          <p className="mt-3 text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-[#68452F] font-bold">
            MANIFEST. BUILD. IMPACT.
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="w-16 sm:w-28 h-px bg-gradient-to-r from-transparent to-[#CBB79D]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#68452F]" />
            <div className="w-16 sm:w-28 h-px bg-gradient-to-l from-transparent to-[#CBB79D]" />
          </div>
        </header>


        {/* ═══════════════════════════════════════════════════════════
            SECTION 1: COMMUNITY INTRODUCTION
            30% Beige subtle background surface (#E9DCC9 / #EFE5D6)
            Exact provided copy, clean, centered, premium typography
        ═══════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="community-intro-heading"
          className="relative mb-20 sm:mb-28"
        >
          <div className="relative bg-[#FBF7F0]/85 backdrop-blur-md border border-[#CBB79D]/70 rounded-3xl p-7 sm:p-12 md:p-14 shadow-[0_8px_30px_rgba(56,39,31,0.05)] max-w-4xl mx-auto">

            <TapeAccent className="absolute -top-2.5 left-8 rotate-[-2deg]" />
            <TapeAccent className="absolute -top-2.5 right-8 rotate-[2.5deg]" />

            <div className="text-center mb-8">
              <span className="inline-block px-3.5 py-1 rounded-full font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#68452F] bg-[#E9DCC9]/60 border border-[#CBB79D]/70">
                COMMUNITY INTRODUCTION
              </span>
              <h2
                id="community-intro-heading"
                className="mt-3 font-mono font-black text-xl sm:text-2xl md:text-3xl uppercase tracking-wider text-[#38271F]"
              >
                WHERE STUDENTS CONNECT &amp; THRIVE
              </h2>
              <div className="mt-1">
                <span className="font-caveat text-xl text-[#68452F]">
                  casual hangouts, meaningful conversations
                </span>
              </div>
            </div>

            {/* Clean, centered introduction text with exact word-for-word copy */}
            <div className="text-center max-w-3xl mx-auto space-y-5 text-[#38271F] font-normal leading-relaxed text-sm sm:text-base md:text-lg">
              <p className="font-sans font-medium text-[#38271F] text-base sm:text-lg md:text-xl">
                INNOVANTA is a community where students can relax, connect, and be themselves.
              </p>

              <p className="font-sans text-[#68452F]">
                It&apos;s a place to network, meet new people, and open up without the pressure.
              </p>

              <p className="font-sans text-[#68452F]">
                From café hangouts to casual conversations, we make every meetup feel natural.
              </p>

              <p className="font-sans text-[#68452F]">
                Sometimes a meeting turns into an outing, and sometimes a quick coffee becomes a whole evening.
              </p>

              <p className="font-sans text-[#68452F]">
                We believe the best connections happen when people feel comfortable being themselves.
              </p>

              <p className="font-sans font-medium text-[#38271F] text-base sm:text-lg pt-2">
                No unnecessary formality—just good people, fresh ideas, and memorable moments. 🧙♂️
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#CBB79D]/40 flex items-center justify-center gap-4 text-[#68452F]">
              <span className="font-caveat text-lg text-[#68452F]">no badges, just good energy</span>
              <span className="text-[#C58B45]">✦</span>
              <span className="font-mono text-xs tracking-widest text-[#987452] uppercase font-bold">EST. 2026</span>
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════════════════
            SECTION 2: FIVE MEMBER PROFILES
            FLOATING PHOTOGRAPHS WITHOUT RECTANGULAR CARD CONTAINERS
            - No surrounding box, no solid card background, no card borders
            - Subtle horizontal floating animation (4–6px, 5–7s)
            - Hand-drawn circles, arrows, handwritten labels preserved
        ═══════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="member-profiles-heading"
          className="relative mb-24"
        >
          {/* Section Heading */}
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 mb-2">
              <SketchSparkle color="#987452" />
              <span className="font-caveat text-2xl sm:text-3xl text-[#68452F]">
                the people behind the gathering
              </span>
              <SketchSparkle color="#68452F" />
            </div>

            <h2
              id="member-profiles-heading"
              className="font-mono font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-[0.12em] text-[#38271F]"
            >
              COMMUNITY CREW
            </h2>

            <p className="mt-2 font-mono text-xs sm:text-sm tracking-[0.25em] text-[#68452F] uppercase font-bold">
              FIVE VOICES // ONE SHARED TABLE
            </p>
          </div>

          {/* 
            Open, Unboxed Layout:
            All 5 photographs float naturally on the warm cream canvas.
            Preserves hand-drawn circles, arrows, labels, and descriptions.
          */}
          <div className="space-y-16 sm:space-y-20 lg:space-y-24">

            {/* ── ROW 1: SAKSHI & PIYUSH ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">

              {/* PROFILE 01 — SAKSHI (FLOATING, NO BOX CONTAINER) */}
              <div className="lg:col-span-6 relative flex flex-col items-center sm:items-start text-center sm:text-left">

                {/* Header: Number, Name, Role with sketch circle */}
                <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-3 pb-2 border-b border-[#CBB79D]/50">
                  <div className="flex items-center gap-2.5">
                    <span className="whitespace-nowrap flex-shrink-0 font-mono text-xs font-bold tracking-[0.2em] text-[#68452F] bg-[#E9DCC9]/60 border border-[#CBB79D]/70 px-2.5 py-0.5 rounded-full">
                      PROFILE 01
                    </span>
                    <h3 className="font-mono font-black text-xl sm:text-2xl text-[#38271F] tracking-wide">
                      SAKSHI
                    </h3>
                  </div>

                  {/* Role with hand-drawn sketch circle */}
                  <div className="relative inline-flex items-center justify-center px-4 py-1.5">
                    <span className="relative z-10 font-mono text-xs font-bold tracking-widest uppercase text-[#68452F] whitespace-nowrap">
                      Founder
                    </span>
                    <SketchCircle
                      color="#987452"
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </div>

                {/* Handwritten Callout Note with Arrow */}
                <div className="w-full flex items-center justify-between mb-4 text-xs">
                  <div className="flex items-center gap-1.5 text-[#68452F]">
                    <span className="font-caveat text-xl sm:text-2xl">
                      the catalyst ⚡
                    </span>
                    <SketchArrow direction="down-right" color="#987452" className="w-6 h-5" />
                  </div>
                  <RoleDoodle type="spark" color="#68452F" />
                </div>

                {/* Floating Photo: Directly on cream background with tape accent, NO rectangular box/panel */}
                <div className="relative w-full flex items-center justify-center py-2 overflow-visible">
                  <div className="relative max-w-[240px] sm:max-w-[260px]">
                    <TapeAccent className="absolute -top-3 left-4 rotate-[-3deg] z-20" />

                    {/* Floating photo element with horizontal sway */}
                    <div className="animate-float-photo-1">
                      <img
                        src="/images/members/sakshi.png"
                        alt="Sakshi — Founder"
                        className="w-full h-auto max-h-[380px] sm:max-h-[420px] object-contain rounded-2xl drop-shadow-[0_12px_28px_rgba(56,39,31,0.09)] select-none block"
                        loading="eager"
                      />
                    </div>
                  </div>
                </div>

                {/* Playful informal description */}
                <div className="w-full mt-4 pt-2">
                  <p className="font-sans text-sm sm:text-base text-[#68452F] leading-relaxed">
                    &ldquo;likely to give protein rich foods to her (she is allergic to it) 🧙♂️&rdquo;
                  </p>
                </div>
              </div>


              {/* PROFILE 02 — PIYUSH (FLOATING, NO BOX CONTAINER) */}
              <div className="lg:col-span-6 lg:mt-6 relative flex flex-col items-center sm:items-start text-center sm:text-left">

                {/* Header */}
                <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-3 pb-2 border-b border-[#CBB79D]/50">
                  <div className="flex items-center gap-2.5">
                    <span className="whitespace-nowrap flex-shrink-0 font-mono text-xs font-bold tracking-[0.2em] text-[#C58B45] bg-[#E9DCC9]/60 border border-[#CBB79D]/70 px-2.5 py-0.5 rounded-full">
                      PROFILE 02
                    </span>
                    <h3 className="font-mono font-black text-xl sm:text-2xl text-[#38271F] tracking-wide">
                      PIYUSH
                    </h3>
                  </div>

                  {/* Role with hand-drawn sketch circle */}
                  <div className="relative inline-flex items-center justify-center px-4 py-1.5">
                    <span className="relative z-10 font-mono text-xs font-bold tracking-widest uppercase text-[#C58B45] whitespace-nowrap">
                      Co-founder
                    </span>
                    <SketchCircle
                      color="#C58B45"
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </div>

                {/* Handwritten Callout Note */}
                <div className="w-full flex items-center justify-between mb-4 text-xs">
                  <div className="flex items-center gap-1.5 text-[#C58B45]">
                    <span className="font-caveat text-xl sm:text-2xl">
                      legendary battery life 📱🔋
                    </span>
                    <SketchArrow direction="down-right" color="#C58B45" className="w-6 h-5" />
                  </div>
                  <RoleDoodle type="phone" color="#C58B45" />
                </div>

                {/* Floating Photo: Directly on cream background with tape accent, NO rectangular box/panel */}
                <div className="relative w-full flex items-center justify-center py-2 overflow-visible">
                  <div className="relative max-w-[340px] sm:max-w-[380px]">
                    <TapeAccent className="absolute -top-3 right-4 rotate-[3deg] z-20" />

                    {/* Floating photo element with horizontal sway */}
                    <div className="animate-float-photo-2">
                      <img
                        src="/images/members/piyush.png"
                        alt="Piyush — Co-founder"
                        className="w-full h-auto max-h-[300px] sm:max-h-[340px] object-contain rounded-2xl drop-shadow-[0_12px_28px_rgba(56,39,31,0.09)] select-none block"
                        loading="eager"
                      />
                    </div>
                  </div>
                </div>

                {/* Playful informal description */}
                <div className="w-full mt-4 pt-2">
                  <p className="font-sans text-sm sm:text-base text-[#68452F] leading-relaxed">
                    &ldquo;rich person confuses us by his phone 🧙♂️&rdquo;
                  </p>
                </div>
              </div>

            </div>


            {/* Hand-drawn sketch divider between rows */}
            <div className="hidden lg:flex items-center justify-center gap-4 py-2 opacity-70">
              <span className="w-24 h-px border-t border-dashed border-[#987452]/50" />
              <span className="font-caveat text-lg text-[#68452F]">☕ coffee cups &amp; big ideas ⚡</span>
              <span className="w-24 h-px border-t border-dashed border-[#987452]/50" />
            </div>


            {/* ── ROW 2: YASH SITE & PRATHAMESH ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">

              {/* PROFILE 03 — YASH SITE (FLOATING, NO BOX CONTAINER) */}
              <div className="lg:col-span-6 relative flex flex-col items-center sm:items-start text-center sm:text-left">

                {/* Header */}
                <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-3 pb-2 border-b border-[#CBB79D]/50">
                  <div className="flex items-center gap-2.5">
                    <span className="whitespace-nowrap flex-shrink-0 font-mono text-xs font-bold tracking-[0.2em] text-[#68452F] bg-[#E9DCC9]/60 border border-[#CBB79D]/70 px-2.5 py-0.5 rounded-full">
                      PROFILE 03
                    </span>
                    <h3 className="font-mono font-black text-xl sm:text-2xl text-[#38271F] tracking-wide">
                      YASH SITE
                    </h3>
                  </div>

                  {/* Role with hand-drawn sketch circle */}
                  <div className="relative inline-flex items-center justify-center px-4 py-1.5">
                    <span className="relative z-10 font-mono text-xs font-bold tracking-widest uppercase text-[#68452F] whitespace-nowrap">
                      General Secretary
                    </span>
                    <SketchCircle
                      color="#987452"
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </div>

                {/* Handwritten Callout Note */}
                <div className="w-full flex items-center justify-between mb-4 text-xs">
                  <div className="flex items-center gap-1.5 text-[#68452F]">
                    <span className="font-caveat text-xl sm:text-2xl">
                      +5 spoons of sugar minimum 🍋
                    </span>
                    <SketchArrow direction="down-right" color="#987452" className="w-6 h-5" />
                  </div>
                  <RoleDoodle type="lemon" color="#987452" />
                </div>

                {/* Floating Photo: Directly on cream background with tape accent, NO rectangular box/panel */}
                <div className="relative w-full flex items-center justify-center py-2 overflow-visible">
                  <div className="relative max-w-[210px] sm:max-w-[240px]">
                    <TapeAccent className="absolute -top-3 left-4 rotate-[-2deg] z-20" />

                    {/* Floating photo element with horizontal sway */}
                    <div className="animate-float-photo-3">
                      <img
                        src="/images/members/yash.png"
                        alt="Yash Site — General Secretary"
                        className="w-full h-auto max-h-[380px] sm:max-h-[420px] object-contain rounded-2xl drop-shadow-[0_12px_28px_rgba(56,39,31,0.09)] select-none block"
                        loading="eager"
                      />
                    </div>
                  </div>
                </div>

                {/* Playful informal description */}
                <div className="w-full mt-4 pt-2">
                  <p className="font-sans text-sm sm:text-base text-[#68452F] leading-relaxed">
                    &ldquo;Even his lemonade comes with a sugar subscription. 🧙♂️&rdquo;
                  </p>
                </div>
              </div>


              {/* PROFILE 04 — PRATHAMESH (FLOATING, NO BOX CONTAINER) */}
              <div className="lg:col-span-6 lg:mt-6 relative flex flex-col items-center sm:items-start text-center sm:text-left">

                {/* Header */}
                <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-2 border-b border-[#CBB79D]/50">
                  <div className="flex items-center gap-2.5">
                    <span className="whitespace-nowrap flex-shrink-0 font-mono text-xs font-bold tracking-[0.2em] text-[#68452F] bg-[#E9DCC9]/60 border border-[#CBB79D]/70 px-2.5 py-0.5 rounded-full">
                      PROFILE 04
                    </span>
                    <h3 className="font-mono font-black text-xl sm:text-2xl text-[#38271F] tracking-wide">
                      PRATHAMESH
                    </h3>
                  </div>

                  {/* Role with hand-drawn sketch circle */}
                  <div className="relative inline-flex items-center justify-center px-4 py-1.5 self-start sm:self-auto">
                    <span className="relative z-10 font-mono text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#68452F] text-center leading-tight">
                      INNOVANTA Official Barista / Bartender
                    </span>
                    <SketchCircle
                      color="#987452"
                      className="absolute -inset-x-2 -inset-y-1 w-[calc(100%+16px)] h-[calc(100%+8px)]"
                    />
                  </div>
                </div>

                {/* Handwritten Callout Note */}
                <div className="w-full flex items-center justify-between mb-4 text-xs">
                  <div className="flex items-center gap-1.5 text-[#68452F]">
                    <span className="font-caveat text-xl sm:text-2xl">
                      master of brews &amp; vibes ☕💫
                    </span>
                    <SketchArrow direction="down-right" color="#987452" className="w-6 h-5" />
                  </div>
                  <RoleDoodle type="coffee" color="#68452F" />
                </div>

                {/* Floating Photo: Directly on cream background with tape accent, NO rectangular box/panel */}
                <div className="relative w-full flex items-center justify-center py-2 overflow-visible">
                  <div className="relative max-w-[210px] sm:max-w-[240px]">
                    <TapeAccent className="absolute -top-3 right-4 rotate-[3deg] z-20" />

                    {/* Floating photo element with horizontal sway */}
                    <div className="animate-float-photo-4">
                      <img
                        src="/images/members/prathamesh.png"
                        alt="Prathamesh — INNOVANTA Official Barista / Bartender"
                        className="w-full h-auto max-h-[380px] sm:max-h-[420px] object-contain rounded-2xl drop-shadow-[0_12px_28px_rgba(56,39,31,0.09)] select-none block"
                        loading="eager"
                      />
                    </div>
                  </div>
                </div>

                {/* Playful informal description */}
                <div className="w-full mt-4 pt-2">
                  <p className="font-sans text-sm sm:text-base text-[#68452F] leading-relaxed">
                    &ldquo; lobs fem boys ( he is in gay shits ) 🧙♂️&rdquo;
                  </p>
                </div>
              </div>

            </div>


            {/* ── ROW 3: SAMEEKSHA (CENTERED FLOATING FEATURE) ── */}
            <div className="max-w-2xl mx-auto relative flex flex-col items-center text-center">

              {/* Header */}
              <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-3 pb-2 border-b border-[#CBB79D]/50">
                <div className="flex items-center gap-2.5">
                  <span className="whitespace-nowrap flex-shrink-0 font-mono text-xs font-bold tracking-[0.2em] text-[#C58B45] bg-[#E9DCC9]/60 border border-[#CBB79D]/70 px-2.5 py-0.5 rounded-full">
                    PROFILE 05
                  </span>
                  <h3 className="font-mono font-black text-xl sm:text-2xl text-[#38271F] tracking-wide">
                    SAMEEKSHA
                  </h3>
                </div>

                {/* Role with hand-drawn sketch circle */}
                <div className="relative inline-flex items-center justify-center px-4 py-1.5">
                  <span className="relative z-10 font-mono text-xs font-bold tracking-widest uppercase text-[#C58B45] whitespace-nowrap">
                    Active Candidate
                  </span>
                  <SketchCircle
                    color="#C58B45"
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>

              {/* Handwritten Callout Note */}
              <div className="w-full flex items-center justify-between mb-4 text-xs">
                <div className="flex items-center gap-1.5 text-[#C58B45]">
                  <span className="font-caveat text-xl sm:text-2xl">
                    volume 1 of 100 lore 📜✨
                  </span>
                  <SketchArrow direction="down-right" color="#C58B45" className="w-6 h-5" />
                </div>
                <RoleDoodle type="scroll" color="#C58B45" />
              </div>

              {/* Floating Photo: Directly on cream background with tape accent, NO rectangular box/panel */}
              <div className="relative w-full flex items-center justify-center py-2 overflow-visible">
                <div className="relative max-w-[220px] sm:max-w-[250px]">
                  <TapeAccent className="absolute -top-3 left-4 rotate-[-2.5deg] z-20" />
                  <TapeAccent className="absolute -top-3 right-4 rotate-[2deg] z-20" />

                  {/* Floating photo element with horizontal sway */}
                  <div className="animate-float-photo-5">
                    <img
                      src="/images/members/sameeksha.png"
                      alt="Sameeksha — Active Candidate"
                      className="w-full h-auto max-h-[380px] sm:max-h-[420px] object-contain rounded-2xl drop-shadow-[0_12px_28px_rgba(56,39,31,0.09)] select-none block"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>

              {/* Playful informal description */}
              <div className="w-full mt-4 pt-2">
                <p className="font-sans text-sm sm:text-base text-[#68452F] leading-relaxed">
                  &ldquo;known for her breakup story 🧙♂️&rdquo;
                </p>
              </div>
            </div>

          </div>
        </section>


        {/* ═══════════════════════════════════════════════════════════
            SECTION 3: ETHOS & THE TRIAD (MANIFEST, BUILD, IMPACT)
            30% Beige secondary surfaces with 10% Espresso/Coffee text
        ═══════════════════════════════════════════════════════════ */}
        <section aria-labelledby="ethos-heading" className="space-y-10 pt-4">

          <div className="flex items-center justify-center gap-4">
            <div className="w-12 sm:w-24 h-px bg-[#CBB79D]" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#68452F] font-bold">
              FOUNDATIONAL PILLARS
            </span>
            <div className="w-12 sm:w-24 h-px bg-[#CBB79D]" />
          </div>

          {/* Philosophy Statement Card */}
          <div className="bg-[#FBF7F0]/85 backdrop-blur-md border border-[#CBB79D]/70 rounded-2xl p-8 sm:p-12 shadow-xs">
            <h2 id="ethos-heading" className="font-mono text-sm uppercase tracking-[0.2em] text-[#68452F] font-bold mb-4">
              OUR ETHOS
            </h2>
            <p className="font-mono text-xs sm:text-sm md:text-base text-[#38271F] leading-relaxed">
              INNOVANTA exists at the intersection of bold conceptual vision and uncompromising technical craftsmanship. We operate on the principle that transformative breakthroughs require both sovereign imagination and disciplined engineering.
            </p>
          </div>

          {/* The Three Pillars: MANIFEST, BUILD, IMPACT */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 01: MANIFEST */}
            <div className="bg-[#FBF7F0]/80 backdrop-blur-md border border-[#CBB79D]/70 rounded-2xl p-6 sm:p-8 hover:border-[#987452] transition-colors">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#68452F] font-bold uppercase block mb-1">
                01 // PILLAR
              </span>
              <h3 className="font-mono font-black text-2xl text-[#38271F] uppercase tracking-wide">
                MANIFEST
              </h3>
              <div className="my-2">
                <span className="font-caveat text-xl text-[#68452F]">
                  to conceive with clarity
                </span>
              </div>
              <p className="font-mono text-xs text-[#68452F] leading-relaxed mt-2">
                Distilling high-conviction ideas into rigorous architectural form. Challenging orthodoxy before the first foundation is laid.
              </p>
            </div>

            {/* Pillar 02: BUILD */}
            <div className="bg-[#FBF7F0]/80 backdrop-blur-md border border-[#CBB79D]/70 rounded-2xl p-6 sm:p-8 hover:border-[#68452F] transition-colors">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#68452F] font-bold uppercase block mb-1">
                02 // PILLAR
              </span>
              <h3 className="font-mono font-black text-2xl text-[#38271F] uppercase tracking-wide">
                BUILD
              </h3>
              <div className="my-2">
                <span className="font-caveat text-xl text-[#68452F]">
                  the discipline of craft
                </span>
              </div>
              <p className="font-mono text-xs text-[#68452F] leading-relaxed mt-2">
                Relentless execution across hardware, code, and systems. Prioritizing depth, stability, and zero-compromise engineering.
              </p>
            </div>

            {/* Pillar 03: IMPACT */}
            <div className="bg-[#FBF7F0]/80 backdrop-blur-md border border-[#CBB79D]/70 rounded-2xl p-6 sm:p-8 hover:border-[#987452] transition-colors">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#987452] font-bold uppercase block mb-1">
                03 // PILLAR
              </span>
              <h3 className="font-mono font-black text-2xl text-[#38271F] uppercase tracking-wide">
                IMPACT
              </h3>
              <div className="my-2">
                <span className="font-caveat text-xl text-[#987452]">
                  resonance that endures
                </span>
              </div>
              <p className="font-mono text-xs text-[#68452F] leading-relaxed mt-2">
                Measuring progress by meaningful, lasting change in human agency and enduring technological capability.
              </p>
            </div>
          </div>

          {/* Closing Signature */}
          <div className="mt-14 text-center pt-6">
            <span className="font-caveat text-2xl sm:text-3xl text-[#38271F]">
              — The Innovanta Collective
            </span>
          </div>
        </section>

      </div>
    </div>
  );
}
