import { NextResponse } from "next/server";
import { registerSchema } from "@/lib/validations/auth";
import { authService } from "@/server/services/auth.service";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = registerSchema.parse(body);

    const user = await authService.register(data);

    return NextResponse.json(
      {
        message: "User registered successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message === "Email already exists") {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}