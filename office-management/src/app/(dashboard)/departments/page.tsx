"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { DepartmentDialog } from "@/components/departments/DepartmentDialog";
import { DeleteDepartmentDialog } from "@/components/departments/DeleteDepartmentDialog";
import { getDepartmentColumns } from "@/components/departments/columns";

import { DataTable } from "@/components/data-table/DataTable";

import { useDepartments } from "@/hooks/useDepartments";

import type { Department } from "@/types/department";

export default function DepartmentsPage() {
  const { data = [], isLoading, error } = useDepartments();

  const [open, setOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedDepartment, setSelectedDepartment] = useState<
    Department | undefined
  >();

  const columns = getDepartmentColumns({
    onEdit: (department) => {
      setSelectedDepartment(department);
      setOpen(true);
    },

    onDelete: (department) => {
      setSelectedDepartment(department);
      setDeleteOpen(true);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Unable to load departments.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Departments</h1>

        <Button
          onClick={() => {
            setSelectedDepartment(undefined);
            setOpen(true);
          }}
        >
          Add Department
        </Button>
      </div>

      <DataTable columns={columns} data={data} />

      <DepartmentDialog
        open={open}
        onOpenChange={setOpen}
        department={selectedDepartment}
      />

      <DeleteDepartmentDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        department={selectedDepartment}
      />
    </div>
  );
}
