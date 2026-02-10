export interface LoginPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string,
  user: {
    id: number;
    name: string;
    email: string;
  }
}

const API_URL = "http://localhost:3001"

// Login function
export const loginUser = async (payload: LoginPayload): Promise<LoginResponse['user']> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  const data: LoginResponse = await response.json();
  
  // Store JWT token in localStorage
  localStorage.setItem("accessToken", data.accessToken);
  
  return data.user;
};
