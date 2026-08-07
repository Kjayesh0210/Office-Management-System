import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateDepartment } from "@/services/department.service";

export function useUpdateDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        name?: string;
        code?: string;
        description?: string;
      };
    }) => updateDepartment(id, data),

    onSuccess: () => {
      toast.success("Department updated successfully.");

      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ?? "Unable to update department.",
      );
    },
  });
}
