import { useQuery } from "@tanstack/react-query";

import { getEmployees } from "@/services/employee.service";

import type { EmployeeListParams } from "@/types/employee";

export function useEmployees(params: EmployeeListParams) {
  return useQuery({
    queryKey: ["employees", params],

    queryFn: () => getEmployees(params),

    placeholderData: (previousData) => previousData,
  });
}
