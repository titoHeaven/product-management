import { Products } from "@/types/products";

const API_URL = "https://69845e72885008c00db0f05a.mockapi.io/products";

export async function fetchProducts(): Promise<Products[]> {
  const url = `${API_URL}`;
  console.log("Fetching URL:", url);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const data = await res.json();
  console.log("Fetched data:", data);
  return data;
}

export async function getProductById(id: string) {
  const res = await fetch(
    `${API_URL}/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}
