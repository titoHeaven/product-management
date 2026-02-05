// src/hooks/useAuth.ts
import { LoginPayload, loginUser } from "@/data-access/users";
import { useMutation } from "@tanstack/react-query";

export const useAuth = () => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
  });
};
