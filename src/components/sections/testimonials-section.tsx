import { SectionTitle } from "./section-title";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Une découverte exceptionnelle. Chaque café dégusté chez Finjani Aroma ressemble à un voyage aromatique, avec une vraie signature maison.",
      author: "Amira Benani",
      role: "Architecte, Casablanca",
    },
    {
      quote: "L'atmosphère, le service, la qualité des produits — c'est exactement ce qu'on attendait d'un café premium moderne. Bravo.",
      author: "Hassan Alaoui",
      role: "Entrepreneur, Riyadh",
    },
    {
      quote: "Les gelatos sont incroyables. Pas seulement délicieux, mais authentiques. On sent le travail artisanal dans chaque cuillère.",
      author: "Leila Kharroubi",
      role: "Chef Pâtissière, Marrakech",
    },
  ];

  return (
    <section className="section-ivory border-y border-[var(--coffee-line)] py-20 sm:py-28">
      <div className="page-shell">
        <SectionTitle
          eyebrow="Avis Clients"
          title="Expériences Premium"
          description="Ce que nos clients retiennent de Finjani Aroma: élégance, constance et chaleur marocaine."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="soft-panel rounded-3xl bg-[var(--coffee-card)] p-7 sm:p-8"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg text-[var(--coffee-gold)]/90">
                    ★
                  </span>
                ))}
              </div>

              <p className="mt-5 font-serif text-lg leading-relaxed text-[var(--coffee-ink)]">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="mt-6 border-t border-[var(--coffee-line)] pt-4">
                <p className="font-semibold text-[var(--coffee-ink)]">{testimonial.author}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--coffee-muted)]">{testimonial.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
