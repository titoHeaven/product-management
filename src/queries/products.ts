import { fetchProducts, getProductById } from "@/data-access/products";
import { useQuery } from "@tanstack/react-query";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
    // placeholderData: keepPreviousData, // for pagination purposes soon
  });
}

export function useProductsById(id: string) {
    return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id, // 👈 prevents infinite loading
  });
}
