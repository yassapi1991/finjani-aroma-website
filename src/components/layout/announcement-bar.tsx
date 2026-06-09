"use client";

export function AnnouncementBar() {
  return (
    <div className="border-b border-[var(--coffee-line)] bg-gradient-to-r from-[var(--coffee-cream)] via-[var(--coffee-card)] to-[var(--coffee-cream)]">
      <div className="page-shell py-2.5 sm:py-3">
        <div className="flex items-center justify-center text-center">
          <p className="text-[12px] sm:text-[13px] uppercase tracking-[0.16em] text-[var(--coffee-ink)]">
            ✨ Collection Saisonnière Printemps 2026 • Café Premium d&apos;Ethiopie • Livraison Gratuite Dès 100dh ✨
          </p>
        </div>
      </div>
    </div>
  );
}
