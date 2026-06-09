import type { Metadata } from "next";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { MdDirections } from "react-icons/md";
import { SectionTitle } from "@/components/sections/section-title";
import { brand, getWhatsAppUrl } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contactez-Nous",
  description:
    "Contactez Finjani Aroma, retrouvez nos coordonnees officielles et obtenez l'itineraire vers notre adresse a Bouskoura.",
};

export default function ContactPage() {
  const whatsappHref = getWhatsAppUrl();

  return (
    <div className="section-ivory border-y border-[var(--coffee-line)]">
      <div className="page-shell space-y-10 py-18 sm:py-22">
        <SectionTitle
          eyebrow="Rendez-nous visite"
          title="Contact & Localisation"
          description="Une adresse premium a Bouskoura, avec acces direct WhatsApp, Google Maps, Waze et reseaux sociaux."
        />

        <div className="grid gap-6 lg:grid-cols-[1.08fr_1fr]">
          <section className="soft-panel space-y-7 p-7 sm:p-9">
            <h2 className="font-serif text-3xl text-[var(--coffee-ink)] sm:text-4xl">Informations Officielles</h2>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--coffee-gold)]">Adresse</p>
              {brand.addressLines.map((line) => (
                <p key={line} className="text-[15px] text-[var(--coffee-muted)]">
                  {line}
                </p>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[var(--coffee-line)] bg-[var(--coffee-cream)] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--coffee-gold)]">Email</p>
                <Link
                  href={`mailto:${brand.email}`}
                  className="mt-2 block text-[15px] text-[var(--coffee-muted)] underline-offset-4 hover:text-[var(--coffee-gold)] hover:underline"
                >
                  {brand.email}
                </Link>
              </div>
              <div className="rounded-2xl border border-[var(--coffee-line)] bg-[var(--coffee-cream)] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--coffee-gold)]">WhatsApp</p>
                <Link
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block text-[15px] text-[var(--coffee-muted)] underline-offset-4 hover:text-[var(--coffee-gold)] hover:underline"
                >
                  {brand.whatsappLabel}
                </Link>
              </div>
            </div>

            <div className="space-y-1 rounded-2xl border border-[var(--coffee-line)] bg-[var(--coffee-cream)] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--coffee-gold)]">Horaires d&apos;ouverture</p>
              <p className="text-[var(--coffee-muted)]">Lundi - Dimanche</p>
              <p className="text-[var(--coffee-muted)]">07h00 - 23h00</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="btn-lux-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em]"
              >
                <FaWhatsapp className="h-4 w-4" />
                Commander via WhatsApp
              </Link>
              <Link
                href={brand.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-lux-soft px-5 py-2.5 text-xs uppercase tracking-[0.16em]"
              >
                <FaMapMarkerAlt className="h-3.5 w-3.5" />
                Google Maps
              </Link>
              <Link
                href={brand.wazeUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-lux-soft px-5 py-2.5 text-xs uppercase tracking-[0.16em]"
              >
                <MdDirections className="h-4 w-4" />
                Waze
              </Link>
            </div>

            <div className="pt-2">
              <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[var(--coffee-gold)]">Reseaux sociaux</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { href: brand.instagram, label: "Instagram", Icon: FaInstagram },
                  { href: brand.facebook, label: "Facebook", Icon: FaFacebook },
                  { href: brand.tiktok, label: "TikTok", Icon: FaTiktok },
                ].map(({ href, label, Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="btn-lux-soft h-11 w-11 justify-center p-0"
                  >
                    <Icon className="text-lg" />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="soft-panel overflow-hidden p-2">
            <div className="relative h-[540px] overflow-hidden rounded-2xl">
              <iframe
                title="Carte Finjani Aroma Bouskoura"
                src="https://www.google.com/maps?q=Immeuble+8+Residence+Lilas+27182+Bouskoura+Maroc&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#fdf8ef]/88 to-transparent" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
