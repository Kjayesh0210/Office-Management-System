import { api } from "@/lib/api/axios";
import type {
  CreateDepartmentInput,
  UpdateDepartmentInput,
} from "@/lib/validations/department";
import type { Department } from "@/types/department";

export async function getDepartments(): Promise<Department[]> {
  const response = await api.get("/departments");

  return response.data.data;
}

export async function createDepartment(
  data: CreateDepartmentInput,
): Promise<Department> {
  const response = await api.post("/departments", data);

  return response.data.data;
}

export async function updateDepartment(
  id: string,
  data: UpdateDepartmentInput,
): Promise<Department> {
  const response = await api.put(`/departments/${id}`, data);

  return response.data.data;
}

export async function deleteDepartment(id: string) {
  await api.delete(`/departments/${id}`);
}
