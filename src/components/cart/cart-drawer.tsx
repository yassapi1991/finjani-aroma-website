"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { formatDhAmount, useCart } from "@/components/cart/cart-context";

export function CartDrawer() {
  const {
    items,
    isOpen,
    total,
    setIsOpen,
    updateQuantity,
    removeItem,
    clearCart,
    getWhatsAppOrderUrl,
  } = useCart();

  if (!isOpen) return null;

  const whatsappHref = getWhatsAppOrderUrl();

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        aria-label="Fermer le panier"
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 bg-[#2f2116]/35 backdrop-blur-[2px]"
      />

      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 top-0 h-full w-full max-w-md border-l border-[var(--coffee-line)] bg-[var(--coffee-cream)] shadow-[0_26px_48px_rgba(92,63,39,0.22)]"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between border-b border-[var(--coffee-line)] px-5 py-4">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--coffee-gold)]">Votre Panier</p>
              <h3 className="font-serif text-2xl text-[var(--coffee-ink)]">Commande WhatsApp</h3>
              <div className="flex items-center gap-2 text-xs text-[var(--coffee-muted)]">
                <span>{items.length} ligne(s)</span>
                <span>•</span>
                <span>{formatDhAmount(total)}</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-[var(--coffee-line)] px-3 py-1 text-xs uppercase tracking-[0.14em] text-[var(--coffee-muted)]"
            >
              Fermer
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[var(--coffee-line)] p-8 text-center">
                <p className="text-sm text-[var(--coffee-muted)]">Votre panier est vide.</p>
              </div>
            ) : (
              items.map((item) => (
                <article
                  key={item.key}
                  className="rounded-2xl border border-[var(--coffee-line)] bg-[var(--coffee-card)] p-3"
                >
                  <div className="flex gap-3">
                    <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-[var(--coffee-line)] bg-white">
                      <Image src={item.imageUrl} alt={item.name} fill sizes="64px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 font-serif text-lg text-[var(--coffee-ink)]">{item.name}</p>
                      <p className="text-xs uppercase tracking-[0.12em] text-[var(--coffee-gold)]">{item.weight}</p>
                      <p className="text-sm text-[var(--coffee-muted)]">{formatDhAmount(item.unitPrice)} / unité</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center overflow-hidden rounded-full border border-[var(--coffee-line)]">
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity - 1)}
                        className="px-3 py-1.5 text-sm text-[var(--coffee-ink)]"
                        aria-label="Diminuer"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-[var(--coffee-ink)]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity + 1)}
                        className="px-3 py-1.5 text-sm text-[var(--coffee-ink)]"
                        aria-label="Augmenter"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--coffee-muted)]">Sous-total</p>
                      <p className="font-serif text-xl text-[var(--coffee-gold)]">{formatDhAmount(item.unitPrice * item.quantity)}</p>
                      <button
                        onClick={() => removeItem(item.key)}
                        className="text-[11px] uppercase tracking-[0.12em] text-[var(--coffee-muted)] hover:text-[var(--coffee-gold)]"
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          <div className="border-t border-[var(--coffee-line)] p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm uppercase tracking-[0.14em] text-[var(--coffee-muted)]">Total</span>
              <span className="font-serif text-3xl text-[var(--coffee-gold)]">{formatDhAmount(total)}</span>
            </div>

            <div className="grid gap-2">
              <Link
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="btn-lux-primary justify-center px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em]"
              >
                <FaWhatsapp className="h-4 w-4" />
                Commander via WhatsApp
              </Link>
              <button
                onClick={clearCart}
                className="rounded-full border border-[var(--coffee-line)] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[var(--coffee-muted)]"
              >
                Vider le panier
              </button>
            </div>
          </div>
        </div>
      </motion.aside>
    </div>
  );
}
