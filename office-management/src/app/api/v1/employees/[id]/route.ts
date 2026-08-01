import { NextRequest, NextResponse } from "next/server";
import { USER_ROLES } from "@/constants/roles";
import { requireAuth } from "@/lib/auth/require-auth";
import { requireRole } from "@/lib/auth/require-role";
import { errorResponse, successResponse } from "@/lib/api/response";
import { ApiError } from "next/dist/server/api-utils";
import { employeeService } from "@/server/services/employee.service";
import { updateEmployeeSchema } from "@/lib/validations/employee";
import { ZodError } from "zod";

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
      USER_ROLES.FINANCE,
      USER_ROLES.RECRUITER,
    );
    const { id } = await params;
    const employee = await employeeService.findById(
      user.companyId.toString(),
      id,
    );
    return successResponse(employee, 200, "Employee fetched successfully.");
  } catch (error) {
    if (error instanceof ApiError) {
      return errorResponse(error.message, error.statusCode);
    }
    return errorResponse("Internal Server Error", 500);
  }
}
