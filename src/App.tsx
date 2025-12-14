import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ScamsPage from "./pages/ScamsPage";
import ChecklistPage from "./pages/ChecklistPage";
import ProfilePage from "./pages/ProfilePage";
import TransportPage from "./pages/TransportPage";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import HotelFinder from "./tourist/HotelFinder";
import TransportCheck from "./tourist/TransportCheck";
import ScamFeed from "./tourist/ScamFeed";
import SafetyHub from "./tourist/SafetyHub";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/safety" element={<SafetyHub />} />
            <Route path="/hotels" element={<HotelFinder />} />
            <Route path="/verify-transport" element={<TransportCheck />} />
            <Route path="/scam-alerts" element={<ScamFeed />} />
            <Route path="/scams" element={<ScamsPage />} />
            <Route path="/checklist" element={<ChecklistPage />} />
            <Route path="/transport" element={<TransportPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
