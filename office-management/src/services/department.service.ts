import { api } from "@/lib/api/axios";

export async function getDepartments() {
  const response = await api.get("/departments");

  return response.data;
}

export async function createDepartment(data: {
  name: string;
  code: string;
  description?: string;
}) {
  const response = await api.post("/departments", data);

  return response.data;
}

export async function updateDepartment(
  id: string,
  data: {
    name?: string;
    code?: string;
    description?: string;
  },
) {
  const response = await api.put(`/departments/${id}`, data);

  return response.data;
}

export async function deleteDepartment(id: string) {
  const response = await api.delete(`/departments/${id}`);

  return response.data;
}
