
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { LogOut, Menu, User, Users, MapPin, Clock, Star } from 'lucide-react';
import { UserRole } from '@/types/user';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: UserRole;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'client': return <Users className="w-5 h-5" />;
      case 'gym_owner': return <MapPin className="w-5 h-5" />;
      case 'coach': return <Clock className="w-5 h-5" />;
      case 'brand': return <Star className="w-5 h-5" />;
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'client': return 'bg-blue-100 text-blue-800';
      case 'gym_owner': return 'bg-green-100 text-green-800';
      case 'coach': return 'bg-purple-100 text-purple-800';
      case 'brand': return 'bg-orange-100 text-orange-800';
    }
  };

  const getRoleTitle = (role: UserRole) => {
    switch (role) {
      case 'client': return 'Client';
      case 'gym_owner': return 'Gym Owner';
      case 'coach': return 'Coach';
      case 'brand': return 'Brand';
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      SportFlare
                    </span>
                  </div>
                  {/* Mobile navigation would go here */}
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SportFlare
              </span>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Badge className={`${getRoleColor(role)} border-0`}>
              <div className="flex items-center space-x-1">
                {getRoleIcon(role)}
                <span>{getRoleTitle(role)}</span>
              </div>
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
