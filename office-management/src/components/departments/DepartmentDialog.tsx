"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createDepartmentSchema,
  type CreateDepartmentInput,
} from "@/lib/validations/department";

import type { Department } from "@/types/department";

import { useCreateDepartment } from "@/hooks/useCreateDepartment";
import { useUpdateDepartment } from "@/hooks/useUpdateDepartment";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department?: Department;
}

export function DepartmentDialog({ open, onOpenChange, department }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateDepartmentInput>({
    resolver: zodResolver(createDepartmentSchema),
  });

  const createMutation = useCreateDepartment();
  const updateMutation = useUpdateDepartment();

  useEffect(() => {
    if (department) {
      reset({
        name: department.name,
        code: department.code,
        description: department.description,
      });
    } else {
      reset({
        name: "",
        code: "",
        description: "",
      });
    }
  }, [department, reset]);

  const loading = createMutation.isPending || updateMutation.isPending;

  async function onSubmit(data: CreateDepartmentInput) {
    console.log("Department:", department);
    console.log("Submitting:", data);

    try {
      if (department) {
        console.log("UPDATE");
        await updateMutation.mutateAsync({
          id: department._id,
          data,
        });
      } else {
        console.log("CREATE");
        await createMutation.mutateAsync(data);
      }

      reset();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!loading) {
          onOpenChange(value);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {department ? "Edit Department" : "Create Department"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label>Name</Label>

            <Input {...register("name")} />

            <p className="text-sm text-red-500">{errors.name?.message}</p>
          </div>

          <div>
            <Label>Code</Label>

            <Input {...register("code")} />

            <p className="text-sm text-red-500">{errors.code?.message}</p>
          </div>

          <div>
            <Label>Description</Label>

            <Input {...register("description")} />

            <p className="text-sm text-red-500">
              {errors.description?.message}
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? "Saving..."
              : department
                ? "Update Department"
                : "Create Department"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
