'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const NAV_ITEMS = [
  { label: 'HOME', href: '/' },
  { label: 'EVENT', href: '/event' },
  { label: 'ABOUT', href: '/about' },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, isAuthenticated, isMounted, logout } = useAuth();

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

  // Helper for initials
  const initials = currentUser?.name
    ? currentUser.name
        .split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

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

          {/* Desktop Auth / Profile Actions (Right Side) */}
          <div className="hidden md:flex items-center space-x-3">
            {isMounted && (
              <>
                {isAuthenticated && currentUser ? (
                  <Link
                    href="/profile"
                    className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full border text-xs font-mono font-bold tracking-[0.18em] transition-all duration-300 ${
                      pathname === '/profile'
                        ? 'border-[#C87D32] bg-[#C87D32]/10 text-[#C87D32]'
                        : isHome && !scrolled
                        ? 'border-white/20 bg-white/10 text-white hover:border-[#C87D32] hover:bg-white/15'
                        : 'border-[#E8E3D9] bg-[#F5F2EB]/80 text-[#2C1E16] hover:border-[#C87D32] hover:bg-[#F5F2EB]'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white font-bold"
                      style={{ backgroundColor: currentUser.avatarColor || '#C87D32' }}
                    >
                      {initials}
                    </span>
                    <span>PROFILE</span>
                  </Link>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Link
                      href="/login"
                      className={`text-xs font-mono font-bold tracking-[0.22em] transition-colors py-1 ${
                        pathname === '/login'
                          ? 'text-[#C87D32]'
                          : isHome && !scrolled
                          ? 'text-[#E8E3D9] hover:text-white'
                          : 'text-[#5C493E] hover:text-[#2C1E16]'
                      }`}
                    >
                      LOG IN
                    </Link>
                    <span
                      className={`h-3 w-px ${
                        isHome && !scrolled ? 'bg-white/20' : 'bg-[#E8E3D9]'
                      }`}
                    />
                    <Link
                      href="/signup"
                      className={`text-xs font-mono font-bold tracking-[0.2em] px-3.5 py-1.5 rounded-full border transition-all duration-200 ${
                        pathname === '/signup'
                          ? 'bg-[#C87D32] text-white border-[#C87D32]'
                          : isHome && !scrolled
                          ? 'border-white/30 text-white hover:bg-white/10'
                          : 'border-[#2C1E16]/20 text-[#2C1E16] hover:border-[#C87D32] hover:bg-[#F5F2EB]'
                      }`}
                    >
                      SIGN UP
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

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

      {/* Mobile Drawer Menu: Navigation + Account */}
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

            {/* Mobile Auth / Profile Section */}
            {isMounted && (
              <div className="pt-2 border-t border-[#E8E3D9]">
                {isAuthenticated && currentUser ? (
                  <div className="bg-[#F5F2EB] border border-[#E8E3D9] rounded-2xl p-4 flex flex-col space-y-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-xs"
                        style={{ backgroundColor: currentUser.avatarColor || '#C87D32' }}
                      >
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-sm font-bold text-[#2C1E16] truncate">
                          {currentUser.name}
                        </p>
                        <p className="text-xs text-[#68452F] truncate">
                          {currentUser.email}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Link
                        href="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#2C1E16] text-[#FAF8F5] font-mono text-xs font-bold tracking-wider hover:bg-[#38271F]"
                      >
                        <UserIcon className="w-3.5 h-3.5" />
                        <span>PROFILE</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#CBB79D] text-[#68452F] font-mono text-xs font-bold tracking-wider hover:bg-[#EFE5D6]"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>LOG OUT</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center py-3 rounded-xl border border-[#E8E3D9] bg-[#F5F2EB] font-mono text-xs font-bold tracking-[0.2em] text-[#2C1E16] hover:border-[#C87D32]"
                    >
                      LOG IN
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center py-3 rounded-xl bg-[#C87D32] text-white font-mono text-xs font-bold tracking-[0.2em] hover:bg-[#B36E28]"
                    >
                      SIGN UP
                    </Link>
                  </div>
                )}
              </div>
            )}

            <div className="pt-4 border-t border-[#E8E3D9] text-center">
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
