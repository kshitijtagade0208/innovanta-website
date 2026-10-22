'use client';

import React, { useRef, useEffect, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface StoryBlockProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// ─── Intersection-observer reveal hook ───────────────────────────────────────

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el); // fire once
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ─── Reveal wrapper ──────────────────────────────────────────────────────────

function RevealBlock({ children, delay = 0, className = '' }: StoryBlockProps) {
  const { ref, visible } = useReveal(0.12);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Section divider ─────────────────────────────────────────────────────────

function Divider() {
  return (
    <div className="flex items-center gap-4 mb-10">
      <div className="w-8 h-px bg-[#C87D32]/60" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#C87D32]/80" />
      <div className="w-32 h-px bg-[#C87D32]/30" />
    </div>
  );
}

// ─── Numbered section ────────────────────────────────────────────────────────

interface NumberedSectionProps {
  number: string;
  headline: string;
  body: string;
  delay?: number;
}

function NumberedSection({ number, headline, body, delay = 0 }: NumberedSectionProps) {
  return (
    <RevealBlock delay={delay} className="max-w-2xl">
      <div className="flex items-start gap-6 mb-10">
        <span className="font-mono text-[#C87D32]/60 text-xs tracking-[0.3em] pt-1 flex-shrink-0 w-8">
          {number}
        </span>
        <div>
          <h3 className="font-mono font-bold text-xs sm:text-sm tracking-[0.3em] text-[#FAF8F5]/90 uppercase mb-3">
            {headline}
          </h3>
          <p className="font-sans text-sm sm:text-base text-[#E8E3D9]/75 leading-relaxed">
            {body}
          </p>
        </div>
      </div>
    </RevealBlock>
  );
}

// ─── Main BrandStory component ───────────────────────────────────────────────

export function BrandStory() {
  return (
    <section
      aria-label="INNOVANTA Brand Story"
      className="relative"
    >
      {/* Gentle dark gradient overlay at top of story to transition from video */}
      <div
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(20,13,9,0.55))',
        }}
      />

      <div className="relative px-6 sm:px-12 md:px-20 lg:px-28 max-w-5xl mx-auto py-24 space-y-0">

        {/* ── Opening introduction ── */}
        <RevealBlock delay={0}>
          <Divider />
        </RevealBlock>

        <RevealBlock delay={80}>
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-[#C87D32] uppercase mb-6">
            AN INTRODUCTION
          </p>
        </RevealBlock>

        <RevealBlock delay={160}>
          <h2 className="font-mono font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-[#FAF8F5] leading-tight mb-8 max-w-3xl">
            Some things are built.<br />
            <span className="text-[#C87D32]">INNOVANTA</span> is forged.
          </h2>
        </RevealBlock>

        <RevealBlock delay={240}>
          <p className="font-sans text-base sm:text-lg text-[#E8E3D9]/80 leading-relaxed max-w-2xl mb-20">
            Not a conference. Not a showcase. An exclusive arena where visionary
            engineering meets unyielding execution — where the next chapter of
            deep technology, sovereign architecture, and frontier AI is being
            written by the people in this room.
          </p>
        </RevealBlock>

        {/* ── Four numbered sections ── */}
        <div className="space-y-2 mb-24">
          <NumberedSection
            number="01"
            headline="The Builders"
            body="We bring together the rare individuals who don't just imagine the future — they fabricate it. Engineers who understand silicon at the gate level. Founders who have shipped products that matter. Researchers translating theory into deployable systems."
            delay={0}
          />

          <NumberedSection
            number="02"
            headline="The Arena"
            body="INNOVANTA is not a passive event. Every session, every conversation, every connection is designed with intention. The agenda is curated. The attendees are vetted. The environment demands participation."
            delay={80}
          />

          <NumberedSection
            number="03"
            headline="The Work"
            body="We focus on the problems that matter at civilisational scale — AI systems that operate at the frontier, hardware architectures that define sovereign capability, software stacks that outlast the companies that build them."
            delay={160}
          />

          <NumberedSection
            number="04"
            headline="The Standard"
            body="Mediocrity is not permitted here. We hold each other to a standard of craft, rigour, and ambition that most rooms cannot sustain. If you are here, you already understand why that matters."
            delay={240}
          />
        </div>

        {/* ── Closing statement ── */}
        <RevealBlock delay={0}>
          <div className="border-t border-[#E8E3D9]/15 pt-16 pb-8">
            <p className="font-mono font-black text-xl sm:text-2xl md:text-3xl tracking-[0.12em] text-[#FAF8F5] uppercase">
              INNOVANTA{' '}
              <span className="text-[#C87D32]">—</span>{' '}
              Think Bold. Build Beyond.
            </p>
          </div>
        </RevealBlock>

      </div>
    </section>
  );
}
