import { useProductsById } from "@/hooks/useProducts";
import { Products } from "@/types/products";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import {
  useUpdateProduct,
  useUpdateProductImage,
  useUpdateProductStatus,
} from "@/queries/products";
import { Textarea } from "../ui/textarea";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Link } from "@tanstack/react-router";

type ProductCardProps = {
  id: string;
};

export function ProductCard({ id }: ProductCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { data, isLoading, error } = useProductsById(id);
  const [isEditingImage, setIsEditingImage] = useState(false);
  // Mutation Hook
  const mutation = useUpdateProduct();
  const statusMutation = useUpdateProductStatus();
  const imageMutation = useUpdateProductImage();

  const defaultProducts: Products = {
    id: data?.id || "",
    name: data?.name || "",
    description: data?.description || "",
    price: data?.price || 0,
    sku: data?.sku || "",
    category: data?.category || "",
    stock: data?.stock || 0,
    status: data?.status || "",
    image: data?.image || "",
    createdAt: data?.createdAt ? new Date(data.createdAt) : new Date(),
    updatedAt: data?.updatedAt ? new Date(data.updatedAt) : new Date(),
  };

  const form = useForm({
    defaultValues: defaultProducts,
    onSubmit: async ({ value }) => {
      mutation.mutate(value, {
        onSuccess: () => {
          setIsEditing(false);
          console.log("Product updated successfully!");
        },
      });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="mx-auto">
      <div className="mb-6">
        <div className="mb-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/layout/products">Products Page</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Product Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Product Details
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Overview of the product.
        </p>
      </div>
      <Card className="relative">
        {/* Status Dropdown & Edit Button - Top Right */}
        <div className="absolute top-6 right-6 z-10 flex items-center gap-2">
          {/* Status Dropdown */}
          <form.Field name="status">
            {(field) => (
              <Select
                value={field.state.value}
                onValueChange={(val) => {
                  field.handleChange(val);
                  // Trigger status update mutation
                  statusMutation.mutate({ id: data?.id, status: val });
                }}
                disabled={statusMutation.isPending}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            )}
          </form.Field>

          {/* Edit / Save / Cancel Buttons */}
          {!isEditing ? (
            <Button type="button" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => form.handleSubmit()}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <CardHeader>
            <div className="flex justify-between items-center">
              {/* Title + Description */}
              <div className="flex flex-col space-y-1 flex-1 pr-60">
                <form.Field name="name">
                  {(field) => (
                    <div className="flex flex-col space-y-1">
                      {isEditing ? (
                        <Input
                          id="name"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Product name"
                          className="w-98"
                        />
                      ) : (
                        <CardTitle className="text-lg">
                          {field.state.value}
                        </CardTitle>
                      )}
                    </div>
                  )}
                </form.Field>
                <form.Field name="description">
                  {(field) => (
                    <div className="flex flex-col space-y-1">
                      {isEditing ? (
                        <Textarea
                          id="description"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Product description"
                          rows={3}
                          className="w-98"
                        />
                      ) : (
                        <CardDescription>{field.state.value}</CardDescription>
                      )}
                    </div>
                  )}
                </form.Field>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Three-column grid: Price / SKU / Image */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Price */}
              <form.Field name="price">
                {(field) => (
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="price">Price</Label>
                    {isEditing ? (
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(parseInt(e.target.value))
                        }
                        placeholder="0.00"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        ₱{" "}
                        {field.state.value
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* SKU */}
              <form.Field name="sku">
                {(field) => (
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="sku">SKU</Label>
                    {isEditing ? (
                      <Input
                        id="sku"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="SKU"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {field.state.value}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Image Upload/URL - Row 1 */}
              <form.Field name="image">
                {(field) => (
                  <div className="flex flex-col space-y-1 row-span-2">
                    <div className="flex items-center justify-between">
                      <Label>Product Image</Label>
                      {!isEditingImage && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsEditingImage(true)}
                        >
                          Edit
                        </Button>
                      )}
                    </div>

                    {isEditingImage ? (
                      <div className="space-y-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              // Convert to base64 or upload to server
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                field.handleChange(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <Input
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Or paste image URL"
                        />
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => {
                              setIsEditingImage(false);
                              // Trigger image update mutation
                              imageMutation.mutate({
                                id: data?.id,
                                image: field.state.value,
                              });
                            }}
                            disabled={imageMutation.isPending}
                          >
                            {imageMutation.isPending ? "Saving..." : "Save"}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEditingImage(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={
                          field.state.value ||
                          "https://via.placeholder.com/300x200?text=No+Image"
                        }
                        alt={data?.name || "Product"}
                        className="w-full h-40 object-cover rounded-md border"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/300x200?text=No+Image";
                        }}
                      />
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            {/* Two-column fields: Category / Stock */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <form.Field name="category">
                {(field) => (
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="category">Category</Label>
                    {isEditing ? (
                      <Input
                        id="category"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Category"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {field.state.value}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field name="stock">
                {(field) => (
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="stock">Stock</Label>
                    {isEditing ? (
                      <Input
                        id="stock"
                        type="number"
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(parseInt(e.target.value) || 0)
                        }
                        placeholder="0"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {field.state.value} units
                      </p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            {/* Read-only Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex flex-col space-y-1">
                <Label>Created At</Label>
                <p className="text-sm text-muted-foreground">
                  {data?.createdAt
                    ? new Date(data.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div className="flex flex-col space-y-1">
                <Label>Updated At</Label>
                <p className="text-sm text-muted-foreground">
                  {data?.updatedAt
                    ? new Date(data.updatedAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
