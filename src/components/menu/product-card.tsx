import Image from "next/image";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isBeans = product.category === "Café en Grains";
  return (
    <article className="group overflow-hidden rounded-3xl border border-[var(--coffee-line)] bg-[var(--coffee-card)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_38px_rgba(125,92,62,0.18)]">
      <div className={`relative overflow-hidden ${isBeans ? "h-48 bg-[#fdf5e8]" : "h-56"}`}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className={`transition-all duration-700 group-hover:scale-105 ${isBeans ? "object-contain p-4" : "object-cover"}`}
        />
        {!isBeans && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#4b3424]/18 via-transparent to-[#fff5e2]/22" />
        )}
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-[var(--coffee-cream)]/90 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--coffee-gold)] backdrop-blur-sm">
            {product.type}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-[1.3rem] leading-snug text-[var(--coffee-ink)] transition-colors duration-300 group-hover:text-[var(--coffee-gold)]">
          {product.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--coffee-muted)] line-clamp-2">{product.description}</p>
        <div className="mt-4 flex items-center justify-between border-t border-[var(--coffee-line)]/60 pt-4">
          {product.priceNote ? (
            <p className="text-xs text-[var(--coffee-muted)]">{product.priceNote}</p>
          ) : (
            <p className="text-xs text-[var(--coffee-muted)]">{product.origin}</p>
          )}
          <p className="font-serif text-lg font-semibold text-[var(--coffee-gold)]">{product.price} dh</p>
        </div>
      </div>
    </article>
  );
}
