import { ProductCard } from "@/components/products/ProductCard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/layout/products/$id/")({
  component: ProductDetail,
});

function ProductDetail() {
  const { id } = Route.useParams();
  return <ProductCard id={id} />;
}
