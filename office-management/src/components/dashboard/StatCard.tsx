import { Card, CardContent } from "@/components/ui/card";

interface Props {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

export function StatCard({ title, value, icon }: Props) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-muted-foreground text-sm">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">{value}</h2>
        </div>

        {icon}
      </CardContent>
    </Card>
  );
}
