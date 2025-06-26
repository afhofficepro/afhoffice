'use client';

import { useAuth } from '@/contexts/AuthContext';
import { DashboardHeader } from '@/components/DashboardHeader';
import { DashboardContent } from '@/components/DashboardContent';
import { LoginForm } from '@/components/auth/LoginForm';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { user, tenant, loading } = useAuth();
  const router = useRouter();

  // Redirect to home page if no tenant is found
  useEffect(() => {
    if (!loading && !tenant) {
      router.push('/');
    }
  }, [loading, tenant, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome to {tenant?.name || 'AFH Office'}
              </h1>
              <p className="text-gray-600">
                Sign in to access your workspace
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <DashboardContent />
      </main>
    </div>
  );
} 