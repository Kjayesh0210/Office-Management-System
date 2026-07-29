import { NextRequest } from "next/server";

import { requireAuth } from "@/lib/auth/require-auth";
import { successResponse, errorResponse } from "@/lib/api/response";
import { ApiError } from "@/lib/errors/api-error";
import { authService } from "@/server/services/auth.service";

import { requireRole } from "@/lib/auth/require-role";
import { USER_ROLES } from "@/constants/roles";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(
      request.headers.get("authorization") ?? undefined,
    );
    requireRole(user.role, USER_ROLES.SUPER_ADMIN);
    const result = await authService.me(user._id.toString());

    return successResponse(result, 200, "User fetched successfully.");
  } catch (error: any) {
    if (error instanceof ApiError) {
      return errorResponse(error.message, error.statusCode);
    }

    return errorResponse("Internal Server Error", 500);
  }
}
