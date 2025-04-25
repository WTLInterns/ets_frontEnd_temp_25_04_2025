'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { FiSearch, FiFilter, FiPlus, FiEdit, FiTrash2, FiUser, FiMail, FiPhone, FiBriefcase } from 'react-icons/fi';

const PageLayout = dynamic(() => import('@/components/layout/PageLayout'), {
  loading: () => <div className="h-screen bg-gray-100 dark:bg-primary animate-pulse"></div>,
  ssr: false
});

// Sample employee data
const EMPLOYEES_DATA = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    department: 'Management',
    position: 'Operations Manager',
    hireDate: '2020-03-15',
    salary: '75,000',
    status: 'Active',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg'
  },
  {
    id: 2,
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    phone: '+1 (555) 987-6543',
    department: 'Finance',
    position: 'Financial Analyst',
    hireDate: '2021-01-10',
    salary: '65,000',
    status: 'Active',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg'
  },
  {
    id: 3,
    name: 'David Chen',
    email: 'david.chen@example.com',
    phone: '+1 (555) 456-7890',
    department: 'IT',
    position: 'System Administrator',
    hireDate: '2019-06-22',
    salary: '70,000',
    status: 'On Leave',
    avatar: 'https://randomuser.me/api/portraits/men/13.jpg'
  },
  {
    id: 4,
    name: 'Maria Rodriguez',
    email: 'maria.rodriguez@example.com',
    phone: '+1 (555) 234-5678',
    department: 'Customer Service',
    position: 'Customer Relations Manager',
    hireDate: '2022-02-15',
    salary: '60,000',
    status: 'Active',
    avatar: 'https://randomuser.me/api/portraits/women/14.jpg'
  },
  {
    id: 5,
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    phone: '+1 (555) 876-5432',
    department: 'HR',
    position: 'HR Specialist',
    hireDate: '2020-09-01',
    salary: '62,000',
    status: 'Inactive',
    avatar: 'https://randomuser.me/api/portraits/men/15.jpg'
  }
];

const EmployeesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [employees, setEmployees] = useState(EMPLOYEES_DATA);

  // Filter employees based on search term and department filter
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'All' || employee.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(employee => employee.id !== id));
    }
  };

  // Get unique departments for filter
  const departments = ['All', ...new Set(employees.map(employee => employee.department))];

  return (
    <PageLayout title="Employees">
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
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <FiFilter className="text-gray-500 dark:text-gray-400" />
              <select
                className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <a 
              href="/add-employees" 
              className="bg-sidebar hover:bg-sidebar-light text-white py-2 px-4 rounded-md flex items-center transition-colors"
            >
              <FiPlus className="mr-2" />
              Add Employee
            </a>
          </div>
        </div>
        
        {/* Employees Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-primary-light">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Employee
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Position
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Hire Date
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
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img 
                            className="h-10 w-10 rounded-full object-cover" 
                            src={employee.avatar} 
                            alt={employee.name}
                            onError={(e) => {
                              e.target.src = 'https://ui-avatars.com/api/?name=' + employee.name.replace(' ', '+') + '&background=3b82f6&color=ffffff';
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {employee.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {employee.department}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        <div className="flex items-center mb-1">
                          <FiMail className="mr-1" size={12} />
                          {employee.email}
                        </div>
                        <div className="flex items-center">
                          <FiPhone className="mr-1" size={12} />
                          {employee.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900 dark:text-white">
                        <FiBriefcase className="mr-1" size={12} />
                        {employee.position}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ${employee.salary}/year
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {new Date(employee.hireDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${employee.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                          employee.status === 'Inactive' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-sidebar hover:text-sidebar-light transition-colors">
                          <FiEdit size={18} />
                        </button>
                        <button 
                          className="text-red-500 hover:text-red-700 transition-colors"
                          onClick={() => handleDelete(employee.id)}
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
                    No employees found matching your search criteria.
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

export default EmployeesPage;
