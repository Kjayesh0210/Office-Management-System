"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import type { Department } from "@/types/department";

import { useDeleteDepartment } from "@/hooks/useDeleteDepartment";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department?: Department;
}

export function DeleteDepartmentDialog({
  open,
  onOpenChange,
  department,
}: Props) {
  const mutation = useDeleteDepartment();

  async function handleDelete() {
    if (!department) return;

    try {
      await mutation.mutateAsync(department._id);

      onOpenChange(false);
    } catch {}
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Department</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete <strong>{department?.name}</strong>?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
