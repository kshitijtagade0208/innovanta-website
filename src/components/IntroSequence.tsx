'use client';

import React, { useEffect, useState } from 'react';
import { useIntro } from '@/context/IntroContext';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export function IntroSequence() {
  const { hasSeenIntro, completeIntro, isMounted } = useIntro();
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<'initial' | 'logo' | 'tagline' | 'revealVideo' | 'done'>('initial');

  useEffect(() => {
    if (!isMounted) return;
    if (hasSeenIntro) {
      setPhase('done');
      return;
    }

    if (shouldReduceMotion) {
      const timer = setTimeout(() => {
        completeIntro();
        setPhase('done');
      }, 400);
      return () => clearTimeout(timer);
    }

    // Sequence timeline:
    // 1. Reveal the actual INNOVANTA logo
    const t1 = setTimeout(() => setPhase('logo'), 300);
    // 2. Reveal the tagline "MANIFEST. BUILD. IMPACT."
    const t2 = setTimeout(() => setPhase('tagline'), 1300);
    // 3. Gradually reveal the coffee-pouring footage behind/around the logo
    const t3 = setTimeout(() => setPhase('revealVideo'), 2800);
    // 4. Complete intro overlay
    const t4 = setTimeout(() => {
      completeIntro();
      setPhase('done');
    }, 4200);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        completeIntro();
        setPhase('done');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasSeenIntro, isMounted, completeIntro, shouldReduceMotion]);

  if (!isMounted || hasSeenIntro || phase === 'done') {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="innovanta-intro-overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'revealVideo' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1C1410] select-none pointer-events-none"
      >
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {/* 1. Reveal the Actual INNOVANTA Infinity Symbol */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{
              scale: phase !== 'initial' ? 1 : 0.7,
              opacity: phase !== 'initial' ? 1 : 0,
            }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-32 sm:w-44 md:w-56 h-auto relative mb-6 flex items-center justify-center"
          >
            <img
              src="/images/innovanta-symbol.png"
              alt="INNOVANTA Logo"
              className="w-full h-auto object-contain mix-blend-screen"
            />
          </motion.div>

          {/* Heading: INNOVANTA */}
          <motion.h1
            initial={{ opacity: 0, letterSpacing: '0.15em', y: 15 }}
            animate={{
              opacity: phase !== 'initial' ? 1 : 0,
              letterSpacing: phase !== 'initial' ? '0.3em' : '0.15em',
              y: phase !== 'initial' ? 0 : 15,
            }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-black font-mono text-4xl sm:text-6xl md:text-7xl uppercase text-[#FAF8F5] drop-shadow-md"
          >
            INNOVANTA
          </motion.h1>

          {/* 2. Reveal the Tagline "MANIFEST. BUILD. IMPACT." */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: phase === 'tagline' || phase === 'revealVideo' ? 1 : 0,
              y: phase === 'tagline' || phase === 'revealVideo' ? 0 : 15,
            }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="mt-6 flex flex-col items-center gap-2"
          >
            <div className="flex items-center space-x-3 sm:space-x-5 text-xs sm:text-sm md:text-base font-mono uppercase tracking-[0.35em] text-[#C87D32] font-bold">
              <span>MANIFEST.</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B7059]" />
              <span>BUILD.</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B7059]" />
              <span>IMPACT.</span>
            </div>

            {/* Expressive handwritten Caveat annotation */}
            <span className="font-caveat text-xl sm:text-2xl text-[#E8E3D9]/90 mt-1">
              craft, architecture, and enduring impact
            </span>
          </motion.div>
        </div>

        {/* Skip button in corner */}
        <button
          type="button"
          onClick={() => {
            completeIntro();
            setPhase('done');
          }}
          className="absolute bottom-8 right-8 z-20 text-[11px] font-mono tracking-[0.25em] text-[#E8E3D9]/70 hover:text-[#FAF8F5] uppercase px-3 py-1.5 rounded-full border border-[#E8E3D9]/20 hover:border-[#C87D32] bg-[#1C1410]/80 backdrop-blur-md transition-all pointer-events-auto"
        >
          SKIP [ESC]
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
