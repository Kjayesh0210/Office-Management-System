import { ApiError } from "@/lib/errors/api-error";

export function requireRole(userRole: string, ...allowedRoles: string[]) {
  if (!allowedRoles.includes(userRole)) {
    throw new ApiError(403, "Forbidden.");
  }
}
