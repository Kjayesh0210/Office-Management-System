import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { AttendanceChart } from "@/components/dashboard/AttendanceChart";
import { RecentEmployees } from "@/components/dashboard/RecentEmployees";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-muted-foreground">Welcome back, Jayesh.</p>
      </div>

      <DashboardStats />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AttendanceChart />
        </div>

        <RecentEmployees />
      </div>
    </div>
  );
}
