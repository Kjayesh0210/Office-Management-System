import { z } from "zod";

export const attendanceStatusValues = [
  "PRESENT",
  "ABSENT",
  "HALF_DAY",
  "LEAVE",
] as const;

export const checkInSchema = z.object({});

export const checkOutSchema = z.object({});

export const manualAttendanceSchema = z.object({
  employeeId: z.string().trim().min(1, "Employee is required."),

  date: z.coerce.date(),

  checkIn: z.coerce.date().optional(),

  checkOut: z.coerce.date().optional(),

  status: z.enum(attendanceStatusValues),

  remarks: z.string().trim().max(500).optional(),
});

export const updateAttendanceSchema = z.object({
  checkIn: z.coerce.date().optional(),

  checkOut: z.coerce.date().optional(),

  status: z.enum(attendanceStatusValues).optional(),

  remarks: z.string().trim().max(500).optional(),
});

export const approveAttendanceSchema = z.object({
  remarks: z.string().trim().max(500).optional(),
});

export const rejectAttendanceSchema = z.object({
  remarks: z.string().trim().min(1, "Remarks are required.").max(500),
});

export type ManualAttendanceInput = z.infer<typeof manualAttendanceSchema>;

export type UpdateAttendanceInput = z.infer<typeof updateAttendanceSchema>;

export type ApproveAttendanceInput = z.infer<typeof approveAttendanceSchema>;

export type RejectAttendanceInput = z.infer<typeof rejectAttendanceSchema>;
