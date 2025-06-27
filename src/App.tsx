
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { BookingProvider } from '@/contexts/BookingContext';
import { MarketplaceProvider } from '@/contexts/MarketplaceContext';
import { Toaster } from '@/components/ui/toaster';
import ProtectedRoute from '@/components/ProtectedRoute';

// Public Pages
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import NotFound from '@/pages/NotFound';
import About from '@/pages/public/About';
import PublicGyms from '@/pages/public/Gyms';
import PublicCoaches from '@/pages/public/Coaches';
import FAQ from '@/pages/public/FAQ';
import Terms from '@/pages/legal/Terms';
import Privacy from '@/pages/legal/Privacy';

// Client Pages
import ClientDashboard from '@/pages/client/Dashboard';
import BookClasses from '@/pages/client/BookClasses';
import MyBookings from '@/pages/client/MyBookings';
import Subscriptions from '@/pages/client/Subscriptions';
import Profile from '@/pages/client/Profile';
import Gyms from '@/pages/client/Gyms';
import Coaches from '@/pages/client/Coaches';
import Marketplace from '@/pages/client/Marketplace';
import AICoach from '@/pages/client/AICoach';

// Coach Pages
import CoachDashboard from '@/pages/coach/Dashboard';
import CoachPrograms from '@/pages/coach/Programs';
import ClassSchedule from '@/pages/coach/ClassSchedule';

// Gym Owner Pages
import GymOwnerDashboard from '@/pages/gym-owner/Dashboard';
import StudioManagement from '@/pages/gym-owner/StudioManagement';

// Brand Pages
import BrandDashboard from '@/pages/brand/Dashboard';
import ProductManagement from '@/pages/brand/ProductManagement';

// Admin Pages
import AdminDashboard from '@/pages/admin/Dashboard';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <MarketplaceProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/gyms" element={<PublicGyms />} />
              <Route path="/coaches" element={<PublicCoaches />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />

              {/* Client Routes */}
              <Route path="/client/dashboard" element={
                <ProtectedRoute allowedRoles={['client']}>
                  <ClientDashboard />
                </ProtectedRoute>
              } />
              <Route path="/client/book-classes" element={
                <ProtectedRoute allowedRoles={['client']}>
                  <BookClasses />
                </ProtectedRoute>
              } />
              <Route path="/client/my-bookings" element={
                <ProtectedRoute allowedRoles={['client']}>
                  <MyBookings />
                </ProtectedRoute>
              } />
              <Route path="/client/subscriptions" element={
                <ProtectedRoute allowedRoles={['client']}>
                  <Subscriptions />
                </ProtectedRoute>
              } />
              <Route path="/client/profile" element={
                <ProtectedRoute allowedRoles={['client']}>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/client/gyms" element={
                <ProtectedRoute allowedRoles={['client']}>
                  <Gyms />
                </ProtectedRoute>
              } />
              <Route path="/client/coaches" element={
                <ProtectedRoute allowedRoles={['client']}>
                  <Coaches />
                </ProtectedRoute>
              } />
              <Route path="/client/marketplace" element={
                <ProtectedRoute allowedRoles={['client']}>
                  <Marketplace />
                </ProtectedRoute>
              } />
              <Route path="/client/ai-coach" element={
                <ProtectedRoute allowedRoles={['client']}>
                  <AICoach />
                </ProtectedRoute>
              } />

              {/* Coach Routes */}
              <Route path="/coach/dashboard" element={
                <ProtectedRoute allowedRoles={['coach']}>
                  <CoachDashboard />
                </ProtectedRoute>
              } />
              <Route path="/coach/programs" element={
                <ProtectedRoute allowedRoles={['coach']}>
                  <CoachPrograms />
                </ProtectedRoute>
              } />
              <Route path="/coach/schedule" element={
                <ProtectedRoute allowedRoles={['coach']}>
                  <ClassSchedule />
                </ProtectedRoute>
              } />

              {/* Gym Owner Routes */}
              <Route path="/gym-owner/dashboard" element={
                <ProtectedRoute allowedRoles={['gym_owner']}>
                  <GymOwnerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/gym-owner/studio-management" element={
                <ProtectedRoute allowedRoles={['gym_owner']}>
                  <StudioManagement />
                </ProtectedRoute>
              } />

              {/* Brand Routes */}
              <Route path="/brand/dashboard" element={
                <ProtectedRoute allowedRoles={['brand']}>
                  <BrandDashboard />
                </ProtectedRoute>
              } />
              <Route path="/brand/product-management" element={
                <ProtectedRoute allowedRoles={['brand']}>
                  <ProductManagement />
                </ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />

              {/* Catch all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </Router>
        </MarketplaceProvider>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
