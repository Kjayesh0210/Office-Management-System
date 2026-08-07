import type { ColumnDef } from "@tanstack/react-table";

import type { Department } from "@/types/department";

import { DepartmentActions } from "./DepartmentActions";

interface Props {
  onEdit: (department: Department) => void;

  onDelete: (department: Department) => void;
}

export function getDepartmentColumns({
  onEdit,
  onDelete,
}: Props): ColumnDef<Department>[] {
  return [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <DepartmentActions
          department={row.original}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
    },
  ];
}
