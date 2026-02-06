import { useProducts as useProductsQuery, useProductsById as useProductsByIdQuery } from '@/queries/products'

export function useProducts() {
    return useProductsQuery();
}

export function useProductsById(id: string) {
    return useProductsByIdQuery(id);
}