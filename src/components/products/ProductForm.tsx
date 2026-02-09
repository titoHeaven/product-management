import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateProduct } from "@/queries/products";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { ArrowLeft } from "lucide-react";
import { createProductSchema } from "@/fn/products";

export function ProductForm() {
  const navigate = useNavigate();
  const createProductMutation = useCreateProduct();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      sku: "",
      category: "",
      stock: 0,
      status: "active" as "active" | "inactive" | "draft",
      image: "",
    },
    onSubmit: async ({ value }) => {
      const result = createProductSchema.safeParse(value);

      if (!result.success) {
        console.error("Validation failed", result.error);
        return;
      }

      const productData = {
        ...value,
        image: value.image || "",
      };
      createProductMutation.mutate(productData, {
        onSuccess: () => {
          navigate({ to: "/layout/products" });
        },
      });
    },
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: "/layout/products" })}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Add New Product
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Fill in the details below to create a new product
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
      >
        {/* Product Name */}
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) => {
              const result = createProductSchema.shape.name.safeParse(value);
              if (!result.success) {
                const firstError = result.error.issues[0];
                return firstError.message || "Validation failed";
              }
              return undefined;
            },
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>
                Product Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter product name"
              />
              {field.state.meta.errors ? (
                <p className="text-sm text-red-500">
                  {field.state.meta.errors.join(", ")}
                </p>
              ) : null}
            </div>
          )}
        </form.Field>

        {/* Description */}
        <form.Field name="description">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Description</Label>
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter product description"
                rows={4}
              />
            </div>
          )}
        </form.Field>

        {/* Price and Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field
            name="price"
            validators={{
              onChange: ({ value }) => {
                const result = createProductSchema.shape.price.safeParse(value);
                if (!result.success) {
                  const firstError = result.error.issues[0];
                  return firstError.message;
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>
                  Price <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  step="0.01"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  placeholder="0.00"
                />
                {field.state.meta.errors ? (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors.join(", ")}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Field
            name="stock"
            validators={{
              onChange: ({ value }) => {
                const result = createProductSchema.shape.stock.safeParse(value);
                if (!result.success) {
                  const firstError = result.error.issues[0];
                  return firstError.message;
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>
                  Stock <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  placeholder="0"
                />
                {field.state.meta.errors ? (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors.join(", ")}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>
        </div>

        {/* SKU and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field
            name="sku"
            validators={{
              onChange: ({ value }) => {
                const result = createProductSchema.shape.sku.safeParse(value);
                if (!result.success) {
                  const firstError = result.error.issues[0];
                  return firstError.message;
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>
                  SKU <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter SKU"
                />
                {field.state.meta.errors ? (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors.join(", ")}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Field
            name="category"
            validators={{
              onChange: ({ value }) => {
                const result =
                  createProductSchema.shape.category.safeParse(value);
                if (!result.success) {
                  const firstError = result.error.issues[0];
                  return firstError.message;
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>
                  Category <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter category"
                />
                {field.state.meta.errors ? (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors.join(", ")}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>
        </div>

        {/* Status */}
        <form.Field
          name="status"
          validators={{
            onChange: ({ value }) => {
              const result = createProductSchema.shape.status.safeParse(value);
              return result.success ? undefined : result.error.message;
            },
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Status</Label>
              <Select
                value={field.state.value}
                onValueChange={(value) =>
                  field.handleChange(value as "active" | "inactive" | "draft")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              {field.state.meta.errors ? (
                <p className="text-sm text-red-500">
                  {field.state.meta.errors.join(", ")}
                </p>
              ) : null}
            </div>
          )}
        </form.Field>

        {/* Image URL */}
        <form.Field name="image">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Image URL (Optional)</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              {field.state.value && (
                <div className="mt-2">
                  <img
                    src={field.state.value}
                    alt="Product preview"
                    className="w-32 h-32 object-cover rounded border"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/150";
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </form.Field>

        {/* Form Actions */}
        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            disabled={createProductMutation.isPending}
            className="flex-1"
          >
            {createProductMutation.isPending ? "Creating..." : "Create Product"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: "/layout/products" })}
            disabled={createProductMutation.isPending}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
