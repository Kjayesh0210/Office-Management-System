import { NextRequest } from "next/server";
import { ZodError } from "zod";
import { USER_ROLES } from "@/constants/roles";
import { requireAuth } from "@/lib/auth/require-auth";
import { requireRole } from "@/lib/auth/require-role";
import { errorResponse, successResponse } from "@/lib/api/response";
import { ApiError } from "@/lib/errors/api-error";
import { createEmployeeSchema } from "@/lib/validations/employee";
import { employeeService } from "@/server/services/employee.service";

export async function POST(request: NextRequest) {
  try {
    const authHeaders = request.headers.get("authorization") ?? undefined;
    const user = await requireAuth(authHeaders);
    requireRole(user.role, USER_ROLES.SUPER_ADMIN, USER_ROLES.HR_ADMIN);
    const body = await request.json();

    const data = createEmployeeSchema.parse(body);

    const employee = await employeeService.create(
      user.companyId.toString(),
      data,
    );

    return successResponse(employee, 201, "Employee created successfully.");
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
    const authHeaders = request.headers.get("authorization") ?? undefined;

    const user = await requireAuth(authHeaders);
    requireRole(user.role, USER_ROLES.SUPER_ADMIN, USER_ROLES.HR_ADMIN);

    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") ?? 1);

    const limit = Number(searchParams.get("limit") ?? 10);

    const search = searchParams.get("search") ?? undefined;

    const department = searchParams.get("department") ?? undefined;

    const designation = searchParams.get("designation") ?? undefined;

    const status =
      (searchParams.get("status") as "ACTIVE" | "INACTIVE" | null) ?? undefined;

    const sortBy = searchParams.get("sortBy") ?? undefined;

    const order =
      (searchParams.get("order") as "asc" | "desc" | null) ?? undefined;

    const result = await employeeService.findAll(user.companyId.toString(), {
      page,
      limit,
      search,
      department,
      designation,
      status,
      sortBy,
      order,
    });
    return successResponse(result, 200, "Employees fetched successfully.");
  } catch (error) {
    if (error instanceof ApiError) {
      return errorResponse(error.message, error.statusCode);
    }
    return errorResponse("Internal Server Error", 500);
  }
}
