"use client";

import type { Department } from "@/types/department";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  departments: Department[];

  onEdit: (department: Department) => void;
}

export function DepartmentTable({ departments, onEdit }: Props) {
  if (departments.length === 0) {
    return (
      <div className="rounded-lg border p-10 text-center">
        <h3 className="text-lg font-semibold">No departments found</h3>

        <p className="text-muted-foreground">Create your first department.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>

          <TableHead>Code</TableHead>

          <TableHead>Description</TableHead>

          <TableHead className="w-24">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {departments.map((department) => (
          <TableRow key={department._id}>
            <TableCell>{department.name}</TableCell>

            <TableCell>{department.code}</TableCell>

            <TableCell>{department.description}</TableCell>

            <TableCell>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(department)}
              >
                Edit
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
