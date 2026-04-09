import { apiClient } from "./client";

export async function register(payload) {
  const { data } = await apiClient.post("/api/auth/register", payload);
  return data;
}

export async function login(payload) {
  const { data } = await apiClient.post("/api/auth/login", payload);
  return data;
}

export async function logout() {
  const { data } = await apiClient.post("/api/auth/logout");
  return data;
}

export async function me() {
  const { data } = await apiClient.get("/api/auth/me");
  return data;
}
