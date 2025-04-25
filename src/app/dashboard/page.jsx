'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { FiTruck, FiClock, FiUsers, FiBarChart2 } from 'react-icons/fi';

// Lazy-loaded components with loading states
const PageLayout = dynamic(() => import('@/components/layout/PageLayout'), {
  loading: () => <div className="h-screen w-full bg-black animate-pulse"></div>,
  ssr: false
});

const DashboardPage = () => {
  return (
    <PageLayout title="Dashboard" isDashboard={true}>
      <div className="w-full max-w-7xl mx-auto">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="metric-card bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-md overflow-hidden text-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">Total Vehicles</p>
                <h3 className="text-2xl font-bold mt-1">24</h3>
              </div>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-20">
                <FiTruck size={24} className="text-white fancy-icon" />
              </div>
            </div>
          </div>
          
          <div className="metric-card bg-gradient-to-r from-green-500 to-teal-600 rounded-lg shadow-md overflow-hidden text-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">Daily Trips</p>
                <h3 className="text-2xl font-bold mt-1">156</h3>
              </div>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-20">
                <FiClock size={24} className="text-white fancy-icon" />
              </div>
            </div>
          </div>
          
          <div className="metric-card bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-md overflow-hidden text-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">Total Drivers</p>
                <h3 className="text-2xl font-bold mt-1">38</h3>
              </div>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-20">
                <FiUsers size={24} className="text-white fancy-icon" />
              </div>
            </div>
          </div>
          
          <div className="metric-card bg-gradient-to-r from-red-500 to-orange-600 rounded-lg shadow-md overflow-hidden text-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">Total Revenue</p>
                <h3 className="text-2xl font-bold mt-1">$12,456</h3>
              </div>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-20">
                <FiBarChart2 size={24} className="text-white fancy-icon" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Welcome to ETS Dashboard
          </h2>
          <p className="text-gray-300">
            This is your centralized dashboard for managing vehicles, drivers, and employees.
            Use the sidebar navigation to access different sections of the application.
          </p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-800 rounded-lg p-4 bg-gray-800 bg-opacity-50">
              <h3 className="font-medium text-white mb-2">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 bg-blue-900 text-blue-200 rounded-md hover:bg-blue-800 transition-colors">
                  Add New Vehicle
                </button>
                <button className="w-full text-left px-4 py-2 bg-green-900 text-green-200 rounded-md hover:bg-green-800 transition-colors">
                  Add New Driver
                </button>
                <button className="w-full text-left px-4 py-2 bg-purple-900 text-purple-200 rounded-md hover:bg-purple-800 transition-colors">
                  View Reports
                </button>
              </div>
            </div>
            
            <div className="border border-gray-800 rounded-lg p-4 bg-gray-800 bg-opacity-50">
              <h3 className="font-medium text-white mb-2">Recent Activities</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                  <div className="ml-3">
                    <p className="text-sm text-white">New driver added: John Doe</p>
                    <p className="text-xs text-gray-400">Today, 10:30 AM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                  <div className="ml-3">
                    <p className="text-sm text-white">Vehicle maintenance scheduled</p>
                    <p className="text-xs text-gray-400">Yesterday, 3:45 PM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-orange-500"></div>
                  <div className="ml-3">
                    <p className="text-sm text-white">Trip completed: Route #1242</p>
                    <p className="text-xs text-gray-400">Yesterday, 1:20 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DashboardPage;