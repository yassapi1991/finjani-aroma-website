import { z } from "zod";

function isValidImageUrl(value: string) {
  if (value.startsWith("/")) {
    return true;
  }

  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export const productSchema = z.object({
  category: z.string().min(2).max(120),
  type: z.string().min(2).max(64),
  name: z.string().min(2).max(120),
  description: z.string().min(10).max(400),
  origin: z.string().min(2).max(120),
  price: z.number().min(1).max(10000),
  imageUrl: z.string().min(1).max(2048).refine(isValidImageUrl, {
    message: "imageUrl must be an absolute URL or start with /",
  }),
  isActive: z.boolean().optional().default(true),
});

export type ProductPayload = z.infer<typeof productSchema>;
