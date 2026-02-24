import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <header className="h-14 flex items-center border-b border-border px-4 sticky top-0 bg-background/80 backdrop-blur-md z-30">
            <SidebarTrigger className="mr-4" />
            <h1 className="font-display text-lg font-semibold">
              <span className="text-foreground">Style</span>
              <span className="text-gradient-rose">Sense</span>
            </h1>
          </header>
          <div className="p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
