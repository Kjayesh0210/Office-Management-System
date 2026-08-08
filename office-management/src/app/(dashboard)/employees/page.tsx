"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { EmployeePagination } from "@/components/employees/EmployeePagination";
import { EmployeeToolbar } from "@/components/employees/EmployeeToolbar";

import { useEmployees } from "@/hooks/useEmployees";
import { useDepartments } from "@/hooks/useDepartments";
import { EmployeeDialog } from "@/components/employees/EmployeeDialog";

export default function EmployeesPage() {
  const [page, setPage] = useState(1);
  const [employeeDialogOpen, setEmployeeDialogOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [status, setStatus] = useState("");

  const limit = 10;

  /*
   * Debounce employee search.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  /*
   * Any filter change starts from page 1.
   */
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, department, designation, status]);

  const { data, isLoading, isFetching, error } = useEmployees({
    page,
    limit,

    ...(debouncedSearch ? { search: debouncedSearch } : {}),

    ...(department ? { department } : {}),

    ...(designation ? { designation } : {}),

    ...(status
      ? {
          status: status as "ACTIVE" | "INACTIVE",
        }
      : {}),
  });

  const { data: departments = [] } = useDepartments();

  if (isLoading) {
    return <div className="p-6">Loading employees...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-destructive">Unable to load employees.</div>
    );
  }

  const employees = data?.employee ?? [];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Employees</h1>

          <p className="text-muted-foreground">
            Manage your company employees.
          </p>
        </div>

        <Button onClick={() => setEmployeeDialogOpen(true)}>
          Add Employee
        </Button>
      </div>

      {/* Search + Filters */}
      <EmployeeToolbar
        search={search}
        onSearchChange={setSearch}
        department={department}
        onDepartmentChange={setDepartment}
        designation={designation}
        onDesignationChange={setDesignation}
        status={status}
        onStatusChange={setStatus}
        departments={departments}
      />

      {/* Table */}
      <div className="relative">
        <EmployeeTable employees={employees} />

        {isFetching && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-background/50">
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <EmployeePagination
        page={data?.page ?? page}
        totalPages={data?.totalPages ?? 1}
        hasNextPage={data?.hasNextPage ?? false}
        hasPreviousPage={data?.hasPreviousPage ?? false}
        onPageChange={setPage}
      />
      <EmployeeDialog
        open={employeeDialogOpen}
        onOpenChange={setEmployeeDialogOpen}
        departments={departments}
      />
    </div>
  );
}
