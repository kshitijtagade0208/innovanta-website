'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, getDemoCredentials } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const demoCreds = getDemoCredentials();

  const validate = () => {
    const errs: Record<string, string> = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email format';
    }

    if (!formData.password) {
      errs.password = 'Password is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const result = login(formData.email, formData.password);

    if (result.success) {
      router.push('/profile');
    } else {
      setLoginError(result.error || 'Invalid credentials');
      setIsSubmitting(false);
    }
  };

  const handleFillDemo = () => {
    setFormData({
      email: demoCreds.email,
      password: demoCreds.password,
    });
    setErrors({});
    setLoginError(null);
  };

  return (
    <main className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-[#FAF8F5] overflow-hidden">
      {/* Subtle warm architectural ambient background */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none select-none"
        style={{
          background:
            'radial-gradient(circle 600px at 50% 30%, rgba(200, 125, 50, 0.08) 0%, rgba(245, 242, 235, 0) 70%), radial-gradient(circle 500px at 15% 70%, rgba(58, 77, 57, 0.06) 0%, transparent 60%)',
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
              ARCHITECTURAL ACCESS // 02
            </span>
          </div>

          <h1 className="font-mono font-black text-3xl sm:text-4xl uppercase tracking-[0.08em] text-[#2C1E16] leading-tight">
            INNOVANTA LOGIN
          </h1>

          <p className="font-caveat text-xl text-[#3A4D39] mt-1">
            welcome back to the arena of sovereign craft
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-[#FAF8F5]/90 backdrop-blur-xl border border-[#E8E3D9] rounded-3xl p-6 sm:p-10 shadow-[0_18px_50px_rgba(44,30,22,0.06)] hover:border-[#CBB79D] transition-colors">
          {/* Quick Demo Pre-fill Banner */}
          <div className="mb-6 p-4 rounded-2xl bg-[#F5F2EB] border border-[#E8E3D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="text-xs font-sans">
              <span className="font-mono font-bold tracking-wider text-[#C87D32] uppercase block">
                DEMO CREDENTIALS
              </span>
              <p className="text-[#68452F] mt-0.5">
                <code className="text-[#2C1E16] bg-white/70 px-1.5 py-0.5 rounded font-mono text-[11px]">
                  {demoCreds.email}
                </code>{' '}
                / <code className="text-[#2C1E16] bg-white/70 px-1.5 py-0.5 rounded font-mono text-[11px]">{demoCreds.password}</code>
              </p>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-white border border-[#CBB79D] text-[#2C1E16] font-mono text-[11px] font-bold tracking-wider hover:bg-[#EFE5D6] hover:border-[#C87D32] transition-colors shrink-0 shadow-2xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C87D32]" />
              <span>AUTO-FILL</span>
            </button>
          </div>

          {/* Login Error Banner */}
          {loginError && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="text-sm font-sans">
                <p className="font-bold font-mono text-xs tracking-wider uppercase">AUTHENTICATION FAILED</p>
                <p className="mt-0.5 text-xs text-red-700">{loginError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email Address */}
            <div>
              <label
                htmlFor="login-email"
                className="block font-mono text-xs font-bold tracking-[0.2em] text-[#5C493E] uppercase mb-1.5"
              >
                EMAIL ADDRESS <span className="text-[#C87D32]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C7769]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="name@innovanta.org"
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
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="login-password"
                  className="block font-mono text-xs font-bold tracking-[0.2em] text-[#5C493E] uppercase"
                >
                  PASSWORD <span className="text-[#C87D32]">*</span>
                </label>
                <span className="font-mono text-[10px] tracking-wider text-[#8C7769]">
                  DEMO PASSCODE
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C7769]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (errors.password) setErrors({ ...errors, password: '' });
                  }}
                  placeholder="••••••••••••"
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

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#2C1E16] text-[#FAF8F5] font-mono text-xs font-bold tracking-[0.22em] uppercase hover:bg-[#38271F] hover:shadow-[0_8px_25px_rgba(44,30,22,0.18)] focus:outline-none focus:ring-2 focus:ring-[#C87D32] transition-all duration-300 disabled:opacity-60 cursor-pointer"
              >
                <span>{isSubmitting ? 'AUTHENTICATING...' : 'SIGN IN TO PROFILE'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          {/* Disclaimer */}
          <div className="mt-6 pt-5 border-t border-[#E8E3D9] flex items-start gap-2.5 text-[#8C7769]">
            <ShieldAlert className="w-4 h-4 text-[#C87D32] shrink-0 mt-0.5" />
            <p className="text-xs font-sans leading-relaxed">
              <strong className="font-mono text-[11px] text-[#5C493E] uppercase tracking-wider">
                MOCK DEMO ENVIRONMENT:
              </strong>{' '}
              This prototype does not connect to a production backend or store real passwords. Use only demo or test credentials.
            </p>
          </div>

          {/* Link to Sign Up */}
          <div className="mt-6 text-center">
            <p className="text-xs text-[#68452F] font-sans">
              Need a new demo account?{' '}
              <Link
                href="/signup"
                className="font-mono font-bold tracking-wider text-[#C87D32] hover:text-[#2C1E16] underline underline-offset-4 decoration-[#C87D32]/50 hover:decoration-[#2C1E16] transition-colors"
              >
                CREATE ONE HERE →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
