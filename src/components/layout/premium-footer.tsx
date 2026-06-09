import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { brand, getWhatsAppUrl } from "@/lib/brand";

export function PremiumFooter() {
  const whatsappHref = getWhatsAppUrl();

  return (
    <footer className="border-t border-[var(--coffee-line)] bg-[linear-gradient(180deg,#fffdf8_0%,#f8ead8_100%)]">
      <div className="page-shell py-16 sm:py-20">
        {/* Newsletter */}
        <div className="mb-16 rounded-3xl border border-[var(--coffee-line)] bg-[linear-gradient(135deg,#fffaf1_0%,#f8ead8_100%)] p-8 sm:p-12">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--coffee-gold)]">Restez Connecté</p>
              <h3 className="mt-3 font-serif text-3xl text-[var(--coffee-ink)]">Recevoir nos Offres Exclusives</h3>
              <p className="mt-2 text-sm text-[var(--coffee-muted)]">Soyez informé des nouveautés, sélections et offres premium.</p>
            </div>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Votre email"
                className="rounded-full border border-[var(--coffee-line)] bg-[var(--coffee-cream)] px-6 py-3 text-sm placeholder-[var(--coffee-muted)] transition-all focus:border-[var(--coffee-gold)] focus:outline-none"
              />
              <button className="btn-lux-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em]">
                S&apos;Abonner
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer */}
        <div className="mb-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="relative h-10 w-32">
              <Image
                src="/finjani-aroma-logo.jpeg"
                alt="Finjani Aroma"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--coffee-muted)]">
              Expérience café premium — torréfaction artisanale, gelato authentique, hospitalité marocaine.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href={brand.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--coffee-line)] text-[var(--coffee-ink)] transition-all hover:bg-[var(--coffee-gold)] hover:text-[var(--coffee-cream)] hover:border-[var(--coffee-gold)]"
              >
                <FaInstagram className="h-4 w-4" />
              </Link>
              <Link
                href={brand.facebook}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--coffee-line)] text-[var(--coffee-ink)] transition-all hover:bg-[var(--coffee-gold)] hover:text-[var(--coffee-cream)] hover:border-[var(--coffee-gold)]"
              >
                <FaFacebook className="h-4 w-4" />
              </Link>
              <Link
                href={brand.tiktok}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--coffee-line)] text-[var(--coffee-ink)] transition-all hover:bg-[var(--coffee-gold)] hover:text-[var(--coffee-cream)] hover:border-[var(--coffee-gold)]"
              >
                <FaTiktok className="h-4 w-4" />
              </Link>
              <Link
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--coffee-line)] text-[var(--coffee-ink)] transition-all hover:bg-[var(--coffee-gold)] hover:text-[var(--coffee-cream)] hover:border-[var(--coffee-gold)]"
              >
                <FaWhatsapp className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Menu */}
          <div>
            <p className="text-xs uppercase tracking-[0.24em] font-semibold text-[var(--coffee-ink)]">Menu</p>
            <div className="mt-4 space-y-2">
              {[
                { label: "Café en Grains", href: "/menu#cafe-en-grains" },
                { label: "Gelato Italiano", href: "/menu#gelato-italiano" },
                { label: "Tartes Glacées", href: "/menu#tartes-glacees" },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="block text-sm text-[var(--coffee-muted)] transition-colors hover:text-[var(--coffee-gold)]">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Information */}
          <div>
            <p className="text-xs uppercase tracking-[0.24em] font-semibold text-[var(--coffee-ink)]">Information</p>
            <div className="mt-4 space-y-2">
              {[
                { label: "À Propos", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Mentions Légales", href: "/" },
                { label: "Politique Confidentialité", href: "/" },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="block text-sm text-[var(--coffee-muted)] transition-colors hover:text-[var(--coffee-gold)]">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-[0.24em] font-semibold text-[var(--coffee-ink)]">Contact</p>
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--coffee-gold)]">Heures d&apos;Ouverture</p>
                <p className="mt-1 text-sm text-[var(--coffee-muted)]">Lun - Dim : 7h00 - 23h00</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--coffee-gold)]">Localisation</p>
                <p className="mt-1 text-sm text-[var(--coffee-muted)]">{brand.addressLines.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[var(--coffee-line)] pt-8 sm:flex items-center justify-between">
          <p className="text-xs text-[var(--coffee-muted)]">
            © 2026 Finjani Aroma. Tous droits réservés.
          </p>
          <p className="mt-4 text-xs text-[var(--coffee-muted)] sm:mt-0">
            Conçu avec soin pour l&apos;expérience café premium.
          </p>
        </div>
      </div>
    </footer>
  );
}
