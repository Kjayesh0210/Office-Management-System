"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

import { DepartmentDialog } from "@/components/departments/DepartmentDialog";
import { DeleteDepartmentDialog } from "@/components/departments/DeleteDepartmentDialog";
import { DepartmentToolbar } from "@/components/departments/DepartmentToolbar";
import { getDepartmentColumns } from "@/components/departments/columns";

import { DataTable } from "@/components/data-table/DataTable";

import { useDepartments } from "@/hooks/useDepartments";

import type { Department } from "@/types/department";

export default function DepartmentsPage() {
  const { data = [], isLoading, error } = useDepartments();

  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [selectedDepartment, setSelectedDepartment] = useState<
    Department | undefined
  >();

  const filteredDepartments = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return data;
    }

    return data.filter((department) => {
      return (
        department.name.toLowerCase().includes(query) ||
        department.code.toLowerCase().includes(query) ||
        department.description.toLowerCase().includes(query)
      );
    });
  }, [data, search]);

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
    return <div className="p-6">Loading departments...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-destructive">Unable to load departments.</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Departments</h1>

          <p className="text-muted-foreground">
            Manage your company departments.
          </p>
        </div>

        <Button
          onClick={() => {
            setSelectedDepartment(undefined);
            setOpen(true);
          }}
        >
          Add Department
        </Button>
      </div>

      {/* Search */}
      <DepartmentToolbar value={search} onChange={setSearch} />

      {/* Table */}
      <DataTable columns={columns} data={filteredDepartments} />

      {/* Create / Edit */}
      <DepartmentDialog
        open={open}
        onOpenChange={setOpen}
        department={selectedDepartment}
      />

      {/* Delete */}
      <DeleteDepartmentDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        department={selectedDepartment}
      />
    </div>
  );
}
