import { ProductForm } from "@/components/products/ProductForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/layout/products/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductForm />;
}
