import { useProductsById } from "@/hooks/useProducts";
import { Products } from "@/types/products";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
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
import { useEffect, useState } from "react";
import { useUpdateProduct } from "@/queries/products";
import { Textarea } from "../ui/textarea";

type ProductCardProps = {
  id: string;
};

export function ProductCard({ id }: ProductCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { data, isLoading, error } = useProductsById(id);

  // Mutation Hook
  const mutation = useUpdateProduct();

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
    <div className="mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            {/* Title + Description */}
            <div className="flex flex-col space-y-1">
              <CardTitle>{data?.name}</CardTitle>
              <CardDescription>{data?.description}</CardDescription>
            </div>

            {/* Edit / Save / Cancel buttons */}
            <div className="flex items-center space-x-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>Edit</Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      form.reset();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => form.handleSubmit()}
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Saving..." : "Save"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            {/* Name Field */}
            <form.Field name="name">
              {(field) => (
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="name">Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Product name"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {field.state.value}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Description Field */}
            <form.Field name="description">
              {(field) => (
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="description">Description</Label>
                  {isEditing ? (
                    <Textarea
                      id="description"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Product description"
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {field.state.value}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Two-column fields: Price / SKU */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          field.handleChange(parseFloat(e.target.value) || 0)
                        }
                        placeholder="0.00"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        ${field.state.value.toFixed(2)}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

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
            </div>

            {/* Two-column fields: Category / Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* Status Field */}
            <form.Field name="status">
              {(field) => (
                <div className="flex flex-col space-y-1">
                  <Label>Status</Label>
                  {isEditing ? (
                    <Select
                      value={field.state.value}
                      onValueChange={(val) => field.handleChange(val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="discontinued">
                          Discontinued
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm text-muted-foreground capitalize">
                      {field.state.value}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Image URL Field */}
            <form.Field name="image">
              {(field) => (
                <div className="flex flex-col space-y-1">
                  <Label>Image URL</Label>
                  {isEditing ? (
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  ) : (
                    <>
                      {field.state.value && (
                        <img
                          src={field.state.value}
                          alt={data?.name}
                          className="w-full h-48 object-cover rounded-md"
                        />
                      )}
                      <p className="text-sm text-muted-foreground break-all">
                        {field.state.value}
                      </p>
                    </>
                  )}
                </div>
              )}
            </form.Field>

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
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
