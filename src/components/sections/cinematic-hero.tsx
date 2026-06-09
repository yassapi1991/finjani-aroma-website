"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppUrl } from "@/lib/brand";

export function CinematicHero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappHref = getWhatsAppUrl();

  return (
    <section className="relative overflow-hidden border-b border-[var(--coffee-line)] pt-24 sm:pt-28">
      {/* Background Parallax */}
      <div
        className="absolute inset-0 transition-transform duration-100"
        style={{ transform: `translateY(${scrollY * 0.22}px)` }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_8%,rgba(227,194,154,0.4),transparent_58%),radial-gradient(ellipse_at_88%_14%,rgba(255,245,224,0.72),transparent_56%),linear-gradient(150deg,#fffaf2_0%,#f8ecdd_56%,#f4e3ce_100%)]" />
        <div className="absolute -left-16 top-24 h-56 w-56 rounded-full bg-[var(--coffee-gold)]/10 blur-3xl" />
        <div className="absolute -right-14 bottom-10 h-64 w-64 rounded-full bg-[#ead1ab]/35 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="page-shell pb-14 pt-10 sm:pb-16 sm:pt-14 lg:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-14">
            <div className="fade-up fade-up-1">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--coffee-gold)]">Maison de Café Marocaine</p>

              <h1 className="mt-5 font-serif text-4xl leading-[1.05] text-[var(--coffee-ink)] sm:text-5xl lg:text-6xl">
                L&apos;élégance du café
                <br />
                <span className="italic text-[var(--coffee-gold)]">et du gelato premium</span>
              </h1>

              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--coffee-muted)] sm:text-lg">
                Finjani Aroma réinvente l&apos;art du café au Maroc avec une ambiance raffinée, des produits d&apos;exception et
                une expérience lifestyle lumineuse.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
                <Link
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-lux-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] sm:px-7 sm:py-3.5"
                >
                  <FaWhatsapp className="h-4 w-4" />
                  Commander via WhatsApp
                </Link>
                <Link
                  href="/menu"
                  className="btn-lux-soft px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] sm:px-7 sm:py-3.5"
                >
                  Découvrir le Menu
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap gap-2.5 text-[10px] uppercase tracking-[0.16em]">
                {[
                  "Torréfaction artisanale",
                  "Identité marocaine",
                  "Gelato premium",
                  "Service sur WhatsApp",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--coffee-line)] bg-[color-mix(in_srgb,var(--coffee-cream)_88%,white)] px-3 py-1.5 text-[var(--coffee-gold)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative fade-up fade-up-2">
              <article className="relative overflow-hidden rounded-[1.75rem] border border-[var(--coffee-line)] bg-[var(--coffee-cream)] p-3 shadow-[0_18px_44px_rgba(124,89,56,0.18)] sm:p-4">
                <div className="relative h-[320px] overflow-hidden rounded-3xl sm:h-[400px]">
                  <Image
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=90"
                    alt="Ambiance café premium Finjani Aroma"
                    fill
                    priority
                    className="hero-image object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3e2b1e]/45 via-transparent to-transparent" />
                </div>

                <div className="absolute bottom-7 left-7 rounded-2xl border border-[#f4dfc5] bg-[#fffaf2]/95 px-4 py-3 shadow-[0_10px_22px_rgba(113,76,44,0.2)] backdrop-blur">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--coffee-gold)]">Signature 2026</p>
                  <p className="mt-1 font-serif text-xl text-[var(--coffee-ink)]">Collection Espresso & Gelato</p>
                </div>
              </article>

              <div className="absolute -left-5 top-6 hidden rounded-2xl border border-[var(--coffee-line)] bg-[var(--coffee-cream)] px-4 py-3 shadow-[0_10px_20px_rgba(120,86,54,0.16)] sm:block">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--coffee-gold)]">Maison Premium</p>
                <p className="mt-1 text-sm text-[var(--coffee-muted)]">Bouskoura · Grand Casablanca</p>
              </div>

              <div className="absolute -bottom-4 right-4 rounded-2xl border border-[var(--coffee-line)] bg-[var(--coffee-cream)] px-4 py-3 shadow-[0_10px_20px_rgba(120,86,54,0.16)]">
                <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--coffee-gold)]">Ouvert 7/7</p>
                <p className="mt-1 text-sm text-[var(--coffee-muted)]">07h00 - 23h00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
