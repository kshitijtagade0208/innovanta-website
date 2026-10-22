'use client';

import React, { useRef, useEffect, useState } from 'react';
import { InfinityBlueprint } from '@/components/InfinityBlueprint';

// ─── Intersection-observer reveal hook ─────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ─── Reveal wrapper ────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal(0.08);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Speakers data ─────────────────────────────────────────────────────────
const SPEAKERS = [
  {
    number: '01',
    name: 'TUSHAR PAMNANI',
    tagline: 'Ideas. Innovation. Community.',
    photo: '/images/speaker-tushar-pamnani.png',
  },
  {
    number: '02',
    name: 'SIDDHARTH PARIHAR',
    tagline: 'Technology. Creativity. Building beyond.',
    photo: '/images/speaker-siddharth-parihar.png',
  },
] as const;

// ─── Event Page Component ──────────────────────────────────────────────────
export default function EventPage() {
  return (
    <div className="relative min-h-screen bg-[#F7F0E5] text-[#38271F] overflow-hidden select-none">
      
      {/* ═══════════════════════════════════════════════════════════
          BACKGROUND LAYER: ENHANCED INFINITY BLUEPRINT WATERMARK
          - Highly visible flowing curves, technical lines, measurement scales
          - Kept strictly behind foreground content (z-0, pointer-events-none)
      ═══════════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden"
      >
        <InfinityBlueprint />
      </div>

      {/* ── Main Content Container (z-10, readable foreground content) ── */}
      <div className="relative z-10 pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">

          {/* ═══════════════════════════════════════════════════════
              HERO — BREW & BUILD
          ═══════════════════════════════════════════════════════ */}
          <div className="text-center pt-4 sm:pt-8 pb-12 sm:pb-16 max-w-3xl mx-auto">
            {/* Expressive handwritten eyebrow */}
            <Reveal>
              <div className="mb-3">
                <span className="font-caveat text-2xl sm:text-3xl text-[#68452F]">
                  an innovanta gathering
                </span>
              </div>
            </Reveal>

            {/* Main Title: # BREW & BUILD */}
            <Reveal delay={80}>
              <h1 className="font-mono font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-[0.08em] text-[#38271F] leading-[0.9]">
                BREW
                <span className="text-[#C58B45]">&nbsp;&&nbsp;</span>
                BUILD
              </h1>
            </Reveal>

            {/* Date: ### 18.10.26 */}
            <Reveal delay={160}>
              <div className="flex items-center justify-center gap-4 mt-6 mb-3">
                <div className="w-10 sm:w-16 h-px bg-[#CBB79D]" />
                <span className="font-mono text-xs sm:text-sm md:text-base tracking-[0.35em] text-[#C58B45] font-bold uppercase">
                  18.10.26
                </span>
                <div className="w-10 sm:w-16 h-px bg-[#CBB79D]" />
              </div>
            </Reveal>

            {/* Subtitle: Where ideas meet execution. */}
            <Reveal delay={240}>
              <p className="font-mono text-xs sm:text-sm tracking-[0.22em] text-[#68452F] uppercase font-bold mt-3">
                Where ideas meet execution.
              </p>
            </Reveal>

            {/* Event Description */}
            <Reveal delay={320}>
              <p className="font-sans text-base sm:text-lg text-[#68452F] leading-relaxed mt-6 max-w-2xl mx-auto">
                An evening of bold ideas, real-world experiences, and conversations around
                building what&apos;s next. Join us for a gathering of curious minds, technology
                enthusiasts, and innovators shaping the future.
              </p>
            </Reveal>
          </div>

          {/* ═══════════════════════════════════════════════════════
              DIVIDER 1 (---)
          ═══════════════════════════════════════════════════════ */}
          <Reveal delay={380}>
            <div className="flex items-center justify-center gap-3 mb-16 sm:mb-20">
              <div className="w-20 sm:w-36 h-px bg-gradient-to-r from-transparent to-[#CBB79D]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#C58B45]" />
              <div className="w-20 sm:w-36 h-px bg-gradient-to-l from-transparent to-[#CBB79D]" />
            </div>
          </Reveal>

          {/* ═══════════════════════════════════════════════════════
              SPEAKERS SECTION
              01 — TUSHAR PAMNANI
              02 — SIDDHARTH PARIHAR
          ═══════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-4xl mx-auto">
            {SPEAKERS.map((speaker, idx) => (
              <Reveal key={speaker.name} delay={150 * (idx + 1)}>
                <article
                  className="group relative h-full flex flex-col bg-[#F7F0E5]/90 backdrop-blur-md border border-[#CBB79D] rounded-3xl p-6 sm:p-8 hover:border-[#C58B45]/60 transition-all duration-500 hover:shadow-[0_16px_45px_rgba(197,139,69,0.12)]"
                >
                  {/* Speaker Number & Name */}
                  <div className="text-center pb-2 min-h-[72px] sm:min-h-[80px] flex flex-col justify-center">
                    <h2 className="font-mono font-black text-lg sm:text-xl md:text-2xl tracking-[0.03em] text-[#38271F] uppercase">
                      {speaker.number} — {speaker.name}
                    </h2>

                    {/* Tagline in italics */}
                    <p className="italic font-serif text-sm sm:text-base text-[#68452F] tracking-wide mt-1">
                      {speaker.tagline}
                    </p>
                  </div>

                  {/* Speaker Photo Card — uncropped to showcase all doodle annotations */}
                  <div className="mt-4 flex-1 flex items-center justify-center">
                    <div className="w-full rounded-2xl overflow-hidden border border-[#CBB79D]/70 bg-[#EFE5D6]/40 shadow-xs group-hover:shadow-md transition-shadow duration-300">
                      <img
                        src={speaker.photo}
                        alt={`${speaker.name} — ${speaker.tagline}`}
                        className="w-full h-auto object-contain block mx-auto select-none"
                        loading="eager"
                      />
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* ═══════════════════════════════════════════════════════
              DIVIDER 2 (---)
          ═══════════════════════════════════════════════════════ */}
          <Reveal delay={200}>
            <div className="flex items-center justify-center gap-3 my-16 sm:my-20">
              <div className="w-20 sm:w-36 h-px bg-gradient-to-r from-transparent to-[#CBB79D]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#C58B45]" />
              <div className="w-20 sm:w-36 h-px bg-gradient-to-l from-transparent to-[#CBB79D]" />
            </div>
          </Reveal>

          {/* ═══════════════════════════════════════════════════════
              CLOSING — Think Bold. Build Beyond.
          ═══════════════════════════════════════════════════════ */}
          <Reveal delay={260}>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-mono font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.1em] text-[#38271F] leading-tight">
                Think Bold.{' '}
                <span className="text-[#C58B45]">Build Beyond.</span>
              </h2>

              <p className="mt-4 font-caveat text-2xl sm:text-3xl text-[#68452F]">
                Where vision meets execution.
              </p>

              <div className="mt-8 inline-flex items-center gap-2.5 font-mono text-[10px] sm:text-xs tracking-[0.3em] text-[#38271F] uppercase border border-[#CBB79D] bg-[#E9DCC9]/80 px-4 py-2 rounded-full shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C58B45]" />
                <span>INNOVANTA // BREW &amp; BUILD // 18.10.26</span>
              </div>
            </div>
          </Reveal>

          {/* ═══════════════════════════════════════════════════════
              MAJOR SECTION DIVIDER
          ═══════════════════════════════════════════════════════ */}
          <Reveal delay={150}>
            <div className="flex items-center justify-center gap-4 my-24 sm:my-32">
              <div className="w-24 sm:w-44 h-px bg-gradient-to-r from-transparent via-[#CBB79D] to-transparent" />
              <span className="font-caveat text-xl sm:text-2xl text-[#68452F]">✦ ✦ ✦</span>
              <div className="w-24 sm:w-44 h-px bg-gradient-to-l from-transparent via-[#CBB79D] to-transparent" />
            </div>
          </Reveal>


          {/* ═══════════════════════════════════════════════════════
              PART 2 — EVENT GALLERY
              Order: #2 after existing first event section
              Exact required heading & description copy
              Genuine existing event photos
          ═══════════════════════════════════════════════════════ */}
          <section
            id="event-gallery"
            aria-labelledby="event-gallery-heading"
            className="relative mb-28 sm:mb-36 scroll-mt-24"
          >
            {/* Gallery Header */}
            <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
              <Reveal>
                <div className="mb-2">
                  <span className="font-caveat text-2xl sm:text-3xl text-[#68452F]">
                    moments &amp; memories
                  </span>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h2
                  id="event-gallery-heading"
                  className="font-mono font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-[0.14em] text-[#38271F]"
                >
                  EVENT GALLERY
                </h2>
              </Reveal>

              <Reveal delay={160}>
                <div className="flex items-center justify-center gap-3 my-4">
                  <div className="w-12 sm:w-20 h-px bg-[#CBB79D]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#68452F]" />
                  <div className="w-12 sm:w-20 h-px bg-[#CBB79D]" />
                </div>
              </Reveal>

              {/* Exact required Gallery Description */}
              <Reveal delay={240}>
                <p className="font-sans text-base sm:text-lg text-[#68452F] leading-relaxed max-w-2xl mx-auto mt-2">
                  Every event leaves behind more than photographs—it creates connections,
                  unexpected conversations, and moments worth remembering. Explore the people,
                  ideas, and experiences that bring the INNOVANTA community together.
                </p>
              </Reveal>
            </div>

            {/* Gallery Placeholder — Tasteful Empty State awaiting curated event photographs */}
            <Reveal delay={100}>
              <div className="max-w-2xl mx-auto bg-[#EFE5D6]/35 backdrop-blur-xs border border-[#CBB79D]/70 rounded-3xl p-8 sm:p-12 text-center shadow-[0_8px_30px_rgba(56,39,31,0.03)]">
                {/* Minimal gallery / camera sketch icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#E9DCC9]/70 border border-[#CBB79D] text-[#68452F] mb-6">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-7 h-7"
                    aria-hidden="true"
                  >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </div>

                <p className="font-mono font-medium text-base sm:text-lg text-[#38271F] tracking-wide max-w-lg mx-auto">
                  Photographs and documented memories from our gatherings are being curated.
                </p>

                <p className="mt-3 font-sans text-xs sm:text-sm text-[#68452F] leading-relaxed max-w-md mx-auto">
                  Official snapshots from INNOVANTA events will be exhibited here following each gathering.
                </p>

                <div className="mt-8 pt-6 border-t border-[#CBB79D]/40 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-[#68452F] font-mono">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#68452F]" />
                    <span>CURATED MOMENTS</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#68452F]" />
                    <span>COMMUNITY ARCHIVE</span>
                  </span>
                </div>
              </div>
            </Reveal>
          </section>


          {/* ═══════════════════════════════════════════════════════
              MAJOR SECTION DIVIDER
          ═══════════════════════════════════════════════════════ */}
          <Reveal delay={150}>
            <div className="flex items-center justify-center gap-4 my-20 sm:my-28">
              <div className="w-24 sm:w-44 h-px bg-gradient-to-r from-transparent via-[#CBB79D] to-transparent" />
              <span className="font-caveat text-xl sm:text-2xl text-[#68452F]">☕ ✦ ☕</span>
              <div className="w-24 sm:w-44 h-px bg-gradient-to-l from-transparent via-[#CBB79D] to-transparent" />
            </div>
          </Reveal>


          {/* ═══════════════════════════════════════════════════════
              PART 3 — UPCOMING EVENTS
              Order: #3 immediately after EVENT GALLERY
              Exact required heading & description copy
              Exact required placeholder (no unconfirmed details)
          ═══════════════════════════════════════════════════════ */}
          <section
            id="upcoming-events"
            aria-labelledby="upcoming-events-heading"
            className="relative mb-20 scroll-mt-24"
          >
            {/* Upcoming Events Header */}
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <Reveal>
                <div className="mb-2">
                  <span className="font-caveat text-2xl sm:text-3xl text-[#68452F]">
                    on the horizon
                  </span>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h2
                  id="upcoming-events-heading"
                  className="font-mono font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-[0.14em] text-[#38271F]"
                >
                  UPCOMING EVENTS
                </h2>
              </Reveal>

              <Reveal delay={160}>
                <div className="flex items-center justify-center gap-3 my-4">
                  <div className="w-12 sm:w-20 h-px bg-[#CBB79D]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#68452F]" />
                  <div className="w-12 sm:w-20 h-px bg-[#CBB79D]" />
                </div>
              </Reveal>

              {/* Exact required Upcoming Events Description */}
              <Reveal delay={240}>
                <p className="font-sans text-base sm:text-lg text-[#68452F] leading-relaxed max-w-2xl mx-auto mt-2">
                  Something exciting is always on the horizon. From relaxed café gatherings to creative sessions and conversations around technology, our upcoming events are designed to bring curious minds together. Stay tuned for what&apos;s next.
                </p>
              </Reveal>
            </div>

            {/* Deliberate, elegant placeholder presentation (no fabricated dates, venues, or empty cards) */}
            <Reveal delay={300}>
              <div className="max-w-2xl mx-auto bg-[#EFE5D6]/35 backdrop-blur-xs border border-[#CBB79D]/70 rounded-3xl p-8 sm:p-12 text-center shadow-[0_8px_30px_rgba(56,39,31,0.03)]">
                {/* Aesthetic coffee cup icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#E9DCC9]/70 border border-[#CBB79D] text-[#68452F] mb-6">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-7 h-7"
                    aria-hidden="true"
                  >
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                    <line x1="6" y1="1" x2="6" y2="4" />
                    <line x1="10" y1="1" x2="10" y2="4" />
                    <line x1="14" y1="1" x2="14" y2="4" />
                  </svg>
                </div>

                {/* Exact required placeholder text */}
                <p className="font-mono font-medium text-base sm:text-lg text-[#38271F] tracking-wide max-w-lg mx-auto">
                  New experiences are in the making. Check back soon for upcoming INNOVANTA events.
                </p>

                <div className="mt-8 pt-6 border-t border-[#CBB79D]/40 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-[#68452F] font-mono">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#68452F]" />
                    <span>CAFE SESSIONS</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#68452F]" />
                    <span>TECH DIALOGUES</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#68452F]" />
                    <span>WORKSHOPS</span>
                  </span>
                </div>
              </div>
            </Reveal>
          </section>

        </div>
      </div>
    </div>
  );
}
