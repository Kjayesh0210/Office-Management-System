import { NextRequest } from "next/server";

import { requireAuth } from "@/lib/auth/require-auth";
import { authService } from "@/server/services/auth.service";
import { successResponse, errorResponse } from "@/lib/api/response";
import { ApiError } from "@/lib/errors/api-error";

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(
      request.headers.get("authorization") ?? undefined,
    );

    await authService.logout(user._id.toString());

    return successResponse(null, 200);
  } catch (error: any) {
    if (error instanceof ApiError) {
      return errorResponse(error.message, error.statusCode);
    }

    return errorResponse("Internal Server Error", 500);
  }
}
