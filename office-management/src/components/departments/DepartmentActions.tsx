"use client";

import { MoreHorizontal } from "lucide-react";

import type { Department } from "@/types/department";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  department: Department;
  onEdit: (department: Department) => void;
  onDelete: (department: Department) => void;
}

export function DepartmentActions({ department, onEdit, onDelete }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-md p-2 hover:bg-accent">
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(department)}>
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          variant="destructive"
          onClick={() => onDelete(department)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
