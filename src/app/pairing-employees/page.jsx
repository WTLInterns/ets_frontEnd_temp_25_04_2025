'use client';



import { useState } from 'react';
import dynamic from 'next/dynamic';

// Lazy-loaded PageTemplate component
const PageTemplate = dynamic(() => import('@/components/shared/PageTemplate'), {
  loading: () => <div className="h-screen w-full bg-gray-100 animate-pulse"></div>,
  ssr: false
});
const PairingPage = () => {
  // State for form inputs
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  
  // State for existing pairings
  const [pairings, setPairings] = useState([
    {
      id: 1,
      employee: 'John Doe',
      position: 'Driver',
      vehicle: 'Toyota Truck (TX-1234)',
      dateAssigned: '2025-04-20'
    },
    {
      id: 2,
      employee: 'Jane Smith',
      position: 'Driver',
      vehicle: 'Ford Van (FD-5678)',
      dateAssigned: '2025-04-18'
    }
  ]);

  // Mock data for dropdowns
  const employees = [
    { id: '1', name: 'John Doe', position: 'Driver' },
    { id: '2', name: 'Jane Smith', position: 'Driver' },
    { id: '3', name: 'Mark Johnson', position: 'Manager' }
  ];

  const vehicles = [
    { id: '1', name: 'Toyota Truck (TX-1234)' },
    { id: '2', name: 'Ford Van (FD-5678)' },
    { id: '3', name: 'Nissan Pickup (NS-9012)' }
  ];

  // Handle form submission
  const handleCreatePairing = (e) => {
    e.preventDefault();
    
    if (!selectedEmployee || !selectedVehicle) {
      alert('Please select both an employee and a vehicle');
      return;
    }

    // Find selected employee and vehicle details
    const employee = employees.find(emp => emp.id === selectedEmployee);
    const vehicle = vehicles.find(veh => veh.id === selectedVehicle);

    // Create new pairing
    const newPairing = {
      id: Date.now(), // Use timestamp as temporary ID
      employee: employee.name,
      position: employee.position,
      vehicle: vehicle.name,
      dateAssigned: new Date().toISOString().split('T')[0] // Current date in YYYY-MM-DD format
    };

    // Add to pairings list
    setPairings([...pairings, newPairing]);
    
    // Reset form
    setSelectedEmployee('');
    setSelectedVehicle('');
  };

  // Handle removing a pairing
  const handleRemovePairing = (id) => {
    setPairings(pairings.filter(pairing => pairing.id !== id));
  };

  return (
    <PageTemplate title="Pairing Employees">
      <div className="space-y-6">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-lg font-medium text-blue-300 mb-2">Pair Employees with Vehicles</h3>
          <p className="text-blue-400 mb-4">
            Create associations between employees and vehicles for scheduling and management.
          </p>
          
          <form onSubmit={handleCreatePairing}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Select Employee</label>
                <select 
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  required
                >
                  <option value="">Select an employee</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.position})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Select Vehicle</label>
                <select 
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                  value={selectedVehicle}
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                  required
                >
                  <option value="">Select a vehicle</option>
                  {vehicles.map(veh => (
                    <option key={veh.id} value={veh.id}>{veh.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Pairing
              </button>
            </div>
          </form>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-gray-700 border-b border-gray-600">
            <h3 className="font-medium text-gray-300">Current Employee-Vehicle Pairings</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-600">
              <thead className="bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Employee
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Position
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date Assigned
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
                      <div className="text-sm font-medium text-gray-100">{pairing.employee}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400">{pairing.position}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-100">{pairing.vehicle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400">{pairing.dateAssigned}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      <button 
                        onClick={() => handleRemovePairing(pairing.id)}
                        className="text-red-400 hover:text-red-300"
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

export default PairingPage;
