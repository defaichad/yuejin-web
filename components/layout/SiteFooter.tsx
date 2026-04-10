import { Logo } from "@/components/brand/Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-aurix-border/70 bg-aurix-charcoal/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="max-w-md space-y-4">
          <Logo showWordmark />
          <p className="text-sm leading-relaxed text-aurix-muted">
            <span className="text-aurix-text/90">YUEJIN</span> is a next-generation wealth gaming
            platform designed with fintech precision, transparent systems, and premium member
            experience.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-aurix-faint">
              Platform
            </p>
            <ul className="mt-3 space-y-2 text-aurix-muted">
              <li>
                <a className="hover:text-aurix-gold" href="#product">
                  Experience
                </a>
              </li>
              <li>
                <a className="hover:text-aurix-gold" href="#gamification">
                  VIP progression
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-aurix-faint">
              Investors
            </p>
            <ul className="mt-3 space-y-2 text-aurix-muted">
              <li>
                <a className="hover:text-aurix-gold" href="#raise">
                  Private round
                </a>
              </li>
              <li>
                <a className="hover:text-aurix-gold" href="#trust">
                  Growth metrics
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-aurix-faint">
              Compliance
            </p>
            <ul className="mt-3 space-y-2 text-aurix-muted">
              <li>AML and KYC-ready architecture</li>
              <li>Global, jurisdiction-aware controls</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-aurix-border/40 py-6 text-center text-xs text-aurix-faint">
        &copy; {new Date().getFullYear()} YUEJIN. All rights reserved. Platform materials provided
        for information purposes only.
      </div>
    </footer>
  );
}
