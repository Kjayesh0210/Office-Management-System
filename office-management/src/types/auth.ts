import type { UserRole } from "@/constants/roles";

export interface RegisterCompanyInput {
  companyName: string;
  companyCode: string;
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  companyCode: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  companyId: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthResult {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}
