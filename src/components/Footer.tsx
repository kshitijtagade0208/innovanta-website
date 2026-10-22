'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';

export function Footer() {
  const currentYear = '2026';

  return (
    <footer className="relative bg-[#FAF8F5] border-t border-[#E8DFD3] text-[#5C493E] py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand identity column */}
        <div className="flex flex-col space-y-2">
          <Logo size="md" showTagline={true} variant="light" />
          <p className="font-caveat text-xl text-[#3A4D39] max-w-sm tracking-wide mt-1">
            Where thoughtful design meets unrelenting engineering.
          </p>
        </div>

        {/* Exactly 3 Navigation links */}
        <div className="flex flex-wrap items-center gap-8 sm:gap-10">
          <Link
            href="/"
            className="text-xs font-mono font-bold tracking-[0.2em] text-[#5C493E] hover:text-[#C87D32] transition-colors uppercase"
          >
            HOME
          </Link>
          <Link
            href="/event"
            className="text-xs font-mono font-bold tracking-[0.2em] text-[#5C493E] hover:text-[#C87D32] transition-colors uppercase"
          >
            EVENT
          </Link>
          <Link
            href="/about"
            className="text-xs font-mono font-bold tracking-[0.2em] text-[#5C493E] hover:text-[#C87D32] transition-colors uppercase"
          >
            ABOUT
          </Link>
        </div>

        {/* Legal & Status */}
        <div className="flex flex-col items-start md:items-end space-y-1 text-xs font-mono text-[#8C7769]">
          <span className="tracking-wider text-[#2C1E16] font-bold">
            SAN FRANCISCO // GLOBAL
          </span>
          <span className="text-[10px] tracking-widest uppercase">
            © {currentYear} INNOVANTA. ALL RIGHTS RESERVED.
          </span>
        </div>
      </div>
    </footer>
  );
}
