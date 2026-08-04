import { NextRequest } from "next/server";

import { requireAuth } from "@/lib/auth/require-auth";
import { requireRole } from "@/lib/auth/require-role";

import { USER_ROLES } from "@/constants/roles";

import { successResponse, errorResponse } from "@/lib/api/response";

import { ApiError } from "@/lib/errors/api-error";

import { attendanceService } from "@/server/services/attendance.service";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization") ?? undefined;

    const user = await requireAuth(authHeader);

    requireRole(user.role, USER_ROLES.SUPER_ADMIN, USER_ROLES.HR_ADMIN);

    const attendance = await attendanceService.pendingAttendance(
      user.companyId.toString(),
    );

    return successResponse(
      attendance,
      200,
      "Pending attendance fetched successfully.",
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return errorResponse(error.message, error.statusCode);
    }

    return errorResponse("Internal Server Error", 500);
  }
}
