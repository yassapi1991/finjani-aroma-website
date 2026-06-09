"use client";

import Image from "next/image";
import { Product } from "@/lib/types";

interface PremiumProductCardProps {
  product: Product;
  isFeatured?: boolean;
}

export function PremiumProductCard({ product, isFeatured = false }: PremiumProductCardProps) {
  if (isFeatured) {
    return (
      <article className="group relative col-span-full overflow-hidden rounded-3xl border border-[var(--coffee-line)] bg-gradient-to-r from-[var(--coffee-cream)] to-[var(--coffee-card)] shadow-[0_14px_40px_rgba(130,96,65,0.14)]">
        <div className="grid items-stretch gap-0 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative h-64 overflow-hidden lg:h-auto">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2d1e13]/20 via-transparent to-transparent" />
          </div>

          <div className="flex flex-col justify-between p-7 sm:p-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--coffee-gold)]">{product.type}</p>
              <h3 className="mt-3 font-serif text-4xl leading-tight text-[var(--coffee-ink)] sm:text-5xl">
                {product.name}
              </h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--coffee-muted)]">
                {product.description}
              </p>
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs uppercase tracking-[0.16em] text-[var(--coffee-gold)]">{product.origin}</span>
                <span className="font-serif text-3xl text-[var(--coffee-gold)]">{product.price} dh</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group overflow-hidden rounded-3xl border border-[var(--coffee-line)] bg-[var(--coffee-card)] shadow-[0_10px_28px_rgba(130,96,65,0.1)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(130,96,65,0.16)]">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className={`transition-transform duration-700 group-hover:scale-[1.06] ${
            product.category === "Café en Grains" ? "object-contain bg-[#fdf5e8] p-4" : "object-cover"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2d1e13]/12 via-transparent to-transparent" />
      </div>

      <div className="p-6">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--coffee-gold)]">{product.type}</p>
        <h3 className="mt-2 font-serif text-2xl leading-tight text-[var(--coffee-ink)] transition-colors duration-300 group-hover:text-[var(--coffee-gold)]">
          {product.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--coffee-muted)] line-clamp-2">
          {product.description}
        </p>

        <div className="mt-5 flex items-end justify-between">
          <div className="text-xs uppercase tracking-[0.14em] text-[var(--coffee-muted)]">
            {product.origin}
          </div>
          <div className="flex flex-col items-end gap-1">
            {product.priceNote && (
              <span className="text-[10px] text-[var(--coffee-gold)]">{product.priceNote}</span>
            )}
            <span className="font-serif text-2xl font-semibold text-[var(--coffee-gold)]">
              {product.price} dh
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
