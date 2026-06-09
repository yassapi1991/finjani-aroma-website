import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export function SignatureOffersSection() {
  const offers = [
    {
      title: "Collection Éthiopie",
      subtitle: "Café d'Exception",
      description: "Grains d'Ethiopie aux notes fruitées raffinées, sélectionnés pour les amateurs de cafés rares.",
      image: "/menu-beans.jpeg",
      tag: "Édition Limitée",
    },
    {
      title: "Affogato Signature",
      subtitle: "Le Dessert Café Ultime",
      description: "Gelato vanilla noyé dans un espresso frais — l'alliance parfaite du chaud et du froid.",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=90",
      tag: "Notre Signature",
    },
    {
      title: "Bundle Premium",
      subtitle: "Expérience Complète",
      description: "Café en grains, gelato artisanal et accessoires de dégustation pour une expérience complète.",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=90",
      tag: "Offre Spéciale",
    },
  ];

  return (
    <section className="page-shell py-20 sm:py-28">
      <div className="mb-12">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--coffee-gold)]">Offres Premium</p>
        <h2 className="mt-3 font-serif text-4xl text-[var(--coffee-ink)] sm:text-5xl">Sélections de Saison</h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--coffee-muted)]">
          Nos offres réunissent café de spécialité, dessert signature et art de vivre marocain dans un univers lumineux.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {offers.map((offer) => (
          <Link key={offer.title} href="/menu" className="group">
            <article className="relative overflow-hidden rounded-3xl border border-[var(--coffee-line)] bg-[var(--coffee-cream)] p-3 shadow-[0_12px_32px_rgba(130,96,65,0.1)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(130,96,65,0.16)]">
              <div className="relative h-56 overflow-hidden rounded-2xl sm:h-60">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d1e13]/35 via-transparent to-transparent" />
              </div>

              {/* Tag */}
              <div className="absolute left-6 top-6">
                <span className="inline-block rounded-full border border-[#e4c89c] bg-[var(--coffee-cream)]/95 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--coffee-gold)] backdrop-blur">
                  {offer.tag}
                </span>
              </div>

              {/* Content */}
              <div className="px-2 pb-2 pt-5 sm:px-3">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--coffee-gold)]">{offer.subtitle}</p>
                <h3 className="mt-2 font-serif text-2xl text-[var(--coffee-ink)] transition-colors duration-300 group-hover:text-[var(--coffee-gold)]">
                  {offer.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--coffee-muted)] line-clamp-2">{offer.description}</p>

                <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--coffee-gold)]">
                  Découvrir
                  <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
