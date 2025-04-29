'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiDollarSign, FiUpload, FiSave } from 'react-icons/fi';
import { useTheme } from '@/components/layout/ThemeProvider';

// Lazy-loaded PageTemplate component
const PageTemplate = dynamic(() => import('@/components/shared/PageTemplate'), {
  loading: () => <div className="h-screen bg-gray-100 animate-pulse"></div>,
  ssr: false
});

const AddDriversPage = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    licenseNumber: '',
    licenseExpiry: '',
    vehiclePreference: '',
    experience: '',
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
    // Add API call to save driver data
  };

  return (
    <PageTemplate title="Add New Driver">
      <div className={`p-6 rounded-lg shadow-lg transition-colors duration-200 ${
        theme === 'dark'
          ? 'bg-gray-800 text-gray-100'
          : 'bg-white text-gray-900'
      }`}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image Upload */}
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <div className={`w-48 h-48 rounded-full flex items-center justify-center mb-4 overflow-hidden ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                {formData.profileImage ? (
                  <img src={URL.createObjectURL(formData.profileImage)} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                  <FiUser size={60} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                )}
              </div>
              <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
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
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>First Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`pl-10 w-full rounded-md border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-gray-100'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="John"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>Last Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`pl-10 w-full rounded-md border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-gray-100'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`pl-10 w-full rounded-md border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-gray-100'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="john.doe@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`pl-10 w-full rounded-md border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-gray-100'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMapPin className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                  </div>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`pl-10 w-full rounded-md border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="123 Main St"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full rounded-md border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="New York"
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full rounded-md border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="NY"
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={`w-full rounded-md border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="10001"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>License Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                  </div>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    className={`pl-10 w-full rounded-md border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="DL123456789"
                    required
                  />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>License Expiry</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                  </div>
                  <input
                    type="date"
                    name="licenseExpiry"
                    value={formData.licenseExpiry}
                    onChange={handleChange}
                    className={`pl-10 w-full rounded-md border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>Vehicle Preference</label>
                <select
                  name="vehiclePreference"
                  value={formData.vehiclePreference}
                  onChange={handleChange}
                  className={`w-full rounded-md border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-gray-100'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  required
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Truck">Truck</option>
                  <option value="Van">Van</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>Experience (Years)</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={`w-full rounded-md border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-gray-100'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="5"
                  min="0"
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={`w-full rounded-md border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-gray-100'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className={`flex items-center px-6 py-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              <FiSave className="mr-2" />
              Save Driver
            </button>
          </div>
        </form>
      </div>
    </PageTemplate>
  );
};

export default AddDriversPage;
