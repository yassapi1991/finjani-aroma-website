import type { Metadata } from "next";
import { CartPageContent } from "@/components/cart/cart-page-content";

export const metadata: Metadata = {
  title: "Votre Panier",
  description: "Consultez votre panier Finjani Aroma et finalisez votre commande via WhatsApp.",
};

export default function PanierPage() {
  return <CartPageContent />;
}