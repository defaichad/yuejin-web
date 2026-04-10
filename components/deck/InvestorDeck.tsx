"use client";

import { Logo } from "@/components/brand/Logo";

/* ──────────── shared slide wrapper ──────────── */

function Slide({
  n,
  children,
  className = "",
}: {
  n: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`relative flex min-h-screen flex-col justify-center overflow-hidden bg-aurix-void px-6 py-16 sm:px-12 md:px-20 print:min-h-0 print:break-after-page print:py-10 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(201,162,74,0.08),transparent_55%)]" />
      <div className="relative z-10 mx-auto w-full max-w-5xl">{children}</div>
      <span className="absolute bottom-6 right-8 text-[11px] tabular-nums text-aurix-faint print:bottom-4 print:right-6">
        {String(n).padStart(2, "0")} / 10
      </span>
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-aurix-border bg-aurix-surface/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-aurix-gold">
      {children}
    </span>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-aurix-text sm:text-4xl lg:text-5xl">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 max-w-2xl text-base leading-relaxed text-aurix-muted sm:text-lg">{children}</p>;
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-aurix-border/60 bg-aurix-surface/50 p-5 ${className}`}
    >
      {children}
    </div>
  );
}

/* ──────────── donut chart helper ──────────── */

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
    <svg width={size} height={size} viewBox="0 0 200 200" className="mx-auto">
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
      {label && (
        <text
          x="100"
          y="105"
          textAnchor="middle"
          fill="#c9a24a"
          style={{ fontSize: 13, fontWeight: 600 }}
        >
          {label}
        </text>
      )}
    </svg>
  );
}

function Legend({ segments }: { segments: Segment[] }) {
  return (
    <div className="mt-6 grid gap-2 sm:grid-cols-2">
      {segments.map((s) => (
        <div key={s.label} className="flex items-center gap-2.5">
          <span
            className="h-3 w-3 shrink-0 rounded-sm"
            style={{ background: s.color }}
          />
          <span className="text-sm text-aurix-muted">
            {s.label}{" "}
            <span className="font-semibold text-aurix-text">{s.pct}%</span>
          </span>
        </div>
      ))}
    </div>
  );
}

/* ──────────── SLIDE 1: COVER ──────────── */

function CoverSlide() {
  return (
    <Slide n={1} className="items-center text-center">
      <Logo size={72} showWordmark={false} className="mx-auto" />
      <h1 className="mt-8 font-display text-5xl font-bold tracking-tight text-aurix-text sm:text-6xl lg:text-7xl">
        YUEJIN
      </h1>
      <p className="mt-3 text-sm font-medium uppercase tracking-[0.35em] text-aurix-gold">
        The Future of Wealth Gaming
      </p>
      <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-aurix-muted">
        A next-generation wealth gaming platform engineered for performance,
        transparency, and intelligent progression.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-aurix-faint">
        <span>Private &amp; Confidential</span>
        <span>·</span>
        <span>2026</span>
      </div>
    </Slide>
  );
}

/* ──────────── SLIDE 2: PROBLEM ──────────── */

const problems = [
  {
    title: "Trust deficit",
    body: "Traditional operators hide mechanics behind marketing — users refuse opaque odds and hidden edges.",
  },
  {
    title: "Web3 friction",
    body: "On-chain venues prize novelty over UX — wallets, gas, and jargon kill retention before it starts.",
  },
  {
    title: "Slow capital",
    body: "Manual withdrawal reviews and multi-day processing erode confidence for serious players.",
  },
  {
    title: "No progression",
    body: "Without meaningful advancement, even high-value players churn once novelty fades.",
  },
];

function ProblemSlide() {
  return (
    <Slide n={2}>
      <Tag>The problem</Tag>
      <H2>The premium gaming segment is broken</H2>
      <P>
        High-value players expect private-bank rigor. Most platforms still
        deliver carnival-floor experiences.
      </P>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {problems.map((p) => (
          <Card key={p.title}>
            <p className="font-display text-lg font-semibold text-aurix-text">{p.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-aurix-muted">{p.body}</p>
          </Card>
        ))}
      </div>
    </Slide>
  );
}

/* ──────────── SLIDE 3: SOLUTION ──────────── */

function SolutionSlide() {
  return (
    <Slide n={3}>
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
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Transparent", desc: "Published odds, on-chain settlement proofs, member-facing risk dashboards." },
          { title: "Instant", desc: "Sub-minute withdrawals for verified members — liquidity buffers sized for high flow." },
          { title: "Intelligent", desc: "AI-driven stake guidance, session pacing, and personalized reward timing." },
          { title: "Reward-driven", desc: "XP, tier ascension, and structured bonuses — not cheap promotional gimmicks." },
        ].map((p) => (
          <Card key={p.title}>
            <p className="font-display text-base font-semibold text-aurix-gold">{p.title}</p>
            <p className="mt-2 text-sm text-aurix-muted">{p.desc}</p>
          </Card>
        ))}
      </div>
    </Slide>
  );
}

/* ──────────── SLIDE 4: PRODUCT ──────────── */

function ProductSlide() {
  return (
    <Slide n={4}>
      <Tag>Product</Tag>
      <H2>Trading-grade interface, entertainment core</H2>
      <P>
        Every surface designed for large balances and calm decisions — dark,
        spacious, and legible at a glance.
      </P>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {[
          { tag: "Games", title: "Curated suite", desc: "Baccarat, premium slots, and live hosts with clean, noise-free UI." },
          { tag: "Wallet", title: "Unified balance", desc: "Fiat ↔ crypto with one-tap reconciliation and full spend visibility." },
          { tag: "Intelligence", title: "AI personalization", desc: "Stake guidance and session pacing — intelligent, never predatory." },
          { tag: "Mobile", title: "Native performance", desc: "Biometric unlock, gesture controls, low-latency streaming worldwide." },
        ].map((t) => (
          <Card key={t.tag}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-aurix-faint">{t.tag}</p>
            <p className="mt-2 font-display text-lg font-semibold text-aurix-text">{t.title}</p>
            <p className="mt-2 text-sm text-aurix-muted">{t.desc}</p>
          </Card>
        ))}
      </div>
    </Slide>
  );
}

/* ──────────── SLIDE 5: MARKET ──────────── */

function MarketSlide() {
  return (
    <Slide n={5}>
      <Tag>Market opportunity</Tag>
      <H2>A generational shift to digital luxury</H2>
      <P>
        The intersection of regulated entertainment, digital assets, and global
        consumer growth creates room for a category-defining platform.
      </P>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <Card className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-aurix-faint">TAM</p>
          <p className="mt-3 font-display text-4xl font-bold text-gradient-gold">$420B+</p>
          <p className="mt-2 text-sm text-aurix-muted">Global digital real-money gaming</p>
        </Card>
        <Card className="border-aurix-gold/25 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-aurix-gold/80">SAM</p>
          <p className="mt-3 font-display text-4xl font-bold text-aurix-gold">~$19B</p>
          <p className="mt-2 text-sm text-aurix-muted">Premium wallet segment</p>
        </Card>
        <Card className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-aurix-faint">Target</p>
          <p className="mt-3 font-display text-4xl font-bold text-gradient-gold">1.8–2.4%</p>
          <p className="mt-2 text-sm text-aurix-muted">Of SAM by Year 5</p>
        </Card>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { title: "Regulatory clarity", desc: "Key markets are standardizing licensing frameworks — first movers win." },
          { title: "HNW digital adoption", desc: "Affluent cohorts worldwide expect elevated, mobile-first experiences." },
          { title: "Web3 maturity", desc: "Institutional custody and L2 throughput finally support seamless hybrid play." },
        ].map((p) => (
          <Card key={p.title}>
            <p className="font-display text-base font-semibold text-aurix-text">{p.title}</p>
            <p className="mt-2 text-sm text-aurix-muted">{p.desc}</p>
          </Card>
        ))}
      </div>
    </Slide>
  );
}

/* ──────────── SLIDE 6: TOKENOMICS ──────────── */

const tokenAlloc: Segment[] = [
  { label: "Liquidity Pool (LP)", pct: 30, color: "#c9a24a" },
  { label: "Private Sale", pct: 30, color: "#b53333" },
  { label: "Team", pct: 20, color: "#3ba78a" },
  { label: "Marketing", pct: 10, color: "#e7c983" },
  { label: "Ecosystem / Treasury", pct: 10, color: "#6f6b64" },
];

function TokenomicsSlide() {
  return (
    <Slide n={6}>
      <Tag>Tokenomics</Tag>
      <H2>
        $YUEJIN — <span className="text-gradient-gold">100,000,000</span> tokens
      </H2>
      <P>
        Fixed supply. No inflation. Token utility spans platform fees, VIP
        staking, governance rights, and reward redemption.
      </P>
      <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <Donut segments={tokenAlloc} size={240} label="100M" />
        </div>
        <Card>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-aurix-faint">
            Token allocation
          </p>
          <div className="mt-5 space-y-4">
            {tokenAlloc.map((s) => (
              <div key={s.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-aurix-muted">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />
                    {s.label}
                  </span>
                  <span className="font-display font-semibold text-aurix-text">{s.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-aurix-surface">
                  <div className="h-2 rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
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
              <p className="mt-1 font-display text-lg font-bold text-aurix-text">100M</p>
            </div>
          </div>
        </Card>
      </div>
    </Slide>
  );
}

/* ──────────── SLIDE 7: SALE ALLOCATION ──────────── */

const saleAlloc: Segment[] = [
  { label: "Liquidity Pool", pct: 30, color: "#c9a24a" },
  { label: "Development Cost", pct: 30, color: "#b53333" },
  { label: "Licences", pct: 20, color: "#3ba78a" },
  { label: "Marketing", pct: 20, color: "#e7c983" },
];

function SaleAllocSlide() {
  return (
    <Slide n={7}>
      <Tag>Use of funds</Tag>
      <H2>
        Sale proceeds allocation
      </H2>
      <P>
        Every dollar from the private sale is deployed toward tangible
        milestones — product, compliance, liquidity, and growth. No
        discretionary spend.
      </P>
      <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <Donut segments={saleAlloc} size={240} label="Funds" />
          <Legend segments={saleAlloc} />
        </div>
        <div className="space-y-4">
          {[
            {
              title: "Liquidity Pool — 30%",
              desc: "Deep DEX liquidity from day one. Ensures tight spreads, low slippage, and member confidence on withdrawals.",
              color: "#c9a24a",
            },
            {
              title: "Development Cost — 30%",
              desc: "Product engineering, infrastructure, and security audits — core platform build across frontend, backend, and smart contracts.",
              color: "#b53333",
            },
            {
              title: "Licences — 20%",
              desc: "Regulatory licensing, legal structuring, KYC/AML tooling, and jurisdiction-specific compliance work.",
              color: "#3ba78a",
            },
            {
              title: "Marketing — 20%",
              desc: "Brand launch, influencer partnerships, community growth, and strategic acquisition campaigns across target markets.",
              color: "#e7c983",
            },
          ].map((item) => (
            <Card key={item.title}>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 shrink-0 rounded-sm" style={{ background: item.color }} />
                <p className="font-display text-base font-semibold text-aurix-text">{item.title}</p>
              </div>
              <p className="mt-2 text-sm text-aurix-muted">{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ──────────── SLIDE 8: GAMIFICATION ──────────── */

const vipTiers = ["Bronze", "Silver", "Gold", "Platinum", "Sovereign", "Emperor"];

function GamificationSlide() {
  return (
    <Slide n={8}>
      <Tag>Gamification</Tag>
      <H2>Status, ritual, momentum</H2>
      <P>
        Structured VIP progression with XP velocity, reward multipliers, and
        concierge unlocks at every tier — designed for long-term retention.
      </P>
      <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {vipTiers.map((tier, i) => (
          <Card key={tier} className="text-center">
            <p className="text-[10px] uppercase tracking-[0.14em] text-aurix-faint">Tier {i + 1}</p>
            <p className="mt-2 font-display text-sm font-semibold text-aurix-text">{tier}</p>
          </Card>
        ))}
      </div>
      <div className="mt-6 rounded-full border border-aurix-border/60 bg-aurix-surface/50 p-1">
        <div className="h-3 w-[78%] rounded-full bg-gradient-to-r from-aurix-gold via-[#d6b064] to-[#3ba78a]" />
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { title: "Bonus drops", desc: "Randomized rewards tied to milestones and seasonal campaigns." },
          { title: "Streak rewards", desc: "Consecutive sessions unlock escalating multipliers." },
          { title: "XP & levels", desc: "Long-term progression with concierge unlocks at every milestone." },
        ].map((c) => (
          <Card key={c.title}>
            <p className="font-display text-base font-semibold text-aurix-gold">{c.title}</p>
            <p className="mt-2 text-sm text-aurix-muted">{c.desc}</p>
          </Card>
        ))}
      </div>
    </Slide>
  );
}

/* ──────────── SLIDE 9: WHY YUEJIN ──────────── */

function WhySlide() {
  return (
    <Slide n={9}>
      <Tag>Why YUEJIN</Tag>
      <H2>More trustworthy than Web2. More usable than Web3.</H2>
      <P>Faster, fairer, and built for players who take wealth seriously.</P>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {[
          { title: "Faster payouts", stat: "42s", sub: "avg withdrawal", desc: "Sub-minute settlement for verified members." },
          { title: "Better UX", stat: "89%", sub: "retention rate", desc: "Fintech-grade interface, not carnival noise." },
          { title: "Transparent system", stat: "100%", sub: "provably fair", desc: "On-chain proofs and published odds." },
          { title: "Higher retention", stat: "3.2×", sub: "vs industry", desc: "Intelligent progression and AI engagement." },
        ].map((a) => (
          <Card key={a.title}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-lg font-semibold text-aurix-text">{a.title}</p>
                <p className="mt-2 text-sm text-aurix-muted">{a.desc}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-display text-2xl font-bold text-gradient-gold">{a.stat}</p>
                <p className="text-[10px] uppercase tracking-wider text-aurix-faint">{a.sub}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Slide>
  );
}

/* ──────────── SLIDE 10: CTA ──────────── */

function CtaSlide() {
  return (
    <Slide n={10} className="items-center text-center">
      <Logo size={56} showWordmark={false} className="mx-auto" />
      <h2 className="mt-8 font-display text-4xl font-bold tracking-tight text-aurix-text sm:text-5xl lg:text-6xl">
        Enter the Future of{" "}
        <span className="text-gradient-gold">Wealth Gaming</span>
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-aurix-muted">
        Private round open. Limited allocation available for strategic partners
        aligned with long-term platform growth.
      </p>
      <div className="mx-auto mt-10 grid max-w-md gap-4 sm:grid-cols-2">
        <Card className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-aurix-faint">Raise</p>
          <p className="mt-2 font-display text-2xl font-bold text-gradient-gold">$100,000</p>
        </Card>
        <Card className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-aurix-faint">Token</p>
          <p className="mt-2 font-display text-2xl font-bold text-aurix-gold">$YUEJIN</p>
        </Card>
      </div>
      <div className="mt-10 space-y-2 text-sm text-aurix-muted">
        <p>Contact: <span className="text-aurix-text">invest@yuejin.io</span></p>
        <p>Website: <span className="text-aurix-text">yuejin.io</span></p>
      </div>
      <p className="mt-12 text-xs text-aurix-faint">
        This presentation is confidential and for informational purposes only.
        Not an offer to sell securities in any jurisdiction.
      </p>
    </Slide>
  );
}

/* ──────────── DECK EXPORT ──────────── */

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
