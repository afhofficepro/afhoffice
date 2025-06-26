'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Building2, ArrowLeft } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useSearchParams } from 'next/navigation';

export default function SignInPage() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    workspace: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill workspace name from URL parameter
  useEffect(() => {
    const workspaceParam = searchParams.get('workspace');
    if (workspaceParam) {
      setFormData(prev => ({ ...prev, workspace: workspaceParam }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // First, redirect to the workspace subdomain
      const workspaceSlug = formData.workspace.toLowerCase().replace(/[^a-z0-9]/g, '-');
      
      // For now, we'll store the credentials in sessionStorage and redirect
      // In a real implementation, you'd validate the workspace exists first
      sessionStorage.setItem('pendingAuth', JSON.stringify({
        email: formData.email,
        password: formData.password,
      }));
      
      // Redirect to workspace subdomain
      window.location.href = `https://${workspaceSlug}.afhoffice.com`;
      
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AFH Office</h1>
                <p className="text-sm text-gray-500">Residential Care Software</p>
              </div>
            </div>
            
            <div className="text-sm">
              <a href="/" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to setup
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Sign in to your workspace
            </h2>
            <p className="text-gray-600">
              Enter your workspace details to access your account
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="workspace" className="block text-sm font-medium text-gray-700 mb-2">
                  Workspace Name *
                </label>
                <div className="relative">
                  <input
                    id="workspace"
                    type="text"
                    value={formData.workspace}
                    onChange={(e) => setFormData({ ...formData, workspace: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-32"
                    placeholder="your-workspace"
                  />
                  <div className="absolute right-3 top-3 text-sm text-gray-500">
                    .afhoffice.com
                  </div>
                </div>
                {formData.workspace && (
                  <p className="text-sm text-gray-500 mt-2">
                    You'll be redirected to: <strong>{formData.workspace.toLowerCase().replace(/[^a-z0-9]/g, '-')}.afhoffice.com</strong>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || !formData.workspace || !formData.email || !formData.password}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in to workspace'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have a workspace yet?{' '}
                <a href="/#workspace-creation" className="text-blue-600 hover:text-blue-700 font-medium">
                  Create one now
                </a>
              </p>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Need help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                If you can't remember your workspace name, contact your administrator or check your welcome email.
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">
                  <strong>Forgot your password?</strong> You'll be able to reset it on your workspace page.
                </p>
                <p className="text-gray-600">
                  <strong>Need support?</strong> Contact us at{' '}
                  <a href="mailto:support@afhoffice.com" className="text-blue-600 hover:text-blue-700">
                    support@afhoffice.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 