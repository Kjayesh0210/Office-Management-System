import { NextResponse } from "next/server";
import { loginSchema } from "@/lib/validations/auth";
import { authService } from "@/server/services/auth.service";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = loginSchema.parse(body);

    const { token, user } = await authService.login(data);

    const response = NextResponse.json(
      {
        message: "User logged in successfully",
        user,
      },
      { status: 201 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    if (
      error instanceof Error &&
      error.message === "Invalid email or password"
    ) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
