"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function DepartmentToolbar({ value, onChange }: Props) {
  return (
    <div className="flex items-center">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search departments..."
          className="pl-9"
        />
      </div>
    </div>
  );
}
