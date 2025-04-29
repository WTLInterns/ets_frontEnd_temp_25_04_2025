'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { FiLink, FiCheck, FiX } from 'react-icons/fi';

// Lazy-loaded PageTemplate component
const PageTemplate = dynamic(() => import('@/components/shared/PageTemplate'), {
  loading: () => <div className="h-screen w-full bg-gray-100 animate-pulse"></div>,
  ssr: false
});

const PairingVehiclePage = () => {
  // State for form inputs
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  
  // State for pairings list
  const [pairings, setPairings] = useState([
    {
      id: 1,
      vehicle: 'Toyota Truck',
      licensePlate: 'TX-1234',
      driver: 'John Doe',
      status: 'active'
    },
    {
      id: 2,
      vehicle: 'Ford Van',
      licensePlate: 'FD-5678',
      driver: 'Jane Smith',
      status: 'pending'
    }
  ]);

  // Mock data for dropdowns
  const vehicles = [
    { id: '1', name: 'Toyota Truck (TX-1234)' },
    { id: '2', name: 'Ford Van (FD-5678)' },
    { id: '3', name: 'Nissan Pickup (NS-9012)' }
  ];

  const drivers = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Mark Johnson' }
  ];

  // Handle form submission
  const handleCreatePairing = (e) => {
    e.preventDefault();
    
    if (!selectedVehicle || !selectedDriver) {
      alert('Please select both a vehicle and a driver');
      return;
    }

    // Find the selected vehicle and driver
    const vehicle = vehicles.find(v => v.id === selectedVehicle);
    const driver = drivers.find(d => d.id === selectedDriver);

    // Extract license plate from vehicle name (assuming format "Model (Plate)")
    const licensePlateMatch = vehicle.name.match(/\(([^)]+)\)/);
    const licensePlate = licensePlateMatch ? licensePlateMatch[1] : '';

    // Create new pairing
    const newPairing = {
      id: Date.now(), // Use timestamp as temporary ID
      vehicle: vehicle.name.split(' (')[0], // Get just the vehicle name
      licensePlate,
      driver: driver.name,
      status: 'pending' // New pairings are pending by default
    };

    // Add to pairings list
    setPairings([...pairings, newPairing]);

    // Reset form
    setSelectedVehicle('');
    setSelectedDriver('');
  };

  // Handle removing a pairing
  const handleRemovePairing = (id) => {
    setPairings(pairings.filter(pairing => pairing.id !== id));
  };

  return (
    <PageTemplate title="Pairing Vehicle">
      <div className="space-y-6">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-lg font-medium text-blue-300 mb-2">Pair Vehicles with Drivers</h3>
          <p className="text-blue-200 mb-4">
            Create associations between vehicles and drivers for scheduling and management.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Select Vehicle</label>
              <select 
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
              >
                <option value="">Select a vehicle</option>
                {vehicles.map(vehicle => (
                  <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Select Driver</label>
              <select 
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
              >
                <option value="">Select a driver</option>
                {drivers.map(driver => (
                  <option key={driver.id} value={driver.id}>{driver.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={handleCreatePairing}
            >
              Create Pairing
            </button>
          </div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-gray-700 border-b border-gray-600">
            <h3 className="font-medium text-gray-300">Current Vehicle-Driver Pairings</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    License Plate
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Driver
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {pairings.map((pairing) => (
                  <tr key={pairing.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-100">{pairing.vehicle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{pairing.licensePlate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-100">{pairing.driver}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        pairing.status === 'active' ? 'bg-green-900 text-green-200' : 'bg-yellow-900 text-yellow-200'
                      }`}>
                        {pairing.status === 'active' ? (
                          <FiCheck className="mr-1" />
                        ) : (
                          <FiLink className="mr-1" />
                        )}
                        {pairing.status.charAt(0).toUpperCase() + pairing.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <button 
                        className="text-red-400 hover:text-red-300"
                        onClick={() => handleRemovePairing(pairing.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default PairingVehiclePage;