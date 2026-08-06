import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <AppHeader />

        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
