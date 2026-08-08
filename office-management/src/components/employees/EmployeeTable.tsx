"use client";

import type { Employee } from "@/types/employee";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  employees: Employee[];
}

export function EmployeeTable({ employees }: Props) {
  if (employees.length === 0) {
    return (
      <div className="rounded-lg border p-10 text-center">
        <h3 className="text-lg font-semibold">No employees found</h3>

        <p className="text-muted-foreground">No employees match your search.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee Code</TableHead>

            <TableHead>Name</TableHead>

            <TableHead>Email</TableHead>

            <TableHead>Designation</TableHead>

            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee._id}>
              <TableCell className="font-medium">
                {employee.employeeCode}
              </TableCell>

              <TableCell>
                {employee.firstName} {employee.lastName}
              </TableCell>

              <TableCell>{employee.email}</TableCell>

              <TableCell>{employee.designation}</TableCell>

              <TableCell>{employee.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
