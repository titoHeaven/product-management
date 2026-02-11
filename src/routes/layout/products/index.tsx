import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProducts } from "@/hooks/useProducts";
import { useDeleteProduct } from "@/queries/products";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, Trash2, Plus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/layout/products/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data, error, isLoading } = useProducts();
  const mutation = useDeleteProduct();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleDeleteClick = (id: string, name: string) => {
    setProductToDelete({ id, name });
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (productToDelete) {
      mutation.mutate(productToDelete.id, {
        onSuccess: () => {
          console.log("Product Delete Successfully!");
          setDeleteDialogOpen(false);
          setProductToDelete(null);
        },
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <>Error loading products, see message: {error.message}</>;

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Products
          </h1>
          <h3 className="text-gray-400">
            Manage, view, and update all available products in one place.
          </h3>
        </div>
        <Button onClick={() => navigate({ to: "/layout/products/new" })}>
          <Plus className="w-4 h-4" />
          Add a product
        </Button>
      </div>
      <Table className="mt-10">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                ₱{" "}
                {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <span
                  className={
                    product.status === "active"
                      ? "text-green-600 uppercase"
                      : product.status === "inactive"
                        ? "text-yellow-600 uppercase"
                        : "text-gray-400 uppercase"
                  }
                >
                  {product.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigate({
                        to: "/layout/products/$id",
                        params: { id: String(product.id) },
                      });
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteClick(product.id, product.name)}
                    disabled={mutation.isPending}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{productToDelete?.name}"? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={mutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
