"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { grainsProducts, gelatoProducts, tartesGlaceesProducts } from "@/lib/sample-products";
import { Product } from "@/lib/types";

const categorySets = [
  { id: "all", label: "Tous", items: [...grainsProducts, ...gelatoProducts, ...tartesGlaceesProducts] },
  { id: "grains", label: "Café en Grains", items: grainsProducts },
  { id: "gelato", label: "Gelato Italiano", items: gelatoProducts },
  { id: "tartes", label: "Tartes Glacées", items: tartesGlaceesProducts },
] as const;

export function MenuExperience() {
  const [activeCategory, setActiveCategory] = useState<(typeof categorySets)[number]["id"]>("all");

  const products = useMemo(() => {
    const selected = categorySets.find((set) => set.id === activeCategory);
    return (selected?.items ?? []).slice(0, 8);
  }, [activeCategory]);

  return (
    <section id="menu-experience" className="section-ivory border-y border-[var(--coffee-line)]">
      <div className="page-shell py-20 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--coffee-gold)]">Coffee Menu Experience</p>
          <h2 className="mt-4 font-serif text-4xl text-[var(--coffee-ink)] sm:text-5xl">Explorez la Carte par Univers</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--coffee-muted)]">
            Une navigation fluide entre categories pour choisir votre tasse ideale, du cafe classique aux creations signature.
          </p>
        </div>

        <div className="mt-8 flex snap-x gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:justify-center">
          {categorySets.map((set) => {
            const isActive = set.id === activeCategory;
            return (
              <button
                key={set.id}
                type="button"
                onClick={() => setActiveCategory(set.id)}
                className={[
                  "snap-start rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.16em] transition-all duration-300",
                  isActive
                    ? "border-[var(--coffee-gold)] bg-[var(--coffee-gold)] text-[var(--coffee-cream)] shadow-[0_8px_16px_rgba(141,93,55,0.24)]"
                    : "border-[var(--coffee-line)] bg-[var(--coffee-cream)] text-[var(--coffee-muted)] hover:border-[var(--coffee-gold)] hover:text-[var(--coffee-gold)]",
                ].join(" ")}
              >
                {set.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {products.map((product: Product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-[var(--coffee-line)] bg-[var(--coffee-card)] shadow-[0_10px_22px_rgba(116,84,52,0.1)] transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(116,84,52,0.16)]"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className={[
                      "transition duration-700 group-hover:scale-105",
                      product.category === "Café en Grains" ? "object-contain bg-[#fdf5e8] p-2" : "object-cover",
                    ].join(" ")}
                  />
                </div>
                <div className="p-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--coffee-gold)]">{product.type}</p>
                  <h3 className="mt-1 font-serif text-lg text-[var(--coffee-ink)]">{product.name}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-[var(--coffee-muted)]">{product.priceNote ?? ""}</span>
                    <span className="font-serif text-lg text-[var(--coffee-gold)]">{product.price} dh</span>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
