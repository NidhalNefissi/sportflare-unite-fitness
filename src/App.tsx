
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClientDashboard from "./pages/client/Dashboard";
import GymOwnerDashboard from "./pages/gym-owner/Dashboard";
import CoachDashboard from "./pages/coach/Dashboard";
import BrandDashboard from "./pages/brand/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route 
              path="/client/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['client']}>
                  <ClientDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/gym-owner/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['gym_owner']}>
                  <GymOwnerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/coach/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['coach']}>
                  <CoachDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/brand/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['brand']}>
                  <BrandDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
