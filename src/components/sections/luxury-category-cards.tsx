import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "./section-title";

export function LuxuryCategoryCardsSection() {
  const categories = [
    {
      title: "Café en Grains",
      description: "Origines tracées, torréfaction premium",
      image: "/menu-beans.jpeg",
      href: "/menu#cafe-en-grains",
    },
    {
      title: "Gelato Italiano",
      description: "Artisanal aux saveurs authentiques",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=90",
      href: "/menu#gelato-italiano",
    },
    {
      title: "Tartes Glacées",
      description: "Desserts glacés signature et créations premium",
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=90",
      href: "/menu#tartes-glacees",
    },
  ];

  return (
    <section className="page-shell py-20 sm:py-28">
      <SectionTitle
        eyebrow="Notre Univers"
        title="Catégories Signature"
        description="Découvrez nos univers café & gelato dans une mise en scène premium, pensée pour explorer puis commander facilement."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.title} href={category.href}>
            <article className="group relative overflow-hidden rounded-3xl border border-[var(--coffee-line)] bg-[var(--coffee-cream)] p-3 shadow-[0_12px_28px_rgba(130,96,65,0.12)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_42px_rgba(130,96,65,0.17)]">
              <div className="relative h-56 overflow-hidden rounded-2xl sm:h-64">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.1]"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2b1f17]/35 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="px-2 pb-2 pt-5 sm:px-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--coffee-gold)]">Univers Finjani</p>
                <h3 className="mt-2 font-serif text-2xl text-[var(--coffee-ink)] transition-colors duration-300 group-hover:text-[var(--coffee-gold)]">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--coffee-muted)]">{category.description}</p>

                <div className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[var(--coffee-gold)] transition-transform duration-300 group-hover:translate-x-1">
                  Découvrir
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
