import { z } from "zod";

const registerSchema = z
  .object({
    name: z.string().min(4, "Name must be at least 4 characters"),
    email: z.email("Invalid Email Address"),
    password: z.string().min(6, "Min 6 characters required"),
    confirmPassword: z.string(),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z.email("Invalid Email Address"),
  password: z.string(),
});

type RegisterSchema = z.infer<typeof registerSchema>;
type LoginSchema = z.infer<typeof loginSchema>;

export { registerSchema, loginSchema };
export type { RegisterSchema, LoginSchema };
