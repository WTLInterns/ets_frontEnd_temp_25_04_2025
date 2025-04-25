'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { FiTruck, FiCalendar, FiDollarSign, FiUpload, FiSave } from 'react-icons/fi';

const PageLayout = dynamic(() => import('@/components/layout/PageLayout'), {
  loading: () => <div className="h-screen bg-gray-100 dark:bg-primary animate-pulse"></div>,
  ssr: false
});

const AddVehiclesPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    model: '',
    year: '',
    color: '',
    licensePlate: '',
    vin: '',
    mileage: '',
    fuelType: '',
    transmissionType: '',
    rentalRate: '',
    vehicleImage: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add API call to save vehicle data
  };

  return (
    <PageLayout title="Add New Vehicle">
      <div className="bg-white dark:bg-primary rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Vehicle Image Upload */}
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <div className="w-full h-48 rounded-lg bg-gray-200 dark:bg-primary-light flex items-center justify-center mb-4 overflow-hidden">
                {formData.vehicleImage ? (
                  <img src={URL.createObjectURL(formData.vehicleImage)} alt="Vehicle Preview" className="w-full h-full object-contain" />
                ) : (
                  <FiTruck size={60} className="text-gray-400 dark:text-gray-600" />
                )}
              </div>
              <label className="cursor-pointer bg-sidebar hover:bg-sidebar-light text-white py-2 px-4 rounded-lg transition-colors">
                <FiUpload className="inline mr-2" />
                Upload Vehicle Image
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFormData(prev => ({ ...prev, vehicleImage: e.target.files[0] }));
                    }
                  }}
                />
              </label>
            </div>

            {/* Vehicle Information */}
            <div className="w-full md:w-2/3 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vehicle Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiTruck className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                      placeholder="BMW i8"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vehicle Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Sports Car">Sports Car</option>
                    <option value="Truck">Truck</option>
                    <option value="Van">Van</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Model</label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                    placeholder="i8"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                      placeholder="2023"
                      min="1900"
                      max="2100"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                    placeholder="Red"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">License Plate</label>
                  <input
                    type="text"
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                    placeholder="ABC-1234"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">VIN</label>
                  <input
                    type="text"
                    name="vin"
                    value={formData.vin}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                    placeholder="1HGCM82633A123456"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mileage (km)</label>
                  <input
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                    placeholder="10000"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fuel Type</label>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                    required
                  >
                    <option value="">Select Fuel Type</option>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Transmission</label>
                  <select
                    name="transmissionType"
                    value={formData.transmissionType}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                    required
                  >
                    <option value="">Select Transmission</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                    <option value="CVT">CVT</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rental Rate ($/hour)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="rentalRate"
                    value={formData.rentalRate}
                    onChange={handleChange}
                    className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-light text-gray-900 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sidebar"
                    placeholder="25"
                    min="0"
                    step="0.01"
                    required
                  />
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
              Save Vehicle
            </button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default AddVehiclesPage;
