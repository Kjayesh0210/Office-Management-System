"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createEmployeeSchema,
  type CreateEmployeeInput,
} from "@/lib/validations/employee";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateEmployee } from "@/hooks/useCreateEmployee";
import type { Department } from "@/types/department";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  departments: Department[];
}

export function EmployeeDialog({ open, onOpenChange, departments }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateEmployeeInput, any, CreateEmployeeInput>({
    resolver: zodResolver(createEmployeeSchema),

    defaultValues: {
      employeeCode: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      departmentId: "",
      designation: "",
      joiningDate: "",
      status: "ACTIVE",
    },
  });

  const mutation = useCreateEmployee();

  async function onSubmit(data: CreateEmployeeInput) {
    try {
      await mutation.mutateAsync(data);

      reset();

      onOpenChange(false);
    } catch {
      // Error is already handled by the mutation hook.
    }
  }

  const loading = mutation.isPending;

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!loading) {
          onOpenChange(value);
        }
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Employee Code */}
          <div className="space-y-2">
            <Label>Employee Code</Label>

            <Input {...register("employeeCode")} placeholder="EMP002" />

            {errors.employeeCode && (
              <p className="text-sm text-destructive">
                {errors.employeeCode.message}
              </p>
            )}
          </div>

          {/* First Name */}
          <div className="space-y-2">
            <Label>First Name</Label>

            <Input {...register("firstName")} placeholder="John" />

            {errors.firstName && (
              <p className="text-sm text-destructive">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label>Last Name</Label>

            <Input {...register("lastName")} placeholder="Doe" />

            {errors.lastName && (
              <p className="text-sm text-destructive">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label>Email</Label>

            <Input
              type="email"
              {...register("email")}
              placeholder="john@example.com"
            />

            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label>Phone</Label>

            <Input {...register("phone")} placeholder="+91 9876543210" />

            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          {/* Department */}
          <div className="space-y-2">
            <Label>Department</Label>

            <select
              {...register("departmentId", {
                setValueAs: (value) => (value === "" ? undefined : value),
              })}
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
            >
              <option value="">No Department</option>

              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
            </select>

            {errors.departmentId && (
              <p className="text-sm text-destructive">
                {errors.departmentId.message}
              </p>
            )}
          </div>

          {/* Designation */}
          <div className="space-y-2">
            <Label>Designation</Label>

            <Input {...register("designation")} placeholder="Manager" />

            {errors.designation && (
              <p className="text-sm text-destructive">
                {errors.designation.message}
              </p>
            )}
          </div>

          {/* Joining Date */}
          <div className="space-y-2">
            <Label>Joining Date</Label>

            <Input type="date" {...register("joiningDate")} />

            {errors.joiningDate && (
              <p className="text-sm text-destructive">
                {errors.joiningDate.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Status</Label>

            <select
              {...register("status")}
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
            >
              <option value="ACTIVE">Active</option>

              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Employee"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
