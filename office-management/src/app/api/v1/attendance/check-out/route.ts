import { NextRequest } from "next/server";

import { successResponse, errorResponse } from "@/lib/api/response";
import { requireAuth } from "@/lib/auth/require-auth";
import { ApiError } from "@/lib/errors/api-error";

import { attendanceService } from "@/server/services/attendance.service";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization") ?? undefined;

    const user = await requireAuth(authHeader);

    if (!user.employeeId) {
      throw new ApiError(403, "User is not linked to an employee.");
    }

    const attendance = await attendanceService.checkOut(
      user.companyId.toString(),
      user.employeeId.toString(),
    );

    return successResponse(attendance, 200, "Checked out successfully.");
  } catch (error) {
    if (error instanceof ApiError) {
      return errorResponse(error.message, error.statusCode);
    }

    return errorResponse("Internal Server Error", 500);
  }
}
