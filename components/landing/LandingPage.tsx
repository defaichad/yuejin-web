"use client";

import { motion } from "framer-motion";
import { type FormEvent, useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.55, ease: EASE },
};

function stagger(i: number, base = 0.06) {
  return { ...fadeUp, transition: { ...fadeUp.transition, delay: i * base } };
}

/* ─────────────────────── HERO CHART ─────────────────────── */

const CHART_YEARS = ["Y1", "Y2", "Y3", "Y4", "Y5"];
const CHART_SHARE = [0.18, 0.42, 0.78, 1.25, 1.95];
const CHART_MAX = 2.5;

function HeroChart() {
  const W = 280;
  const H = 100;
  const PL = 32;
  const PR = 8;
  const PT = 6;
  const PB = 18;
  const iW = W - PL - PR;
  const iH = H - PT - PB;

  const pts = CHART_SHARE.map((pct, i) => ({
    x: Number((PL + (i / (CHART_SHARE.length - 1)) * iW).toFixed(2)),
    y: Number((PT + iH - (pct / CHART_MAX) * iH).toFixed(2)),
    pct,
  }));

  const lineD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = [
    `M ${pts[0].x} ${PT + iH}`,
    ...pts.map((p) => `L ${p.x} ${p.y}`),
    `L ${pts[pts.length - 1].x} ${PT + iH}`,
    "Z",
  ].join(" ");

  const ticks = [0, 0.5, 1.0, 1.5, 2.0];

  return (
    <div className="mt-4 rounded-xl border border-aurix-border/50 bg-aurix-surface/30 p-2.5">
      <svg
        className="w-full"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Market share trajectory Y1-Y5"
      >
        <defs>
          <linearGradient id="heroFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(201,162,74,0.3)" />
            <stop offset="100%" stopColor="rgba(201,162,74,0)" />
          </linearGradient>
          <linearGradient id="heroLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e7c983" />
            <stop offset="100%" stopColor="#c9a24a" />
          </linearGradient>
        </defs>
        {ticks.map((t) => {
          const y = Number((PT + iH - (t / CHART_MAX) * iH).toFixed(2));
          return (
            <g key={t}>
              <line x1={PL} x2={W - PR} y1={y} y2={y} stroke="rgba(201,162,74,0.08)" strokeDasharray="3 5" />
              <text x={PL - 5} y={y + 3} textAnchor="end" fill="#6f6b64" style={{ fontSize: 8 }}>
                {t}%
              </text>
            </g>
          );
        })}
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          d={areaD}
          fill="url(#heroFill)"
        />
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
          d={lineD}
          fill="none"
          stroke="url(#heroLine)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3} fill="#0a0a0a" stroke="#c9a24a" strokeWidth={1.5} />
        ))}
      </svg>
      <div className="flex justify-between px-1 pt-0.5">
        {CHART_YEARS.map((y) => (
          <span key={y} className="text-[9px] font-medium tabular-nums text-aurix-muted">{y}</span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────── HERO ─────────────────────── */

function HeroSection() {
  return (
    <section id="hero" className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(201,162,74,0.14)_0%,transparent_55%)]" />
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-aurix-gold/[0.04] blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-aurix-red/[0.07] blur-[120px]" />

      <div className="mx-auto grid min-h-[88svh] max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-7"
        >
          <span className="inline-flex rounded-full border border-aurix-border bg-aurix-surface/40 px-4 py-1.5 text-[11px] font-medium tracking-[0.2em] text-aurix-gold">
            NEXT-GENERATION WEALTH GAMING
          </span>
          <h1 className="font-display text-4xl font-bold leading-[1.08] text-aurix-text sm:text-5xl lg:text-[3.6rem]">
            The Future of{" "}
            <span className="text-gradient-gold">Wealth Gaming</span>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-aurix-muted sm:text-lg">
            Engineered for performance, built for winners.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="#access"
              className="gold-glow inline-flex rounded-full bg-gradient-to-r from-aurix-gold to-[#b98d35] px-7 py-3.5 text-sm font-semibold tracking-[0.12em] text-black transition hover:brightness-110"
            >
              Enter Platform
            </a>
            <a
              href="#raise"
              className="inline-flex rounded-full border border-aurix-border bg-aurix-surface/40 px-7 py-3.5 text-sm font-semibold tracking-[0.12em] text-aurix-text transition hover:border-aurix-gold/55 hover:text-aurix-gold"
            >
              View Investor Round
            </a>
          </div>
        </motion.div>

        {/* Balance engine preview */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="glass-panel animate-float-y rounded-3xl p-5"
        >
          <div className="rounded-2xl border border-aurix-border/70 bg-aurix-void/85 p-5">
            <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-aurix-faint">
              <span>YUEJIN Market Capture</span>
              <span className="rounded-full border border-aurix-gold/30 bg-aurix-gold/5 px-2 py-0.5 text-[10px] text-aurix-gold">
                5-year view
              </span>
            </div>
            <p className="text-xs tracking-[0.08em] text-aurix-muted">
              Target share of serviceable premium segment
            </p>
            <p className="mt-1 font-display text-2xl font-semibold text-gradient-gold">
              → 1.95% by Y5
            </p>

            <HeroChart />

            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-lg border border-aurix-border/50 bg-aurix-surface/40 px-2 py-2">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-aurix-faint">TAM</p>
                <p className="mt-1 font-display text-sm font-semibold text-aurix-text">$420B+</p>
                <p className="text-[10px] text-aurix-muted">Global RMG</p>
              </div>
              <div className="rounded-lg border border-aurix-gold/20 bg-aurix-gold/5 px-2 py-2">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-aurix-gold/80">SAM</p>
                <p className="mt-1 font-display text-sm font-semibold text-aurix-gold">~$19B</p>
                <p className="text-[10px] text-aurix-muted">Premium wallet</p>
              </div>
              <div className="rounded-lg border border-aurix-emerald/25 bg-aurix-emerald/5 px-2 py-2">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-aurix-emerald/90">Target</p>
                <p className="mt-1 font-display text-sm font-semibold text-aurix-emerald">1.8–2.4%</p>
                <p className="text-[10px] text-aurix-muted">Of SAM by Y5</p>
              </div>
            </div>
            <p className="mt-3 text-center text-[9px] text-aurix-faint">
              Illustrative model — actual share depends on licensing &amp; GTM execution
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────── TRUST ─────────────────────── */

const trustStats = [
  { label: "Global users", value: "2.4M+", sub: "Verified accounts" },
  { label: "Payouts delivered", value: "$98M+", sub: "Rolling 12 months" },
  { label: "30-day volume", value: "$1.2B", sub: "Across all markets" },
];

function TrustSection() {
  return (
    <section id="trust" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div {...fadeUp} className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-aurix-gold/80">
          Trust layer
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-aurix-text sm:text-4xl">
          Institutional confidence, measurable performance
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-aurix-muted">
          Provably fair game logic, segregated treasury architecture, and transparent odds
          publishing—backed by on-chain attestations.
        </p>
      </motion.div>
      <div className="grid gap-4 md:grid-cols-3">
        {trustStats.map((s, i) => (
          <motion.div
            key={s.label}
            {...stagger(i)}
            className="glass-panel rounded-2xl p-6 transition hover:-translate-y-0.5 hover:border-aurix-gold/40"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-aurix-faint">
              {s.label}
            </p>
            <p className="mt-3 font-display text-3xl font-semibold text-gradient-gold">{s.value}</p>
            <p className="mt-2 text-xs text-aurix-muted">{s.sub}</p>
          </motion.div>
        ))}
      </div>
      <motion.ul {...fadeUp} className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          "On-chain RNG attestations",
          "99.99% uptime SLA target",
          "Institutional-grade custody",
        ].map((t) => (
          <li
            key={t}
            className="flex items-center gap-2.5 rounded-xl border border-aurix-border/50 bg-aurix-surface/40 px-4 py-3 text-sm text-aurix-muted"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-aurix-red-mid" />
            {t}
          </li>
        ))}
      </motion.ul>
    </section>
  );
}

/* ─────────────────────── PRODUCT ─────────────────────── */

function ProductSection() {
  return (
    <section id="product" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div {...fadeUp} className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-aurix-gold/80">
          Product experience
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-aurix-text sm:text-4xl">
          Trading-grade interface, entertainment core
        </h2>
      </motion.div>
      <div className="grid gap-5 lg:grid-cols-3">
        <motion.div {...stagger(0)} className="glass-panel rounded-2xl p-6 lg:col-span-2">
          <p className="text-sm text-aurix-muted">
            Premium information hierarchy with clean game execution — designed for large
            balances and calm decisions.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-aurix-border/60 bg-aurix-void/70 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-aurix-faint">
                Live tables
              </p>
              <p className="mt-2 text-lg font-semibold text-aurix-text">Adaptive session grid</p>
              <p className="mt-1 text-sm text-aurix-muted">
                Latency-aware matching with smart routing across global nodes.
              </p>
            </div>
            <div className="rounded-xl border border-aurix-border/60 bg-aurix-void/70 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-aurix-faint">
                Risk intelligence
              </p>
              <p className="mt-2 text-lg font-semibold text-aurix-text">Controlled exposure</p>
              <p className="mt-1 text-sm text-aurix-muted">
                Dynamic limit controls and guardrails calibrated by account tier.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-aurix-border/60 bg-aurix-void/70 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-aurix-faint">
                Wallet
              </p>
              <p className="mt-2 text-lg font-semibold text-aurix-text">Unified balance</p>
              <p className="mt-1 text-sm text-aurix-muted">
                Fiat and crypto in one view with instant reconciliation.
              </p>
            </div>
            <div className="rounded-xl border border-aurix-border/60 bg-aurix-void/70 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-aurix-faint">
                Mobile
              </p>
              <p className="mt-2 text-lg font-semibold text-aurix-text">Native performance</p>
              <p className="mt-1 text-sm text-aurix-muted">
                Biometric unlock, gesture controls, low-latency streaming.
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div {...stagger(1)} className="glass-panel rounded-2xl p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-aurix-faint">
            Session pulse
          </p>
          <p className="mt-3 font-display text-3xl font-semibold text-gradient-gold">+16.8%</p>
          <p className="mt-1 text-sm text-aurix-muted">
            Average engagement uplift after UX migration
          </p>
          <div className="mt-6 space-y-3">
            {[
              { label: "Retention", w: 89 },
              { label: "Session depth", w: 74 },
              { label: "Satisfaction", w: 92 },
            ].map((bar) => (
              <div key={bar.label}>
                <div className="mb-1 flex items-center justify-between text-xs text-aurix-muted">
                  <span>{bar.label}</span>
                  <span className="text-aurix-gold">{bar.w}%</span>
                </div>
                <div className="h-2 rounded-full bg-aurix-surface">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-aurix-gold to-aurix-red-mid"
                    style={{ width: `${bar.w}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-aurix-border/50 bg-aurix-void/60 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-aurix-faint">
              AI insights
            </p>
            <p className="mt-2 text-sm text-aurix-muted">
              Personalized stake guidance and session pacing — intelligent, never predatory.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────── GAMIFICATION ─────────────────────── */

const vipTiers = [
  { name: "Bronze", color: "from-amber-800/50" },
  { name: "Silver", color: "from-slate-400/30" },
  { name: "Gold", color: "from-aurix-gold/40" },
  { name: "Platinum", color: "from-slate-300/25" },
  { name: "Sovereign", color: "from-cyan-400/20" },
  { name: "Emperor", color: "from-aurix-gold/50" },
];

function GamificationSection() {
  return (
    <section
      id="gamification"
      className="border-y border-aurix-border/40 bg-aurix-charcoal/30"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="glass-panel rounded-3xl p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-aurix-gold/80">
            Progression
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-aurix-text sm:text-4xl">
            Gamification & VIP system
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-aurix-muted">
            Structured advancement from Bronze to Emperor — XP velocity, reward boosts,
            status multipliers, and concierge unlocks at every tier.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {vipTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                {...stagger(i, 0.04)}
                className={`rounded-xl border border-aurix-border/60 bg-gradient-to-b ${tier.color} to-aurix-void/80 p-4 text-center transition hover:-translate-y-0.5 hover:border-aurix-gold/40`}
              >
                <p className="text-[10px] uppercase tracking-[0.14em] text-aurix-faint">
                  Tier {i + 1}
                </p>
                <p className="mt-2 font-display text-sm font-semibold text-aurix-text">
                  {tier.name}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 rounded-full border border-aurix-border/60 bg-aurix-surface/60 p-1">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "78%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="h-2.5 rounded-full bg-gradient-to-r from-aurix-gold via-[#d6b064] to-aurix-red-mid"
            />
          </div>
          <p className="mt-2 text-center text-xs text-aurix-muted">
            XP progress — 78% to next tier
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Bonus drops",
                desc: "Randomized rewards tied to milestones and seasonal campaigns — daily engagement without diluting premium positioning.",
              },
              {
                title: "Streak rewards",
                desc: "Consecutive sessions unlock escalating multipliers — designed for sustainable play, not grind.",
              },
              {
                title: "XP & levels",
                desc: "Long-term progression with concierge unlocks — every level feels genuinely earned.",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                {...stagger(i)}
                className="rounded-xl border border-aurix-border/50 bg-aurix-void/60 p-5"
              >
                <p className="font-display text-lg font-semibold text-aurix-text">{card.title}</p>
                <p className="mt-2 text-sm text-aurix-muted">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────── TOKENOMICS ─────────────────────── */

type TokenSeg = { label: string; pct: number; color: string };

const tokenAllocation: TokenSeg[] = [
  { label: "Liquidity Pool (LP)", pct: 30, color: "#c9a24a" },
  { label: "Private Sale", pct: 30, color: "#b53333" },
  { label: "Team", pct: 20, color: "#3ba78a" },
  { label: "Marketing", pct: 10, color: "#e7c983" },
  { label: "Ecosystem / Treasury", pct: 10, color: "#6f6b64" },
];

const saleAllocation: TokenSeg[] = [
  { label: "Liquidity Pool", pct: 30, color: "#c9a24a" },
  { label: "Development Cost", pct: 30, color: "#b53333" },
  { label: "Licences", pct: 20, color: "#3ba78a" },
  { label: "Marketing", pct: 20, color: "#e7c983" },
];

function TokenDonut({
  segments,
  size = 180,
  label,
}: {
  segments: TokenSeg[];
  size?: number;
  label?: string;
}) {
  const R = 62;
  const C = 2 * Math.PI * R;
  let offset = 0;

  return (
    <svg width={size} height={size} viewBox="0 0 180 180" className="mx-auto block">
      {segments.map((seg) => {
        const dash = (seg.pct / 100) * C;
        const gap = C - dash;
        const o = offset;
        offset += dash;
        return (
          <circle
            key={seg.label}
            cx="90"
            cy="90"
            r={R}
            fill="none"
            stroke={seg.color}
            strokeWidth="24"
            strokeDasharray={`${dash.toFixed(2)} ${gap.toFixed(2)}`}
            strokeDashoffset={-o}
            strokeLinecap="butt"
            style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
          />
        );
      })}
      <circle cx="90" cy="90" r="47" fill="#060708" />
      {label && (
        <text x="90" y="95" textAnchor="middle" fill="#c9a24a" style={{ fontSize: 12, fontWeight: 600 }}>
          {label}
        </text>
      )}
    </svg>
  );
}

function TokenomicsSection() {
  return (
    <section id="tokenomics" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div {...fadeUp} className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-aurix-gold/80">
          Tokenomics
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-aurix-text sm:text-4xl">
          $YUEJIN — <span className="text-gradient-gold">100,000,000</span> tokens
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-aurix-muted">
          Fixed supply. No inflation. Token utility spans platform fees, VIP staking,
          governance rights, and reward redemption.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Token allocation */}
        <motion.div {...stagger(0)} className="glass-panel rounded-2xl p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-aurix-faint">
            Token allocation
          </p>
          <div className="mt-6">
            <TokenDonut segments={tokenAllocation} label="100M" />
          </div>
          <div className="mt-6 space-y-3">
            {tokenAllocation.map((s) => (
              <div key={s.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-aurix-muted">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: s.color }} />
                    {s.label}
                  </span>
                  <span className="font-display font-semibold text-aurix-text">{s.pct}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-aurix-surface">
                  <div className="h-1.5 rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-aurix-border/50 bg-aurix-void/60 p-3 text-center">
              <p className="text-[10px] uppercase tracking-wider text-aurix-faint">Ticker</p>
              <p className="mt-1 font-display text-lg font-bold text-aurix-gold">$YUEJIN</p>
            </div>
            <div className="rounded-xl border border-aurix-border/50 bg-aurix-void/60 p-3 text-center">
              <p className="text-[10px] uppercase tracking-wider text-aurix-faint">Supply</p>
              <p className="mt-1 font-display text-lg font-bold text-aurix-text">100,000,000</p>
            </div>
          </div>
        </motion.div>

        {/* Sale proceeds allocation */}
        <motion.div {...stagger(1)} className="glass-panel rounded-2xl p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-aurix-faint">
            Sale proceeds allocation
          </p>
          <div className="mt-6">
            <TokenDonut segments={saleAllocation} label="Funds" />
          </div>
          <div className="mt-6 space-y-4">
            {[
              { seg: saleAllocation[0], desc: "Deep DEX liquidity from day one — tight spreads and member confidence." },
              { seg: saleAllocation[1], desc: "Core platform engineering, infrastructure, and security audits." },
              { seg: saleAllocation[2], desc: "Regulatory licensing, legal structuring, and KYC/AML tooling." },
              { seg: saleAllocation[3], desc: "Brand launch, community growth, and strategic acquisition campaigns." },
            ].map(({ seg, desc }) => (
              <div key={seg.label} className="rounded-xl border border-aurix-border/40 bg-aurix-void/40 p-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: seg.color }} />
                  <span className="text-sm font-semibold text-aurix-text">
                    {seg.label} — {seg.pct}%
                  </span>
                </div>
                <p className="mt-1 text-xs text-aurix-muted">{desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────── WHY YUEJIN ─────────────────────── */

const advantages = [
  {
    title: "Faster payouts",
    desc: "Sub-minute withdrawals for verified members — liquidity buffers engineered for high-value flow.",
    stat: "42s",
    statLabel: "avg withdrawal",
  },
  {
    title: "Better UX",
    desc: "Fintech-grade interface designed for large balances and calm decision-making, not carnival noise.",
    stat: "89%",
    statLabel: "retention rate",
  },
  {
    title: "Transparent system",
    desc: "Published odds, on-chain settlement proofs, and member-facing risk dashboards — nothing hidden.",
    stat: "100%",
    statLabel: "provably fair",
  },
  {
    title: "Higher retention",
    desc: "Intelligent progression, AI-driven engagement, and premium rewards that compound over time.",
    stat: "3.2×",
    statLabel: "vs industry avg",
  },
];

function WhySection() {
  return (
    <section id="why" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div {...fadeUp} className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-aurix-gold/80">
          Differentiation
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-aurix-text sm:text-4xl">
          Why YUEJIN
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-aurix-muted">
          More trustworthy than traditional casinos. More usable than Web3 platforms.
          More engaging than both.
        </p>
      </motion.div>
      <div className="grid gap-4 md:grid-cols-2">
        {advantages.map((a, i) => (
          <motion.div
            key={a.title}
            {...stagger(i)}
            className="glass-panel group rounded-2xl p-6 transition hover:-translate-y-0.5 hover:border-aurix-gold/40"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-lg font-semibold text-aurix-text">{a.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-aurix-muted">{a.desc}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-display text-2xl font-semibold text-gradient-gold">{a.stat}</p>
                <p className="text-[10px] uppercase tracking-wider text-aurix-faint">{a.statLabel}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────── INVESTOR ─────────────────────── */

const allocation = [
  { label: "Product and engineering", value: 38 },
  { label: "Growth and user acquisition", value: 27 },
  { label: "Liquidity and rewards engine", value: 20 },
  { label: "Compliance and legal", value: 15 },
];

function InvestorSection() {
  return (
    <section
      id="raise"
      className="border-t border-aurix-border/40 bg-aurix-charcoal/25"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <motion.div {...fadeUp} className="glass-panel rounded-2xl p-6 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-aurix-gold/80">
              Private round
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-aurix-text sm:text-4xl">
              Raise: $200,000
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-aurix-muted">
              Funding supports product acceleration, global growth, compliance depth, and
              long-term liquidity for a premium market position.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-aurix-text/90">
              <li className="flex gap-2">
                <span className="text-aurix-gold">◆</span>
                Invitation-only access — limited partner seats
              </li>
              <li className="flex gap-2">
                <span className="text-aurix-gold">◆</span>
                Aligned incentives with long-term planning
              </li>
              <li className="flex gap-2">
                <span className="text-aurix-gold">◆</span>
                Structured for disciplined execution, not hype
              </li>
            </ul>
            <a
              href="#access"
              className="gold-glow mt-8 inline-flex rounded-full bg-gradient-to-r from-aurix-gold to-[#b98d35] px-6 py-3 text-sm font-semibold tracking-[0.1em] text-black transition hover:brightness-110"
            >
              Request Investor Access
            </a>
          </motion.div>
          <motion.div {...stagger(1)} className="glass-panel rounded-2xl p-6 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-aurix-faint">
              Use of funds
            </p>
            <div className="mt-6 space-y-5">
              {allocation.map((slice) => (
                <div key={slice.label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-aurix-muted">{slice.label}</span>
                    <span className="font-display font-semibold text-aurix-gold">
                      {slice.value}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-aurix-surface">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-aurix-gold to-aurix-red-mid"
                      style={{ width: `${slice.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-[10px] leading-relaxed text-aurix-faint">
              Illustrative allocation for investor discussion. Final deployment subject to
              operational priorities and market conditions.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── FINAL CTA ─────────────────────── */

function CtaSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="access" className="mx-auto max-w-6xl px-4 pb-24 pt-20 sm:px-6 lg:px-8">
      <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-semibold text-aurix-text sm:text-4xl">
          Enter the Future of{" "}
          <span className="text-gradient-gold">Wealth Gaming</span>
        </h2>
        <p className="mt-4 text-sm text-aurix-muted">
          Request private access or leave a secure contact for our investor desk. Limited
          onboarding slots per cycle.
        </p>
      </motion.div>

      <motion.form
        {...fadeUp}
        onSubmit={handleSubmit}
        className="mx-auto mt-10 max-w-lg space-y-4 text-left"
      >
        <div>
          <label
            htmlFor="email"
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-aurix-faint"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className="mt-2 w-full rounded-xl border border-aurix-border/70 bg-aurix-surface/70 px-4 py-3 text-sm text-aurix-text outline-none transition placeholder:text-aurix-faint focus:border-aurix-gold/50"
          />
        </div>
        <div>
          <label
            htmlFor="wallet"
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-aurix-faint"
          >
            Wallet (optional)
          </label>
          <input
            id="wallet"
            name="wallet"
            type="text"
            placeholder="0x… or preferred chain address"
            className="mt-2 w-full rounded-xl border border-aurix-border/70 bg-aurix-surface/70 px-4 py-3 text-sm text-aurix-text outline-none transition placeholder:text-aurix-faint focus:border-aurix-gold/50"
          />
        </div>
        <button
          type="submit"
          className="gold-glow w-full rounded-full bg-gradient-to-r from-aurix-gold to-[#b98d35] py-3.5 text-sm font-semibold tracking-[0.12em] text-black transition hover:brightness-110"
        >
          Request Private Access
        </button>
        {submitted && (
          <p className="text-center text-sm text-aurix-red-mid">
            Received. Our desk will reach out through secure channels.
          </p>
        )}
        <p className="text-center text-[10px] text-aurix-faint">
          By submitting, you agree to confidential discussion terms. Not an offer to sell
          securities in any jurisdiction.
        </p>
      </motion.form>
    </section>
  );
}

/* ─────────────────────── PAGE ─────────────────────── */

export function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-aurix-canvas overflow-x-hidden pt-16">
        <HeroSection />
        <TrustSection />
        <ProductSection />
        <GamificationSection />
        <TokenomicsSection />
        <WhySection />
        <InvestorSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
