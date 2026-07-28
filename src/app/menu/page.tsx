import type { Metadata } from "next";
import { MenuPageContent } from "@/components/menu/menu-page-content";
import { getPublicProducts } from "@/lib/products-public";

export const metadata: Metadata = {
  title: "Notre Menu",
  description: "Découvrez le menu premium Finjani Aroma : café en grains, gelato italiano et tartes glacées signature.",
};

export default async function MenuPage() {
  const products = await getPublicProducts();
  return <MenuPageContent initialProducts={products} />;
}
