import { NextRequest } from "next/server";

import { requireAuth } from "@/lib/auth/require-auth";
import { requireRole } from "@/lib/auth/require-role";
import { USER_ROLES } from "@/constants/roles";

import { employeeService } from "@/server/services/employee.service";

import { createEmployeeSchema } from "@/lib/validations/employee";

import { successResponse, errorResponse } from "@/lib/api/response";

import { ApiError } from "@/lib/errors/api-error";
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization") ?? undefined;

    const user = await requireAuth(authHeader);
    requireRole(user.role, USER_ROLES.SUPER_ADMIN, USER_ROLES.HR_ADMIN);
    const body = await request.json();
    const data = createEmployeeSchema.parse(body);
    const employee = await employeeService.create(
      user.companyId.toString(),
      data,
    );
    return successResponse(employee, 201, "Employee created successfully.");
  } catch (error) {
    if (error instanceof ApiError) {
      return errorResponse(error.message, error.statusCode);
    }

    throw error;
  }
}
