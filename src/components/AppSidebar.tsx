import { User, Upload, Calendar, MessageCircle, Palette, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Profile", url: "/dashboard/profile", icon: User },
  { title: "Upload & Analyze", url: "/dashboard/upload", icon: Upload },
  { title: "Regular Planning", url: "/dashboard/planning", icon: Calendar },
  { title: "AI Stylist Chat", url: "/dashboard/chat", icon: MessageCircle },
  { title: "Color Matching", url: "/dashboard/color", icon: Palette },
  { title: "Style Variations", url:"/dashboard/style-variations", icon: Palette},
];

export function AppSidebar() {
  const navigate = useNavigate();

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent className="pt-4">
        <div className="px-4 mb-6">
          <h2 className="font-display text-2xl font-bold">
            <span className="text-foreground">Style</span>
            <span className="text-gradient-rose">Sense</span>
          </h2>
          <p className="text-xs text-muted-foreground font-body mt-1">AI Fashion Stylist</p>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="font-body text-xs tracking-widest uppercase text-muted-foreground">
            Dashboards
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm transition-colors hover:bg-muted"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg font-body text-sm text-muted-foreground hover:bg-muted transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
