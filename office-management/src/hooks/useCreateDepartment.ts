import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createDepartment } from "@/services/department.service";

export function useCreateDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDepartment,

    onSuccess: () => {
      toast.success("Department created successfully.");

      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ?? "Unable to create department.",
      );
    },
  });
}
