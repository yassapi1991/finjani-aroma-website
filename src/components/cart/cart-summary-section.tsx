"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { formatDhAmount, useCart } from "@/components/cart/cart-context";

export function CartSummarySection() {
  const { items, total, getWhatsAppOrderUrl } = useCart();

  const whatsappHref = getWhatsAppOrderUrl();

  return (
    <section
      id="votre-panier"
      className="scroll-mt-20 border-y border-[var(--coffee-line)] bg-[linear-gradient(180deg,#fffaf1_0%,#f7ebda_100%)] py-16 sm:py-20"
    >
      <div className="page-shell">
        <div className="mb-8 flex items-end gap-4 sm:mb-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--coffee-gold)]">Votre Panier</p>
            <h2 className="mt-2 font-serif text-4xl text-[var(--coffee-ink)] sm:text-5xl">Votre Panier</h2>
          </div>
          <span className="mb-1.5 h-px flex-1 bg-[var(--coffee-line)]" />
        </div>

        {items.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-[var(--coffee-line)] bg-white/70 p-8 shadow-[0_14px_34px_rgba(129,91,58,0.08)] sm:p-10">
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--coffee-gold)]">Panier vide</p>
              <h3 className="mt-3 font-serif text-3xl text-[var(--coffee-ink)] sm:text-4xl">Votre panier est vide</h3>
            </div>
          </div>
        ) : (
          <div className="rounded-[2rem] border border-[var(--coffee-line)] bg-[linear-gradient(180deg,#fffdf8_0%,#fff5e9_100%)] p-5 shadow-[0_18px_40px_rgba(129,91,58,0.12)] sm:p-6">
            <div className="space-y-4">
              {items.map((item, index) => (
                <motion.article
                  key={item.key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="rounded-[1.5rem] border border-[var(--coffee-line)] bg-white/90 px-4 py-4 shadow-[0_10px_26px_rgba(129,91,58,0.08)]"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-serif text-2xl text-[var(--coffee-ink)]">{item.name}</h3>
                      <p className="mt-1 text-sm text-[var(--coffee-muted)]">
                        {item.quantity} x {formatDhAmount(item.unitPrice)}
                      </p>
                    </div>
                    <div className="text-sm font-semibold text-[var(--coffee-gold)]">
                      {formatDhAmount(item.unitPrice * item.quantity)}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-4 border-t border-[var(--coffee-line)] pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--coffee-muted)]">Total</p>
                <p className="font-serif text-4xl leading-none text-[var(--coffee-gold)]">{formatDhAmount(total)}</p>
              </div>
              <Link
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="btn-lux-primary justify-center px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em]"
              >
                <FaWhatsapp className="h-4 w-4" />
                Commander via WhatsApp
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}