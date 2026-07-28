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
import { getWhatsAppUrl } from "@/lib/brand";
import { Product } from "@/lib/types";

function slugifyCategory(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getCategoryMeta(category: string) {
  const normalized = category.toLowerCase();

  if (normalized.includes("cafe")) {
    return {
      label: "Maison du Café",
      icon: "☕",
      description: "Sélections de grains premium Finjani Aroma, profils aromatiques nobles et torréfaction maîtrisée.",
    };
  }

  if (normalized.includes("gelato")) {
    return {
      label: "Atelier Gelato",
      icon: "🍨",
      description: "Une collection artisanale italienne aux textures veloutées et saveurs raffinées.",
    };
  }

  if (normalized.includes("tarte")) {
    return {
      label: "Créations Dessert",
      icon: "🎂",
      description: "Desserts glacés premium et créations signature pour les moments d'exception.",
    };
  }

  return {
    label: "Collection Signature",
    icon: "✨",
    description: "Produits premium sélectionnés pour une expérience Finjani Aroma raffinée.",
  };
}

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

export function MenuPageContent({ initialProducts }: { initialProducts: Product[] }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const allProducts = useMemo(() => initialProducts.filter((item) => item.isActive !== false), [initialProducts]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(allProducts.map((item) => item.category))).filter(Boolean);
    return unique.map((category) => {
      const slug = slugifyCategory(category);
      const meta = getCategoryMeta(category);
      return {
        id: slug,
        slug,
        category,
        menu: {
          id: slug,
          label: meta.label,
          title: category,
          description: meta.description,
          href: `#${slug}`,
          icon: meta.icon,
        } as MenuCategory,
      };
    });
  }, [allProducts]);

  const productsByCategory = useMemo(() => {
    return categories.reduce<Record<string, Product[]>>((acc, category) => {
      acc[category.slug] = allProducts.filter((item) => item.category === category.category);
      return acc;
    }, {});
  }, [allProducts, categories]);

  const filterOptions = useMemo<MenuFilterOption[]>(() => {
    return [
      { id: "all", label: "Tous les Produits", icon: "✨", count: allProducts.length },
      ...categories.map((category) => ({
        id: category.slug,
        label: category.category,
        icon: category.menu.icon,
        count: productsByCategory[category.slug]?.length || 0,
      })),
    ];
  }, [allProducts.length, categories, productsByCategory]);

  // Filter products based on active filter and search query
  const filteredProducts = useMemo(() => {
    let products = activeFilter === "all" ? [...allProducts] : [...(productsByCategory[activeFilter] || [])];

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
  }, [activeFilter, allProducts, productsByCategory, searchQuery]);

  const whatsappHref = getWhatsAppUrl();

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
            <CategoryGrid categories={categories.map((item) => item.menu)} />
          </div>
        </div>
      </div>

      {categories.map((category) => (
        <div key={category.id} id={category.slug} className="scroll-mt-24" />
      ))}

      <MenuSection
        id="all-products"
        title="Nos Produits Premium"
        eyebrow="Sélection Premium"
        products={filteredProducts}
        showFilters={true}
        activeFilter={activeFilter}
        searchQuery={searchQuery}
        filterOptions={filterOptions}
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
              onClick={() => window.open(whatsappHref, "_blank", "noopener,noreferrer")}
              className="btn-lux-primary px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em]"
            >
              <FaWhatsapp className="h-4 w-4" />
              Commander via WhatsApp
            </button>
            <Link href="/panier" className="btn-lux-soft px-7 py-3 text-xs uppercase tracking-[0.18em]">
              Voir le Panier
            </Link>
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
