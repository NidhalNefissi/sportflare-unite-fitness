
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Redirect authenticated users to their dashboard
      const dashboardPath = `/${user.role.replace('_', '-')}/dashboard`;
      navigate(dashboardPath);
    } else {
      // Redirect unauthenticated users to landing page
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
  );
};

export default Index;
