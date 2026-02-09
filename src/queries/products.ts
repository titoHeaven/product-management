import { deleteProduct, fetchProducts, getProductById, updateProductById } from "@/data-access/products";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
    // placeholderData: keepPreviousData, // for pagination purposes soon
  });
}

export function useProductsById(id: string) {
    return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
    enabled: !!id, // 👈 prevents infinite loading
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductById,
    onSuccess: (updatedProduct) => {
      // Invalidate the specific product query
      queryClient.invalidateQueries({ queryKey: ["products", updatedProduct.id] });
      // Also invalidate the products list if you have one
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated successfully!", {
        description: `${updatedProduct.name} has been updated.`,
      })
    },
    onError: (error) => {
      toast.error("Failed to update product.", {
        description: error.message || "Please try again later!"
      })
      console.error("Error updating product:", error);
    },
  }) 
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"]});
      toast.success("Product deleted successfully!")
    },
    onError: (error) => {
      toast.error("Failed to delete product.", {
        description: error.message || "Please try again later!"
      })
      console.error("Error deleting product:", error)
    }
  })
}
