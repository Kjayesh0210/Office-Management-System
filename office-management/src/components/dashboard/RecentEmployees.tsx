import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const employees = [
  {
    name: "Jayesh",
    department: "Management",
    status: "ACTIVE",
  },
  {
    name: "Amit",
    department: "HR",
    status: "ACTIVE",
  },
  {
    name: "Rahul",
    department: "IT",
    status: "ACTIVE",
  },
];

export function RecentEmployees() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Employees</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {employees.map((employee) => (
            <div
              key={employee.name}
              className="flex justify-between border-b pb-3"
            >
              <div>
                <p className="font-medium">{employee.name}</p>

                <p className="text-muted-foreground text-sm">
                  {employee.department}
                </p>
              </div>

              <span className="text-green-600">{employee.status}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
