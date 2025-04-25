'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { FiSearch, FiFilter, FiPlus, FiEdit, FiTrash2, FiUser, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const PageLayout = dynamic(() => import('@/components/layout/PageLayout'), {
  loading: () => <div className="h-screen bg-gray-100 dark:bg-primary animate-pulse"></div>,
  ssr: false
});

// Sample driver data
const DRIVERS_DATA = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY',
    licenseNumber: 'DL-12345678',
    licenseExpiry: '2025-05-15',
    experience: '5 years',
    status: 'Active',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    address: '456 Oak Ave, Boston, MA',
    licenseNumber: 'DL-87654321',
    licenseExpiry: '2024-03-22',
    experience: '3 years',
    status: 'Active',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '+1 (555) 456-7890',
    address: '789 Pine St, Chicago, IL',
    licenseNumber: 'DL-23456789',
    licenseExpiry: '2023-01-10',
    experience: '7 years',
    status: 'On Leave',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '+1 (555) 234-5678',
    address: '321 Elm St, San Francisco, CA',
    licenseNumber: 'DL-34567890',
    licenseExpiry: '2026-02-28',
    experience: '2 years',
    status: 'Active',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
  },
  {
    id: 5,
    name: 'Michael Wilson',
    email: 'michael.wilson@example.com',
    phone: '+1 (555) 876-5432',
    address: '654 Maple Ave, Miami, FL',
    licenseNumber: 'DL-45678901',
    licenseExpiry: '2022-11-15',
    experience: '4 years',
    status: 'Inactive',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
  }
];

const DriversPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [drivers, setDrivers] = useState(DRIVERS_DATA);

  // Filter drivers based on search term and status filter
  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = 
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || driver.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this driver?')) {
      setDrivers(drivers.filter(driver => driver.id !== id));
    }
  };

  return (
    <PageLayout title="Drivers">
      <div className="bg-white dark:bg-primary rounded-lg shadow-md p-6">
        {/* Header with search and filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400 dark:text-gray-600" />
            </div>
            <input
              type="text"
              className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
              placeholder="Search drivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <FiFilter className="text-gray-500 dark:text-gray-400" />
              <select
                className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
            
            <a 
              href="/add-drivers" 
              className="bg-sidebar hover:bg-sidebar-light text-white py-2 px-4 rounded-md flex items-center transition-colors"
            >
              <FiPlus className="mr-2" />
              Add Driver
            </a>
          </div>
        </div>
        
        {/* Drivers Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-primary-light">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Driver
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  License
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Experience
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-primary divide-y divide-gray-200 dark:divide-gray-700">
              {filteredDrivers.length > 0 ? (
                filteredDrivers.map((driver) => (
                  <tr key={driver.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img 
                            className="h-10 w-10 rounded-full object-cover" 
                            src={driver.avatar} 
                            alt={driver.name}
                            onError={(e) => {
                              e.target.src = 'https://ui-avatars.com/api/?name=' + driver.name.replace(' ', '+') + '&background=3b82f6&color=ffffff';
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {driver.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center">
                              <FiMapPin className="mr-1" size={12} />
                              {driver.address}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        <div className="flex items-center mb-1">
                          <FiMail className="mr-1" size={12} />
                          {driver.email}
                        </div>
                        <div className="flex items-center">
                          <FiPhone className="mr-1" size={12} />
                          {driver.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{driver.licenseNumber}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Expires: {driver.licenseExpiry}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{driver.experience}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${driver.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                          driver.status === 'Inactive' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                        {driver.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-sidebar hover:text-sidebar-light transition-colors">
                          <FiEdit size={18} />
                        </button>
                        <button 
                          className="text-red-500 hover:text-red-700 transition-colors"
                          onClick={() => handleDelete(driver.id)}
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No drivers found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
};

export default DriversPage;
