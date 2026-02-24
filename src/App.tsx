import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import DashboardLayout from "./components/DashboardLayout";
import ProfileDashboard from "./pages/ProfileDashboard";
import UploadDashboard from "./pages/UploadDashboard";
import PlanningDashboard from "./pages/PlanningDashboard";
import ChatDashboard from "./pages/ChatDashboard";
import ColorMatchingDashboard from "./pages/ColorMatchingDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard/profile" replace />} />
            <Route path="profile" element={<ProfileDashboard />} />
            <Route path="upload" element={<UploadDashboard />} />
            <Route path="planning" element={<PlanningDashboard />} />
            <Route path="chat" element={<ChatDashboard />} />
            <Route path="color" element={<ColorMatchingDashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
