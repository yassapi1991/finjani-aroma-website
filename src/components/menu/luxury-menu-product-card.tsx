"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Product, ProductVariant } from "@/lib/types";
import { FaHeart, FaPlus } from "react-icons/fa";
import { useCart } from "@/components/cart/cart-context";

interface LuxuryMenuProductCardProps {
  product: Product;
  badge?: "bestseller" | "signature" | "new" | "limited";
  index?: number;
  onQuickView?: () => void;
}

export function LuxuryMenuProductCard({
  product,
  badge,
  index = 0,
  onQuickView: _onQuickView,
}: LuxuryMenuProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const variantOptions: ProductVariant[] = useMemo(() => {
    if (product.variants && product.variants.length > 0) {
      return product.variants;
    }
    return [{ label: product.priceNote || "Unité", price: product.price }];
  }, [product]);

  const [selectedVariantLabel, setSelectedVariantLabel] = useState(variantOptions[0].label);

  const selectedVariant =
    variantOptions.find((item) => item.label === selectedVariantLabel) || variantOptions[0];

  const addItem = () => {
    addToCart({
      product,
      weight: selectedVariant.label,
      unitPrice: selectedVariant.price,
      quantity,
    });
    setQuantity(1);
  };

  const badgeConfig = {
    bestseller: { bg: "bg-[#f59e0b]", text: "text-white", label: "Bestseller" },
    signature: { bg: "bg-[var(--coffee-gold)]", text: "text-white", label: "Signature" },
    new: { bg: "bg-[#10b981]", text: "text-white", label: "Nouveau" },
    limited: { bg: "bg-[#ef4444]", text: "text-white", label: "Limité" },
  };

  const badgeStyle = badge ? badgeConfig[badge] : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-[var(--coffee-line)] bg-[var(--coffee-cream)] shadow-[0_10px_28px_rgba(130,96,65,0.1)] transition-all duration-500 hover:shadow-[0_20px_48px_rgba(130,96,65,0.18)]"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-[var(--coffee-card)]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className={`transition-transform duration-700 ${
            product.category === "Café en Grains"
              ? "object-contain p-4"
              : "object-cover"
          } ${isHovered ? "scale-110" : "scale-100"}`}
        />

        {/* Overlay Gradient */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-[#2d1e13]/40 via-transparent to-transparent"
        />

        {/* Badge */}
        {badgeStyle && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`absolute left-4 top-4 rounded-full ${badgeStyle.bg} ${badgeStyle.text} px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] shadow-lg`}
          >
            {badgeStyle.label}
          </motion.div>
        )}

        {/* Quick Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-x-4 bottom-4 flex gap-3"
        >
          <button
            type="button"
            onClick={addItem}
            className="flex-1 flex items-center justify-center gap-2 rounded-full bg-[var(--coffee-olive)] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110 shadow-lg"
          >
            <FaPlus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Ajouter au panier</span>
            <span className="sm:hidden">Ajouter</span>
          </button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsLiked(!isLiked)}
            className="rounded-full bg-white/90 p-2.5 text-[var(--coffee-gold)] transition-all duration-300 hover:bg-white hover:scale-110 shadow-lg"
          >
            <FaHeart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
          </motion.button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-[10px] uppercase tracking-[0.2em] text-[var(--coffee-gold)]"
          >
            {product.type}
          </motion.p>

          <h3 className="mt-2 font-serif text-2xl leading-snug text-[var(--coffee-ink)] transition-colors duration-300 group-hover:text-[var(--coffee-gold)] line-clamp-2">
            {product.name}
          </h3>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mt-3 text-sm leading-relaxed text-[var(--coffee-muted)] line-clamp-2"
          >
            {product.description}
          </motion.p>
        </div>

        {/* Footer with Dynamic Pricing */}
        <div className="mt-5 border-t border-[var(--coffee-line)] pt-4">
          <div className="mb-3 flex items-end justify-between">
            {product.origin && (
              <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--coffee-muted)]">
                {product.origin}
              </span>
            )}
            <div className="text-right">
              <span className="block text-[10px] text-[var(--coffee-gold)]">{selectedVariant.label}</span>
              <span className="font-serif text-2xl font-semibold text-[var(--coffee-gold)]">
                {selectedVariant.price} dh
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {variantOptions.map((variant) => {
              const isActive = variant.label === selectedVariant.label;
              return (
                <button
                  key={variant.label}
                  type="button"
                  onClick={() => setSelectedVariantLabel(variant.label)}
                  className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.14em] transition-all ${
                    isActive
                      ? "border-[var(--coffee-gold)] bg-[var(--coffee-gold)] text-white"
                      : "border-[var(--coffee-line)] bg-[var(--coffee-card)] text-[var(--coffee-muted)] hover:border-[var(--coffee-gold)]"
                  }`}
                >
                  {variant.label}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="inline-flex items-center overflow-hidden rounded-full border border-[var(--coffee-line)] bg-white">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="px-3 py-1.5 text-sm text-[var(--coffee-ink)]"
                aria-label="Diminuer la quantité"
              >
                -
              </button>
              <span className="w-8 text-center text-sm font-semibold text-[var(--coffee-ink)]">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((value) => value + 1)}
                className="px-3 py-1.5 text-sm text-[var(--coffee-ink)]"
                aria-label="Augmenter la quantité"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={addItem}
              className="btn-lux-primary px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em]"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
