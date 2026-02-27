import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/layout/dashboard/")({
  beforeLoad: async () => {
    // Check if we're in the browser (not SSR)
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Add your dashboard components here.
      </p>
    </div>
  );
}
