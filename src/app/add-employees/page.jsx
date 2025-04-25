'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiDollarSign, FiUpload, FiSave } from 'react-icons/fi';

const PageLayout = dynamic(() => import('@/components/layout/PageLayout'), {
  loading: () => <div className="h-screen bg-gray-100 dark:bg-primary animate-pulse"></div>,
  ssr: false
});

export default function AddEmployeesPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    position: '',
    department: '',
    hireDate: '',
    salary: '',
    status: 'Active',
    profileImage: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add API call to save employee data
  };

  return (
    <PageLayout title="Add New Employee">
      <div className="bg-white dark:bg-primary rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image Upload */}
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <div className="w-48 h-48 rounded-full bg-gray-200 dark:bg-primary-light flex items-center justify-center mb-4 overflow-hidden">
                {formData.profileImage ? (
                  <img src={URL.createObjectURL(formData.profileImage)} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                  <FiUser size={60} className="text-gray-400 dark:text-gray-600" />
                )}
              </div>
              <label className="cursor-pointer bg-sidebar hover:bg-sidebar-light text-white py-2 px-4 rounded-lg transition-colors">
                <FiUpload className="inline mr-2" />
                Upload Profile Photo
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFormData(prev => ({ ...prev, profileImage: e.target.files[0] }));
                    }
                  }}
                />
              </label>
            </div>

            {/* Personal Information */}
            <div className="w-full md:w-2/3 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                      placeholder="John"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                      placeholder="john.doe@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMapPin className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                    placeholder="123 Main St"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                    placeholder="New York"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                    placeholder="NY"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                    placeholder="10001"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                    placeholder="Operations Manager"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Operations">Operations</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Customer Support">Customer Support</option>
                    <option value="Administration">Administration</option>
                    <option value="Human Resources">Human Resources</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hire Date</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="hireDate"
                      value={formData.hireDate}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Salary</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiDollarSign className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                      placeholder="50000"
                      min="0"
                      step="1000"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              className="mr-4 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-primary-light transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-sidebar hover:bg-sidebar-light text-white rounded-md transition-colors flex items-center"
            >
              <FiSave className="mr-2" />
              Save Employee
            </button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}
