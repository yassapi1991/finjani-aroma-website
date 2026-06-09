import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { QrMenu } from "@/components/menu/qr-menu";
import { SectionTitle } from "./section-title";
import { brand, getWhatsAppUrl } from "@/lib/brand";

export function PremiumOrderExperienceSection() {
  const whatsappHref = getWhatsAppUrl();

  return (
    <section className="section-ivory border-y border-[var(--coffee-line)] py-20 sm:py-28">
      <div className="page-shell">
        <SectionTitle
          eyebrow="Commande Premium"
          title="Commandez en Un Instant"
          description="Scannez le menu digital ou passez commande directement via WhatsApp. Une expérience fluide, premium et fidèle à l'hospitalité marocaine de Finjani Aroma."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <article className="soft-panel rounded-3xl p-7 sm:p-9">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--coffee-gold)]">Service Signature</p>
            <h3 className="mt-3 font-serif text-3xl leading-tight text-[var(--coffee-ink)] sm:text-4xl">
              Une carte moderne, un service humain
            </h3>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--coffee-muted)]">
              Découvrez nos cafés en grains, nos boissons signature et nos gelatos artisanaux, puis finalisez votre commande en quelques secondes.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[var(--coffee-line)] bg-[var(--coffee-cream)] p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--coffee-gold)]">Adresse</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--coffee-muted)]">{brand.addressLines.join(" · ")}</p>
              </div>
              <div className="rounded-2xl border border-[var(--coffee-line)] bg-[var(--coffee-cream)] p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--coffee-gold)]">Horaires</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--coffee-muted)]">Lundi - Dimanche · 07h00 - 23h00</p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="btn-lux-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em]"
              >
                <FaWhatsapp className="h-4 w-4" />
                Commander via WhatsApp
              </Link>
              <Link href="/menu" className="btn-lux-soft px-6 py-3 text-xs uppercase tracking-[0.18em]">
                Voir le Menu Complet
              </Link>
              <Link href={brand.mapsUrl} target="_blank" rel="noreferrer" className="btn-lux-soft px-6 py-3 text-xs uppercase tracking-[0.18em]">
                Nous Localiser
              </Link>
            </div>
          </article>

          <div className="lg:mx-auto lg:w-full lg:max-w-[360px]">
            <QrMenu />
          </div>
        </div>
      </div>
    </section>
  );
}
