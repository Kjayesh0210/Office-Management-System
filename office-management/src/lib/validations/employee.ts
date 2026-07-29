import { z } from "zod";

export const createEmployeeSchema = z.object({
  employeeCode: z.string().trim().min(1, "Employee code is required.").max(20),

  firstName: z.string().trim().min(2, "First name is required.").max(50),

  lastName: z.string().trim().min(2, "Last name is required.").max(50),

  email: z.string().trim().email("Invalid email address."),

  phone: z.string().trim().min(10, "Phone number is required.").max(15),

  department: z.string().trim().min(2, "Department is required.").max(50),

  designation: z.string().trim().min(2, "Designation is required.").max(50),

  joiningDate: z.coerce.date(),

  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export const updateEmployeeSchema = createEmployeeSchema.partial();

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;

export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>;
