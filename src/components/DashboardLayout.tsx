
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Calendar, 
  Users, 
  ShoppingCart, 
  Star, 
  Home, 
  Settings, 
  LogOut,
  Package,
  BarChart3,
  Shield,
  Building,
  Dumbbell,
  QrCode
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'client' | 'coach' | 'gym_owner' | 'brand' | 'admin';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getNavItems = () => {
    const baseItems = [
      { 
        icon: <Home className="w-4 h-4" />, 
        label: 'Dashboard', 
        path: `/${role.replace('_', '-')}/dashboard` 
      }
    ];

    switch (role) {
      case 'client':
        return [
          ...baseItems,
          { 
            icon: <Calendar className="w-4 h-4" />, 
            label: 'Book Classes', 
            path: '/client/book-classes' 
          },
          { 
            icon: <QrCode className="w-4 h-4" />, 
            label: 'My Bookings', 
            path: '/client/my-bookings' 
          },
          { 
            icon: <ShoppingCart className="w-4 h-4" />, 
            label: 'Marketplace', 
            path: '/client/marketplace' 
          },
          { 
            icon: <Star className="w-4 h-4" />, 
            label: 'AI Coach', 
            path: '/client/ai-coach' 
          }
        ];
      case 'coach':
        return [
          ...baseItems,
          { 
            icon: <Calendar className="w-4 h-4" />, 
            label: 'Class Schedule', 
            path: '/coach/class-schedule' 
          },
          { 
            icon: <Dumbbell className="w-4 h-4" />, 
            label: 'Programs', 
            path: '/coach/programs' 
          }
        ];
      case 'gym_owner':
        return [
          ...baseItems,
          { 
            icon: <Building className="w-4 h-4" />, 
            label: 'Studio Management', 
            path: '/gym-owner/studio-management' 
          }
        ];
      case 'brand':
        return [
          ...baseItems,
          { 
            icon: <Package className="w-4 h-4" />, 
            label: 'Product Management', 
            path: '/brand/product-management' 
          }
        ];
      case 'admin':
        return [
          ...baseItems,
          { 
            icon: <Users className="w-4 h-4" />, 
            label: 'User Management', 
            path: '/admin/users' 
          },
          { 
            icon: <BarChart3 className="w-4 h-4" />, 
            label: 'Analytics', 
            path: '/admin/analytics' 
          },
          { 
            icon: <Shield className="w-4 h-4" />, 
            label: 'Reports', 
            path: '/admin/reports' 
          }
        ];
      default:
        return baseItems;
    }
  };

  const getRoleColor = () => {
    switch (role) {
      case 'client': return 'from-blue-600 to-purple-600';
      case 'coach': return 'from-green-600 to-blue-600';
      case 'gym_owner': return 'from-orange-600 to-red-600';
      case 'brand': return 'from-purple-600 to-pink-600';
      case 'admin': return 'from-gray-700 to-gray-900';
      default: return 'from-blue-600 to-purple-600';
    }
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className={`bg-gradient-to-r ${getRoleColor()} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full"></div>
              <span className="text-xl font-bold text-white">SportFlare</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-white/20 text-white">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  <p className="text-xs leading-none text-muted-foreground capitalize">
                    {user?.role?.replace('_', ' ')}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-2 overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
