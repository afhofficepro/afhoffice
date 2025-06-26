'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function SetupPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    plan: 'starter',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create checkout session
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userUid: 'temp-user-id', // In real implementation, get from auth
        }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    {
      name: 'Starter',
      price: '$29',
      features: ['Up to 5 users', 'Basic reporting', 'Email support', 'Standard features'],
    },
    {
      name: 'Professional',
      price: '$79',
      features: ['Up to 25 users', 'Advanced reporting', 'Custom domain', 'Priority support'],
    },
    {
      name: 'Enterprise',
      price: '$199',
      features: ['Up to 100 users', 'API access', 'Custom integrations', 'Dedicated support'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to AFH Office
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional Adult Family Home management platform. 
            Choose your plan and get started in minutes.
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-lg shadow-md p-8 ${
                formData.plan === plan.name.toLowerCase() ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">
                {plan.price}<span className="text-sm text-gray-600">/month</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                type="button"
                onClick={() => setFormData({ ...formData, plan: plan.name.toLowerCase() })}
                variant={formData.plan === plan.name.toLowerCase() ? 'default' : 'outline'}
                className="w-full"
              >
                {formData.plan === plan.name.toLowerCase() ? 'Selected' : 'Select Plan'}
              </Button>
            </div>
          ))}
        </div>

        {/* Setup Form */}
        <div className="max-w-md mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Create Your Workspace
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  id="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your AFH Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="admin@yourcompany.com"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Workspace...' : 'Continue to Payment'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 