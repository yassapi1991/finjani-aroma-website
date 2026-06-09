import { SectionTitle } from "./section-title";
import { LuxuryCafeProductCard } from "@/components/menu/luxury-cafe-product-card";
import { grainsProducts, gelatoProducts, tartesGlaceesProducts } from "@/lib/sample-products";

export function FeaturedProductsSection() {
  const featured = [
    { ...grainsProducts[0], badge: "signature" as const },
    { ...grainsProducts[4], badge: "bestseller" as const },
    { ...gelatoProducts[1], badge: "new" as const },
    { ...gelatoProducts[2], badge: undefined },
    { ...tartesGlaceesProducts[0], badge: "signature" as const },
    { ...tartesGlaceesProducts[3], badge: undefined },
  ];

  return (
    <section className="page-shell py-20 sm:py-28">
      <SectionTitle
        eyebrow="Menu Signature"
        title="Produits Vedettes"
        description="Une sélection de créations iconiques Finjani Aroma, entre café de spécialité, recettes glacées et gourmandise premium."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {featured.map((product) => (
          <LuxuryCafeProductCard key={product.id} product={product} badge={product.badge} />
        ))}
      </div>
    </section>
  );
}
