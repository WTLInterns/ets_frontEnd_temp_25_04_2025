'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FiSearch, FiFilter, FiPlus, FiEdit, FiTrash2, FiUser, FiMail, FiPhone, FiMapPin, FiClock, FiX, FiCheck } from 'react-icons/fi';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const PageLayout = dynamic(() => import('@/components/layout/PageLayout'), {
  loading: () => <div className="h-screen bg-gray-100 dark:bg-primary animate-pulse"></div>,
  ssr: false
});

// Sample employee data
const EMPLOYEES_DATA = [
  {
    id: 1,
    name: 'Alex Johnson',
    phone: '+1 (555) 123-4567',
    gender: 'Male',
    email: 'alex.johnson@example.com',
    pickupLocation: '123 Main St',
    dropLocation: '456 Market St',
    shiftTime: '09:00',
  },
  // ... you can keep or remove other sample data
];

// Employee Form Modal Component
const EmployeeFormModal = ({ isOpen, onClose, onSave, employee = null, title }) => {
  const isEditMode = !!employee;
  
  const initialFormState = {
    name: '',
    phone: '',
    gender: 'Male',
    email: '',
    pickupLocation: '',
    dropLocation: '',
    shiftTime: '',
  };
      
  const [formData, setFormData] = useState(initialFormState);

  // Reset form data when modal opens/closes or employee changes
  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormState);
      return;
    }

    if (isEditMode && employee) {
      setFormData({
        name: employee.name || '',
        phone: employee.phone || '',
        gender: employee.gender || 'Male',
        email: employee.email || '',
        pickupLocation: employee.pickupLocation || '',
        dropLocation: employee.dropLocation || '',
        shiftTime: employee.shiftTime || '',
      });
    } else {
      setFormData(initialFormState);
    }
  }, [isOpen, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare employee data
    const updatedEmployee = {
      id: isEditMode ? employee.id : Date.now(),
      ...formData
    };
    
    onSave(updatedEmployee, isEditMode);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg w-full max-w-5xl">
        <div className="flex justify-between items-center border-b border-gray-800 p-4">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <FiX size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your Phone Number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your Email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Pickup Location</label>
                <input
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your Pickup Location"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Drop Location</label>
                <input
                  type="text"
                  name="dropLocation"
                  value={formData.dropLocation}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your Drop Location"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Shift Time</label>
                <input
                  type="time"
                  name="shiftTime"
                  value={formData.shiftTime}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-800 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="mr-4 px-4 py-2 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                {isEditMode ? 'Update' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center bg-gray-900 border border-gray-700 rounded-lg shadow-lg px-4 py-3">
      {type === 'success' && (
        <FiCheck className="text-green-400 mr-2" size={20} />
      )}
      <p className="text-white">{message}</p>
    </div>
  );
};

const EmployeesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState(EMPLOYEES_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [modalTitle, setModalTitle] = useState('Add New Employee');
  const [toast, setToast] = useState(null);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Hide toast notification
  const hideToast = () => {
    setToast(null);
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(employee => employee.id !== id));
      showToast('Employee deleted successfully');
    }
  };

  const handleOpenAddModal = () => {
    setEditingEmployee(null);
    setModalTitle('Add New Employee');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (employee) => {
    setEditingEmployee(employee);
    setModalTitle(`Edit Employee: ${employee.name}`);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const handleSaveEmployee = (employeeData, isEdit) => {
    if (isEdit) {
      // Update existing employee
      setEmployees(employees.map(emp => 
        emp.id === employeeData.id ? employeeData : emp
      ));
      showToast('Employee updated successfully');
    } else {
      // Add new employee
      setEmployees([...employees, employeeData]);
      showToast('Employee added successfully');
    }
    handleCloseModal();
  };

  return (
    <PageLayout title="Employees">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        {/* Header with search and add button */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-500" />
            </div>
            <input
              type="text"
              className="pl-10 w-full rounded-md border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-500 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button 
            onClick={handleOpenAddModal}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center transition-colors"
          >
            <FiPlus className="mr-2" />
            Add Employee
          </button>
        </div>
        
        {/* Employees Table */}
        <div className="overflow-x-auto">
          {/* Table view for medium screens and up */}
          <table className="hidden md:table min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup Location</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drop Location</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift Time</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.gender}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.pickupLocation}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.dropLocation}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.shiftTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button 
                          className="text-blue-500 hover:text-blue-600 transition-colors"
                          onClick={() => handleOpenEditModal(employee)}
                        >
                          <FiEdit size={18} />
                        </button>
                        <button 
                          className="text-red-500 hover:text-red-600 transition-colors"
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
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                    No employees found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Card view for mobile */}
          <div className="md:hidden space-y-4">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <div key={employee.id} className="bg-white rounded-lg p-4 shadow border border-gray-200">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium text-gray-700">{employee.name}</h3>
                      <div className="flex space-x-2">
                        <button 
                          className="text-blue-500 hover:text-blue-600 transition-colors"
                          onClick={() => handleOpenEditModal(employee)}
                        >
                          <FiEdit size={18} />
                        </button>
                        <button 
                          className="text-red-500 hover:text-red-600 transition-colors"
                          onClick={() => handleDelete(employee.id)}
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">Phone</p>
                        <p className="text-gray-700">{employee.phone}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Gender</p>
                        <p className="text-gray-700">{employee.gender}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Email</p>
                        <p className="text-gray-700 truncate">{employee.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Shift Time</p>
                        <p className="text-gray-700">{employee.shiftTime}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-500">Pickup Location</p>
                        <p className="text-gray-700">{employee.pickupLocation}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-500">Drop Location</p>
                        <p className="text-gray-700">{employee.dropLocation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">
                No employees found matching your search criteria.
              </div>
            )}
          </div>
        </div>

        {/* Employee Form Modal */}
        <EmployeeFormModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          onSave={handleSaveEmployee}
          employee={editingEmployee}
          title={modalTitle}
        />

        {/* Toast Notification */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={hideToast}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default EmployeesPage;