import { z } from "zod";
export const createDepartmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name should be of minimum 2 characters")
    .max(100, "Name is too long"),
  code: z
    .string()
    .trim()
    .min(2, "Department code is required")
    .max(20)
    .transform((value) => value.toUpperCase()),
  description: z.string().trim().max(500).optional(),
});

export const updateDepartmentSchema = createDepartmentSchema.partial();

export type CreateDepartmentInput = z.infer<typeof createDepartmentSchema>;
export type UpdateDepartmentInput = z.infer<typeof updateDepartmentSchema>;
