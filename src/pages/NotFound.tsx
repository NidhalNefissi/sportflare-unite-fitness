
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md">
        <div className="space-y-4">
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900">
            Page Not Found
          </h2>
          <p className="text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            asChild 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="ml-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
