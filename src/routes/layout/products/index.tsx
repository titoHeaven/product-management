import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProducts } from "@/hooks/useProducts";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, Trash2, Plus } from "lucide-react";

export const Route = createFileRoute("/layout/products/")({
  component: RouteComponent,
});

function RouteComponent() {
  // const [page, setPage] = useState(1);
  // const [lastPageLength, setLastPageLength] = useState<number | null>(null);
  // const limit = 5;
  const navigate = useNavigate();
  const { data, error, isLoading } = useProducts();

  // useEffect(() => {
  //   if (data) {
  //     setLastPageLength(data.length);
  //   }
  // }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <>Error loading products, see message: {error.message}</>;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Products
        </h1>
        <Button onClick={() => navigate({ to: "/layout/products/new" })}>
          <Plus className="w-4 h-4" />
          Add a product
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                <img
                  src={""}
                  alt={product.name}
                  className="w-10 h-10 object-cover rounded"
                />
              </TableCell>
              <TableCell>SKU</TableCell> {/*{"product.sku" ||" product.id"}*/}
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
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      /* Handle delete */
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      {/* <div className="mt-4 flex gap-2">
    <button
      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
      disabled={page === 1}
      className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
    >
      Prev
    </button>
    <span>Page {page}</span>
    <button
      onClick={() => {
        if (lastPageLength && lastPageLength === limit) {
          setPage((prev) => prev + 1);
        }
      }}
      disabled={!lastPageLength || lastPageLength < limit}
      className="px-2 py-1 bg-gray-200 rounded"
    >
      Next
    </button>
  </div> */}
      {/* {isFetching && <div className="text-sm text-gray-500">Loading...</div>} */}
    </div>
  );
}
