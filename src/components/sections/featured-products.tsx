import { SectionTitle } from "./section-title";
import { LuxuryCafeProductCard } from "@/components/menu/luxury-cafe-product-card";
import { getPublicProducts } from "@/lib/products-public";

export async function FeaturedProductsSection() {
  const products = await getPublicProducts();

  const featured = products.slice(0, 6).map((product, index) => ({
    ...product,
    badge: index === 0 ? ("signature" as const) : index === 1 ? ("bestseller" as const) : undefined,
  }));

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
