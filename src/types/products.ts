// src/types/product.ts
export type Products = {
  id: string;
  name: string,
  description: string,
  price: number,
  sku: string,
  category: string,
  stock: number,
  status: string,
  image: string,
  createdAt: Date,
  updatedAt: Date,
};
