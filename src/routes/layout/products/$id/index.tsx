import { useProductsById } from "@/hooks/useProducts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/layout/products/$id/")({
  component: ProductDetail,
});

function ProductDetail() {
  const { id } = Route.useParams();
  const { data, isLoading, error } = useProductsById(id);

  if (isLoading) return <div>Loading project...</div>;
  if (error)
    return (
      <div>
        An error has occured while fetching the product. See error message{" "}
        {error.message}
      </div>
    );
  return (
    <div>
      <p>Product ID: {id}</p>
      <h1>{data.name}</h1>
    </div>
  );
}
