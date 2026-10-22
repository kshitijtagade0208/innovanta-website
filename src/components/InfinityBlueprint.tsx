'use client';

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';

/**
 * InfinityBlueprint
 *
 * Enriched architectural blueprint watermark for the INNOVANTA Event page.
 * Follows the warm coffee-inspired palette:
 *  - Primary background: Warm cream (#F7F0E5)
 *  - Secondary surfaces: Soft beige (#E9DCC9)
 *  - Light technical details: Pale sand (#EFE5D6)
 *  - Primary text: Deep espresso (#38271F)
 *  - Secondary text: Coffee brown (#68452F)
 *  - Technical lines: Warm brown (#987452)
 *  - Highlights: Muted amber (#C58B45)
 *  - Subtle borders: Warm taupe (#CBB79D)
 *
 * Visual Hierarchy:
 *  1. Main infinity artwork / Core curve: strongest visual prominence.
 *  2. Major watermark curves: clearly visible but secondary.
 *  3. Measurement scales and tick marks: distinct and easy to notice.
 *  4. Fine construction lines: subtle but discernible.
 */

// ─── Geometry Helpers ────────────────────────────────────────────────────────

function generateLemniscatePoints(
  cx: number,
  cy: number,
  a: number,
  yScale = 1.46,
  count = 36
) {
  const pts: { x: number; y: number; ox: number; oy: number }[] = [];
  for (let i = 0; i < count; i++) {
    const t = -Math.PI + (i / count) * 2 * Math.PI;
    const denom = 1 + Math.sin(t) ** 2;
    const x = cx + (a * Math.cos(t)) / denom;
    const y = cy - (a * Math.sin(t) * Math.cos(t) * yScale) / denom;
    pts.push({ x, y, ox: x, oy: y });
  }
  return pts;
}

function pointsToSvgPath(pts: { x: number; y: number }[]): string {
  const n = pts.length;
  if (n < 3) return '';
  const d: string[] = [`M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`];
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d.push(
      `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
    );
  }
  d.push('Z');
  return d.join(' ');
}

// ─── Static SVG Path Constants ────────────────────────────────────────────────

const BASE_CORE_PATH =
  'M 800.0,450.0 C 856.5,367.6 905.5,298.3 1007.8,298.3 C 1054.5,298.3 1100.0,377.4 1100.0,450.0 C 1100.0,522.6 1054.5,601.7 1007.8,601.7 C 905.5,601.7 856.5,532.4 800.0,450.0 C 743.5,532.4 694.5,601.7 592.2,601.7 C 545.5,601.7 500.0,522.6 500.0,450.0 C 500.0,377.4 545.5,298.3 592.2,298.3 C 694.5,298.3 743.5,367.6 800.0,450.0 Z';

const BASE_HARMONIC_PATH =
  'M 800.0,450.0 C 878.9,335.7 945.7,243.6 1083.5,243.6 C 1145.9,243.6 1206.0,349.5 1206.0,450.0 C 1206.0,550.5 1145.9,656.4 1083.5,656.4 C 945.7,656.4 878.9,564.3 800.0,450.0 C 721.1,564.3 654.3,656.4 516.5,656.4 C 454.1,656.4 394.0,550.5 394.0,450.0 C 394.0,349.5 454.1,243.6 516.5,243.6 C 654.3,243.6 721.1,335.7 800.0,450.0 Z';

const BASE_OUTER_PATH =
  'M 800.0,450.0 C 909.1,291.6 996.1,169.3 1184.8,169.3 C 1269.8,169.3 1352.0,313.4 1352.0,450.0 C 1352.0,586.6 1269.8,730.7 1184.8,730.7 C 996.1,730.7 909.1,608.4 800.0,450.0 C 690.9,608.4 603.9,730.7 415.2,730.7 C 330.2,730.7 248.0,586.6 248.0,450.0 C 248.0,313.4 330.2,169.3 415.2,169.3 C 603.9,169.3 690.9,291.6 800.0,450.0 Z';

const BASE_GRAND_PATH =
  'M 800.0,450.0 C 930.0,260.0 1035.0,118.0 1255.0,118.0 C 1356.0,118.0 1450.0,285.0 1450.0,450.0 C 1450.0,615.0 1356.0,782.0 1255.0,782.0 C 1035.0,782.0 930.0,640.0 800.0,450.0 C 670.0,640.0 565.0,782.0 345.0,782.0 C 244.0,782.0 150.0,615.0 150.0,450.0 C 150.0,285.0 244.0,118.0 345.0,118.0 C 565.0,118.0 670.0,260.0 800.0,450.0 Z';

const BASE_FIELD_PATH =
  'M 800.0,450.0 C 960.0,218.0 1090.0,56.0 1340.0,56.0 C 1460.0,56.0 1570.0,230.0 1570.0,450.0 C 1570.0,670.0 1460.0,844.0 1340.0,844.0 C 1090.0,844.0 960.0,682.0 800.0,450.0 C 640.0,682.0 510.0,844.0 260.0,844.0 C 140.0,844.0 30.0,670.0 30.0,450.0 C 30.0,230.0 140.0,56.0 260.0,56.0 C 510.0,56.0 640.0,218.0 800.0,450.0 Z';

// ─── Component ────────────────────────────────────────────────────────────────

interface InfinityBlueprintProps {
  className?: string;
}

export function InfinityBlueprint({ className = '' }: InfinityBlueprintProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealDone, setRevealDone] = useState(false);
  const [interactivePath1, setInteractivePath1] = useState(BASE_CORE_PATH);
  const [interactivePath2, setInteractivePath2] = useState(BASE_HARMONIC_PATH);
  const [interactiveField, setInteractiveField] = useState(BASE_FIELD_PATH);

  const corePts = useMemo(() => generateLemniscatePoints(800, 450, 300, 1.46, 36), []);
  const harmonicPts = useMemo(() => generateLemniscatePoints(800, 450, 406, 1.46, 40), []);
  const fieldPts = useMemo(() => generateLemniscatePoints(800, 450, 620, 1.32, 48), []);

  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false });
  const animFrameRef = useRef<number | null>(null);

  // Staged reveal timer
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mq.matches) {
        setRevealDone(true);
        return;
      }
    }
    const t = setTimeout(() => setRevealDone(true), 2400);
    return () => clearTimeout(t);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    mouseRef.current.targetX = (e.clientX - rect.left) * (1600 / rect.width);
    mouseRef.current.targetY = (e.clientY - rect.top) * (900 / rect.height);
    mouseRef.current.active = true;
    if (mouseRef.current.x < -500) {
      mouseRef.current.x = mouseRef.current.targetX;
      mouseRef.current.y = mouseRef.current.targetY;
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    mouseRef.current.active = false;
    mouseRef.current.targetX = -1000;
    mouseRef.current.targetY = -1000;
  }, []);

  useEffect(() => {
    if (!revealDone) return;

    let time = 0;
    const animate = () => {
      time += 0.035;
      const m = mouseRef.current;

      if (m.active) {
        m.x += (m.targetX - m.x) * 0.1;
        m.y += (m.targetY - m.y) * 0.1;
      } else {
        m.x += (-1000 - m.x) * 0.06;
        m.y += (-1000 - m.y) * 0.06;
      }

      const r1 = 240, maxD1 = 18;
      const r2 = 300, maxD2 = 14;
      const r3 = 380, maxD3 = 8;

      const deform = (
        pts: typeof corePts,
        radius: number,
        maxDisplace: number,
        wavePhase: number
      ) =>
        pts.map((p) => {
          const dx = p.ox - m.x;
          const dy = p.oy - m.y;
          const dist = Math.hypot(dx, dy);
          if (dist < radius && m.x > 0) {
            const factor = Math.pow(1 - dist / radius, 2);
            const angle = Math.atan2(dy, dx);
            const wave = Math.sin(dist * 0.04 - time * 2 + wavePhase) * factor * 4;
            const push = factor * maxDisplace + wave;
            return { x: p.ox + Math.cos(angle) * push, y: p.oy + Math.sin(angle) * push };
          }
          return { x: p.ox, y: p.oy };
        });

      setInteractivePath1(pointsToSvgPath(deform(corePts, r1, maxD1, 0)));
      setInteractivePath2(pointsToSvgPath(deform(harmonicPts, r2, maxD2, Math.PI / 4)));
      setInteractiveField(pointsToSvgPath(deform(fieldPts, r3, maxD3, Math.PI / 2)));

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [revealDone, corePts, harmonicPts, fieldPts]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label="INNOVANTA Infinity Blueprint Watermark"
      className={`relative w-full h-full flex items-center justify-center select-none pointer-events-none ${className}`}
    >
      {/* ── Ambient Warm Cream & Sand Canvas (#F7F0E5 dominant) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 45%, #F7F0E5 0%, #EFE5D6 55%, #E9DCC9 100%)',
        }}
      />

      {/* ── Full-Bleed Technical Drafting Grid in warm taupe/brown ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Coarse grid — 64px (distinct, visible technical lines #987452) */}
          <pattern id="gridCoarse" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#987452" strokeWidth="0.75" strokeOpacity="0.32" />
          </pattern>
          {/* Fine subdivision grid — 16px (#CBB79D) */}
          <pattern id="gridFine" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#CBB79D" strokeWidth="0.45" strokeOpacity="0.28" />
          </pattern>
          {/* Node dots at intersections */}
          <pattern id="gridDots" width="64" height="64" patternUnits="userSpaceOnUse">
            <circle cx="64" cy="0" r="1.3" fill="#987452" opacity="0.42" />
            <circle cx="0" cy="0" r="1.3" fill="#987452" opacity="0.42" />
            <circle cx="0" cy="64" r="1.3" fill="#987452" opacity="0.42" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridFine)" />
        <rect width="100%" height="100%" fill="url(#gridCoarse)" />
        <rect width="100%" height="100%" fill="url(#gridDots)" />
      </svg>

      {/* ── Large Official INNOVANTA Infinity Symbol Watermark (More visible!) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none flex items-center justify-center overflow-hidden"
      >
        <img
          src="/images/innovanta-symbol.png"
          alt=""
          className="w-[84vw] max-w-4xl lg:max-w-5xl h-auto object-contain opacity-[0.24] mix-blend-multiply drop-shadow-[0_4px_28px_rgba(197,139,69,0.18)]"
        />
      </div>

      {/* ── Blueprint Artwork SVG Layer ── */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 flex items-center justify-center">
        <svg
          className="w-full h-auto max-h-[78vh] pointer-events-none overflow-visible"
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Core infinity gradient with warm brown, amber (#C58B45), and purple (#7C3AED) */}
            <linearGradient id="infinityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.75" />
              <stop offset="26%" stopColor="#8B5CF6" stopOpacity="0.65" />
              <stop offset="46%" stopColor="#987452" stopOpacity="0.55" />
              <stop offset="54%" stopColor="#987452" stopOpacity="0.55" />
              <stop offset="74%" stopColor="#C58B45" stopOpacity="0.68" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0.78" />
            </linearGradient>

            {/* Dashed secondary gradient */}
            <linearGradient id="infinityDashedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.50" />
              <stop offset="35%" stopColor="#8B5CF6" stopOpacity="0.42" />
              <stop offset="50%" stopColor="#987452" stopOpacity="0.36" />
              <stop offset="65%" stopColor="#C58B45" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.50" />
            </linearGradient>

            {/* Outer contour field gradient */}
            <linearGradient id="contourGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.28" />
              <stop offset="30%" stopColor="#987452" stopOpacity="0.38" />
              <stop offset="50%" stopColor="#987452" stopOpacity="0.36" />
              <stop offset="70%" stopColor="#987452" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#C58B45" stopOpacity="0.28" />
            </linearGradient>

            {/* Wing spline gradients */}
            <linearGradient id="purpleWing" x1="100%" y1="50%" x2="0%" y2="50%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
              <stop offset="45%" stopColor="#7C3AED" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.30" />
            </linearGradient>
            <linearGradient id="amberWing" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#C58B45" stopOpacity="0.25" />
              <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#987452" stopOpacity="0.30" />
            </linearGradient>

            {/* Subtle focal glows */}
            <radialGradient id="focalPurpleGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="focalAmberGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C58B45" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#C58B45" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ── Focal halos ── */}
          <circle cx="460" cy="450" r="340" fill="url(#focalPurpleGlow)" />
          <circle cx="1140" cy="450" r="340" fill="url(#focalAmberGlow)" />

          {/* ══════════════════════════════════════════════════════
              HIERARCHY 4: FINE CONSTRUCTION LINES & CORNER ARCS
          ══════════════════════════════════════════════════════ */}

          {/* Corner Partial Arcs (framed composition) */}
          <g stroke="#987452" fill="none" strokeWidth="0.85" opacity="0.45" className="anim-fade-bg">
            <path d="M 220,0 A 260,260 0 0 1 0,220" />
            <path d="M 160,0 A 200,200 0 0 1 0,160" strokeDasharray="6 6" strokeWidth="0.6" />
            <path d="M 1380,0 A 260,260 0 0 0 1600,220" />
            <path d="M 1440,0 A 200,200 0 0 0 1600,160" strokeDasharray="6 6" strokeWidth="0.6" />
            <path d="M 220,900 A 260,260 0 0 0 0,680" />
            <path d="M 160,900 A 200,200 0 0 0 0,740" strokeDasharray="6 6" strokeWidth="0.6" />
            <path d="M 1380,900 A 260,260 0 0 1 1600,680" />
            <path d="M 1440,900 A 200,200 0 0 1 1600,740" strokeDasharray="6 6" strokeWidth="0.6" />
          </g>

          {/* Corner dimension ticks */}
          <g stroke="#68452F" strokeWidth="0.8" opacity="0.48" className="anim-fade-bg">
            <line x1="0" y1="100" x2="20" y2="100" /><line x1="0" y1="200" x2="20" y2="200" />
            <line x1="100" y1="0" x2="100" y2="20" /><line x1="200" y1="0" x2="200" y2="20" />
            <line x1="1600" y1="100" x2="1580" y2="100" /><line x1="1600" y1="200" x2="1580" y2="200" />
            <line x1="1500" y1="0" x2="1500" y2="20" /><line x1="1400" y1="0" x2="1400" y2="20" />
            <line x1="0" y1="800" x2="20" y2="800" /><line x1="0" y1="700" x2="20" y2="700" />
            <line x1="100" y1="900" x2="100" y2="880" /><line x1="200" y1="900" x2="200" y2="880" />
            <line x1="1600" y1="800" x2="1580" y2="800" /><line x1="1600" y1="700" x2="1580" y2="700" />
            <line x1="1500" y1="900" x2="1500" y2="880" /><line x1="1400" y1="900" x2="1400" y2="880" />
          </g>

          {/* Extended construction lines from main geometry */}
          <g stroke="#987452" strokeWidth="0.8" opacity="0.42" className="anim-fade-bg">
            <line x1="0" y1="298" x2="500" y2="298" strokeDasharray="8 10" />
            <line x1="1100" y1="298" x2="1600" y2="298" strokeDasharray="8 10" />
            <line x1="0" y1="601" x2="500" y2="601" strokeDasharray="8 10" />
            <line x1="1100" y1="601" x2="1600" y2="601" strokeDasharray="8 10" />
            <line x1="500" y1="0" x2="500" y2="380" strokeDasharray="8 10" />
            <line x1="500" y1="520" x2="500" y2="900" strokeDasharray="8 10" />
            <line x1="1100" y1="0" x2="1100" y2="380" strokeDasharray="8 10" />
            <line x1="1100" y1="520" x2="1100" y2="900" strokeDasharray="8 10" />
          </g>

          {/* Diagonal tangent construction guides */}
          <g stroke="#987452" strokeWidth="0.75" strokeDasharray="5 9" opacity="0.36" className="anim-fade-stage3">
            <line x1="80" y1="780" x2="1520" y2="120" />
            <line x1="80" y1="120" x2="1520" y2="780" />
            <line x1="460" y1="450" x2="0" y2="0" />
            <line x1="460" y1="450" x2="0" y2="900" />
            <line x1="1140" y1="450" x2="1600" y2="0" />
            <line x1="1140" y1="450" x2="1600" y2="900" />
          </g>

          {/* Generative Contour Field (outermost curve) */}
          <path
            d={revealDone ? interactiveField : BASE_FIELD_PATH}
            fill="none"
            stroke="url(#contourGrad)"
            strokeWidth="1.1"
            strokeDasharray="20 14"
            opacity="0.52"
            className={revealDone ? '' : 'anim-draw-lemniscate-field'}
          />

          {/* Topographic contour echoes */}
          <g fill="none" stroke="#CBB79D" strokeWidth="0.7" opacity="0.38" strokeDasharray="10 14" className="anim-fade-bg">
            <path d="M 800,450 C 680,310 500,220 300,180 C 180,158 80,150 20,148" />
            <path d="M 800,450 C 680,590 500,680 300,720 C 180,742 80,750 20,752" />
            <path d="M 800,450 C 920,310 1100,220 1300,180 C 1420,158 1520,150 1580,148" />
            <path d="M 800,450 C 920,590 1100,680 1300,720 C 1420,742 1520,750 1580,752" />
          </g>

          {/* Purple & Amber accent contour arcs */}
          <g fill="none" stroke="#7C3AED" opacity="0.30" className="anim-fade-bg">
            <path d="M 800,450 C 640,240 360,130 80,90" strokeWidth="0.9" strokeDasharray="12 10" />
            <path d="M 800,450 C 640,660 360,770 80,810" strokeWidth="0.9" strokeDasharray="12 10" />
          </g>
          <g fill="none" stroke="#C58B45" opacity="0.30" className="anim-fade-bg">
            <path d="M 800,450 C 960,240 1240,130 1520,90" strokeWidth="0.9" strokeDasharray="12 10" />
            <path d="M 800,450 C 960,660 1240,770 1520,810" strokeWidth="0.9" strokeDasharray="12 10" />
          </g>

          {/* ══════════════════════════════════════════════════════
              HIERARCHY 3: MEASUREMENT SCALES & CALIBRATION TICKS
              Clearly distinguishable against background
          ══════════════════════════════════════════════════════ */}

          {/* Corner Registration Marks */}
          <g stroke="#68452F" strokeWidth="0.85" opacity="0.65" fill="none" className="anim-fade-stage4">
            <circle cx="90" cy="80" r="10" /><line x1="74" y1="80" x2="106" y2="80" /><line x1="90" y1="64" x2="90" y2="96" />
            <circle cx="1510" cy="80" r="10" /><line x1="1494" y1="80" x2="1526" y2="80" /><line x1="1510" y1="64" x2="1510" y2="96" />
            <circle cx="90" cy="820" r="10" /><line x1="74" y1="820" x2="106" y2="820" /><line x1="90" y1="804" x2="90" y2="836" />
            <circle cx="1510" cy="820" r="10" /><line x1="1494" y1="820" x2="1526" y2="820" /><line x1="1510" y1="804" x2="1510" y2="836" />
          </g>

          {/* Primary Axis Lines */}
          <g stroke="#987452" strokeWidth="0.9" strokeDasharray="6 8" opacity="0.65" className="anim-fade-stage1">
            <line x1="60" y1="450" x2="1540" y2="450" />
            <line x1="800" y1="50" x2="800" y2="850" />
          </g>

          {/* Axis Graduation Ticks & Measurement Scales */}
          <g stroke="#68452F" strokeWidth="0.85" opacity="0.70" className="anim-fade-stage4">
            {[100, 200, 300, 400, 500, 600, 700, 900, 1000, 1100, 1200, 1300, 1400, 1500].map((x) => (
              <line key={`htick-${x}`} x1={x} y1="442" x2={x} y2="458" strokeWidth={x % 400 === 0 ? 1.4 : 0.85} />
            ))}
            {[100, 200, 300, 350, 550, 600, 700, 800].map((y) => (
              <line key={`vtick-${y}`} x1="791" y1={y} x2="809" y2={y} strokeWidth={y % 200 === 0 ? 1.4 : 0.85} />
            ))}
          </g>

          {/* Dimension Witness Lines */}
          <g stroke="#987452" strokeWidth="0.75" strokeDasharray="3 5" opacity="0.55" className="anim-fade-stage4">
            <line x1="500" y1="620" x2="500" y2="644" />
            <line x1="1100" y1="620" x2="1100" y2="644" />
            <line x1="500" y1="632" x2="1100" y2="632" />
            <line x1="1130" y1="298" x2="1165" y2="298" />
            <line x1="1130" y1="601" x2="1165" y2="601" />
            <line x1="1148" y1="298" x2="1148" y2="601" />
          </g>

          {/* Central Origin Crosshair */}
          <g className="anim-fade-stage1">
            <circle cx="800" cy="450" r="26" fill="none" stroke="#987452" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.55" />
            <circle cx="800" cy="450" r="14" fill="none" stroke="#987452" strokeWidth="0.8" opacity="0.65" />
            <circle cx="800" cy="450" r="3" fill="#68452F" opacity="0.85" />
          </g>

          {/* Left focal rings (purple #7C3AED) */}
          <g stroke="#7C3AED" fill="none" opacity="0.45" className="anim-fade-stage4">
            <circle cx="460" cy="450" r="75" strokeWidth="0.8" strokeDasharray="4 6" />
            <circle cx="460" cy="450" r="150" strokeWidth="0.7" strokeDasharray="5 7" />
            <circle cx="460" cy="450" r="230" strokeWidth="0.6" strokeDasharray="6 8" />
            <line x1="448" y1="450" x2="472" y2="450" strokeWidth="1.2" />
            <line x1="460" y1="438" x2="460" y2="462" strokeWidth="1.2" />
          </g>

          {/* Right focal rings (muted amber #C58B45) */}
          <g stroke="#C58B45" fill="none" opacity="0.45" className="anim-fade-stage4">
            <circle cx="1140" cy="450" r="75" strokeWidth="0.8" strokeDasharray="4 6" />
            <circle cx="1140" cy="450" r="150" strokeWidth="0.7" strokeDasharray="5 7" />
            <circle cx="1140" cy="450" r="230" strokeWidth="0.6" strokeDasharray="6 8" />
            <line x1="1128" y1="450" x2="1152" y2="450" strokeWidth="1.2" />
            <line x1="1140" y1="438" x2="1140" y2="462" strokeWidth="1.2" />
          </g>

          {/* Wing splines */}
          <path
            d="M 800,450 C 600,260 467,207 240,160 C 140,140 60,120 40,110"
            fill="none"
            stroke="url(#purpleWing)"
            strokeWidth="1.4"
            strokeDasharray="14 8"
            className="anim-draw-wing anim-flow-slow"
          />
          <path
            d="M 800,450 C 600,640 467,693 240,740 C 140,760 60,780 40,790"
            fill="none"
            stroke="url(#purpleWing)"
            strokeWidth="1.4"
            strokeDasharray="14 8"
            className="anim-draw-wing anim-flow-rev"
          />
          <path
            d="M 800,450 C 1000,260 1133,207 1360,160 C 1460,140 1540,120 1560,110"
            fill="none"
            stroke="url(#amberWing)"
            strokeWidth="1.4"
            strokeDasharray="14 8"
            className="anim-draw-wing anim-flow-slow"
          />
          <path
            d="M 800,450 C 1000,640 1133,693 1360,740 C 1460,760 1540,780 1560,790"
            fill="none"
            stroke="url(#amberWing)"
            strokeWidth="1.4"
            strokeDasharray="14 8"
            className="anim-draw-wing anim-flow-rev"
          />

          {/* ══════════════════════════════════════════════════════
              HIERARCHY 1 & 2: MAJOR WATERMARK CURVES & MAIN ARTWORK
          ══════════════════════════════════════════════════════ */}

          {/* Grand harmonic lemniscate */}
          <path
            d={BASE_GRAND_PATH}
            fill="none"
            stroke="url(#infinityDashedGrad)"
            strokeWidth="1.2"
            strokeDasharray="16 12"
            opacity="0.55"
            className="anim-draw-lemniscate-4 anim-pulse"
          />

          {/* Outer harmonic lemniscate */}
          <path
            d={BASE_OUTER_PATH}
            fill="none"
            stroke="url(#infinityGrad)"
            strokeWidth="1.6"
            opacity="0.65"
            className="anim-draw-lemniscate-3 anim-pulse"
          />

          {/* Harmonic core lemniscate */}
          <path
            d={revealDone ? interactivePath2 : BASE_HARMONIC_PATH}
            fill="none"
            stroke="url(#infinityGrad)"
            strokeWidth="2.1"
            strokeDasharray={revealDone ? 'none' : '8 6'}
            opacity="0.75"
            className={revealDone ? '' : 'anim-draw-lemniscate-2'}
          />

          {/* Core lemniscate — Strongest visual prominence */}
          <path
            d={revealDone ? interactivePath1 : BASE_CORE_PATH}
            fill="none"
            stroke="url(#infinityGrad)"
            strokeWidth="2.9"
            opacity="0.88"
            className={revealDone ? '' : 'anim-draw-lemniscate-1'}
          />

          {/* Hairline companion offset */}
          <path
            d={revealDone ? interactivePath1 : BASE_CORE_PATH}
            fill="none"
            stroke="url(#infinityDashedGrad)"
            strokeWidth="0.8"
            strokeDasharray="4 4"
            opacity="0.45"
            transform="scale(1.025) translate(-19.5, -11)"
            className={revealDone ? '' : 'anim-draw-lemniscate-1'}
          />

          {/* ── Blueprint Technical Measurement Typography (Highly distinguishable) ── */}
          <g
            fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
            fontSize="9.5"
            fontWeight="600"
            letterSpacing="0.22em"
            fill="#38271F"
            opacity="0.82"
            className="anim-fade-stage4"
          >
            <text x="110" y="84">R_MAJ · 480.00</text>
            <text x="110" y="104" fill="#68452F">FOCAL VECTOR F₁ [-340, 0]</text>
            <text x="110" y="824" fill="#7C3AED">PURPLE SPECTRUM // 380-450 NM</text>
            <text x="800" y="55" textAnchor="middle" fill="#68452F">AXIS 00° // SYMMETRIC DATUM</text>
            <text x="800" y="852" textAnchor="middle" opacity="0.65" fill="#68452F">
              (X² + Y²)² = 2A²(X² - Y²) · LEMNISCATE OF BERNOULLI
            </text>
            <text x="1490" y="84" textAnchor="end">R_MIN · 250.00</text>
            <text x="1490" y="104" textAnchor="end" fill="#68452F">FOCAL VECTOR F₂ [+340, 0]</text>
            <text x="1490" y="824" textAnchor="end" fill="#C58B45">AMBER SPECTRUM // 585-620 NM</text>
            <text x="800" y="644" textAnchor="middle" opacity="0.65" fontSize="8.5" fill="#68452F">⟵ SPAN 600.00 ⟶</text>
            <text x="1162" y="452" fontSize="8.5" opacity="0.65" fill="#68452F">303.40</text>
          </g>
        </svg>
      </div>

      {/* ── CSS Animations ── */}
      <style jsx>{`
        @keyframes drawLemniscate1 {
          0% { stroke-dasharray: 2000; stroke-dashoffset: 2000; opacity: 0.1; }
          100% { stroke-dasharray: 2000; stroke-dashoffset: 0; opacity: 0.88; }
        }
        @keyframes drawLemniscate2 {
          0% { stroke-dasharray: 2400; stroke-dashoffset: 2400; opacity: 0; }
          100% { stroke-dasharray: 8 6; stroke-dashoffset: 0; opacity: 0.75; }
        }
        @keyframes drawLemniscate3 {
          0% { stroke-dasharray: 3000; stroke-dashoffset: 3000; opacity: 0; }
          100% { stroke-dasharray: 3000; stroke-dashoffset: 0; opacity: 0.65; }
        }
        @keyframes drawLemniscate4 {
          0% { stroke-dasharray: 3900; stroke-dashoffset: 3900; opacity: 0; }
          100% { stroke-dasharray: 16 12; stroke-dashoffset: 0; opacity: 0.55; }
        }
        @keyframes drawLemniscateField {
          0% { stroke-dasharray: 5000; stroke-dashoffset: 5000; opacity: 0; }
          100% { stroke-dasharray: 20 14; stroke-dashoffset: 0; opacity: 0.52; }
        }
        @keyframes drawWing {
          0% { stroke-dashoffset: 1200; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0.55; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes continuousFlow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 600; }
        }
        @keyframes continuousFlowRev {
          0% { stroke-dashoffset: 600; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes subtleBreathe {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.65; }
        }

        .anim-draw-lemniscate-1 { animation: drawLemniscate1 1.8s cubic-bezier(0.16,1,0.3,1) 0.15s forwards; }
        .anim-draw-lemniscate-2 { animation: drawLemniscate2 2.2s cubic-bezier(0.16,1,0.3,1) 0.40s forwards; }
        .anim-draw-lemniscate-3 { animation: drawLemniscate3 2.5s cubic-bezier(0.16,1,0.3,1) 0.70s forwards; }
        .anim-draw-lemniscate-4 { animation: drawLemniscate4 2.8s cubic-bezier(0.16,1,0.3,1) 0.90s forwards; }
        .anim-draw-lemniscate-field { animation: drawLemniscateField 3.2s cubic-bezier(0.16,1,0.3,1) 1.10s forwards; }
        .anim-draw-wing { stroke-dasharray: 1200; animation: drawWing 2.4s cubic-bezier(0.16,1,0.3,1) 0.8s forwards; }
        .anim-fade-stage1 { animation: fadeIn 1.2s ease-out 0.20s both; }
        .anim-fade-stage3 { animation: fadeIn 1.5s ease-out 0.80s both; }
        .anim-fade-stage4 { animation: fadeIn 1.6s ease-out 1.20s both; }
        .anim-fade-bg { animation: fadeIn 2.0s ease-out 1.40s both; }
        .anim-flow-slow { animation: continuousFlow 36s linear infinite; }
        .anim-flow-rev { animation: continuousFlowRev 40s linear infinite; }
        .anim-pulse { animation: subtleBreathe 14s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .anim-draw-lemniscate-1, .anim-draw-lemniscate-2,
          .anim-draw-lemniscate-3, .anim-draw-lemniscate-4,
          .anim-draw-lemniscate-field, .anim-draw-wing,
          .anim-fade-stage1, .anim-fade-stage3, .anim-fade-stage4,
          .anim-fade-bg, .anim-flow-slow, .anim-flow-rev, .anim-pulse {
            animation: none !important;
            stroke-dashoffset: 0 !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
