'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { FiTruck, FiClock, FiUsers, FiBarChart2 } from 'react-icons/fi';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

// Lazy-loaded components with loading states
const PageLayout = dynamic(() => import('@/components/layout/PageLayout'), {
  loading: () => <div className="h-screen w-full bg-white animate-pulse"></div>,
  ssr: false
});

const DashboardPage = () => {
  // Chart data
  const pieChartData = {
    labels: ['Active Vehicles', 'Maintenance', 'Out of Service'],
    datasets: [
      {
        data: [18, 4, 2],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
        borderColor: ['#388E3C', '#FFA000', '#D32F2F'],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Daily Trips',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <PageLayout title="Dashboard" isDashboard={true}>
      <div className="w-full max-w-7xl mx-auto">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="metric-card bg-white rounded-lg shadow-md overflow-hidden p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-700">24</h3>
              </div>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50">
                <FiTruck size={24} className="text-blue-500" />
              </div>
            </div>
          </div>
          
          <div className="metric-card bg-white rounded-lg shadow-md overflow-hidden p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Daily Trips</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-700">156</h3>
              </div>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-50">
                <FiClock size={24} className="text-green-500" />
              </div>
            </div>
          </div>
          
          <div className="metric-card bg-white rounded-lg shadow-md overflow-hidden p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Drivers</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-700">38</h3>
              </div>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-50">
                <FiUsers size={24} className="text-purple-500" />
              </div>
            </div>
          </div>
          
          <div className="metric-card bg-white rounded-lg shadow-md overflow-hidden p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-700">$12,456</h3>
              </div>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-50">
                <FiBarChart2 size={24} className="text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Vehicle Status Distribution</h3>
            <div className="h-[300px] flex items-center justify-center">
              <Pie data={pieChartData} options={{
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: '#4B5563'
                    }
                  }
                }
              }} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Weekly Trip Trends</h3>
            <div className="h-[300px]">
              <Line data={lineChartData} options={{
                plugins: {
                  legend: {
                    labels: {
                      color: '#4B5563'
                    }
                  }
                },
                scales: {
                  y: {
                    ticks: { color: '#4B5563' },
                    grid: { color: 'rgba(107, 114, 128, 0.1)' }
                  },
                  x: {
                    ticks: { color: '#4B5563' },
                    grid: { color: 'rgba(107, 114, 128, 0.1)' }
                  }
                }
              }} />
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Monthly Revenue Overview</h3>
          <div className="h-[300px]">
            <Bar data={barChartData} options={{
              plugins: {
                legend: {
                  labels: {
                    color: '#4B5563'
                  }
                }
              },
              scales: {
                y: {
                  ticks: { color: '#4B5563' },
                  grid: { color: 'rgba(107, 114, 128, 0.1)' }
                },
                x: {
                  ticks: { color: '#4B5563' },
                  grid: { color: 'rgba(107, 114, 128, 0.1)' }
                }
              }
            }} />
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Welcome to ETS Dashboard
          </h2>
          <p className="text-gray-600">
            This is your centralized dashboard for managing vehicles, drivers, and employees.
            Use the sidebar navigation to access different sections of the application.
          </p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium text-gray-700 mb-2">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors">
                  Add New Vehicle
                </button>
                <button className="w-full text-left px-4 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors">
                  Add New Driver
                </button>
                <button className="w-full text-left px-4 py-2 bg-purple-50 text-purple-600 rounded-md hover:bg-purple-100 transition-colors">
                  View Reports
                </button>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium text-gray-700 mb-2">Recent Activities</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-green-400"></div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700">New driver added: John Doe</p>
                    <p className="text-xs text-gray-500">Today, 10:30 AM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-400"></div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700">Vehicle maintenance scheduled</p>
                    <p className="text-xs text-gray-500">Yesterday, 3:45 PM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-orange-400"></div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700">Trip completed: Route #1242</p>
                    <p className="text-xs text-gray-500">Yesterday, 1:20 PM</p>
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