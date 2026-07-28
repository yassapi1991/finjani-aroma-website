export type ProductCategory = string;

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
  isActive?: boolean;
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
  isActive?: boolean;
}

export interface Category {
  id: string;
  name: string;
  isActive: boolean;
  createdAt?: string;
}

