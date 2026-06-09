import Image from "next/image";
import Link from "next/link";
import { brand, getWhatsAppUrl } from "@/lib/brand";

export function Footer() {
  const whatsappHref = getWhatsAppUrl();

  return (
    <footer className="border-t border-[var(--coffee-line)] bg-[linear-gradient(160deg,#fffcf7_0%,#f8efe2_100%)]">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="relative h-11 w-[178px] sm:h-12 sm:w-[196px]">
            <Image
              src="/finjani-aroma-logo.jpeg"
              alt="Finjani Aroma"
              fill
              sizes="(max-width: 639px) 178px, 196px"
              className="object-contain object-left"
            />
          </div>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--coffee-gold)]">Bouskoura · Maroc</p>
          <p className="mt-3 text-sm text-[var(--coffee-muted)]">
            L&apos;art du cafe marocain premium entre tradition et modernite.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--coffee-ink)]">Adresse</p>
          <p className="mt-2 text-sm text-[var(--coffee-muted)]">Lundi – Dimanche</p>
          <p className="text-sm text-[var(--coffee-muted)]">07h00 – 23h00</p>
          <p className="mt-2 text-sm text-[var(--coffee-muted)]">{brand.addressLines.join(" · ")}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--coffee-ink)]">Contact</p>
          <Link href={`mailto:${brand.email}`} className="mt-2 block text-sm text-[var(--coffee-muted)] hover:text-[var(--coffee-gold)]">{brand.email}</Link>
          <Link href={whatsappHref} target="_blank" rel="noreferrer" className="mt-1 block text-sm text-[var(--coffee-muted)] hover:text-[var(--coffee-gold)]">{brand.whatsappLabel}</Link>
          <Link
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="btn-lux-primary mt-3 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em]"
          >
            Commander via WhatsApp
          </Link>
        </div>
      </div>
      <div className="border-t border-[var(--coffee-line)] px-4 py-4 text-center text-xs text-[var(--coffee-muted)] sm:px-6">
        &copy; {new Date().getFullYear()} {brand.name}. Tous droits reserves.
      </div>
    </footer>
  );
}
