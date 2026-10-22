'use client';

import React from 'react';
import { CoffeeVideo } from '@/components/CoffeeVideo';
import { IntroSequence } from '@/components/IntroSequence';
import { BrandStory } from '@/components/BrandStory';
import { useIntro } from '@/context/IntroContext';
import { RotateCcw } from 'lucide-react';

export default function HomePage() {
  const { replayIntro } = useIntro();

  return (
    <>
      {/* Intro cinematic overlay — shown only on first visit */}
      <IntroSequence />

      {/*
        Fixed video background layer.
        CoffeeVideo is already fixed inset-0 z-0 internally.
        It stays pinned while everything else scrolls.
      */}
      <CoffeeVideo />

      {/*
        Scrollable content layer.
        position: relative; z-index above video (z-10).
        min-h-screen so the first viewport is full coffee video.
        Does NOT use overflow-hidden so the page can scroll.
      */}
      <div className="relative z-10 text-white">
        {/* 
          First viewport: empty so the coffee video shows in full.
          The hero viewport height reserves space for the opening experience.
        */}
        <div className="min-h-screen flex flex-col justify-end pb-16 px-6 sm:px-12 md:px-20 lg:px-28 max-w-7xl w-full mx-auto pointer-events-none select-none">
          {/* Subtle scroll cue */}
          <div className="flex flex-col items-start gap-2 opacity-60">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#E8E3D9]/80 uppercase">
              Scroll to explore
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-[#E8E3D9]/60 to-transparent ml-[1px]" />
          </div>
        </div>

        {/* Brand story sections that reveal as user scrolls */}
        <BrandStory />

        {/* Replay trigger at the very bottom */}
        <div className="px-6 sm:px-12 md:px-20 lg:px-28 pb-10 pointer-events-auto">
          <button
            type="button"
            onClick={replayIntro}
            className="inline-flex items-center space-x-1.5 text-[10px] font-mono tracking-[0.2em] text-[#E8E3D9]/70 hover:text-white uppercase transition-colors p-2 focus:outline-none"
            title="Replay opening sequence"
          >
            <RotateCcw className="w-3 h-3" />
            <span>REPLAY REVEAL</span>
          </button>
        </div>
      </div>
    </>
  );
}
