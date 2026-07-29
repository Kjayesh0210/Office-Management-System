import { NextRequest, NextResponse } from "next/server";

import { authService } from "@/server/services/auth.service";
import { refreshSchema } from "@/lib/validations/auth";
import { ApiError } from "@/lib/errors/api-error";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data = refreshSchema.parse(body);

    const result = await authService.refresh(data);

    return NextResponse.json(result, {
      status: 200,
    });
  } catch (error: any) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: error.statusCode,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
