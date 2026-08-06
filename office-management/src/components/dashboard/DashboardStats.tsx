"use client";

import { Building2, CalendarDays, Users, Clock3 } from "lucide-react";

import { StatCard } from "./StatCard";

export function DashboardStats() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <StatCard title="Employees" value={25} icon={<Users size={32} />} />

      <StatCard title="Departments" value={5} icon={<Building2 size={32} />} />

      <StatCard
        title="Attendance"
        value="92%"
        icon={<CalendarDays size={32} />}
      />

      <StatCard title="Pending Leave" value={3} icon={<Clock3 size={32} />} />
    </div>
  );
}
