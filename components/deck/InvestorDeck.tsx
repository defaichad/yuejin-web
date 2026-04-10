"use client";

import { Logo } from "@/components/brand/Logo";

/* ══════════════════════ DECORATIVE SVG HELPERS ══════════════════════ */

function HexGrid({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2, 3].map((col) => {
          const x = col * 100 + (row % 2) * 50;
          const y = row * 86;
          return (
            <path
              key={`${row}-${col}`}
              d={`M${x + 50} ${y + 10}L${x + 90} ${y + 33}L${x + 90} ${y + 76}L${x + 50} ${y + 99}L${x + 10} ${y + 76}L${x + 10} ${y + 33}Z`}
              stroke="rgba(201,162,74,0.07)"
              strokeWidth="0.5"
            />
          );
        }),
      )}
    </svg>
  );
}

function GlowOrb({ x, y, color, size }: { x: string; y: string; color: string; size: string }) {
  return (
    <div
      className="pointer-events-none absolute rounded-full blur-3xl"
      style={{ left: x, top: y, width: size, height: size, background: color }}
    />
  );
}

function AccentLine() {
  return (
    <div className="mx-auto my-8 flex items-center gap-3">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-aurix-gold/30 to-transparent" />
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 0L12 6L6 12L0 6Z" fill="rgba(201,162,74,0.4)" />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-aurix-gold/30 to-transparent" />
    </div>
  );
}

function SlideIcon({ children, size = 48 }: { children: React.ReactNode; size?: number }) {
  return (
    <div
      className="mb-6 inline-flex items-center justify-center rounded-2xl border border-aurix-gold/20 bg-gradient-to-br from-aurix-surface/80 to-aurix-void/80"
      style={{ width: size, height: size }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════ SHARED SLIDE WRAPPER ══════════════════════ */

function Slide({
  n,
  children,
  className = "",
  variant = "default",
}: {
  n: number;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "dark" | "accent" | "center";
}) {
  const bgs: Record<string, string> = {
    default:
      "bg-[radial-gradient(ellipse_at_70%_20%,rgba(201,162,74,0.06),transparent_55%),radial-gradient(ellipse_at_20%_80%,rgba(181,51,51,0.04),transparent_45%)]",
    dark: "bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,162,74,0.08),transparent_50%)]",
    accent:
      "bg-[radial-gradient(ellipse_at_30%_30%,rgba(59,167,138,0.05),transparent_50%),radial-gradient(ellipse_at_80%_70%,rgba(201,162,74,0.06),transparent_45%)]",
    center:
      "bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,162,74,0.1),transparent_60%)]",
  };

  return (
    <section
      className={`relative flex min-h-screen flex-col justify-center overflow-hidden bg-aurix-void px-6 py-16 sm:px-12 md:px-20 print:min-h-0 print:break-after-page print:py-10 ${bgs[variant]} ${className}`}
    >
      <HexGrid className="pointer-events-none absolute inset-0 h-full w-full opacity-40" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-aurix-gold/15 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-5xl">{children}</div>
      <span className="absolute bottom-6 right-8 font-display text-[11px] tabular-nums tracking-wider text-aurix-faint print:bottom-4 print:right-6">
        {String(n).padStart(2, "0")} / 10
      </span>
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-aurix-gold/25 bg-aurix-gold/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-aurix-gold">
      <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
        <path d="M3 0L6 3L3 6L0 3Z" fill="currentColor" />
      </svg>
      {children}
    </span>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-aurix-text sm:text-4xl lg:text-5xl">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 max-w-2xl text-base leading-relaxed text-aurix-muted sm:text-lg">
      {children}
    </p>
  );
}

function Card({
  children,
  className = "",
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-aurix-border/60 bg-gradient-to-br from-aurix-surface/60 to-aurix-void/80 p-5 backdrop-blur-sm transition-all duration-300 hover:border-aurix-gold/30 hover:shadow-[0_0_24px_-6px_rgba(201,162,74,0.15)] ${glow ? "shadow-[0_0_20px_-4px_rgba(201,162,74,0.12)]" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* ══════════════════════ DONUT CHART ══════════════════════ */

type Segment = { label: string; pct: number; color: string };

function Donut({
  segments,
  size = 200,
  label,
}: {
  segments: Segment[];
  size?: number;
  label?: string;
}) {
  const R = 70;
  const C = 2 * Math.PI * R;
  let offset = 0;

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className="mx-auto drop-shadow-[0_0_30px_rgba(201,162,74,0.15)]">
      <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(201,162,74,0.04)" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="42" fill="none" stroke="rgba(201,162,74,0.06)" strokeWidth="0.5" />
      {segments.map((seg) => {
        const dash = (seg.pct / 100) * C;
        const gap = C - dash;
        const o = offset;
        offset += dash;
        return (
          <circle
            key={seg.label}
            cx="100"
            cy="100"
            r={R}
            fill="none"
            stroke={seg.color}
            strokeWidth="28"
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-o}
            strokeLinecap="butt"
            style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
          />
        );
      })}
      <circle cx="100" cy="100" r="53" fill="#060708" />
      <circle cx="100" cy="100" r="53" fill="url(#donutInner)" />
      <defs>
        <radialGradient id="donutInner">
          <stop offset="0%" stopColor="rgba(201,162,74,0.04)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      {label && (
        <>
          <text x="100" y="97" textAnchor="middle" fill="#c9a24a" style={{ fontSize: 16, fontWeight: 700, fontFamily: "var(--font-display)" }}>
            {label}
          </text>
          <text x="100" y="114" textAnchor="middle" fill="#7e6843" style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
            TOKENS
          </text>
        </>
      )}
    </svg>
  );
}

/* ══════════════════════ INLINE SVG ICONS ══════════════════════ */

function IconShield() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-aurix-gold">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-aurix-gold">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconEye() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-aurix-gold">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconBrain() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-aurix-gold">
      <path d="M9.5 2A5.5 5.5 0 005 7.5c0 .87.2 1.69.56 2.42A5.5 5.5 0 003 14.5 5.5 5.5 0 008.5 20H12V2H9.5z" />
      <path d="M14.5 2A5.5 5.5 0 0120 7.5c0 .87-.2 1.69-.56 2.42A5.5 5.5 0 0122 14.5a5.5 5.5 0 01-5.5 5.5H12V2h2.5z" />
    </svg>
  );
}

function IconTrophy() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-aurix-gold">
      <path d="M6 9H4.5a2.5 2.5 0 010-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 1012 0V2z" />
    </svg>
  );
}

function IconWallet() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-aurix-gold">
      <path d="M21 12V7H5a2 2 0 010-4h14v4" />
      <path d="M3 5v14a2 2 0 002 2h16v-5" />
      <path d="M18 12a2 2 0 100 4h4v-4h-4z" />
    </svg>
  );
}

function IconSmartphone() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-aurix-gold">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

function IconGrid() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-aurix-gold">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function IconTarget() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-aurix-gold">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function IconTrendUp() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-aurix-gold">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#b53333]">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}

function IconAlertTriangle() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#b53333]">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#b53333]">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconXCircle() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#b53333]">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

/* ══════════════════════ IPHONE 15 PRO MOCKUP ══════════════════════ */

const PHONE_W = 260;
const PHONE_H = 540;

function IPhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto ${className}`} style={{ width: PHONE_W, height: PHONE_H }}>
      <div className="absolute -inset-6 rounded-[52px] bg-aurix-gold/5 blur-3xl" />
      <div className="relative h-full overflow-hidden rounded-[44px] bg-[#1a1a1c] p-[3px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_20px_60px_-10px_rgba(0,0,0,0.7),0_0_40px_-5px_rgba(201,162,74,0.12)]">
        <div className="pointer-events-none absolute inset-0 rounded-[44px] bg-gradient-to-b from-white/[0.08] via-transparent to-white/[0.03]" />

        {/* Side buttons */}
        <div className="absolute -left-[2px] top-[80px] h-[24px] w-[3px] rounded-l-sm bg-[#2a2a2d]" />
        <div className="absolute -left-[2px] top-[115px] h-[42px] w-[3px] rounded-l-sm bg-[#2a2a2d]" />
        <div className="absolute -left-[2px] top-[165px] h-[42px] w-[3px] rounded-l-sm bg-[#2a2a2d]" />
        <div className="absolute -right-[2px] top-[125px] h-[56px] w-[3px] rounded-r-sm bg-[#2a2a2d]" />

        <div className="relative flex h-full flex-col overflow-hidden rounded-[41px] bg-[#000000]">
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-[8px] z-30 h-[24px] w-[88px] -translate-x-1/2 rounded-full bg-[#000000] shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <div className="absolute right-[16px] top-[7px] h-[10px] w-[10px] rounded-full bg-[#0c0c0e] shadow-[inset_0_0_2px_rgba(255,255,255,0.06)]" />
          </div>

          {/* Screen — fixed height, clips overflow */}
          <div className="relative min-h-0 flex-1 overflow-hidden">
            {children}
          </div>

          {/* Home indicator */}
          <div className="flex shrink-0 justify-center pb-2 pt-1">
            <div className="h-[4px] w-[90px] rounded-full bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBar({ right }: { right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5 pb-1 pt-[38px]">
      <span className="text-[10px] font-semibold text-white/80">9:41</span>
      <div className="flex items-center gap-1.5">
        {right || (
          <>
            <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
              <rect x="0" y="6" width="3" height="5" rx="0.7" fill="white" opacity="0.5"/>
              <rect x="4.5" y="4" width="3" height="7" rx="0.7" fill="white" opacity="0.5"/>
              <rect x="9" y="1.5" width="3" height="9.5" rx="0.7" fill="white" opacity="0.5"/>
              <rect x="13" y="0" width="3" height="11" rx="0.7" fill="white" opacity="0.5"/>
            </svg>
            <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
              <path d="M1 3.5C3.5 1 10.5 1 13 3.5" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
              <path d="M3 5.8C4.8 4.2 9.2 4.2 11 5.8" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
              <circle cx="7" cy="8.5" r="1.3" fill="white" opacity="0.5"/>
            </svg>
            <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
              <rect x="0" y="0.5" width="19" height="10" rx="2.5" stroke="white" strokeWidth="0.8" opacity="0.35"/>
              <rect x="19.5" y="3" width="2.5" height="5" rx="1" fill="white" opacity="0.2"/>
              <rect x="1.5" y="2" width="13" height="7" rx="1.5" fill="#3ba78a"/>
            </svg>
          </>
        )}
      </div>
    </div>
  );
}

function BottomNav({ active = 0 }: { active?: number }) {
  const items = [
    { label: "Home", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2.5 7L9 2L15.5 7V15C15.5 15.55 15.05 16 14.5 16H3.5C2.95 16 2.5 15.55 2.5 15V7Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6.5 16V9.5H11.5V16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { label: "Games", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="10.5" y="2" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="2" y="10.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="10.5" y="10.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.2"/></svg> },
    { label: "Wallet", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15.5 9V5.5H4C3.17 5.5 2.5 4.83 2.5 4C2.5 3.17 3.17 2.5 4 2.5H14V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M2.5 4V14C2.5 14.83 3.17 15.5 4 15.5H15.5V11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><circle cx="14" cy="10.5" r="1.2" fill="currentColor"/></svg> },
    { label: "VIP", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L11.1 6.3L16 7L12.5 10.4L13.3 15.2L9 12.9L4.7 15.2L5.5 10.4L2 7L6.9 6.3L9 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  ];
  return (
    <div className="mx-3 mb-1 flex justify-around rounded-2xl bg-white/[0.04] px-1 py-1.5 border border-white/[0.04]">
      {items.map((item, i) => (
        <div key={item.label} className="flex flex-col items-center gap-0.5" style={{ color: i === active ? "#c9a24a" : "rgba(255,255,255,0.25)" }}>
          {item.icon}
          <span className="text-[8px] font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function PhoneDashboard() {
  return (
    <IPhoneFrame>
      <StatusBar />
      <div className="px-4 pb-3">
        <p className="text-[10px] text-white/35">Welcome back</p>
        <p className="text-[13px] font-semibold text-white/90">Portfolio Overview</p>

        <div className="mt-3 rounded-2xl border border-[#c9a24a]/12 bg-gradient-to-br from-[#1a1510] to-[#0e0e10] p-4">
          <p className="text-[9px] font-medium uppercase tracking-widest text-[#c9a24a]/50">Total balance</p>
          <p className="mt-1 text-[26px] font-bold leading-none tracking-tight text-white">$12,847<span className="text-white/30">.62</span></p>
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="rounded-full bg-[#3ba78a]/12 px-2 py-0.5 text-[9px] font-bold text-[#3ba78a]">▲ 4.2%</span>
            <span className="text-[9px] text-white/25">24h</span>
          </div>
          <svg viewBox="0 0 200 40" className="mt-3 w-full" height="40">
            <defs>
              <linearGradient id="pcg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c9a24a" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#c9a24a" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 35 Q15 30 30 28 T60 24 T90 30 T120 18 T150 20 T180 10 T200 6 V40 H0 Z" fill="url(#pcg)" />
            <path d="M0 35 Q15 30 30 28 T60 24 T90 30 T120 18 T150 20 T180 10 T200 6" fill="none" stroke="#c9a24a" strokeWidth="1.5" />
            <circle cx="200" cy="6" r="2.5" fill="#c9a24a" />
          </svg>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { icon: "↑", label: "Deposit", color: "#3ba78a" },
            { icon: "↓", label: "Withdraw", color: "#c9a24a" },
            { icon: "⟳", label: "Swap", color: "#b53333" },
          ].map((a) => (
            <div key={a.label} className="flex flex-col items-center gap-1.5 rounded-xl bg-white/[0.03] border border-white/[0.04] py-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold" style={{ background: `${a.color}15`, color: a.color }}>{a.icon}</div>
              <span className="text-[8px] font-medium text-white/40">{a.label}</span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[10px] font-semibold text-white/45">Holdings</p>
        {[
          { name: "$YUEJIN", sub: "45,200 tokens", usd: "$8,136.00", change: "+12.4%", pos: true },
          { name: "USDT", sub: "2,400.00", usd: "$2,400.00", change: "+0.0%", pos: true },
          { name: "SOL", sub: "14.8 SOL", usd: "$2,311.62", change: "+2.1%", pos: true },
        ].map((h) => (
          <div key={h.name} className="mt-2 flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#c9a24a]/30 to-[#8e6c30]/20 text-[9px] font-bold text-[#c9a24a]">{h.name[0] === "$" ? "Y" : h.name[0]}</div>
              <div>
                <p className="text-[11px] font-semibold text-white/85">{h.name}</p>
                <p className="text-[8px] text-white/25">{h.sub}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-semibold text-white/70">{h.usd}</p>
              <p className="text-[8px] font-bold" style={{ color: h.pos ? "#3ba78a" : "#b53333" }}>{h.change}</p>
            </div>
          </div>
        ))}
      </div>
      <BottomNav active={0} />
    </IPhoneFrame>
  );
}

function PhoneGameSession() {
  return (
    <IPhoneFrame>
      <StatusBar right={<span className="flex items-center gap-1 rounded-full bg-[#3ba78a]/12 px-2 py-0.5 text-[9px] font-bold text-[#3ba78a]">● LIVE</span>} />
      <div className="px-4 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-semibold text-white/90">Premium Baccarat</p>
            <p className="text-[9px] text-white/30">Table VIP-08 · Live dealer</p>
          </div>
          <div className="rounded-lg bg-[#b53333]/12 px-2.5 py-1 text-[8px] font-bold text-[#b53333]">HIGH</div>
        </div>

        <div className="mt-4 rounded-2xl border border-[#c9a24a]/10 bg-gradient-to-b from-[#10130e] to-[#0b0c0e] p-4">
          <div className="flex items-start justify-between">
            <div className="text-center">
              <p className="text-[8px] font-medium uppercase tracking-wider text-white/30">Player</p>
              <div className="mt-2 flex gap-1.5">
                <div className="flex h-12 w-8 items-center justify-center rounded-md border border-white/10 bg-gradient-to-b from-white/15 to-white/3 text-[12px] font-bold text-white/70">K</div>
                <div className="flex h-12 w-8 items-center justify-center rounded-md border border-white/10 bg-gradient-to-b from-white/15 to-white/3 text-[12px] font-bold text-[#b53333]">9</div>
              </div>
              <p className="mt-2 text-[14px] font-bold text-white/85">9</p>
            </div>
            <div className="flex flex-col items-center justify-center pt-6">
              <div className="rounded-full border border-[#c9a24a]/20 bg-[#c9a24a]/8 px-3 py-1 text-[9px] font-bold text-[#c9a24a]">VS</div>
            </div>
            <div className="text-center">
              <p className="text-[8px] font-medium uppercase tracking-wider text-white/30">Banker</p>
              <div className="mt-2 flex gap-1.5">
                <div className="flex h-12 w-8 items-center justify-center rounded-md border border-white/10 bg-gradient-to-b from-white/15 to-white/3 text-[12px] font-bold text-white/70">7</div>
                <div className="flex h-12 w-8 items-center justify-center rounded-md border border-white/10 bg-gradient-to-b from-white/15 to-white/3 text-[12px] font-bold text-white/70">Q</div>
              </div>
              <p className="mt-2 text-[14px] font-bold text-white/85">7</p>
            </div>
          </div>
          <div className="mx-auto mt-3 w-fit rounded-full bg-[#3ba78a]/12 px-4 py-1 text-[9px] font-bold tracking-wide text-[#3ba78a]">PLAYER WINS</div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { label: "Player", odds: "1:1", active: true },
            { label: "Tie", odds: "8:1", active: false },
            { label: "Banker", odds: "0.95:1", active: false },
          ].map((b) => (
            <div key={b.label} className={`rounded-xl border p-2.5 text-center ${b.active ? "border-[#c9a24a]/30 bg-[#c9a24a]/8" : "border-white/[0.05] bg-white/[0.02]"}`}>
              <p className="text-[10px] font-semibold" style={{ color: b.active ? "#c9a24a" : "rgba(255,255,255,0.45)" }}>{b.label}</p>
              <p className="mt-0.5 text-[8px] text-white/25">{b.odds}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
          <div className="flex items-center justify-between">
            <p className="text-[9px] text-white/30">Your stake</p>
            <p className="text-[15px] font-bold text-white/90">$500</p>
          </div>
          <div className="mt-2 flex gap-1.5">
            {["$100", "$250", "$500", "$1K"].map((v) => (
              <div key={v} className={`flex-1 rounded-lg py-1.5 text-center text-[9px] font-semibold ${v === "$500" ? "bg-[#c9a24a]/12 text-[#c9a24a] border border-[#c9a24a]/20" : "bg-white/[0.03] text-white/25 border border-transparent"}`}>{v}</div>
            ))}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { label: "Session P/L", value: "+$1,240", color: "#3ba78a" },
            { label: "Win rate", value: "62%", color: "#c9a24a" },
            { label: "Hands", value: "18", color: "rgba(255,255,255,0.55)" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-2 text-center">
              <p className="text-[7px] font-medium uppercase tracking-wider text-white/20">{s.label}</p>
              <p className="mt-1 text-[13px] font-bold" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active={1} />
    </IPhoneFrame>
  );
}

function PhoneVIP() {
  return (
    <IPhoneFrame>
      <StatusBar right={<span className="flex items-center gap-1 rounded-full border border-[#c9a24a]/20 bg-[#c9a24a]/8 px-2.5 py-0.5 text-[9px] font-bold text-[#c9a24a]">◆ Gold</span>} />
      <div className="px-4 pb-3">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#c9a24a]/20 bg-gradient-to-br from-[#c9a24a]/25 to-[#8e6c30]/15">
            <span className="text-[20px]">♛</span>
          </div>
          <p className="mt-2 text-[14px] font-semibold text-white/90">Gold Member</p>
          <p className="text-[9px] text-white/30">Level 24 · 8,420 XP</p>
        </div>

        <div className="mt-4 rounded-2xl border border-[#c9a24a]/12 bg-[#c9a24a]/4 p-3.5">
          <div className="flex items-center justify-between text-[9px] font-medium">
            <span className="text-[#c9a24a]">Gold</span>
            <span className="text-white/35">Platinum</span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
            <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#c9a24a] to-[#e7c983]" />
          </div>
          <p className="mt-1.5 text-center text-[8px] text-white/25">3,580 XP to next tier</p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 text-center">
            <p className="text-[8px] font-medium uppercase tracking-wider text-white/20">Multiplier</p>
            <p className="mt-1 text-[18px] font-bold text-[#c9a24a]">2.4×</p>
          </div>
          <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 text-center">
            <p className="text-[8px] font-medium uppercase tracking-wider text-white/20">Weekly</p>
            <p className="mt-1 text-[18px] font-bold text-[#3ba78a]">$120</p>
          </div>
        </div>

        <p className="mt-4 text-[10px] font-semibold text-white/45">Recent rewards</p>
        {[
          { label: "Streak bonus (7 days)", amount: "+$45", time: "2h ago", color: "#c9a24a" },
          { label: "Weekly tier reward", amount: "+$120", time: "1d ago", color: "#3ba78a" },
          { label: "Session milestone", amount: "+250 XP", time: "2d ago", color: "#e7c983" },
          { label: "Random bonus drop", amount: "+$18", time: "3d ago", color: "#b53333" },
        ].map((r) => (
          <div key={r.label} className="mt-2 flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5">
            <div className="flex items-center gap-2">
              <div className="h-6 w-1 rounded-full" style={{ background: r.color }} />
              <div>
                <p className="text-[9px] font-medium text-white/65">{r.label}</p>
                <p className="text-[7px] text-white/20">{r.time}</p>
              </div>
            </div>
            <p className="text-[10px] font-bold" style={{ color: r.color }}>{r.amount}</p>
          </div>
        ))}

        <p className="mt-4 text-[10px] font-semibold text-white/45">Gold perks</p>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {["Priority withdrawals", "Dedicated host", "Higher limits", "Exclusive tables"].map((p) => (
            <div key={p} className="flex items-center gap-1.5 rounded-lg border border-white/[0.04] bg-white/[0.02] px-2.5 py-2">
              <span className="text-[9px] text-[#c9a24a]">✓</span>
              <span className="text-[8px] text-white/35">{p}</span>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active={3} />
    </IPhoneFrame>
  );
}

/* ══════════════════════ STAT BOX ══════════════════════ */

function StatBox({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-aurix-border/60 bg-gradient-to-br from-aurix-surface/50 to-aurix-void/80 p-5 text-center">
      <div className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full bg-aurix-gold/5 blur-2xl" />
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-aurix-faint">{label}</p>
      <p className="mt-2 font-display text-4xl font-bold text-gradient-gold">{value}</p>
      {sub && <p className="mt-2 text-sm text-aurix-muted">{sub}</p>}
    </div>
  );
}

/* ══════════════════════ SLIDE 1: COVER ══════════════════════ */

function CoverSlide() {
  return (
    <Slide n={1} variant="center" className="items-center text-center">
      <GlowOrb x="10%" y="15%" color="rgba(201,162,74,0.08)" size="300px" />
      <GlowOrb x="70%" y="60%" color="rgba(181,51,51,0.06)" size="250px" />

      <div className="relative z-10">
        <div className="mx-auto mb-8 flex items-center justify-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-aurix-gold/10 blur-xl" />
            <Logo size={88} showWordmark={false} className="relative mx-auto" />
          </div>
        </div>

        <h1 className="font-display text-6xl font-bold tracking-tight text-aurix-text sm:text-7xl lg:text-8xl">
          YUEJIN
        </h1>

        <AccentLine />

        <p className="text-sm font-bold uppercase tracking-[0.45em] text-aurix-gold">
          The Future of Wealth Gaming
        </p>

        <p className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-aurix-muted">
          A next-generation wealth gaming platform engineered for performance,
          transparency, and intelligent progression.
        </p>

        {/* Phone hero — stacked perspective fan */}
        <div className="relative mx-auto mt-10 flex items-start justify-center" style={{ perspective: "1200px", height: PHONE_H + 20 }}>
          {/* Back left — VIP */}
          <div className="absolute hidden sm:block" style={{ left: "50%", transform: "translateX(-280px) rotateY(22deg) scale(0.78)", opacity: 0.5, zIndex: 1, transformOrigin: "right center" }}>
            <PhoneVIP />
          </div>
          {/* Back right — Game */}
          <div className="absolute hidden sm:block" style={{ left: "50%", transform: "translateX(20px) rotateY(-22deg) scale(0.78)", opacity: 0.5, zIndex: 1, transformOrigin: "left center" }}>
            <PhoneGameSession />
          </div>
          {/* Front center — Dashboard (hero) */}
          <div className="relative" style={{ zIndex: 10 }}>
            <PhoneDashboard />
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-sm grid-cols-3 gap-4">
          {[
            { label: "Raise", value: "$100K" },
            { label: "Token", value: "$YUEJIN" },
            { label: "Supply", value: "100M" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-aurix-border/40 bg-aurix-surface/30 px-3 py-3">
              <p className="text-[9px] font-bold uppercase tracking-wider text-aurix-faint">{s.label}</p>
              <p className="mt-1 font-display text-sm font-bold text-aurix-gold">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-6 text-xs tracking-wider text-aurix-faint">
          <span>Private &amp; Confidential</span>
          <span className="text-aurix-gold/40">◆</span>
          <span>2026</span>
        </div>
      </div>
    </Slide>
  );
}

/* ══════════════════════ SLIDE 2: PROBLEM ══════════════════════ */

const problems = [
  {
    title: "Trust deficit",
    body: "Traditional operators hide mechanics behind marketing — users refuse opaque odds and hidden edges.",
    icon: <IconLock />,
  },
  {
    title: "Web3 friction",
    body: "On-chain venues prize novelty over UX — wallets, gas, and jargon kill retention before it starts.",
    icon: <IconAlertTriangle />,
  },
  {
    title: "Slow capital",
    body: "Manual withdrawal reviews and multi-day processing erode confidence for serious players.",
    icon: <IconClock />,
  },
  {
    title: "No progression",
    body: "Without meaningful advancement, even high-value players churn once novelty fades.",
    icon: <IconXCircle />,
  },
];

function ProblemSlide() {
  return (
    <Slide n={2} variant="dark">
      <GlowOrb x="80%" y="10%" color="rgba(181,51,51,0.08)" size="200px" />

      <Tag>The problem</Tag>
      <H2>The premium gaming segment is broken</H2>
      <P>
        High-value players expect private-bank rigor. Most platforms still
        deliver carnival-floor experiences.
      </P>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {problems.map((p) => (
          <Card key={p.title} className="group">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[#b53333]/20 bg-[#b53333]/5">
              {p.icon}
            </div>
            <p className="font-display text-lg font-semibold text-aurix-text">{p.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-aurix-muted">{p.body}</p>
          </Card>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-[#b53333]/20 bg-[#b53333]/5 px-5 py-3 text-center">
        <p className="text-sm text-aurix-muted">
          <span className="font-semibold text-[#b53333]">Result:</span> $420B+ market where the top platforms are losing trust — and players are looking elsewhere.
        </p>
      </div>
    </Slide>
  );
}

/* ══════════════════════ SLIDE 3: SOLUTION ══════════════════════ */

const solutions = [
  { title: "Transparent", desc: "Published odds, on-chain settlement proofs, member-facing risk dashboards.", icon: <IconEye /> },
  { title: "Instant", desc: "Sub-minute withdrawals for verified members — liquidity buffers sized for high flow.", icon: <IconBolt /> },
  { title: "Intelligent", desc: "AI-driven stake guidance, session pacing, and personalized reward timing.", icon: <IconBrain /> },
  { title: "Reward-driven", desc: "XP, tier ascension, and structured bonuses — not cheap promotional gimmicks.", icon: <IconTrophy /> },
];

function SolutionSlide() {
  return (
    <Slide n={3} variant="accent">
      <GlowOrb x="5%" y="30%" color="rgba(59,167,138,0.06)" size="200px" />
      <GlowOrb x="85%" y="60%" color="rgba(201,162,74,0.06)" size="180px" />

      <div className="grid items-start gap-10 lg:grid-cols-[1fr_auto]">
        <div>
          <Tag>Our solution</Tag>
          <H2>
            A controlled wealth{" "}
            <span className="text-gradient-gold">operating system</span>
          </H2>
          <P>
            YUEJIN merges fintech-grade infrastructure with premium entertainment —
            transparent odds, instant settlement, and intelligent rewards in one
            platform.
          </P>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {solutions.map((p, i) => (
              <Card key={p.title} glow={i === 0}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-aurix-gold/20 bg-aurix-gold/5">
                  {p.icon}
                </div>
                <p className="font-display text-base font-semibold text-aurix-gold">{p.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-aurix-muted">{p.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <PhoneGameSession />
        </div>
      </div>

      <AccentLine />

      <div className="grid grid-cols-3 gap-4 text-center">
        {[
          { val: "42s", lab: "Avg withdrawal" },
          { val: "100%", lab: "Provably fair" },
          { val: "89%", lab: "Retention rate" },
        ].map((s) => (
          <div key={s.lab} className="rounded-xl border border-aurix-border/40 bg-aurix-surface/30 py-3">
            <p className="font-display text-xl font-bold text-aurix-gold">{s.val}</p>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-aurix-faint">{s.lab}</p>
          </div>
        ))}
      </div>
    </Slide>
  );
}

/* ══════════════════════ SLIDE 4: PRODUCT ══════════════════════ */

const productFeatures = [
  { tag: "Games", title: "Curated suite", desc: "Baccarat, premium slots, and live hosts with clean, noise-free UI.", icon: <IconGrid /> },
  { tag: "Wallet", title: "Unified balance", desc: "Fiat and crypto in one view with instant reconciliation.", icon: <IconWallet /> },
  { tag: "Intelligence", title: "AI personalization", desc: "Stake guidance and session pacing — intelligent, never predatory.", icon: <IconBrain /> },
  { tag: "Mobile", title: "Native performance", desc: "Optimised for mobile players with biometric unlock and gesture controls.", icon: <IconSmartphone /> },
];

function ProductSlide() {
  return (
    <Slide n={4}>
      <GlowOrb x="50%" y="5%" color="rgba(201,162,74,0.06)" size="300px" />

      <Tag>Product</Tag>
      <H2>Trading-grade interface, entertainment core</H2>
      <P>
        Every surface designed for large balances and calm decisions — dark,
        spacious, and legible at a glance.
      </P>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_auto]">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {productFeatures.map((t) => (
              <Card key={t.tag} className="relative overflow-hidden">
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-aurix-gold/3 blur-2xl" />
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-aurix-gold/20 bg-aurix-gold/5">
                    {t.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-aurix-faint">{t.tag}</p>
                    <p className="mt-1 font-display text-lg font-semibold text-aurix-text">{t.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-aurix-muted">{t.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="rounded-2xl border border-aurix-gold/15 bg-aurix-gold/5 p-5">
            <div className="flex items-center gap-3">
              <IconTrendUp />
              <div>
                <p className="text-sm font-semibold text-aurix-text">
                  <span className="text-aurix-gold">+16.8%</span> average engagement uplift after UX improvement
                </p>
                <p className="mt-1 text-xs text-aurix-muted">
                  AI analytics on user behavior drove targeted improvements across retention (89%), session depth (74%), and satisfaction (92%).
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <PhoneDashboard />
        </div>
      </div>
    </Slide>
  );
}

/* ══════════════════════ SLIDE 5: MARKET ══════════════════════ */

function MarketSlide() {
  return (
    <Slide n={5} variant="dark">
      <GlowOrb x="50%" y="20%" color="rgba(201,162,74,0.08)" size="350px" />

      <Tag>Market opportunity</Tag>
      <H2>A generational shift to digital luxury</H2>
      <P>
        The intersection of regulated entertainment, digital assets, and global
        consumer growth creates room for a category-defining platform.
      </P>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <StatBox value="$420B+" label="TAM" sub="Global digital real-money gaming" />
        <div className="relative">
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-aurix-gold/20 to-transparent" />
          <StatBox value="~$19B" label="SAM" sub="Premium wallet segment" />
        </div>
        <StatBox value="1.8–2.4%" label="Target" sub="Of SAM by Year 5" />
      </div>

      <AccentLine />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: <IconShield />, title: "Regulatory clarity", desc: "Key markets are standardizing licensing — first movers win." },
          { icon: <IconTarget />, title: "HNW digital adoption", desc: "Affluent cohorts expect elevated, mobile-first experiences." },
          { icon: <IconBolt />, title: "Web3 maturity", desc: "Institutional custody and L2 throughput support seamless hybrid play." },
        ].map((p) => (
          <Card key={p.title}>
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-aurix-gold/20 bg-aurix-gold/5">
              {p.icon}
            </div>
            <p className="font-display text-base font-semibold text-aurix-text">{p.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-aurix-muted">{p.desc}</p>
          </Card>
        ))}
      </div>
    </Slide>
  );
}

/* ══════════════════════ SLIDE 6: TOKENOMICS ══════════════════════ */

const tokenAlloc: Segment[] = [
  { label: "Liquidity Pool (LP)", pct: 30, color: "#c9a24a" },
  { label: "Private Sale", pct: 30, color: "#b53333" },
  { label: "Team", pct: 20, color: "#3ba78a" },
  { label: "Marketing", pct: 10, color: "#e7c983" },
  { label: "Ecosystem / Treasury", pct: 10, color: "#6f6b64" },
];

function TokenomicsSlide() {
  return (
    <Slide n={6} variant="accent">
      <GlowOrb x="20%" y="30%" color="rgba(59,167,138,0.05)" size="200px" />

      <Tag>Tokenomics</Tag>
      <H2>
        $YUEJIN — <span className="text-gradient-gold">100,000,000</span> tokens
      </H2>
      <P>
        Fixed supply. No inflation. Token utility spans platform fees, VIP
        staking, governance rights, and reward redemption.
      </P>

      <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-48 w-48 rounded-full bg-aurix-gold/5 blur-3xl" />
          </div>
          <Donut segments={tokenAlloc} size={260} label="100M" />
          <div className="mt-6 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-aurix-border/40 bg-aurix-surface/30 px-3 py-3 text-center">
              <p className="text-[9px] font-bold uppercase tracking-wider text-aurix-faint">Ticker</p>
              <p className="mt-1 font-display text-lg font-bold text-aurix-gold">$YUEJIN</p>
            </div>
            <div className="rounded-xl border border-aurix-border/40 bg-aurix-surface/30 px-3 py-3 text-center">
              <p className="text-[9px] font-bold uppercase tracking-wider text-aurix-faint">Supply</p>
              <p className="mt-1 font-display text-lg font-bold text-aurix-text">100M</p>
            </div>
          </div>
        </div>

        <Card glow>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-aurix-faint">
            Token allocation
          </p>
          <div className="mt-5 space-y-4">
            {tokenAlloc.map((s) => (
              <div key={s.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-aurix-muted">
                    <span className="h-3 w-3 rounded-sm shadow-[0_0_6px]" style={{ background: s.color, boxShadow: `0 0 8px ${s.color}40` }} />
                    {s.label}
                  </span>
                  <span className="font-display text-lg font-bold text-aurix-text">{s.pct}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-aurix-surface">
                  <div
                    className="h-2.5 rounded-full transition-all"
                    style={{ width: `${s.pct}%`, background: `linear-gradient(90deg, ${s.color}, ${s.color}cc)`, boxShadow: `0 0 12px ${s.color}30` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Slide>
  );
}

/* ══════════════════════ SLIDE 7: SALE ALLOCATION ══════════════════════ */

const saleAlloc: Segment[] = [
  { label: "Liquidity Pool", pct: 30, color: "#c9a24a" },
  { label: "Development Cost", pct: 30, color: "#b53333" },
  { label: "Licences", pct: 20, color: "#3ba78a" },
  { label: "Marketing", pct: 20, color: "#e7c983" },
];

const saleDescriptions = [
  "Deep DEX liquidity from day one. Ensures tight spreads, low slippage, and member confidence on withdrawals.",
  "Product engineering, infrastructure, and security audits — core platform build across frontend, backend, and smart contracts.",
  "Regulatory licensing, legal structuring, KYC/AML tooling, and jurisdiction-specific compliance work.",
  "Brand launch, influencer partnerships, community growth, and strategic acquisition campaigns across target markets.",
];

function SaleAllocSlide() {
  return (
    <Slide n={7}>
      <GlowOrb x="75%" y="25%" color="rgba(201,162,74,0.06)" size="250px" />

      <Tag>Use of funds</Tag>
      <H2>Sale proceeds allocation</H2>
      <P>
        Every dollar from the private sale is deployed toward tangible
        milestones — product, compliance, liquidity, and growth. No
        discretionary spend.
      </P>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-40 w-40 rounded-full bg-aurix-gold/5 blur-3xl" />
          </div>
          <Donut segments={saleAlloc} size={260} label="Funds" />
          <div className="mt-6 grid grid-cols-2 gap-2">
            {saleAlloc.map((s) => (
              <div key={s.label} className="flex items-center gap-2 rounded-lg border border-aurix-border/30 bg-aurix-surface/20 px-3 py-2">
                <span className="h-3 w-3 shrink-0 rounded-sm" style={{ background: s.color, boxShadow: `0 0 6px ${s.color}40` }} />
                <span className="text-xs text-aurix-muted">{s.label} <span className="font-bold text-aurix-text">{s.pct}%</span></span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {saleAlloc.map((seg, i) => (
            <Card key={seg.label} className="relative overflow-hidden">
              <div className="pointer-events-none absolute left-0 top-0 h-full w-1 rounded-l-2xl" style={{ background: seg.color }} />
              <div className="pl-3">
                <div className="flex items-center gap-2">
                  <span className="font-display text-base font-semibold text-aurix-text">
                    {seg.label}
                  </span>
                  <span className="rounded-full border border-aurix-border/40 bg-aurix-surface/40 px-2 py-0.5 text-[10px] font-bold text-aurix-gold">
                    {seg.pct}%
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-aurix-muted">{saleDescriptions[i]}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ══════════════════════ SLIDE 8: GAMIFICATION ══════════════════════ */

const vipTiers = [
  { name: "Bronze", color: "#cd7f32" },
  { name: "Silver", color: "#c0c0c0" },
  { name: "Gold", color: "#c9a24a" },
  { name: "Platinum", color: "#b0b0c0" },
  { name: "Sovereign", color: "#3ba78a" },
  { name: "Emperor", color: "#b53333" },
];

function GamificationSlide() {
  return (
    <Slide n={8} variant="dark">
      <GlowOrb x="50%" y="15%" color="rgba(201,162,74,0.06)" size="300px" />

      <div className="grid items-start gap-10 lg:grid-cols-[1fr_auto]">
        <div>
          <Tag>Gamification</Tag>
          <H2>Status, ritual, momentum</H2>
          <P>
            Structured VIP progression with XP velocity, reward multipliers, and
            concierge unlocks at every tier — designed for long-term retention.
          </P>

          <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {vipTiers.map((tier, i) => (
              <div key={tier.name} className="relative overflow-hidden rounded-2xl border border-aurix-border/60 bg-gradient-to-br from-aurix-surface/50 to-aurix-void/80 p-4 text-center transition-all hover:scale-105">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${tier.color}, transparent)` }} />
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full border" style={{ borderColor: `${tier.color}40`, background: `${tier.color}10` }}>
                  <span className="font-display text-sm font-bold" style={{ color: tier.color }}>{i + 1}</span>
                </div>
                <p className="text-[9px] uppercase tracking-[0.14em] text-aurix-faint">Tier {i + 1}</p>
                <p className="mt-1 font-display text-sm font-bold" style={{ color: tier.color }}>{tier.name}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-full border border-aurix-border/40 bg-aurix-surface/40 p-1">
            <div className="relative h-4 w-[78%] overflow-hidden rounded-full bg-gradient-to-r from-[#cd7f32] via-aurix-gold to-[#3ba78a]">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.15)_50%,transparent_100%)] animate-shimmer" />
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: <IconTrophy />, title: "Bonus drops", desc: "Randomized rewards tied to milestones and seasonal campaigns." },
              { icon: <IconBolt />, title: "Streak rewards", desc: "Consecutive sessions unlock escalating multipliers." },
              { icon: <IconTrendUp />, title: "XP & levels", desc: "Long-term progression with concierge unlocks at every milestone." },
            ].map((c) => (
              <Card key={c.title}>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-aurix-gold/20 bg-aurix-gold/5">
                  {c.icon}
                </div>
                <p className="font-display text-base font-semibold text-aurix-gold">{c.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-aurix-muted">{c.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <PhoneVIP />
        </div>
      </div>
    </Slide>
  );
}

/* ══════════════════════ SLIDE 9: WHY YUEJIN ══════════════════════ */

function WhySlide() {
  return (
    <Slide n={9} variant="accent">
      <GlowOrb x="10%" y="50%" color="rgba(59,167,138,0.05)" size="200px" />

      <Tag>Why YUEJIN</Tag>
      <H2>More trustworthy than Web2. More usable than Web3.</H2>
      <P>Faster, fairer, and built for players who take wealth seriously.</P>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {[
          { icon: <IconBolt />, title: "Faster payouts", stat: "42s", sub: "avg withdrawal", desc: "Sub-minute settlement for verified members." },
          { icon: <IconTarget />, title: "Better UX", stat: "89%", sub: "retention rate", desc: "Fintech-grade interface, not carnival noise." },
          { icon: <IconShield />, title: "Transparent system", stat: "100%", sub: "provably fair", desc: "On-chain proofs and published odds." },
          { icon: <IconTrendUp />, title: "Higher retention", stat: "3.2×", sub: "vs industry", desc: "Intelligent progression and AI engagement." },
        ].map((a) => (
          <Card key={a.title} className="relative overflow-hidden">
            <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-aurix-gold/3 blur-2xl" />
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-aurix-gold/20 bg-aurix-gold/5">
                  {a.icon}
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-aurix-text">{a.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-aurix-muted">{a.desc}</p>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-display text-3xl font-bold text-gradient-gold">{a.stat}</p>
                <p className="text-[10px] uppercase tracking-wider text-aurix-faint">{a.sub}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AccentLine />

      <div className="rounded-2xl border border-aurix-gold/15 bg-aurix-gold/5 p-5 text-center">
        <p className="text-sm text-aurix-muted">
          <span className="font-semibold text-aurix-gold">YUEJIN</span> is designed to be the default platform for premium players who demand transparency, speed, and intelligence.
        </p>
      </div>
    </Slide>
  );
}

/* ══════════════════════ SLIDE 10: CTA ══════════════════════ */

function CtaSlide() {
  return (
    <Slide n={10} variant="center" className="items-center text-center">
      <GlowOrb x="50%" y="30%" color="rgba(201,162,74,0.1)" size="400px" />
      <GlowOrb x="30%" y="60%" color="rgba(181,51,51,0.05)" size="200px" />

      <div className="relative z-10">
        <div className="mx-auto mb-8">
          <div className="relative inline-block">
            <div className="absolute -inset-6 rounded-full bg-aurix-gold/10 blur-2xl" />
            <Logo size={64} showWordmark={false} className="relative mx-auto" />
          </div>
        </div>

        <h2 className="font-display text-4xl font-bold tracking-tight text-aurix-text sm:text-5xl lg:text-6xl">
          Enter the Future of{" "}
          <span className="text-gradient-gold">Wealth Gaming</span>
        </h2>

        <AccentLine />

        <p className="mx-auto max-w-xl text-base leading-relaxed text-aurix-muted">
          Private round open. Limited allocation available for strategic partners
          aligned with long-term platform growth.
        </p>

        <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 gap-4">
          <div className="relative overflow-hidden rounded-2xl border border-aurix-gold/25 bg-gradient-to-br from-aurix-gold/10 to-transparent p-6 text-center">
            <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-aurix-gold/10 blur-xl" />
            <p className="text-[10px] font-bold uppercase tracking-wider text-aurix-faint">Raise</p>
            <p className="mt-2 font-display text-3xl font-bold text-gradient-gold">$100,000</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-aurix-gold/25 bg-gradient-to-br from-aurix-gold/10 to-transparent p-6 text-center">
            <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-aurix-gold/10 blur-xl" />
            <p className="text-[10px] font-bold uppercase tracking-wider text-aurix-faint">Token</p>
            <p className="mt-2 font-display text-3xl font-bold text-aurix-gold">$YUEJIN</p>
          </div>
        </div>

        <div className="mt-10 inline-flex items-center gap-8 rounded-xl border border-aurix-border/40 bg-aurix-surface/30 px-8 py-4">
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-wider text-aurix-faint">Contact</p>
            <p className="mt-0.5 text-sm font-semibold text-aurix-text">invest@yuejin.io</p>
          </div>
          <div className="h-8 w-px bg-aurix-border/40" />
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-wider text-aurix-faint">Website</p>
            <p className="mt-0.5 text-sm font-semibold text-aurix-text">yuejin.io</p>
          </div>
        </div>

        <p className="mt-14 text-xs text-aurix-faint">
          This presentation is confidential and for informational purposes only.
          Not an offer to sell securities in any jurisdiction.
        </p>
      </div>
    </Slide>
  );
}

/* ══════════════════════ DECK EXPORT ══════════════════════ */

export function InvestorDeck() {
  return (
    <div className="print:bg-aurix-void">
      <CoverSlide />
      <ProblemSlide />
      <SolutionSlide />
      <ProductSlide />
      <MarketSlide />
      <TokenomicsSlide />
      <SaleAllocSlide />
      <GamificationSlide />
      <WhySlide />
      <CtaSlide />
    </div>
  );
}
