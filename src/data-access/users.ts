export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  name: string;
  email: string;
}

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  // JSON Placeholder mock API
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/1`);
  if (!response.ok) throw new Error("Login failed");

  const data = await response.json();

  // Fake validation
  if (payload.email !== "Sincere@april.biz" || payload.password !== "password") {
    throw new Error("Invalid credentials");
  }

  return {
    id: data.id,
    name: data.name,
    email: data.email,
  };
};
