export interface Employee {
  _id: string;
  companyId: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  departmentId: string | null;
  designation: string;
  joiningDate: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeListParams {
  page: number;
  limit: number;
  search?: string;
  department?: string;
  designation?: string;
  status?: "ACTIVE" | "INACTIVE";
  sortBy?: string;
  order?: "asc" | "desc";
}

export interface EmployeeListResponse {
  employee: Employee[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
