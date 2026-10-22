'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  User as UserIcon,
  Mail,
  Briefcase,
  Calendar,
  Edit3,
  Check,
  X,
  LogOut,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { currentUser, isAuthenticated, isMounted, updateProfile, logout } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    role: '',
    bio: '',
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Sync form when currentUser changes or editing is entered
  useEffect(() => {
    if (currentUser) {
      setEditForm({
        name: currentUser.name || '',
        email: currentUser.email || '',
        role: currentUser.role || 'Innovanta Pioneer // Builder',
        bio: currentUser.bio || 'Architecting sovereign systems and impactful ventures.',
      });
    }
  }, [currentUser, isEditing]);

  const handleStartEdit = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setErrorMsg(null);
    if (currentUser) {
      setEditForm({
        name: currentUser.name || '',
        email: currentUser.email || '',
        role: currentUser.role || '',
        bio: currentUser.bio || '',
      });
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!editForm.name.trim()) {
      setErrorMsg('Full name cannot be blank.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!editForm.email.trim() || !emailRegex.test(editForm.email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    const res = updateProfile({
      name: editForm.name,
      email: editForm.email,
      role: editForm.role,
      bio: editForm.bio,
    });

    if (res.success) {
      setSuccessMsg('Profile updated successfully in browser storage.');
      setIsEditing(false);
      setTimeout(() => setSuccessMsg(null), 4000);
    } else {
      setErrorMsg(res.error || 'Failed to update profile.');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Prevent hydration flicker
  if (!isMounted) {
    return (
      <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-[#FAF8F5]">
        <div className="w-10 h-10 border-2 border-[#C87D32] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  // Unauthenticated / No Active Demo Session State
  if (!isAuthenticated || !currentUser) {
    return (
      <main className="relative min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-[#FAF8F5] overflow-hidden">
        {/* Subtle ambient warm aura */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none select-none"
          style={{
            background:
              'radial-gradient(circle 500px at 50% 35%, rgba(200, 125, 50, 0.08) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 w-full max-w-lg mx-auto text-center">
          <div className="bg-[#FAF8F5]/95 backdrop-blur-xl border border-[#E8E3D9] rounded-3xl p-8 sm:p-12 shadow-[0_18px_50px_rgba(44,30,22,0.06)]">
            <div className="w-16 h-16 rounded-2xl bg-[#F5F2EB] border border-[#CBB79D] flex items-center justify-center mx-auto mb-5 shadow-xs">
              <UserIcon className="w-8 h-8 text-[#8C7769]" />
            </div>

            <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#C87D32] uppercase block mb-2">
              SESSION STATUS // GUEST
            </span>

            <h1 className="font-mono font-black text-2xl sm:text-3xl text-[#2C1E16] uppercase tracking-[0.06em]">
              NO ACTIVE DEMO SESSION
            </h1>

            <p className="font-sans text-sm text-[#68452F] mt-3 leading-relaxed max-w-md mx-auto">
              You are currently viewing the INNOVANTA ecosystem as an anonymous guest. Log in to your demo profile or register a new one to access personal architectural records.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#2C1E16] text-[#FAF8F5] font-mono text-xs font-bold tracking-[0.2em] hover:bg-[#38271F] transition-all shadow-xs"
              >
                <span>LOG IN</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-[#CBB79D] bg-[#F5F2EB] text-[#2C1E16] font-mono text-xs font-bold tracking-[0.2em] hover:border-[#C87D32] hover:bg-white transition-all shadow-2xs"
              >
                <span>CREATE DEMO ACCOUNT</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Initials for avatar
  const initials = currentUser.name
    ? currentUser.name
        .split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'IV';

  return (
    <main className="relative min-h-screen pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] overflow-hidden">
      {/* Subtle warm background layers */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none select-none"
        style={{
          background:
            'radial-gradient(circle 700px at 20% 20%, rgba(200, 125, 50, 0.08) 0%, transparent 60%), radial-gradient(circle 600px at 80% 80%, rgba(58, 77, 57, 0.07) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Eyebrow & Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#E8E3D9]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#CBB79D] bg-[#F5F2EB]/90 mb-3 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C87D32]" />
              <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#68452F] uppercase">
                INNOVANTA DOSSIER // VERIFIED
              </span>
            </div>

            <h1 className="font-mono font-black text-3xl sm:text-4xl uppercase tracking-[0.08em] text-[#2C1E16]">
              PIONEER PROFILE
            </h1>
            <p className="font-caveat text-xl text-[#3A4D39] mt-0.5">
              your sovereign identity and session workspace
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!isEditing && (
              <button
                type="button"
                onClick={handleStartEdit}
                className="inline-flex items-center gap-2 py-2 px-4 rounded-xl border border-[#CBB79D] bg-[#F5F2EB] text-[#2C1E16] font-mono text-xs font-bold tracking-wider hover:border-[#C87D32] hover:bg-white transition-all shadow-2xs cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#C87D32]" />
                <span>EDIT PROFILE</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 py-2 px-4 rounded-xl border border-red-200 bg-red-50/60 text-red-800 font-mono text-xs font-bold tracking-wider hover:bg-red-100 hover:border-red-300 transition-all shadow-2xs cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-red-600" />
              <span>LOG OUT</span>
            </button>
          </div>
        </div>

        {/* Feedback Notifications */}
        {successMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3 animate-fade-in">
            <Check className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="text-sm font-sans font-medium">{successMsg}</p>
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 flex items-center gap-3 animate-fade-in">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <p className="text-sm font-sans font-medium">{errorMsg}</p>
          </div>
        )}

        {/* Main Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Avatar & Quick Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-[#FAF8F5]/90 backdrop-blur-xl border border-[#E8E3D9] rounded-3xl p-6 sm:p-8 shadow-[0_12px_36px_rgba(44,30,22,0.05)] text-center relative overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-2"
                style={{ backgroundColor: currentUser.avatarColor || '#C87D32' }}
              />

              {/* Avatar Monogram */}
              <div className="relative inline-block mx-auto mb-4 mt-2">
                <div
                  className="w-24 h-24 rounded-3xl flex items-center justify-center text-3xl font-mono font-black text-white shadow-md border-4 border-white"
                  style={{ backgroundColor: currentUser.avatarColor || '#C87D32' }}
                >
                  {initials}
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#FAF8F5] border-2 border-white flex items-center justify-center shadow-xs">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500" title="Active Session" />
                </div>
              </div>

              <h2 className="font-mono font-black text-xl text-[#2C1E16] uppercase tracking-wide">
                {currentUser.name}
              </h2>
              <p className="text-xs text-[#68452F] font-sans mt-0.5 break-all">
                {currentUser.email}
              </p>

              <div className="mt-4 pt-4 border-t border-[#E8E3D9] flex flex-col gap-2 text-left">
                <div className="flex items-center gap-2 text-xs text-[#5C493E]">
                  <Briefcase className="w-3.5 h-3.5 text-[#C87D32] shrink-0" />
                  <span className="truncate">{currentUser.role || 'Pioneer Member'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#5C493E]">
                  <Calendar className="w-3.5 h-3.5 text-[#3A4D39] shrink-0" />
                  <span>Joined {currentUser.createdAt || 'October 2026'}</span>
                </div>
              </div>

              {/* Quick links to explore site */}
              <div className="mt-6 pt-5 border-t border-[#E8E3D9] flex flex-col gap-2">
                <Link
                  href="/event"
                  className="flex items-center justify-between py-2 px-3 rounded-xl bg-[#F5F2EB] hover:bg-[#EFE5D6] text-[#2C1E16] font-mono text-xs font-bold tracking-wider transition-colors"
                >
                  <span>BREW & BUILD EVENT</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C87D32]" />
                </Link>
                <Link
                  href="/about"
                  className="flex items-center justify-between py-2 px-3 rounded-xl bg-[#F5F2EB] hover:bg-[#EFE5D6] text-[#2C1E16] font-mono text-xs font-bold tracking-wider transition-colors"
                >
                  <span>ABOUT INNOVANTA</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#3A4D39]" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Details / Edit Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#FAF8F5]/90 backdrop-blur-xl border border-[#E8E3D9] rounded-3xl p-6 sm:p-8 shadow-[0_12px_36px_rgba(44,30,22,0.05)]">
              {isEditing ? (
                /* Edit Mode */
                <form onSubmit={handleSaveEdit} className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E8E3D9]">
                    <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#C87D32] uppercase">
                      EDITING PROFILE DETAILS
                    </span>
                    <span className="text-xs text-[#8C7769] font-sans">
                      Changes persist to your browser storage
                    </span>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block font-mono text-xs font-bold tracking-[0.2em] text-[#5C493E] uppercase mb-1.5">
                      FULL NAME <span className="text-[#C87D32]">*</span>
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F5F2EB] border border-[#E8E3D9] text-[#2C1E16] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#C87D32]/50 focus:border-[#C87D32]"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-mono text-xs font-bold tracking-[0.2em] text-[#5C493E] uppercase mb-1.5">
                      EMAIL ADDRESS <span className="text-[#C87D32]">*</span>
                    </label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F5F2EB] border border-[#E8E3D9] text-[#2C1E16] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#C87D32]/50 focus:border-[#C87D32]"
                      required
                    />
                  </div>

                  {/* Role / Title */}
                  <div>
                    <label className="block font-mono text-xs font-bold tracking-[0.2em] text-[#5C493E] uppercase mb-1.5">
                      SPECIALIZATION // ROLE
                    </label>
                    <input
                      type="text"
                      value={editForm.role}
                      onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                      placeholder="e.g. Frontier AI Engineer & Founder"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F5F2EB] border border-[#E8E3D9] text-[#2C1E16] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#C87D32]/50 focus:border-[#C87D32]"
                    />
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block font-mono text-xs font-bold tracking-[0.2em] text-[#5C493E] uppercase mb-1.5">
                      PERSONAL STATEMENT // BIO
                    </label>
                    <textarea
                      rows={3}
                      value={editForm.bio}
                      onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      placeholder="Share your focus, domain, or vision..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F5F2EB] border border-[#E8E3D9] text-[#2C1E16] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#C87D32]/50 focus:border-[#C87D32] resize-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#E8E3D9]">
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="inline-flex items-center gap-1.5 py-2.5 px-4 rounded-xl border border-[#CBB79D] text-[#5C493E] font-mono text-xs font-bold tracking-wider hover:bg-[#F5F2EB] transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>CANCEL</span>
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 py-2.5 px-5 rounded-xl bg-[#2C1E16] text-[#FAF8F5] font-mono text-xs font-bold tracking-wider hover:bg-[#38271F] transition-colors shadow-xs cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5 text-[#C87D32]" />
                      <span>SAVE CHANGES</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* View Mode */
                <div className="space-y-6">
                  <div>
                    <h3 className="font-mono text-xs font-bold tracking-[0.2em] text-[#8C7769] uppercase mb-1">
                      BIO & ARCHITECTURAL FOCUS
                    </h3>
                    <p className="font-sans text-base text-[#2C1E16] leading-relaxed">
                      {currentUser.bio || 'Exploring the frontier of technology and execution.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E8E3D9]">
                    <div className="p-4 rounded-2xl bg-[#F5F2EB]/60 border border-[#E8E3D9]/80">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-[#8C7769] uppercase block mb-1">
                        MEMBERSHIP TIER
                      </span>
                      <p className="font-mono font-bold text-sm text-[#2C1E16]">
                        PIONEER // FOUNDING CIRCLE
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F5F2EB]/60 border border-[#E8E3D9]/80">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-[#8C7769] uppercase block mb-1">
                        SECURITY STATUS
                      </span>
                      <p className="font-mono font-bold text-sm text-[#3A4D39] flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" />
                        <span>LOCAL PROTOTYPE AUTH</span>
                      </p>
                    </div>
                  </div>

                  {/* Architecture metadata strip */}
                  <div className="pt-4 border-t border-[#E8E3D9] flex flex-wrap items-center justify-between gap-3 text-xs text-[#8C7769] font-mono">
                    <span>DEMO ID: {currentUser.id}</span>
                    <span className="flex items-center gap-1 text-[#C87D32]">
                      <Sparkles className="w-3.5 h-3.5" />
                      SYNCHRONIZED WITH BROWSER
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
