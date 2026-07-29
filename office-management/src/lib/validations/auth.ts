import { z } from "zod";

export const signupSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(3, "Company name must be at least 3 characters.")
    .max(100),

  companyCode: z
    .string()
    .trim()
    .min(3)
    .max(20)
    .regex(/^[A-Z0-9_-]+$/i, "Invalid company code."),

  name: z.string().trim().min(2).max(100),

  email: z.email().transform((email) => email.trim().toLowerCase()),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters.")
    .max(128)
    .regex(/[A-Z]/, "Must contain one uppercase letter.")
    .regex(/[a-z]/, "Must contain one lowercase letter.")
    .regex(/[0-9]/, "Must contain one number.")
    .regex(/[^A-Za-z0-9]/, "Must contain one special character."),
});

export const loginSchema = z.object({
  companyCode: z.string(),
  email: z.email().transform((email) => email.trim().toLowerCase()),

  password: z.string().min(1, "Password is required.").max(128),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required."),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshInput = z.infer<typeof refreshSchema>;
