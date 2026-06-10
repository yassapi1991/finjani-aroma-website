"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaTrash, FaWhatsapp } from "react-icons/fa";
import { formatDhAmount, useCart } from "@/components/cart/cart-context";

export function CartPageContent() {
  const { items, total, updateQuantity, removeItem, getWhatsAppOrderUrl } = useCart();

  const whatsappHref = getWhatsAppOrderUrl();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffaf4_0%,#f7ebda_100%)]">
      <section className="page-shell py-14 sm:py-16 lg:py-20">
        <div className="mb-8 flex items-end gap-4 sm:mb-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--coffee-gold)]">Panier</p>
            <h1 className="mt-2 font-serif text-4xl text-[var(--coffee-ink)] sm:text-5xl">Votre Panier</h1>
          </div>
          <span className="mb-1.5 h-px flex-1 bg-[var(--coffee-line)]" />
        </div>

        {items.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-[var(--coffee-line)] bg-white/75 p-8 shadow-[0_14px_34px_rgba(129,91,58,0.08)] sm:p-10">
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--coffee-gold)]">Panier vide</p>
              <h2 className="mt-3 font-serif text-3xl text-[var(--coffee-ink)] sm:text-4xl">Votre panier est vide</h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--coffee-muted)]">
                Explorez nos produits et ajoutez vos cafés ou desserts préférés pour préparer votre commande.
              </p>
              <div className="mt-8">
                <Link href="/menu" className="btn-lux-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em]">
                  Retour aux produits
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-[2rem] border border-[var(--coffee-line)] bg-[linear-gradient(180deg,#fffdf8_0%,#fff5e9_100%)] p-4 shadow-[0_18px_40px_rgba(129,91,58,0.12)] sm:p-6">
            <div className="overflow-hidden rounded-[1.5rem] border border-[var(--coffee-line)] bg-white/90">
              <div className="hidden grid-cols-[minmax(0,1fr)_auto_auto_auto] gap-4 border-b border-[var(--coffee-line)] px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-[var(--coffee-muted)] sm:grid">
                <span>Produit</span>
                <span>Quantité</span>
                <span>Prix</span>
                <span className="text-right">Action</span>
              </div>

              <div className="divide-y divide-[var(--coffee-line)]">
                {items.map((item, index) => {
                  const lineTotal = item.unitPrice * item.quantity;

                  return (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                      transition={{ duration: 0.28, delay: index * 0.04 }}
                      className="grid gap-3 px-4 py-4 sm:grid-cols-[minmax(0,1fr)_auto_auto_auto] sm:items-center sm:gap-4 sm:px-5"
                    >
                      <div className="min-w-0">
                        <p className="font-serif text-xl text-[var(--coffee-ink)] sm:text-2xl">{item.name}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--coffee-gold)] sm:hidden">
                          {item.quantity} x {formatDhAmount(item.unitPrice)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-[var(--coffee-muted)] sm:justify-center">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          aria-label={`Diminuer la quantité de ${item.name}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--coffee-line)] bg-[var(--coffee-card)] text-[var(--coffee-ink)] transition-colors hover:border-[var(--coffee-gold)]"
                        >
                          -
                        </button>
                        <span className="inline-flex min-w-10 justify-center rounded-full border border-[var(--coffee-line)] bg-[var(--coffee-card)] px-3 py-1 font-semibold text-[var(--coffee-ink)]">
                          x{item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          aria-label={`Augmenter la quantité de ${item.name}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--coffee-line)] bg-[var(--coffee-card)] text-[var(--coffee-ink)] transition-colors hover:border-[var(--coffee-gold)]"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-sm font-semibold text-[var(--coffee-gold)] sm:text-base">
                        {formatDhAmount(lineTotal)}
                      </div>

                      <div className="flex justify-start sm:justify-end">
                        <button
                          type="button"
                          onClick={() => removeItem(item.key)}
                          aria-label={`Supprimer ${item.name}`}
                          className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[var(--coffee-line)] px-4 text-xs uppercase tracking-[0.14em] text-[var(--coffee-muted)] transition-colors hover:border-[var(--coffee-gold)] hover:text-[var(--coffee-gold)]"
                        >
                          <FaTrash className="h-3.5 w-3.5" />
                          <span>Supprimer</span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="border-t border-[var(--coffee-line)] px-4 py-5 sm:px-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--coffee-muted)]">Total</p>
                    <p className="font-serif text-4xl leading-none text-[var(--coffee-gold)]">{formatDhAmount(total)}</p>
                  </div>
                  <div className="flex flex-col gap-3 sm:items-end">
                    <Link
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-lux-primary justify-center px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em]"
                    >
                      <FaWhatsapp className="h-4 w-4" />
                      Commander via WhatsApp
                    </Link>
                    <Link
                      href="/menu"
                      className="rounded-full border border-[var(--coffee-line)] px-4 py-2 text-center text-xs uppercase tracking-[0.16em] text-[var(--coffee-muted)] transition-colors hover:border-[var(--coffee-gold)] hover:text-[var(--coffee-gold)]"
                    >
                      Retour aux produits
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}