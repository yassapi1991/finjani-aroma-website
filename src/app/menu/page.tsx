import type { Metadata } from "next";
import { MenuPageContent } from "@/components/menu/menu-page-content";

export const metadata: Metadata = {
  title: "Notre Menu",
  description: "Découvrez le menu premium Finjani Aroma : café en grains, gelato italiano et tartes glacées signature.",
};

export default function MenuPage() {
  return <MenuPageContent />;
}
