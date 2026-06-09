import { SectionTitle } from "./section-title";

export function BrandValuesSection() {
  const values = [
    {
      icon: "✦",
      title: "Qualité Artisanale",
      description: "Chaque grain sélectionné, chaque tasse préparée avec l'attention du détail que seul l'artisan peut offrir.",
    },
    {
      icon: "✦",
      title: "Hospitalité Authentique",
      description: "L'essence du café marocain — chaleur, générosité et partage autour d'une belle tasse.",
    },
    {
      icon: "✦",
      title: "Ingrédients Premium",
      description: "Origines tracées, torréfaction maîtrisée, gelato artisanal — zéro compromis sur la qualité.",
    },
    {
      icon: "✦",
      title: "Expérience Café",
      description: "Pas seulement une boisson, mais un rituel — un moment de prestige, d'émotion et d'connexion.",
    },
  ];

  return (
    <section className="page-shell py-20 sm:py-28">
      <SectionTitle
        eyebrow="Notre Philosophie"
        title="Valeurs Finjani Aroma"
        description="Les piliers de notre maison: exigence artisanale, hospitalité marocaine et expérience premium contemporaine."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {values.map((value) => (
          <article
            key={value.title}
            className="soft-panel rounded-3xl bg-gradient-to-br from-[var(--coffee-cream)] to-[var(--coffee-card)] p-7 sm:p-8"
          >
            <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--coffee-line)] bg-[var(--coffee-cream)] text-xl text-[var(--coffee-gold)]">
              {value.icon}
            </div>
            <h3 className="font-serif text-xl text-[var(--coffee-ink)]">{value.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--coffee-muted)]">{value.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
