"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

const nav = [
  { href: "#trust", label: "Trust" },
  { href: "#product", label: "Product" },
  { href: "#gamification", label: "Progression" },
  { href: "#why", label: "Why YUEJIN" },
  { href: "#raise", label: "Investor" },
];

export function SiteHeader() {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-aurix-border/90 bg-aurix-void/75 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#hero" className="flex items-center gap-2">
          <Logo size={36} />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-aurix-muted md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-aurix-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#raise"
            className="hidden rounded-full border border-aurix-border px-4 py-2 text-xs font-semibold tracking-[0.14em] text-aurix-gold transition hover:border-aurix-gold/50 hover:bg-aurix-gold/10 sm:inline-flex"
          >
            Investor Deck
          </a>
          <a
            href="#access"
            className="gold-glow inline-flex rounded-full bg-gradient-to-r from-aurix-gold via-[#d4b260] to-aurix-red-mid px-4 py-2 text-xs font-semibold tracking-[0.12em] text-black transition hover:brightness-110"
          >
            Enter Platform
          </a>
        </div>
      </div>
    </motion.header>
  );
}
