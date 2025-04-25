'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { FiSearch, FiFilter, FiPlus, FiEdit, FiTrash2, FiTruck, FiCalendar, FiDollarSign } from 'react-icons/fi';

const PageLayout = dynamic(() => import('@/components/layout/PageLayout'), {
  loading: () => <div className="h-screen bg-gray-100 dark:bg-primary animate-pulse"></div>,
  ssr: false
});

// Sample vehicle data
const VEHICLES_DATA = [
  {
    id: 1,
    name: 'BMW i8',
    type: 'Sports Car',
    model: 'i8',
    year: '2023',
    color: 'Red',
    licensePlate: 'ABC-1234',
    vin: '1HGCM82633A123456',
    mileage: '5,200',
    fuelType: 'Hybrid',
    transmissionType: 'Automatic',
    rentalRate: '32',
    status: 'Available',
    image: 'https://purepng.com/public/uploads/large/purepng.com-red-bmw-i8-carcarsbmwvehiclestransport-961524660760qe0fs.png'
  },
  {
    id: 2,
    name: 'Porsche 911 Carrera',
    type: 'Sports Car',
    model: '911 Carrera',
    year: '2022',
    color: 'White',
    licensePlate: 'XYZ-7890',
    vin: '2FMDK48C13BA54321',
    mileage: '8,700',
    fuelType: 'Gasoline',
    transmissionType: 'Automatic',
    rentalRate: '28',
    status: 'In Use',
    image: 'https://purepng.com/public/uploads/large/purepng.com-porsche-911-carrera-s-cabriolet-carcarvehicletransportporsche-961524666742iqgzj.png'
  },
  {
    id: 3,
    name: 'Audi R8',
    type: 'Sports Car',
    model: 'R8',
    year: '2021',
    color: 'Silver',
    licensePlate: 'DEF-4567',
    vin: '3VWFE21C04M123789',
    mileage: '12,500',
    fuelType: 'Gasoline',
    transmissionType: 'Automatic',
    rentalRate: '30',
    status: 'Maintenance',
    image: 'https://purepng.com/public/uploads/large/purepng.com-audi-r8-v10-plus-carcarvehicletransportaudi-961524660723xkwpe.png'
  },
  {
    id: 4,
    name: 'Tesla Model S',
    type: 'Electric',
    model: 'Model S',
    year: '2023',
    color: 'Blue',
    licensePlate: 'GHI-8901',
    vin: '5YJSA1E40FF123456',
    mileage: '3,200',
    fuelType: 'Electric',
    transmissionType: 'Automatic',
    rentalRate: '35',
    status: 'Available',
    image: 'https://purepng.com/public/uploads/large/purepng.com-tesla-model-s-red-carcarvehicletransporttesla-961524666471xqjog.png'
  },
  {
    id: 5,
    name: 'Range Rover Sport',
    type: 'SUV',
    model: 'Sport',
    year: '2022',
    color: 'Black',
    licensePlate: 'JKL-2345',
    vin: 'SALWR2EF0EA123456',
    mileage: '9,800',
    fuelType: 'Diesel',
    transmissionType: 'Automatic',
    rentalRate: '40',
    status: 'Available',
    image: 'https://purepng.com/public/uploads/large/purepng.com-range-rover-sport-carcarvehicletransportland-rover-961524664684xmwhl.png'
  }
];

const VehiclesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [vehicles, setVehicles] = useState(VEHICLES_DATA);

  // Filter vehicles based on search term and status filter
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || vehicle.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
    }
  };

  return (
    <PageLayout title="Vehicles">
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
              placeholder="Search vehicles..."
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
                <option value="Available">Available</option>
                <option value="In Use">In Use</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
            
            <a 
              href="/add-vehicles" 
              className="bg-sidebar hover:bg-sidebar-light text-white py-2 px-4 rounded-md flex items-center transition-colors"
            >
              <FiPlus className="mr-2" />
              Add Vehicle
            </a>
          </div>
        </div>
        
        {/* Vehicles Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-primary-light">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Vehicle
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Registration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Rental Rate
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
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0 bg-gray-100 dark:bg-primary-light rounded-md overflow-hidden">
                          <img 
                            className="h-12 w-12 object-contain" 
                            src={vehicle.image} 
                            alt={vehicle.name}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/100x60?text=Vehicle';
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {vehicle.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {vehicle.type}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        <div className="flex items-center mb-1">
                          <FiTruck className="mr-1" size={12} />
                          {vehicle.model} ({vehicle.color})
                        </div>
                        <div className="flex items-center">
                          <FiCalendar className="mr-1" size={12} />
                          {vehicle.year} • {vehicle.mileage} miles
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{vehicle.licensePlate}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">VIN: {vehicle.vin}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900 dark:text-white">
                        <FiDollarSign size={14} className="mr-1" />
                        {vehicle.rentalRate}/hr
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${vehicle.status === 'Available' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                          vehicle.status === 'Maintenance' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-sidebar hover:text-sidebar-light transition-colors">
                          <FiEdit size={18} />
                        </button>
                        <button 
                          className="text-red-500 hover:text-red-700 transition-colors"
                          onClick={() => handleDelete(vehicle.id)}
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
                    No vehicles found matching your search criteria.
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

export default VehiclesPage;
