export type ProductCategory =
  | "Café en Grains"
  | "Gelato Italiano"
  | "Tartes Glacées";

export type CoffeeType = "Grains" | "Moulu";

export interface ProductVariant {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  category: ProductCategory;
  type: string;
  name: string;
  description: string;
  origin: string;
  price: number;
  imageUrl: string;
  priceNote?: string; // e.g. "125g" for beans
  variants?: ProductVariant[];
  createdAt?: string;
}

export interface ProductInput {
  category: ProductCategory;
  type: string;
  name: string;
  description: string;
  origin: string;
  price: number;
  imageUrl: string;
  priceNote?: string;
  variants?: ProductVariant[];
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  "Café en Grains": "Café en Grains",
  "Gelato Italiano": "Gelato Italiano",
  "Tartes Glacées": "Tartes Glacées",
};
