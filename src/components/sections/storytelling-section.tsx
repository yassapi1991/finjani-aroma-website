import Image from "next/image";
import { SectionTitle } from "./section-title";

export function StorytellingSection() {
  const stories = [
    {
      title: "Sélection des Origines",
      description:
        "Nous collaborons avec des producteurs d'exception pour sélectionner des profils aromatiques nobles. Chaque grain exprime un terroir, une saison et un savoir-faire maîtrisé.",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1200&q=90",
      step: "01",
    },
    {
      title: "Torréfaction Artisanale",
      description:
        "Chaque lot est torréfié avec précision pour révéler équilibre, profondeur et longueur en bouche, signature de l'expérience Finjani Aroma.",
      image: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=1200&q=90",
      step: "02",
    },
    {
      title: "Préparation & Rituel",
      description:
        "Du grain à la tasse, chaque geste est pensé pour créer un moment de dégustation raffiné entre tradition marocaine et élégance contemporaine.",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=90",
      step: "03",
    },
  ];

  return (
    <section className="section-latte border-y border-[var(--coffee-line)] py-20 sm:py-28">
      <div className="page-shell">
        <SectionTitle
          eyebrow="Savoir-Faire"
          title="Du Grain à la Tasse"
          description="Un parcours en trois actes pour comprendre la qualité Finjani Aroma: origine, torréfaction et rituel de service."
        />

        <div className="mt-14 space-y-16 sm:mt-16 sm:space-y-20 lg:space-y-24">
          {stories.map((story, index) => (
            <article
              key={story.step}
              className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2"
            >
              {index % 2 === 0 ? (
                <>
                  <div className="relative h-[280px] overflow-hidden rounded-3xl border border-[var(--coffee-line)] bg-[var(--coffee-cream)] p-3 shadow-[0_16px_48px_rgba(130,96,65,0.15)] sm:h-[400px]">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="rounded-2xl object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  <div>
                    <span className="font-serif text-6xl text-[var(--coffee-gold)]/20 sm:text-7xl">{story.step}</span>
                    <h3 className="mt-4 font-serif text-3xl text-[var(--coffee-ink)] sm:text-4xl">{story.title}</h3>
                    <p className="mt-4 text-[15px] sm:text-lg leading-relaxed text-[var(--coffee-muted)]">
                      {story.description}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="lg:order-2">
                    <span className="font-serif text-6xl text-[var(--coffee-gold)]/20 sm:text-7xl">{story.step}</span>
                    <h3 className="mt-4 font-serif text-3xl text-[var(--coffee-ink)] sm:text-4xl">{story.title}</h3>
                    <p className="mt-4 text-[15px] sm:text-lg leading-relaxed text-[var(--coffee-muted)]">
                      {story.description}
                    </p>
                  </div>

                  <div className="relative h-[280px] overflow-hidden rounded-3xl border border-[var(--coffee-line)] bg-[var(--coffee-cream)] p-3 shadow-[0_16px_48px_rgba(130,96,65,0.15)] sm:h-[400px] lg:order-1">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="rounded-2xl object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
