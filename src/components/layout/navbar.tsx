"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaShoppingBag } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { getWhatsAppUrl } from "@/lib/brand";
import { useCart } from "@/components/cart/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/menu", label: "Nos Produits" },
  { href: "/about", label: "À Propos" },
  { href: "/contact", label: "Contactez-Nous" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const whatsappHref = getWhatsAppUrl();
  const { itemCount, setIsOpen, notice, clearNotice } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--coffee-line)] bg-[var(--coffee-cream)]/92 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] w-full max-w-6xl items-center justify-between gap-3 px-4 sm:h-[82px] sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Finjani Aroma"
          className="relative flex h-12 w-[166px] shrink-0 items-center sm:h-14 sm:w-[214px]"
        >
          <Image
            src="/finjani-aroma-logo.jpeg"
            alt="Finjani Aroma"
            fill
            priority
            sizes="(max-width: 639px) 166px, 214px"
            className="object-contain object-left"
          />
        </Link>
        <nav className="hidden items-center gap-9 md:flex">
          {links.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-300",
                  isActive
                    ? "text-[var(--coffee-ink)]"
                    : "text-[var(--coffee-muted)] hover:text-[var(--coffee-ink)]"
                )}
              >
                {link.label}
                {/* Animated underline */}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px bg-[var(--coffee-gold)] transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            );
          })}
          <Link
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="btn-lux-primary px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em]"
          >
            WhatsApp
          </Link>
          <button
            type="button"
            onClick={() => {
              clearNotice();
              setIsOpen(true);
            }}
            aria-label="Ouvrir le panier"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--coffee-line)] bg-[var(--coffee-card)] text-[var(--coffee-ink)] transition-all duration-300 hover:border-[var(--coffee-gold)] hover:text-[var(--coffee-gold)]"
          >
            <FaShoppingBag className="h-4 w-4" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 min-w-[1.2rem] rounded-full bg-[var(--coffee-gold)] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                {itemCount}
              </span>
            )}
          </button>
        </nav>
        <button
          type="button"
          onClick={() => {
            clearNotice();
            setIsOpen(true);
          }}
          aria-label="Ouvrir le panier"
          className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--coffee-line)] bg-[color-mix(in_srgb,var(--coffee-cream)_78%,white)] text-[var(--coffee-ink)] md:hidden"
        >
          <FaShoppingBag className="h-4 w-4" />
          {itemCount > 0 && (
            <span className="absolute -right-1 -top-1 min-w-[1.2rem] rounded-full bg-[var(--coffee-gold)] px-1.5 py-0.5 text-[10px] font-semibold text-white">
              {itemCount}
            </span>
          )}
        </button>

        {/* Mobile hamburger */}
        <button
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--coffee-line)] bg-[color-mix(in_srgb,var(--coffee-cream)_78%,white)] md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="relative block h-4 w-5">
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
              className="absolute top-0 block h-px w-5 origin-center bg-[var(--coffee-ink)]"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              className="absolute top-1.5 block h-px w-5 bg-[var(--coffee-ink)]"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
              className="absolute top-3 block h-px w-5 origin-center bg-[var(--coffee-ink)]"
            />
          </span>
        </button>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={cn("overflow-hidden border-t border-[var(--coffee-line)] md:hidden")}
          >
            <nav className="flex flex-col bg-[color-mix(in_srgb,var(--coffee-cream)_88%,white)] px-4 py-4">
              {links.map((link) => {
                const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded px-3 py-2.5 text-xs uppercase tracking-[0.18em] transition-colors duration-200 hover:bg-[var(--coffee-bg-soft)] hover:text-[var(--coffee-ink)]",
                      isActive ? "text-[var(--coffee-ink)]" : "text-[var(--coffee-muted)]"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="btn-lux-primary mt-2 justify-center px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.18em]"
              >
                Commander via WhatsApp
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {notice ? (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="pointer-events-none fixed right-4 top-[92px] z-[90] rounded-full border border-[var(--coffee-line)] bg-[var(--coffee-card)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--coffee-ink)] shadow-[0_12px_28px_rgba(92,63,39,0.16)]"
          >
            {notice}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <CartDrawer />
    </header>
  );
}
