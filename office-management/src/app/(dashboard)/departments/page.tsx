"use client";

import { useDepartments } from "@/hooks/useDepartments";

export default function DepartmentsPage() {
  const { data, isLoading, error } = useDepartments();

  if (isLoading) {
    return <div className="p-6">Loading departments...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Failed to load departments.</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Departments</h1>

      <pre className="rounded-lg border p-4">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
