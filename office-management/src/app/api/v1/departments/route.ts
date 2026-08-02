import { NextRequest } from "next/server";
import { ZodError } from "zod";

import { USER_ROLES } from "@/constants/roles";
import { requireAuth } from "@/lib/auth/require-auth";
import { requireRole } from "@/lib/auth/require-role";
import { successResponse, errorResponse } from "@/lib/api/response";
import { ApiError } from "@/lib/errors/api-error";

import { createDepartmentSchema } from "@/lib/validations/department";
import { departmentService } from "@/server/services/department.service";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization") ?? undefined;

    const user = await requireAuth(authHeader);

    requireRole(user.role, USER_ROLES.SUPER_ADMIN, USER_ROLES.HR_ADMIN);

    const body = await request.json();

    const data = createDepartmentSchema.parse(body);

    const department = await departmentService.create(
      user.companyId.toString(),
      data,
    );

    return successResponse(department, 201, "Department created successfully.");
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

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization") ?? undefined;

    const user = await requireAuth(authHeader);

    requireRole(
      user.role,
      USER_ROLES.SUPER_ADMIN,
      USER_ROLES.HR_ADMIN,
      USER_ROLES.MANAGER,
    );

    const departments = await departmentService.findAll(
      user.companyId.toString(),
    );

    return successResponse(
      departments,
      200,
      "Departments fetched successfully.",
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return errorResponse(error.message, error.statusCode);
    }

    return errorResponse("Internal Server Error", 500);
  }
}
