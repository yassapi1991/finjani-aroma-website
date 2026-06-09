"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { MenuFilterBar, MenuFilterOption } from "@/components/menu/menu-filter-bar";
import { MenuGridLayout, MenuGridItem } from "@/components/menu/menu-grid-layout";
import { LuxuryMenuProductCard } from "@/components/menu/luxury-menu-product-card";
import { SectionTitle } from "@/components/sections/section-title";
import { QrMenu } from "@/components/menu/qr-menu";
import { CategoryGrid, MenuCategory } from "@/components/menu/category-grid";
import { useCart } from "@/components/cart/cart-context";
import { Product } from "@/lib/types";
import {
  grainsProducts,
  gelatoProducts,
  tartesGlaceesProducts,
} from "@/lib/sample-products";

const allProducts: { [key: string]: Product[] } = {
  "cafe-en-grains": grainsProducts,
  "gelato-italiano": gelatoProducts,
  "tartes-glacees": tartesGlaceesProducts,
};

const menuCategories: MenuCategory[] = [
  {
    id: "grains",
    label: "Maison du Café",
    title: "Café en Grains",
    description: "Sélections de grains premium Finjani Aroma, profils aromatiques nobles et torréfaction maîtrisée.",
    href: "#cafe-en-grains",
    icon: "☕",
  },
  {
    id: "gelato",
    label: "Atelier Gelato",
    title: "Gelato Italiano",
    description: "Une collection artisanale italienne aux textures veloutées et saveurs raffinées.",
    icon: "🍨",
    href: "#gelato-italiano",
  },
  {
    id: "tartes",
    label: "Créations Dessert",
    title: "Tartes Glacées",
    description: "Desserts glacés premium et créations signature pour les moments d'exception.",
    href: "#tartes-glacees",
    icon: "🎂",
  },
];

const filterOptions: MenuFilterOption[] = [
  { id: "all", label: "Tous les Produits", icon: "✨", count: 0 },
  { id: "cafe-en-grains", label: "Café en Grains", icon: "☕", count: 0 },
  { id: "gelato-italiano", label: "Gelato Italiano", icon: "🍨", count: 0 },
  { id: "tartes-glacees", label: "Tartes Glacées", icon: "🎂", count: 0 },
];

function MenuSection({
  id,
  title,
  eyebrow,
  products,
  showFilters = false,
  activeFilter,
  searchQuery,
  filterOptions: filterOpts,
  onFilterChange,
  onSearchChange,
}: {
  id: string;
  title: string;
  eyebrow: string;
  products: Product[];
  showFilters?: boolean;
  activeFilter?: string;
  searchQuery?: string;
  filterOptions?: MenuFilterOption[];
  onFilterChange?: (filterId: string) => void;
  onSearchChange?: (query: string) => void;
}) {
  return (
    <section id={id} className="scroll-mt-20 py-16 sm:py-20">
      <div className="page-shell">
        <div className="mb-8 flex items-end gap-4 sm:mb-12">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--coffee-gold)]">
              {eyebrow}
            </p>
            <h2 className="mt-2 font-serif text-4xl text-[var(--coffee-ink)] sm:text-5xl">
              {title}
            </h2>
          </div>
          <span className="mb-1.5 h-px flex-1 bg-[var(--coffee-line)]" />
        </div>

        {/* Filters */}
        {showFilters && filterOpts && activeFilter !== undefined && onFilterChange && onSearchChange !== undefined && (
          <div className="mb-12">
            <MenuFilterBar
              filters={filterOpts}
              activeFilter={activeFilter}
              onFilterChange={onFilterChange}
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
              enableSearch={true}
            />
          </div>
        )}

        {/* Products Grid */}
        {products.length > 0 ? (
          <MenuGridLayout itemCount={products.length}>
            {products.map((product, index) => (
              <MenuGridItem key={product.id} index={index}>
                <LuxuryMenuProductCard
                  product={product}
                  index={index}
                  badge={
                    product.name.includes("Signature")
                      ? "signature"
                      : product.name.includes("Nouveau")
                        ? "new"
                        : undefined
                  }
                />
              </MenuGridItem>
            ))}
          </MenuGridLayout>
        ) : ( 
          <MenuGridLayout itemCount={0}>
            {null}
          </MenuGridLayout>
        )}
      </div>
    </section>
  );
}

export function MenuPageContent() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { getWhatsAppOrderUrl, setIsOpen, items } = useCart();

  // Calculate product counts
  const filterOptionsWithCounts = filterOptions.map((filter) => ({
    ...filter,
    count:
      filter.id === "all"
        ? Object.values(allProducts).flat().length
        : (allProducts[filter.id as keyof typeof allProducts]?.length || 0),
  }));

  // Filter products based on active filter and search query
  const filteredProducts = useMemo(() => {
    let products: Product[] = [];

    if (activeFilter === "all") {
      products = Object.values(allProducts).flat();
    } else {
      products = allProducts[activeFilter as keyof typeof allProducts] || [];
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    return products;
  }, [activeFilter, searchQuery]);

  const whatsappHref = getWhatsAppOrderUrl();

  return (
    <div>
      <div className="section-ivory border-b border-[var(--coffee-line)]">
        <div className="page-shell py-16 sm:py-20">
          <SectionTitle
            eyebrow="Explorez Notre Univers"
            title="Notre Menu Premium"
            description="Trois univers signatures Finjani Aroma : café en grains, gelato italien et tartes glacées premium."
          />

          <div className="mt-12">
            <CategoryGrid categories={menuCategories} />
          </div>
        </div>
      </div>

      <div id="cafe-en-grains" className="scroll-mt-24" />
      <div id="gelato-italiano" className="scroll-mt-24" />
      <div id="tartes-glacees" className="scroll-mt-24" />

      <MenuSection
        id="all-products"
        title="Nos Produits Premium"
        eyebrow="Sélection Premium"
        products={filteredProducts}
        showFilters={true}
        activeFilter={activeFilter}
        searchQuery={searchQuery}
        filterOptions={filterOptionsWithCounts}
        onFilterChange={setActiveFilter}
        onSearchChange={setSearchQuery}
      />

      <section className="page-shell space-y-6 py-16 sm:py-20">
        <div className="rounded-3xl border border-[var(--coffee-line)] bg-[linear-gradient(150deg,#fffaf1_0%,#f8ead8_56%,#f2dcc4_100%)] p-8 shadow-[0_14px_34px_rgba(129,91,58,0.12)] sm:p-12">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--coffee-gold)]">
            Prêt à Commander ?
          </p>
          <h2 className="mt-4 font-serif text-4xl text-[var(--coffee-ink)] sm:text-5xl">
            Découvrez Notre Carte Complète
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[var(--coffee-muted)]">
            Scannez le QR code pour accéder au menu digital, ou contactez-nous directement via WhatsApp pour passer
            commande.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                if (items.length === 0) {
                  setIsOpen(true);
                  return;
                }
                window.open(whatsappHref, "_blank", "noopener,noreferrer");
              }}
              className="btn-lux-primary px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em]"
            >
              <FaWhatsapp className="h-4 w-4" />
              Commander via WhatsApp
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="btn-lux-soft px-7 py-3 text-xs uppercase tracking-[0.18em]"
            >
              Voir le Panier
            </button>
            <Link
              href="/contact"
              className="btn-lux-soft px-7 py-3 text-xs uppercase tracking-[0.18em]"
            >
              Nous Localiser
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-8">
          <div className="flex-1">
            <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--coffee-gold)]">Menu Numérique</p>
            <p className="mt-2 font-serif text-2xl text-[var(--coffee-ink)]">Scannez & Découvrez</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--coffee-muted)]">
              Pointez votre appareil photo sur le QR code pour accéder instantanément à notre menu complet.
            </p>
          </div>
          <div className="lg:w-[280px]">
            <QrMenu />
          </div>
        </div>
      </section>
    </div>
  );
}
