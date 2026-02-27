import { createProduct, deleteProduct, fetchProducts, getProductById, updateProductById, updateProductImage, updateProductStatus } from "@/data-access/products";
import { Products } from "@/types/products";
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
      console.error("Error updating product:", error.message);
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

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (newProduct) => {
      // Invalidate the products list to show the new product
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully!", {
        description: `${newProduct.name} has been added.`,
      });
    },
    onError: (error) => {
      toast.error("Failed to create product.", {
        description: error.message || "Please try again later!"
      });
      console.error("Error creating product:", error);
    },
  });
}

export function useUpdateProductStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductStatus,
    onSuccess: (updatedProduct: Products) => {
      queryClient.invalidateQueries({ queryKey: ["products", updatedProduct.id] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Status updated successfully!");
    },
    onError: (error: Error) => {
      toast.error("Failed to update status.", {
        description: error.message || "Please try again later!"
      });
      console.error("Error updating status:", error.message);
    },
  });
}

export function useUpdateProductImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductImage,
    onSuccess: (updatedProduct: Products) => {
      queryClient.invalidateQueries({ queryKey: ["products", updatedProduct.id] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Image updated successfully!");
    },
    onError: (error: Error) => {
      toast.error("Failed to update image.", {
        description: error.message || "Please try again later!"
      });
      console.error("Error updating image:", error.message);
    },
  });
}
