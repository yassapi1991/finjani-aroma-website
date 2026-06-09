import { z } from "zod";

export const productSchema = z.object({
  category: z.enum(["Café en Grains", "Gelato Italiano", "Tartes Glacées"]),
  type: z.string().min(2).max(64),
  name: z.string().min(2).max(120),
  description: z.string().min(10).max(400),
  origin: z.string().min(2).max(120),
  price: z.number().min(1).max(10000),
  imageUrl: z.string().url(),
});

export type ProductPayload = z.infer<typeof productSchema>;
