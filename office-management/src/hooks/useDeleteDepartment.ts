import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteDepartment } from "@/services/department.service";

export function useDeleteDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDepartment,

    onSuccess: () => {
      toast.success("Department deleted successfully.");

      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ?? "Unable to delete department.",
      );
    },
  });
}
