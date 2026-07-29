import { NextRequest } from "next/server";

import { setAuthCookies } from "@/lib/auth/cookies";
import { successResponse } from "@/lib/api/response";
import { handleApiError } from "@/lib/errors/error-handler";
import { loginSchema } from "@/lib/validations/auth";
import { authService } from "@/server/services/auth.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data = loginSchema.parse(body);

    const result = await authService.login(data);

    await setAuthCookies(result.accessToken, result.refreshToken);

    return successResponse(
      {
        user: result.user,
      },
      200,
      "Login successful.",
    );
  } catch (error) {
    return handleApiError(error);
  }
}
