import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.number().min(0.01, "Price must be greater than 0"),
  sku: z.string().min(1, "SKU is required"),
  category: z.string().min(1, "Category is required"),
  stock: z.number().min(0, "Stock cannot be negative"),
  status: z.enum(["active", "inactive", "draft"]),
  image: z.string().optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;