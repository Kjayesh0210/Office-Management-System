import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { createEmployee } from "@/services/employee.service";

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmployee,

    onSuccess: () => {
      toast.success("Employee created successfully.");

      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ?? "Unable to create employee.",
      );
    },
  });
}
