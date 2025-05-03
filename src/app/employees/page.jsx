"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { FiSearch, FiPlus, FiEdit, FiTrash2, FiX, FiCheck } from "react-icons/fi"

const PageLayout = dynamic(() => import("@/components/layout/PageLayout"), {
  loading: () => <div className="h-screen bg-gray-100 dark:bg-primary animate-pulse"></div>,
  ssr: false,
})

// Sample employee data
const EMPLOYEES_DATA = [
  {
    id: 1,
    name: "Alex Johnson",
    phone: "+1 (555) 123-4567",
    gender: "Male",
    email: "alex.johnson@example.com",
    pickupLocation: "123 Main St",
    dropLocation: "456 Market St",
    shiftTime: "09:00",
  },
  // ... you can keep or remove other sample data
]

// Add Employee Form Component
const AddEmployeeForm = ({ isOpen, onClose, onSave }) => {
  const initialFormState = {
    firstName: "",
    lastName: "",
    gender: "Male",
    email: "",
    mobileNo: "",
    password: "",
    pickupLocation: "",
    dropLocation: "",
    shiftTime: "",
  }

  const [formData, setFormData] = useState(initialFormState)
  const pickupInputRef = useRef(null)
  const dropInputRef = useRef(null)
  const pickupAutocompleteRef = useRef(null)
  const dropAutocompleteRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      // Load Google Places API script
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCelDo4I5cPQ72TfCTQW-arhPZ7ALNcp8w&libraries=places`
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      script.onload = () => {
        // Initialize autocomplete for pickup location
        if (pickupInputRef.current) {
          pickupAutocompleteRef.current = new window.google.maps.places.Autocomplete(
            pickupInputRef.current,
            {
              types: ['geocode', 'establishment'],
              componentRestrictions: { country: 'in' }
            }
          )
          pickupAutocompleteRef.current.addListener('place_changed', () => {
            const place = pickupAutocompleteRef.current.getPlace()
            setFormData(prev => ({
              ...prev,
              pickupLocation: place.formatted_address
            }))
          })
        }

        // Initialize autocomplete for drop location
        if (dropInputRef.current) {
          dropAutocompleteRef.current = new window.google.maps.places.Autocomplete(
            dropInputRef.current,
            {
              types: ['geocode', 'establishment'],
              componentRestrictions: { country: 'in' }
            }
          )
          dropAutocompleteRef.current.addListener('place_changed', () => {
            const place = dropAutocompleteRef.current.getPlace()
            setFormData(prev => ({
              ...prev,
              dropLocation: place.formatted_address
            }))
          })
        }
      }

      return () => {
        document.head.removeChild(script)
      }
    }
  }, [isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:8081/users/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to create user")
      }

      const newUser = await response.json()
      onSave(newUser, false)
      onClose()
    } catch (error) {
      console.error("Error creating user:", error)
      // You might want to show an error toast here
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b bg-black/50 to-transparent backdrop-blur-md bg-opacity-40">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg w-full max-w-5xl">
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold text-gray-900">Add New Employee</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white text-gray-900 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter First Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white text-gray-900 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Last Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white text-gray-900 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white text-gray-900 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white text-gray-900 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Mobile Number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white text-gray-900 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                <input
                  ref={pickupInputRef}
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white text-gray-900 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Pickup Location"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Drop Location</label>
                <input
                  ref={dropInputRef}
                  type="text"
                  name="dropLocation"
                  value={formData.dropLocation}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white text-gray-900 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Drop Location"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shift Time</label>
                <input
                  type="time"
                  name="shiftTime"
                  value={formData.shiftTime}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white text-gray-900 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-200 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="mr-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Edit Employee Form Component
const EditEmployeeForm = ({ isOpen, onClose, onSave, employee }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "Male",
    email: "",
    mobileNo: "",
    password: "",
    pickupLocation: "",
    dropLocation: "",
    shiftTime: "",
  })

  const pickupInputRef = useRef(null)
  const dropInputRef = useRef(null)
  const pickupAutocompleteRef = useRef(null)
  const dropAutocompleteRef = useRef(null)

  useEffect(() => {
    if (isOpen && employee?.id) {
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8081/users/getUserId/${employee.id}`)
          if (!response.ok) {
            throw new Error("Failed to fetch user details")
          }
          const userData = await response.json()
          setFormData({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            gender: userData.gender || "Male",
            email: userData.email || "",
            mobileNo: userData.mobileNo || "",
            password: userData.password || "",
            pickupLocation: userData.pickupLocation || "",
            dropLocation: userData.dropLocation || "",
            shiftTime: userData.shiftTime || "",
          })
        } catch (error) {
          console.error("Error fetching user details:", error)
        }
      }

      fetchUserDetails()
    }
  }, [isOpen, employee?.id])

  useEffect(() => {
    if (isOpen) {
      // Load Google Places API script
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCelDo4I5cPQ72TfCTQW-arhPZ7ALNcp8w&libraries=places`
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      script.onload = () => {
        // Initialize autocomplete for pickup location
        if (pickupInputRef.current) {
          pickupAutocompleteRef.current = new window.google.maps.places.Autocomplete(
            pickupInputRef.current,
            {
              types: ['geocode', 'establishment'],
              componentRestrictions: { country: 'in' }
            }
          )
          pickupAutocompleteRef.current.addListener('place_changed', () => {
            const place = pickupAutocompleteRef.current.getPlace()
            setFormData(prev => ({
              ...prev,
              pickupLocation: place.formatted_address
            }))
          })
        }

        // Initialize autocomplete for drop location
        if (dropInputRef.current) {
          dropAutocompleteRef.current = new window.google.maps.places.Autocomplete(
            dropInputRef.current,
            {
              types: ['geocode', 'establishment'],
              componentRestrictions: { country: 'in' }
            }
          )
          dropAutocompleteRef.current.addListener('place_changed', () => {
            const place = dropAutocompleteRef.current.getPlace()
            setFormData(prev => ({
              ...prev,
              dropLocation: place.formatted_address
            }))
          })
        }
      }

      return () => {
        document.head.removeChild(script)
      }
    }
  }, [isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:8081/users/updateUser/${employee.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          gender: formData.gender,
          email: formData.email,
          mobileNo: formData.mobileNo,
          password: formData.password,
          pickupLocation: formData.pickupLocation,
          dropLocation: formData.dropLocation,
          shiftTime: formData.shiftTime
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update user")
      }

      const updatedUser = await response.json()
      onSave(updatedUser, true)
      onClose()
    } catch (error) {
      console.error("Error updating user:", error)
      // You might want to show an error toast here
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg w-full max-w-5xl">
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold text-gray-900">Edit Employee: {employee?.firstName} {employee?.lastName}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white text-gray-900 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter First Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white text-gray-900 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Last Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white text-gray-900 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white text-gray-900 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white text-gray-900 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Mobile Number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white text-gray-900 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                <input
                  ref={pickupInputRef}
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white text-gray-900 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Pickup Location"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Drop Location</label>
                <input
                  ref={dropInputRef}
                  type="text"
                  name="dropLocation"
                  value={formData.dropLocation}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white text-gray-900 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Drop Location"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shift Time</label>
                <input
                  type="time"
                  name="shiftTime"
                  value={formData.shiftTime}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white text-gray-900 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-200 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="mr-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Update Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center bg-gray-900 border border-gray-700 rounded-lg shadow-lg px-4 py-3">
      {type === "success" && <FiCheck className="text-green-400 mr-2" size={20} />}
      {type === "error" && <FiX className="text-red-400 mr-2" size={20} />}
      <p className="text-white">{message}</p>
    </div>
  )
}

const EmployeesPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [toast, setToast] = useState(null)

  // Show toast notification
  const showToast = (message, type = "success") => {
    setToast({ message, type })
  }

  // Hide toast notification
  const hideToast = () => {
    setToast(null)
  }

  // Filter employees based on search term
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      (employee.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (employee.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());
  
    return matchesSearch;
  });
  

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await fetch(`http://localhost:8081/users/deleteById/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Failed to delete employee")
        }

        // Update the local state to remove the deleted employee
        setEmployees(employees.filter((employee) => employee.id !== id))
        showToast("Employee deleted successfully")
      } catch (error) {
        console.error("Error deleting employee:", error)
        showToast("Failed to delete employee", "error")
      }
    }
  }

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true)
  }

  const handleOpenEditModal = (employee) => {
    setEditingEmployee(employee)
    setIsEditModalOpen(true)
  }

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false)
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setEditingEmployee(null)
  }

  const handleSaveEmployee = async (employeeData, isEdit) => {
    try {
      if (isEdit) {
        // Update existing employee
        // You would typically make an API call here to update the employee
        // For now, we'll just update the local state
        setEmployees(employees.map((emp) => (emp.id === employeeData.id ? employeeData : emp)))
        showToast("Employee updated successfully")
      } else {
        // Add new employee
        // You would typically make an API call here to create the employee
        // For now, we'll just update the local state
        setEmployees([...employees, employeeData])
        showToast("Employee added successfully")
      }
      handleCloseAddModal()
      handleCloseEditModal()
    } catch (error) {
      console.error("Error saving employee:", error)
      showToast("Failed to save employee", "error")
    }
  }

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:8081/users/getAllUser")
        if (!response.ok) {
          throw new Error("Failed to fetch employees")
        }
        const data = await response.json()
        
        setEmployees(data)
      } catch (error) {
        console.error("Error fetching employees:", error)
        showToast("Failed to load employees", "error")
      } finally {
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [])

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
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  First Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Last Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Gender
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Pickup Location
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Drop Location
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Shift Time
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                    Loading employees...
                  </td>
                </tr>
              ) : filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.firstName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.lastName}</td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.mobileNo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.gender}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">  {employee.pickupLocation ? employee.pickupLocation : "-------"} 
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.dropLocation ? employee.dropLocation:"-------"}</td>
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
            {loading ? (
              <div className="text-center text-gray-500 py-4">Loading employees...</div>
            ) : filteredEmployees.length > 0 ? (
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
              <div className="text-center text-gray-500 py-4">No employees found matching your search criteria.</div>
            )}
          </div>
        </div>

        {/* Add Employee Modal */}
        <AddEmployeeForm
          isOpen={isAddModalOpen}
          onClose={handleCloseAddModal}
          onSave={handleSaveEmployee}
        />

        {/* Edit Employee Modal */}
        <EditEmployeeForm
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSave={handleSaveEmployee}
          employee={editingEmployee}
        />

        {/* Toast Notification */}
        {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      </div>
    </PageLayout>
  )
}

export default EmployeesPage