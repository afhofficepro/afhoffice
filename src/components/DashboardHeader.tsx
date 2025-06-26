'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export const DashboardHeader = () => {
  const { user, tenant, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Tenant Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {tenant?.name.charAt(0) || 'A'}
                </span>
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-900">
                  {tenant?.name || 'AFH Office'}
                </h1>
                <p className="text-xs text-gray-500 capitalize">
                  {tenant?.settings?.features ? `${tenant.settings.features.customDomain ? 'Professional' : 'Starter'} Plan` : 'Loading...'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Dashboard
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Residents
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Staff
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Reports
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Settings
            </a>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.displayName || user?.email}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user?.role || 'Member'}
                </p>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium text-sm">
                  {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </span>
              </div>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              className="text-gray-600 hover:text-gray-900"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}; 