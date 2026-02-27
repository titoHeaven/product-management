import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { useAuth } from "@/hooks/useAuth";
import { useAuthContext } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { loginSchema } from "@/fn/auth";

export function LoginForm() {
  const navigate = useNavigate();
  const { mutate, isPending } = useAuth();
  const { login } = useAuthContext();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const result = loginSchema.safeParse(value);

      if (!result.success) {
        console.error("Validation failed", result.error);
        return;
      }

      mutate(result.data, {
        onSuccess: (user) => {
          login(user);
          toast.success(`Welcome back, ${user.name}!`);
          navigate({ to: "/layout/dashboard" });
        },
        onError: (error: any) => {
          toast.error(error.message || "Login failed");
        },
      });
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-500 p-4">
      <Card className="w-full max-w-sm shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 animate-fadeIn">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Sign in to continue to your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 mt-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            {/* Email Field */}
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  const result = loginSchema.shape.email.safeParse(value);
                  if (!result.success) {
                    return result.error.issues[0]?.message;
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="flex flex-col space-y-1">
                  <Label htmlFor={field.name}>Email</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="you@example.com"
                  />
                  {field.state.meta.errors ? (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>

            {/* Password Field */}
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) => {
                  const result = loginSchema.shape.password.safeParse(value);
                  if (!result.success) {
                    return result.error.issues[0]?.message;
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="flex flex-col space-y-1">
                  <Label htmlFor={field.name}>Password</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="********"
                  />
                  {field.state.meta.errors ? (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-2 rounded-lg"
              disabled={isPending}
            >
              {isPending ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
