import { NextRequest } from "next/server";
import { ZodError } from "zod";

import { requireAuth } from "@/lib/auth/require-auth";
import { requireRole } from "@/lib/auth/require-role";

import { USER_ROLES } from "@/constants/roles";

import { successResponse, errorResponse } from "@/lib/api/response";

import { ApiError } from "@/lib/errors/api-error";

import { updateAttendanceSchema } from "@/lib/validations/attendance";

import { attendanceService } from "@/server/services/attendance.service";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authHeader = request.headers.get("authorization") ?? undefined;

    const user = await requireAuth(authHeader);

    requireRole(user.role, USER_ROLES.SUPER_ADMIN, USER_ROLES.HR_ADMIN);

    const { id } = await params;

    const body = await request.json();

    const data = updateAttendanceSchema.parse(body);

    const attendance = await attendanceService.update(
      user.companyId.toString(),
      id,
      data,
    );

    return successResponse(attendance, 200, "Attendance updated successfully.");
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse("Validation failed.", 400);
    }

    if (error instanceof ApiError) {
      return errorResponse(error.message, error.statusCode);
    }

    return errorResponse("Internal Server Error", 500);
  }
}
