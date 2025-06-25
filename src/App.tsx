
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { BookingProvider } from "@/contexts/BookingContext";
import { MarketplaceProvider } from "@/contexts/MarketplaceContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClientDashboard from "./pages/client/Dashboard";
import BookClasses from "./pages/client/BookClasses";
import MyBookings from "./pages/client/MyBookings";
import Marketplace from "./pages/client/Marketplace";
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
        <BookingProvider>
          <MarketplaceProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Client Routes */}
                <Route 
                  path="/client/dashboard" 
                  element={
                    <ProtectedRoute allowedRoles={['client']}>
                      <ClientDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/client/book-classes" 
                  element={
                    <ProtectedRoute allowedRoles={['client']}>
                      <BookClasses />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/client/my-bookings" 
                  element={
                    <ProtectedRoute allowedRoles={['client']}>
                      <MyBookings />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/client/marketplace" 
                  element={
                    <ProtectedRoute allowedRoles={['client']}>
                      <Marketplace />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Gym Owner Routes */}
                <Route 
                  path="/gym-owner/dashboard" 
                  element={
                    <ProtectedRoute allowedRoles={['gym_owner']}>
                      <GymOwnerDashboard />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Coach Routes */}
                <Route 
                  path="/coach/dashboard" 
                  element={
                    <ProtectedRoute allowedRoles={['coach']}>
                      <CoachDashboard />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Brand Routes */}
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
          </MarketplaceProvider>
        </BookingProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
