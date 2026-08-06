import { api } from "@/lib/api/axios";

export interface LoginPayload {
  companyCode: string;
  email: string;
  password: string;
}

export interface SignupPayload {
  companyName: string;
  companyCode: string;
  name: string;
  email: string;
  password: string;
}

export async function login(data: LoginPayload) {
  const response = await api.post("/auth/login", data);

  return response.data;
}

export async function signup(data: SignupPayload) {
  const response = await api.post("/auth/signup", data);

  return response.data;
}