'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Please enter a valid full name';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errs.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      errs.confirmPassword = 'Confirmation password is required';
    } else if (formData.confirmPassword !== formData.password) {
      errs.confirmPassword = 'Passwords do not match';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const result = signup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      router.push('/profile');
    } else {
      setGeneralError(result.error || 'Failed to create demo account');
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-[#FAF8F5] overflow-hidden">
      {/* Subtle warm architectural ambient background */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none select-none"
        style={{
          background:
            'radial-gradient(circle 600px at 50% 30%, rgba(200, 125, 50, 0.08) 0%, rgba(245, 242, 235, 0) 70%), radial-gradient(circle 500px at 85% 75%, rgba(58, 77, 57, 0.06) 0%, transparent 60%)',
        }}
      />

      {/* Decorative Technical Grid Crosshairs */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none opacity-[0.25] [background-size:48px_48px] [background-image:linear-gradient(to_right,#E8E3D9_1px,transparent_1px),linear-gradient(to_bottom,#E8E3D9_1px,transparent_1px)]"
      />

      <div className="relative z-10 w-full max-w-lg mx-auto">
        {/* Header Eyebrow & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#CBB79D] bg-[#F5F2EB]/90 mb-3 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C87D32]" />
            <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#68452F] uppercase">
              ARCHITECTURAL ACCESS // 01
            </span>
          </div>

          <h1 className="font-mono font-black text-3xl sm:text-4xl uppercase tracking-[0.08em] text-[#2C1E16] leading-tight">
            JOIN INNOVANTA
          </h1>

          <p className="font-caveat text-xl text-[#3A4D39] mt-1">
            forge your profile among visionary creators & builders
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-[#FAF8F5]/90 backdrop-blur-xl border border-[#E8E3D9] rounded-3xl p-6 sm:p-10 shadow-[0_18px_50px_rgba(44,30,22,0.06)] hover:border-[#CBB79D] transition-colors">
          {/* General Error Banner */}
          {generalError && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="text-sm font-sans">
                <p className="font-bold font-mono text-xs tracking-wider uppercase">REGISTRATION ERROR</p>
                <p className="mt-0.5 text-xs text-red-700">{generalError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="signup-name"
                className="block font-mono text-xs font-bold tracking-[0.2em] text-[#5C493E] uppercase mb-1.5"
              >
                FULL NAME <span className="text-[#C87D32]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C7769]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="signup-name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="e.g. Maya Lin"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#F5F2EB]/80 border text-[#2C1E16] placeholder-[#8C7769]/60 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#C87D32]/50 transition-all ${
                    errors.name ? 'border-red-400 bg-red-50/30' : 'border-[#E8E3D9] focus:border-[#C87D32]'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="mt-1 font-mono text-xs text-red-600 flex items-center gap-1">
                  <span>•</span> {errors.name}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="signup-email"
                className="block font-mono text-xs font-bold tracking-[0.2em] text-[#5C493E] uppercase mb-1.5"
              >
                EMAIL ADDRESS <span className="text-[#C87D32]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C7769]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="maya@innovanta.org"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#F5F2EB]/80 border text-[#2C1E16] placeholder-[#8C7769]/60 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#C87D32]/50 transition-all ${
                    errors.email ? 'border-red-400 bg-red-50/30' : 'border-[#E8E3D9] focus:border-[#C87D32]'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 font-mono text-xs text-red-600 flex items-center gap-1">
                  <span>•</span> {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="signup-password"
                className="block font-mono text-xs font-bold tracking-[0.2em] text-[#5C493E] uppercase mb-1.5"
              >
                PASSWORD <span className="text-[#C87D32]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C7769]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (errors.password) setErrors({ ...errors, password: '' });
                  }}
                  placeholder="At least 6 characters"
                  className={`w-full pl-10 pr-11 py-3 rounded-xl bg-[#F5F2EB]/80 border text-[#2C1E16] placeholder-[#8C7769]/60 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#C87D32]/50 transition-all ${
                    errors.password ? 'border-red-400 bg-red-50/30' : 'border-[#E8E3D9] focus:border-[#C87D32]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8C7769] hover:text-[#2C1E16] focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 font-mono text-xs text-red-600 flex items-center gap-1">
                  <span>•</span> {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="signup-confirm-password"
                className="block font-mono text-xs font-bold tracking-[0.2em] text-[#5C493E] uppercase mb-1.5"
              >
                CONFIRM PASSWORD <span className="text-[#C87D32]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C7769]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="signup-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, confirmPassword: e.target.value });
                    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                  }}
                  placeholder="Re-enter your password"
                  className={`w-full pl-10 pr-11 py-3 rounded-xl bg-[#F5F2EB]/80 border text-[#2C1E16] placeholder-[#8C7769]/60 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#C87D32]/50 transition-all ${
                    errors.confirmPassword ? 'border-red-400 bg-red-50/30' : 'border-[#E8E3D9] focus:border-[#C87D32]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8C7769] hover:text-[#2C1E16] focus:outline-none"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 font-mono text-xs text-red-600 flex items-center gap-1">
                  <span>•</span> {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#2C1E16] text-[#FAF8F5] font-mono text-xs font-bold tracking-[0.22em] uppercase hover:bg-[#38271F] hover:shadow-[0_8px_25px_rgba(44,30,22,0.18)] focus:outline-none focus:ring-2 focus:ring-[#C87D32] transition-all duration-300 disabled:opacity-60 cursor-pointer"
              >
                <span>{isSubmitting ? 'CREATING DEMO ACCOUNT...' : 'CREATE ACCOUNT'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          {/* Prototype / Demo Notice */}
          <div className="mt-6 pt-5 border-t border-[#E8E3D9] flex items-start gap-2.5 text-[#8C7769]">
            <ShieldCheck className="w-4 h-4 text-[#3A4D39] shrink-0 mt-0.5" />
            <p className="text-xs font-sans leading-relaxed">
              <strong className="font-mono text-[11px] text-[#5C493E] uppercase tracking-wider">
                FRONTEND PROTOTYPE:
              </strong>{' '}
              Data is saved strictly in your browser&apos;s local storage for previewing the member journey. No remote server is queried.
            </p>
          </div>

          {/* Link to Login */}
          <div className="mt-6 text-center">
            <p className="text-xs text-[#68452F] font-sans">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-mono font-bold tracking-wider text-[#C87D32] hover:text-[#2C1E16] underline underline-offset-4 decoration-[#C87D32]/50 hover:decoration-[#2C1E16] transition-colors"
              >
                LOG IN HERE →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
