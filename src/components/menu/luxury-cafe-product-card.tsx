"use client";

import Image from "next/image";
import { Product } from "@/lib/types";

interface LuxuryCafeProductCardProps {
  product: Product;
  badge?: "bestseller" | "signature" | "new";
}

export function LuxuryCafeProductCard({ product, badge }: LuxuryCafeProductCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-[var(--coffee-line)] bg-[var(--coffee-card)] shadow-[0_8px_24px_rgba(130,96,65,0.1)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(130,96,65,0.16)]">
      {/* Badge */}
      {badge && (
        <div className="absolute top-4 right-4 z-20">
          <span className="inline-block rounded-full bg-[var(--coffee-gold)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--coffee-cream)]">
            {badge === "bestseller" ? "Bestseller" : badge === "signature" ? "Signature" : "Nouveau"}
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className={`transition-transform duration-700 group-hover:scale-[1.08] ${
            product.category === "Café en Grains" ? "object-contain bg-[#fdf5e8] p-6" : "object-cover"
          }`}
        />
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2d1e13]/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--coffee-gold)]">{product.type}</p>

          <h3 className="mt-3 font-serif text-2xl leading-tight text-[var(--coffee-ink)] transition-colors duration-300 group-hover:text-[var(--coffee-gold)]">
            {product.name}
          </h3>

          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[var(--coffee-muted)]">
            {product.description}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-end justify-between border-t border-[var(--coffee-line)] pt-4">
          <div className="flex flex-col gap-1">
            {product.origin && (
              <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--coffee-muted)]">
                {product.origin}
              </span>
            )}
            {product.priceNote && (
              <span className="text-[10px] text-[var(--coffee-gold)]">{product.priceNote}</span>
            )}
          </div>

          <div className="text-right">
            <span className="block font-serif text-3xl font-semibold text-[var(--coffee-gold)]">
              {product.price}
            </span>
            <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--coffee-muted)]">dh</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 flex gap-2">
          <button className="flex-1 rounded-full bg-[var(--coffee-gold)]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--coffee-gold)] transition-all duration-300 hover:bg-[var(--coffee-gold)] hover:text-[var(--coffee-cream)]">
            + Ajouter
          </button>
          <button className="rounded-full border border-[var(--coffee-line)] px-3 py-2 text-[var(--coffee-ink)] transition-all duration-300 hover:border-[var(--coffee-gold)] hover:text-[var(--coffee-gold)]">
            ♥
          </button>
        </div>
      </div>
    </article>
  );
}
