'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export const DashboardContent = () => {
  const { user, tenant } = useAuth();

  const stats = [
    { name: 'Total Residents', value: '24', change: '+2 this month' },
    { name: 'Staff Members', value: '12', change: '+1 this month' },
    { name: 'Compliance Rate', value: '98%', change: '+0.5% this month' },
    { name: 'Monthly Revenue', value: '$45,200', change: '+12% this month' },
  ];

  const recentActivity = [
    { id: 1, type: 'admission', resident: 'John Smith', time: '2 hours ago' },
    { id: 2, type: 'medication', resident: 'Mary Johnson', time: '4 hours ago' },
    { id: 3, type: 'assessment', resident: 'Robert Wilson', time: '6 hours ago' },
    { id: 4, type: 'visit', resident: 'Linda Davis', time: '1 day ago' },
  ];

  const upcomingTasks = [
    { id: 1, task: 'Monthly fire drill', due: 'Today' },
    { id: 2, task: 'Medication audit', due: 'Tomorrow' },
    { id: 3, task: 'Staff training session', due: 'This week' },
    { id: 4, task: 'Facility inspection', due: 'Next week' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.displayName || 'there'}!
            </h2>
            <p className="text-gray-600 mt-1">
              Here's what's happening at {tenant?.name} today.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Current Plan</p>
            <p className="text-lg font-semibold text-blue-600 capitalize">
              {tenant?.settings?.features?.customDomain ? 'Professional' : 'Starter'}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium capitalize">{activity.type}</span> for{' '}
                      <span className="font-medium">{activity.resident}</span>
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </div>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-900">{task.task}</span>
                  </div>
                  <span className="text-xs text-gray-500">{task.due}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="outline" className="w-full">
                View All Tasks
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Resident Management</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Staff Scheduling</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Medication Tracking</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`w-2 h-2 rounded-full ${tenant?.settings?.features?.advancedReporting ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className={`text-sm ${tenant?.settings?.features?.advancedReporting ? 'text-gray-700' : 'text-gray-400'}`}>
              Advanced Reporting
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`w-2 h-2 rounded-full ${tenant?.settings?.features?.apiAccess ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className={`text-sm ${tenant?.settings?.features?.apiAccess ? 'text-gray-700' : 'text-gray-400'}`}>
              API Access
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`w-2 h-2 rounded-full ${tenant?.settings?.features?.prioritySupport ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className={`text-sm ${tenant?.settings?.features?.prioritySupport ? 'text-gray-700' : 'text-gray-400'}`}>
              Priority Support
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}; 