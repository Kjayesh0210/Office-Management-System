import { z } from "zod";

export const createEmployeeSchema = z.object({
  employeeCode: z.string().trim().max(20).optional(),

  firstName: z.string().trim().min(2, "First name is required.").max(50),

  lastName: z.string().trim().max(50).optional(),

  email: z.string().trim().email("Invalid email address."),

  phone: z.string().trim().max(15).optional(),

  departmentId: z.string().trim().optional(),

  designation: z.string().trim().max(50).optional(),

  joiningDate: z.coerce.date().optional(),

  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export const updateEmployeeSchema = createEmployeeSchema.partial();

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>;
