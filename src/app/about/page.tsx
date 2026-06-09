import type { Metadata } from "next";
import Link from "next/link";
import { SectionTitle } from "@/components/sections/section-title";

export const metadata: Metadata = {
  title: "À Propos",
  description: "Découvrez l'histoire, le concept, la vision et la mission de Finjani Aroma.",
};

const timeline = [
  { year: "2020", text: "Naissance de Finjani Aroma avec une vision de cafe marocain premium, moderne et chaleureux." },
  { year: "2022", text: "Consolidation de la signature produit entre cafe de caractere, the a la menthe et douceurs gourmandes." },
  { year: "2024", text: "Renforcement de l'identite visuelle haut de gamme inspiree des cafes lifestyle internationaux." },
  { year: "2026", text: "Preparation active pour une croissance structuree et une expansion de marque." },
];

export default function AboutPage() {
  return (
    <div className="page-shell space-y-12 py-18 sm:py-22">
      <SectionTitle
        eyebrow="Notre Histoire"
        title="De l'Inspiration Marocaine a Une Marque Cafe Signature"
        description="Finjani Aroma transforme chaque tasse en une experience premium, conviviale et memorablement marocaine."
      />

      <section id="concept" className="soft-panel p-7 sm:p-10">
        <h2 className="font-serif text-3xl">Présentation du Concept</h2>
        <p className="mt-4 text-[var(--coffee-muted)]">
          Nos espaces associent minimalisme chaleureux, lumiere naturelle et details sensoriels premium : torrefaction soignee, extraction maitrisee et accords gourmands raffines. L&apos;heritage marocain est present avec subtilite dans une lecture contemporaine.
        </p>
      </section>

      <section id="vision-mission" className="grid gap-4 sm:grid-cols-2">
        <article className="soft-panel p-7">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--coffee-gold)]">Vision</p>
          <h3 className="mt-3 font-serif text-3xl">Notre Vision</h3>
          <p className="mt-3 text-[var(--coffee-muted)]">
            Devenir une reference du cafe premium au Maroc, reconnue pour son style, sa constance et son hospitalite.
          </p>
        </article>
        <article className="soft-panel p-7">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--coffee-gold)]">Mission</p>
          <h3 className="mt-3 font-serif text-3xl">Notre Mission</h3>
          <p className="mt-3 text-[var(--coffee-muted)]">
            Offrir des experiences cafe memorables grace a l&apos;excellence produit, un design chic et un service centre sur l&apos;humain.
          </p>
        </article>
      </section>

      <section id="timeline">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--coffee-gold)]">Parcours</p>
        <h2 className="mt-2 font-serif text-3xl">Notre Chronologie</h2>
        <div className="mt-6 space-y-3">
          {timeline.map((item) => (
            <div
              key={item.year}
              className="soft-panel flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:gap-8"
            >
              <p className="min-w-[3.5rem] text-sm font-semibold tracking-[0.16em] text-[var(--coffee-gold)]">
                {item.year}
              </p>
              <p className="text-[var(--coffee-muted)]">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="soft-panel p-7">
        <h2 className="font-serif text-2xl">Navigation Interne</h2>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--coffee-muted)]">
          <Link href="#concept" className="underline-offset-4 hover:text-[var(--coffee-gold)] hover:underline">
            Concept
          </Link>
          <Link href="#vision-mission" className="underline-offset-4 hover:text-[var(--coffee-gold)] hover:underline">
            Vision & Mission
          </Link>
          <Link href="#timeline" className="underline-offset-4 hover:text-[var(--coffee-gold)] hover:underline">
            Chronologie
          </Link>
        </div>
      </section>
    </div>
  );
}
