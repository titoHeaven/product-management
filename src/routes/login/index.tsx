import { LoginForm } from "@/components/auth/LoginForm";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login/")({
  beforeLoad: async () => {
    // Check if we're in the browser (not SSR)
    if (typeof window === "undefined") return;

    // Check if user already logged in
    const token = localStorage.getItem("accessToken");
    if (token) {
      throw redirect({
        to: "/layout/dashboard",
      });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  return <LoginForm />;
}
