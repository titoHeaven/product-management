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

export async function getProductById(id: string): Promise<Products> {
  const res = await fetch(
    `${API_URL}/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export async function updateProductById(product: Products): Promise<Products> {
  const response = await fetch(`${API_URL}/${product.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  
  if (!response.ok) {
    throw new Error("Failed to update product");
  }
  
  return response.json();
}

export async function deleteProduct(id: string): Promise<Products> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }

  return response.json()
}