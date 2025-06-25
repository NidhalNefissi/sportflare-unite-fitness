
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
import AICoach from "./pages/client/AICoach";
import GymOwnerDashboard from "./pages/gym-owner/Dashboard";
import StudioManagement from "./pages/gym-owner/StudioManagement";
import CoachDashboard from "./pages/coach/Dashboard";
import ClassSchedule from "./pages/coach/ClassSchedule";
import Programs from "./pages/coach/Programs";
import BrandDashboard from "./pages/brand/Dashboard";
import ProductManagement from "./pages/brand/ProductManagement";
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
                <Route 
                  path="/client/ai-coach" 
                  element={
                    <ProtectedRoute allowedRoles={['client']}>
                      <AICoach />
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
                <Route 
                  path="/gym-owner/studio-management" 
                  element={
                    <ProtectedRoute allowedRoles={['gym_owner']}>
                      <StudioManagement />
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
                <Route 
                  path="/coach/class-schedule" 
                  element={
                    <ProtectedRoute allowedRoles={['coach']}>
                      <ClassSchedule />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/coach/programs" 
                  element={
                    <ProtectedRoute allowedRoles={['coach']}>
                      <Programs />
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
                <Route 
                  path="/brand/product-management" 
                  element={
                    <ProtectedRoute allowedRoles={['brand']}>
                      <ProductManagement />
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
