"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Department } from "@/types/department";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;

  department: string;
  onDepartmentChange: (value: string) => void;

  designation: string;
  onDesignationChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;

  departments: Department[];
}

export function EmployeeToolbar({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  designation,
  onDesignationChange,
  status,
  onStatusChange,
  departments,
}: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4">
      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search employees..."
          className="pl-9"
        />
      </div>

      {/* Filters */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Department */}
        <div className="space-y-2">
          <Label>Department</Label>

          <Select
            value={department || "all"}
            onValueChange={(value) =>
              onDepartmentChange(value === null || value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>

              {departments.map((item) => (
                <SelectItem key={item._id} value={item._id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Designation */}
        <div className="space-y-2">
          <Label>Designation</Label>

          <Input
            value={designation}
            onChange={(event) => onDesignationChange(event.target.value)}
            placeholder="e.g. Manager"
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label>Status</Label>

          <Select
            value={status || "all"}
            onValueChange={(value) =>
              onStatusChange(value === null || value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>

              <SelectItem value="ACTIVE">Active</SelectItem>

              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
