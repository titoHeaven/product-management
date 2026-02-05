import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/layout/products/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Products
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Add your product components here.
      </p>
    </div>
  );
}
