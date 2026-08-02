import { NextRequest } from "next/server";
import { ZodError } from "zod";

import { USER_ROLES } from "@/constants/roles";
import { requireAuth } from "@/lib/auth/require-auth";
import { requireRole } from "@/lib/auth/require-role";
import { successResponse, errorResponse } from "@/lib/api/response";
import { ApiError } from "@/lib/errors/api-error";

import { updateDepartmentSchema } from "@/lib/validations/department";
import { departmentService } from "@/server/services/department.service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authHeader = request.headers.get("authorization") ?? undefined;

    const user = await requireAuth(authHeader);

    requireRole(
      user.role,
      USER_ROLES.SUPER_ADMIN,
      USER_ROLES.HR_ADMIN,
      USER_ROLES.MANAGER,
    );

    const { id } = await params;

    const department = await departmentService.findById(
      user.companyId.toString(),
      id,
    );

    return successResponse(department, 200, "Department fetched successfully.");
  } catch (error) {
    if (error instanceof ApiError) {
      return errorResponse(error.message, error.statusCode);
    }

    return errorResponse("Internal Server Error", 500);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authHeader = request.headers.get("authorization") ?? undefined;

    const user = await requireAuth(authHeader);

    requireRole(user.role, USER_ROLES.SUPER_ADMIN, USER_ROLES.HR_ADMIN);

    const { id } = await params;

    const body = await request.json();

    const data = updateDepartmentSchema.parse(body);

    const department = await departmentService.update(
      user.companyId.toString(),
      id,
      data,
    );

    return successResponse(department, 200, "Department updated successfully.");
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authHeader = request.headers.get("authorization") ?? undefined;

    const user = await requireAuth(authHeader);

    requireRole(user.role, USER_ROLES.SUPER_ADMIN);

    const { id } = await params;

    await departmentService.delete(user.companyId.toString(), id);

    return successResponse(null, 200, "Department deleted successfully.");
  } catch (error) {
    if (error instanceof ApiError) {
      return errorResponse(error.message, error.statusCode);
    }

    return errorResponse("Internal Server Error", 500);
  }
}
