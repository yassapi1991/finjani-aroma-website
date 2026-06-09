import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppUrl } from "@/lib/brand";

export function FloatingWhatsApp() {
  const href = getWhatsAppUrl();

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Ouvrir WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--coffee-olive)_68%,white)] bg-[var(--coffee-olive)] text-[var(--coffee-cream)] shadow-[0_12px_26px_rgba(89,96,66,0.3)] transition-all duration-300 hover:scale-105 hover:border-[var(--coffee-gold)] hover:brightness-110 sm:bottom-6 sm:right-6"
    >
      <FaWhatsapp className="h-7 w-7" />
    </Link>
  );
}
