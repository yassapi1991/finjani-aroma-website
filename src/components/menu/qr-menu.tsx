"use client";

import Image from "next/image";

export function QrMenu() {
  return (
    <aside className="rounded-3xl border border-[var(--coffee-line)] bg-[linear-gradient(155deg,#fffdf8_0%,#fdf2e2_100%)] p-7 shadow-[0_12px_30px_rgba(130,96,65,0.11)]">
      <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--coffee-gold)]">Menu Numérique</p>
      <h3 className="mt-2 font-serif text-2xl text-[var(--coffee-ink)]">Scannez &amp; Découvrez</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--coffee-muted)]">
        Scannez pour découvrir notre menu digital — instantané, élégant, toujours à jour.
      </p>

      {/* Premium QR card */}
      <div className="mt-7 flex flex-col items-center">
        <div className="relative overflow-hidden rounded-3xl border-2 border-[var(--coffee-line)] bg-white p-4 shadow-[0_4px_0_var(--coffee-line),0_12px_28px_rgba(90,60,32,0.18)]">
          <Image
            src="/qr-menu.jpeg"
            alt="QR Code Finjani Aroma — Scannez le menu"
            width={200}
            height={200}
            className="rounded-xl"
            priority
          />
        </div>

        {/* SCAN ME badge */}
        <div className="mt-5 flex items-center gap-3">
          <span className="h-px w-10 bg-[var(--coffee-line)]" />
          <span className="rounded-full border border-[var(--coffee-line)] bg-[var(--coffee-cream)] px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--coffee-gold)]">
            SCAN ME
          </span>
          <span className="h-px w-10 bg-[var(--coffee-line)]" />
        </div>

        <p className="mt-4 text-center text-[11px] uppercase tracking-[0.18em] text-[var(--coffee-muted)]">
          Pointez votre appareil photo
        </p>
      </div>
    </aside>
  );
}

