import { api } from "@/lib/api/axios";

import type { CreateEmployeeInput } from "@/lib/validations/employee";

import type {
  Employee,
  EmployeeListParams,
  EmployeeListResponse,
} from "@/types/employee";

export async function getEmployees(
  params: EmployeeListParams,
): Promise<EmployeeListResponse> {
  const response = await api.get("/employees", {
    params,
  });

  return response.data.data;
}

export async function createEmployee(
  data: CreateEmployeeInput,
): Promise<Employee> {
  const response = await api.post("/employees", data);

  return response.data.data;
}
