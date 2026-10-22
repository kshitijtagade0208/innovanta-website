'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'HOME', href: '/' },
  { label: 'EVENT', href: '/event' },
  { label: 'ABOUT', href: '/about' },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isHome && !scrolled
            ? 'bg-black/30 backdrop-blur-sm border-b border-white/10 py-4 text-white'
            : 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E3D9] py-3.5 shadow-xs text-[#2C1E16]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
          {/* Brand Identity / Logo */}
          <div className="flex-shrink-0">
            <Logo
              size="sm"
              asLink={true}
              variant={isHome && !scrolled ? 'dark' : 'light'}
            />
          </div>

          {/* Desktop Navigation: Exactly 3 items (HOME | EVENT | ABOUT) horizontally centered without panel */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center space-x-8 sm:space-x-10 absolute left-1/2 -translate-x-1/2"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-1 text-xs font-mono font-bold tracking-[0.25em] transition-colors select-none ${
                    isActive
                      ? isHome && !scrolled
                        ? 'text-white'
                        : 'text-[#2C1E16]'
                      : isHome && !scrolled
                      ? 'text-[#E8E3D9]/75 hover:text-white'
                      : 'text-[#5C493E] hover:text-[#2C1E16]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C87D32] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>



          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg border focus:outline-none ${
                isHome && !scrolled
                  ? 'text-white bg-black/40 border-white/20'
                  : 'text-[#2C1E16] bg-[#F5F2EB] border-[#E8E3D9]'
              }`}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#C87D32]" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu: Exactly 3 items (HOME | EVENT | ABOUT) */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#FAF8F5]/98 backdrop-blur-xl md:hidden flex flex-col justify-center px-8 transition-opacity"
        >
          <div className="flex flex-col space-y-6 max-w-sm mx-auto w-full">
            <div className="text-center pb-6 border-b border-[#E8E3D9]">
              <Logo size="md" asLink={false} showTagline={true} variant="light" />
            </div>

            <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-4 rounded-xl font-mono text-base font-bold tracking-[0.2em] transition-all border ${
                      isActive
                        ? 'bg-[#2C1E16] text-[#FAF8F5] border-[#2C1E16]'
                        : 'text-[#5C493E] hover:text-[#2C1E16] border-[#E8E3D9] bg-[#F5F2EB]/50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#C87D32]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-6 border-t border-[#E8E3D9] text-center">
              <span className="font-caveat text-xl text-[#3A4D39]">
                an arena of craft & intentional architecture
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
