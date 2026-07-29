import { NextRequest } from "next/server";

import { setAuthCookies } from "@/lib/auth/cookies";
import { handleApiError } from "@/lib/errors/error-handler";
import { successResponse } from "@/lib/api/response";
import { signupSchema } from "@/lib/validations/auth";
import { authService } from "@/server/services/auth.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data = signupSchema.parse(body);

    const result = await authService.register(data);

    await setAuthCookies(result.accessToken, result.refreshToken);

    return successResponse(
      {
        user: result.user,
      },
      201,
      "Company registered successfully.",
    );
  } catch (error) {
    return handleApiError(error);
  }
}
