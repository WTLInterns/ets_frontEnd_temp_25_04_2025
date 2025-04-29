"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import {
  FiSearch,
  FiFilter,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiTruck,
  FiCalendar,
  FiDollarSign,
  FiX,
  FiAlertCircle,
  FiFile,
} from "react-icons/fi"

const PageLayout = dynamic(() => import("@/components/layout/PageLayout"), {
  loading: () => <div className="h-screen bg-gray-100 dark:bg-primary animate-pulse"></div>,
  ssr: false,
})

// Sample vehicle data
const VEHICLES_DATA = [
  {
    id: 1,
    name: "BMW i8",
    type: "Sports Car",
    model: "i8",
    year: "2023",
    color: "Red",
    licensePlate: "ABC-1234",
    vin: "1HGCM82633A123456",
    mileage: "5,200",
    fuelType: "Hybrid",
    transmissionType: "Automatic",
    rentalRate: "32",
    status: "Available",
    image:
      "https://purepng.com/public/uploads/large/purepng.com-red-bmw-i8-carcarsbmwvehiclestransport-961524660760qe0fs.png",
  },
  {
    id: 2,
    name: "Porsche 911 Carrera",
    type: "Sports Car",
    model: "911 Carrera",
    year: "2022",
    color: "White",
    licensePlate: "XYZ-7890",
    vin: "2FMDK48C13BA54321",
    mileage: "8,700",
    fuelType: "Gasoline",
    transmissionType: "Automatic",
    rentalRate: "28",
    status: "In Use",
    image:
      "https://purepng.com/public/uploads/large/purepng.com-porsche-911-carrera-s-cabriolet-carcarvehicletransportporsche-961524666742iqgzj.png",
  },
  {
    id: 3,
    name: "Audi R8",
    type: "Sports Car",
    model: "R8",
    year: "2021",
    color: "Silver",
    licensePlate: "DEF-4567",
    vin: "3VWFE21C04M123789",
    mileage: "12,500",
    fuelType: "Gasoline",
    transmissionType: "Automatic",
    rentalRate: "30",
    status: "Maintenance",
    image:
      "https://purepng.com/public/uploads/large/purepng.com-audi-r8-v10-plus-carcarvehicletransportaudi-961524660723xkwpe.png",
  },
  {
    id: 4,
    name: "Tesla Model S",
    type: "Electric",
    model: "Model S",
    year: "2023",
    color: "Blue",
    licensePlate: "GHI-8901",
    vin: "5YJSA1E40FF123456",
    mileage: "3,200",
    fuelType: "Electric",
    transmissionType: "Automatic",
    rentalRate: "35",
    status: "Available",
    image:
      "https://purepng.com/public/uploads/large/purepng.com-tesla-model-s-red-carcarvehicletransporttesla-961524666471xqjog.png",
  },
  {
    id: 5,
    name: "Range Rover Sport",
    type: "SUV",
    model: "Sport",
    year: "2022",
    color: "Black",
    licensePlate: "JKL-2345",
    vin: "SALWR2EF0EA123456",
    mileage: "9,800",
    fuelType: "Diesel",
    transmissionType: "Automatic",
    rentalRate: "40",
    status: "Available",
    image:
      "https://purepng.com/public/uploads/large/purepng.com-range-rover-sport-carcarvehicletransportland-rover-961524664684xmwhl.png",
  },
]

const VehiclesPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [vehicles, setVehicles] = useState(VEHICLES_DATA)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [newVehicle, setNewVehicle] = useState({
    name: "",
    type: "Sports Car",
    model: "",
    year: new Date().getFullYear().toString(),
    color: "",
    licensePlate: "",
    vin: "",
    mileage: "0",
    fuelType: "Gasoline",
    transmissionType: "Automatic",
    rentalRate: "25",
    status: "Available",
    image: null,
    imagePreview: null,
    // Additional fields from the form
    vehicleNo: "",
    vehicleCategory: "",
    brand: "",
    modelType: "",
    vehicleOwnership: "",
    registrationMonth: "",
    registrationDay: "",
    registrationYear: "",
    insuranceMonth: "",
    insuranceDay: "",
    insuranceYear: "",
    insuranceCopy: null,
    registrationFront: null,
    registrationBack: null,
    carNumberPhoto: null,
  })

  // Filter vehicles based on search term and status filter
  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.licensePlate?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "All" || vehicle.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id))
    }
  }

  const handleEdit = (vehicle) => {
    setEditingVehicle({ ...vehicle })
    setIsEditModalOpen(true)
  }

  const handleEditInputChange = (e) => {
    const { name, value } = e.target
    setEditingVehicle((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleEditFileChange = (e) => {
    const { name, files } = e.target
    if (files && files[0]) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditingVehicle((prev) => ({
          ...prev,
          [name]: files[0],
          imagePreview: reader.result,
        }))
      }
      reader.readAsDataURL(files[0])
    }
  }

  const validateForm = (vehicle) => {
    const errors = {}

    // Required fields validation
    // if (!vehicle.name) errors.name = "Vehicle name is required"
    // if (!vehicle.model) errors.model = "Model is required"
    // if (!vehicle.licensePlate) errors.licensePlate = "License plate is required"
    if (!vehicle.vin) errors.vin = "VIN is required"

    // Format validations
    if (vehicle.year && !/^\d{4}$/.test(vehicle.year)) errors.year = "Year must be a 4-digit number"

    if (vehicle.rentalRate && !/^\d+(\.\d{1,2})?$/.test(vehicle.rentalRate))
      errors.rentalRate = "Rental rate must be a valid number"

    // Registration date validation
    if (
      (vehicle.registrationMonth && !/^(0?[1-9]|1[0-2])$/.test(vehicle.registrationMonth)) ||
      (vehicle.registrationDay && !/^(0?[1-9]|[12][0-9]|3[01])$/.test(vehicle.registrationDay)) ||
      (vehicle.registrationYear && !/^\d{4}$/.test(vehicle.registrationYear))
    ) {
      errors.registrationDate = "Please enter a valid date"
    }

    // Insurance date validation
    if (
      (vehicle.insuranceMonth && !/^(0?[1-9]|1[0-2])$/.test(vehicle.insuranceMonth)) ||
      (vehicle.insuranceDay && !/^(0?[1-9]|[12][0-9]|3[01])$/.test(vehicle.insuranceDay)) ||
      (vehicle.insuranceYear && !/^\d{4}$/.test(vehicle.insuranceYear))
    ) {
      errors.insuranceDate = "Please enter a valid date"
    }

    return errors
  }

  const handleSaveEdit = () => {
    // Validate form
    const errors = validateForm(editingVehicle)
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    // Clear errors
    setFormErrors({})

    // Create object URL for the image file if it exists
    const imageUrl =
      editingVehicle.image instanceof File ? URL.createObjectURL(editingVehicle.image) : editingVehicle.image

    setVehicles((prev) =>
      prev.map((vehicle) => (vehicle.id === editingVehicle.id ? { ...editingVehicle, image: imageUrl } : vehicle)),
    )
    setIsEditModalOpen(false)
  }

  const handleAddInputChange = (e) => {
    const { name, value } = e.target
    setNewVehicle((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null,
      }))
    }
  }

  // Handle file input change
  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (files && files[0]) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewVehicle((prev) => ({
          ...prev,
          [name]: files[0],
          ...(name === "image" && { imagePreview: reader.result }),
        }))
      }
      reader.readAsDataURL(files[0])

      // Clear error for this field
      if (formErrors[name]) {
        setFormErrors((prev) => ({
          ...prev,
          [name]: null,
        }))
      }
    }
  }

  const handleAddVehicle = () => {
    // Validate form
    const errors = validateForm(newVehicle)
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    // Clear errors
    setFormErrors({})

    // Generate a new ID (in a real app, this would come from the backend)
    const newId = Math.max(...vehicles.map((v) => v.id), 0) + 1

    // Create object URL for the image file if it exists
    const imageUrl = newVehicle.carNumberPhoto ? URL.createObjectURL(newVehicle.carNumberPhoto) : ""

    // Format the vehicle data to match the table structure
    const formattedVehicle = {
      id: newId,
      name: newVehicle.name || `${newVehicle.brand} ${newVehicle.modelType}`,
      type: newVehicle.type || newVehicle.vehicleCategory,
      model: newVehicle.model || newVehicle.modelType,
      year: newVehicle.year || newVehicle.registrationYear,
      color: newVehicle.color,
      licensePlate: newVehicle.licensePlate || newVehicle.vehicleNo,
      vin: newVehicle.vin,
      mileage: newVehicle.mileage || "0",
      fuelType: newVehicle.fuelType,
      transmissionType: newVehicle.transmissionType,
      rentalRate: newVehicle.rentalRate,
      status: newVehicle.status || "Available",
      image: imageUrl,
      // Store additional fields
      vehicleOwnership: newVehicle.vehicleOwnership,
      registrationDate:
        newVehicle.registrationMonth && newVehicle.registrationDay && newVehicle.registrationYear
          ? `${newVehicle.registrationMonth}/${newVehicle.registrationDay}/${newVehicle.registrationYear}`
          : "",
      insuranceDate:
        newVehicle.insuranceMonth && newVehicle.insuranceDay && newVehicle.insuranceYear
          ? `${newVehicle.insuranceMonth}/${newVehicle.insuranceDay}/${newVehicle.insuranceYear}`
          : "",
      insuranceCopy: newVehicle.insuranceCopy,
      registrationFront: newVehicle.registrationFront,
      registrationBack: newVehicle.registrationBack,
    }

    // Add the new vehicle to the list
    setVehicles((prev) => [...prev, formattedVehicle])

    // Close the modal and reset the form
    setIsAddModalOpen(false)
    setNewVehicle({
      name: "",
      type: "Sports Car",
      model: "",
      year: new Date().getFullYear().toString(),
      color: "",
      licensePlate: "",
      vin: "",
      mileage: "0",
      fuelType: "Gasoline",
      transmissionType: "Automatic",
      rentalRate: "25",
      status: "Available",
      image: null,
      imagePreview: null,
      vehicleNo: "",
      vehicleCategory: "",
      brand: "",
      modelType: "",
      vehicleOwnership: "",
      registrationMonth: "",
      registrationDay: "",
      registrationYear: "",
      insuranceMonth: "",
      insuranceDay: "",
      insuranceYear: "",
      insuranceCopy: null,
      registrationFront: null,
      registrationBack: null,
      carNumberPhoto: null,
    })
  }

  // Reset form errors when opening/closing modals
  useEffect(() => {
    setFormErrors({})
  }, [isAddModalOpen, isEditModalOpen])

  return (
    <PageLayout title="Vehicles" className="dark">
      <div className="bg-gray-900 rounded-lg shadow-md p-6">
        {/* Header with search and filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 w-full rounded-md border border-gray-700 bg-gray-800 text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search vehicles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <FiFilter className="text-gray-400" />
              <select
                className="rounded-md border border-gray-700 bg-gray-800 text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Available">Available</option>
                <option value="In Use">In Use</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center transition-colors"
            >
              <FiPlus className="mr-2" />
              Add Vehicle
            </button>
          </div>
        </div>

        {/* Vehicles Table */}
        <div className="overflow-x-auto">
  {/* Desktop Table (hidden on mobile) */}
  <table className="hidden md:table min-w-full divide-y divide-gray-700">
    <thead className="bg-gray-800">
      <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
          Vehicle
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
          Details
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
          Registration
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
          Ownership & Insurance
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
          Documents
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
          Status
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
    <tbody className="bg-gray-900 divide-y divide-gray-700">
      {filteredVehicles.length > 0 ? (
        filteredVehicles.map((vehicle) => (
          <tr key={vehicle.id} className="hover:bg-gray-800">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="h-12 w-12 flex-shrink-0 bg-gray-800 rounded-md overflow-hidden">
                  <img
                    className="h-12 w-12 object-contain"
                    src={vehicle.image || "/placeholder.svg"}
                    alt={vehicle.name}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/100x60?text=Vehicle"
                    }}
                  />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-white">{vehicle.name || `${vehicle.brand} ${vehicle.modelType}`}</div>
                  <div className="text-sm text-gray-400">
                    {vehicle.type || vehicle.vehicleCategory}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {vehicle.vehicleNo && `No: ${vehicle.vehicleNo}`}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-white">
                <div className="flex items-center mb-1">
                  <FiTruck className="mr-1 text-gray-400" size={12} />
                  {vehicle.model || vehicle.modelType} ({vehicle.color})
                </div>
                <div className="flex items-center mb-1">
                  <FiCalendar className="mr-1 text-gray-400" size={12} />
                  {vehicle.year} • {vehicle.mileage} miles
                </div>
                <div className="text-xs text-gray-400">
                  {vehicle.fuelType} • {vehicle.transmissionType}
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-white">
                {vehicle.licensePlate || vehicle.vehicleNo}
              </div>
              <div className="text-sm text-gray-400">
                VIN: {vehicle.vin}
              </div>
              {vehicle.registrationDate && (
                <div className="text-xs text-gray-500 mt-1">
                  Reg: {vehicle.registrationDate}
                </div>
              )}
            </td>
            <td className="px-6 py-4">
              <div className="text-sm text-white">
                {vehicle.vehicleOwnership && (
                  <div className="mb-1">Ownership: {vehicle.vehicleOwnership}</div>
                )}
                {vehicle.insuranceDate && (
                  <div className="text-sm text-gray-400">
                    Insurance: {vehicle.insuranceDate}
                  </div>
                )}
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex flex-col gap-2">
                {vehicle.insuranceCopy && (
                  <div className="flex items-center">
                    <FiFile className="mr-2 text-gray-400" size={16} />
                    <span className="text-sm text-gray-300">Insurance Copy</span>
                  </div>
                )}
                {vehicle.registrationFront && (
                  <div className="flex items-center">
                    <FiFile className="mr-2 text-gray-400" size={16} />
                    <span className="text-sm text-gray-300">Registration Front</span>
                  </div>
                )}
                {vehicle.registrationBack && (
                  <div className="flex items-center">
                    <FiFile className="mr-2 text-gray-400" size={16} />
                    <span className="text-sm text-gray-300">Registration Back</span>
                  </div>
                )}
                {vehicle.carNumberPhoto && (
                  <div className="flex items-center">
                    <FiFile className="mr-2 text-gray-400" size={16} />
                    <span className="text-sm text-gray-300">Car Number Photo</span>
                  </div>
                )}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                ${
                  vehicle.status === "Available"
                    ? "bg-green-900 text-green-200"
                    : vehicle.status === "Maintenance"
                      ? "bg-red-900 text-red-200"
                      : "bg-yellow-900 text-yellow-200"
                }`}
              >
                {vehicle.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div className="flex space-x-2">
                <button
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                  onClick={() => handleEdit(vehicle)}
                >
                  <FiEdit size={18} />
                </button>
                <button
                  className="text-red-400 hover:text-red-300 transition-colors"
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
          <td colSpan={7} className="px-6 py-4 text-center text-gray-400">
            No vehicles found matching your search criteria.
          </td>
        </tr>
      )}
    </tbody>
  </table>

  {/* Mobile Cards (shown on mobile) */}
  <div className="md:hidden space-y-4">
    {filteredVehicles.length > 0 ? (
      filteredVehicles.map((vehicle) => (
        <div key={vehicle.id} className="bg-gray-800 rounded-lg p-4 shadow">
          {/* Vehicle Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="h-12 w-12 flex-shrink-0 bg-gray-700 rounded-md overflow-hidden">
                <img
                  className="h-12 w-12 object-contain"
                  src={vehicle.image || "/placeholder.svg"}
                  alt={vehicle.name}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/100x60?text=Vehicle"
                  }}
                />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-white">
                  {vehicle.name || `${vehicle.brand} ${vehicle.modelType}`}
                </h3>
                <p className="text-xs text-gray-400">
                  {vehicle.type || vehicle.vehicleCategory}
                </p>
              </div>
            </div>
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
              ${
                vehicle.status === "Available"
                  ? "bg-green-900 text-green-200"
                  : vehicle.status === "Maintenance"
                    ? "bg-red-900 text-red-200"
                    : "bg-yellow-900 text-yellow-200"
              }`}
            >
              {vehicle.status}
            </span>
          </div>

          {/* Vehicle Details */}
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-gray-400">Model</p>
              <p className="text-white">{vehicle.model || vehicle.modelType}</p>
            </div>
            <div>
              <p className="text-gray-400">Year</p>
              <p className="text-white">{vehicle.year}</p>
            </div>
            <div>
              <p className="text-gray-400">Color</p>
              <p className="text-white">{vehicle.color}</p>
            </div>
            <div>
              <p className="text-gray-400">Mileage</p>
              <p className="text-white">{vehicle.mileage} miles</p>
            </div>
            <div>
              <p className="text-gray-400">Plate</p>
              <p className="text-white">{vehicle.licensePlate || vehicle.vehicleNo}</p>
            </div>
            <div>
              <p className="text-gray-400">VIN</p>
              <p className="text-white truncate">{vehicle.vin}</p>
            </div>
          </div>

          {/* Ownership & Documents */}
          <div className="mt-3 space-y-2">
            {vehicle.vehicleOwnership && (
              <div className="text-sm">
                <span className="text-gray-400">Ownership: </span>
                <span className="text-white">{vehicle.vehicleOwnership}</span>
              </div>
            )}
            {vehicle.insuranceDate && (
              <div className="text-sm">
                <span className="text-gray-400">Insurance: </span>
                <span className="text-white">{vehicle.insuranceDate}</span>
              </div>
            )}
          </div>

          {/* Documents (collapsible if many) */}
          <div className="mt-3">
            <details className="text-sm">
              <summary className="text-gray-400 cursor-pointer">Documents</summary>
              <div className="mt-1 space-y-1">
                {vehicle.insuranceCopy && (
                  <div className="flex items-center text-white">
                    <FiFile className="mr-2 text-gray-400" size={14} />
                    Insurance Copy
                  </div>
                )}
                {vehicle.registrationFront && (
                  <div className="flex items-center text-white">
                    <FiFile className="mr-2 text-gray-400" size={14} />
                    Registration Front
                  </div>
                )}
                {vehicle.registrationBack && (
                  <div className="flex items-center text-white">
                    <FiFile className="mr-2 text-gray-400" size={14} />
                    Registration Back
                  </div>
                )}
                {vehicle.carNumberPhoto && (
                  <div className="flex items-center text-white">
                    <FiFile className="mr-2 text-gray-400" size={14} />
                    Car Number Photo
                  </div>
                )}
              </div>
            </details>
          </div>

          {/* Actions */}
          <div className="mt-3 flex justify-end space-x-3">
            <button
              className="text-blue-400 hover:text-blue-300 transition-colors"
              onClick={() => handleEdit(vehicle)}
            >
              <FiEdit size={18} />
            </button>
            <button
              className="text-red-400 hover:text-red-300 transition-colors"
              onClick={() => handleDelete(vehicle.id)}
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        </div>
      ))
    ) : (
      <div className="px-6 py-4 text-center text-gray-400">
        No vehicles found matching your search criteria.
      </div>
    )}
  </div>
</div>

      </div>

      {/* Edit Vehicle Modal */}
      {isEditModalOpen && editingVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Edit Vehicle</h2>
                <button
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Vehicle Info */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Vehicle Number</label>
                    <input
                      type="text"
                      name="vehicleNo"
                      value={editingVehicle.vehicleNo || editingVehicle.licensePlate}
                      onChange={handleEditInputChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Vehicle Category</label>
                    <input
                      type="text"
                      name="type"
                      value={editingVehicle.type}
                      onChange={handleEditInputChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Mileage</label>
                    <input
                      type="text"
                      name="mileage"
                      value={editingVehicle.mileage}
                      onChange={handleEditInputChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Fuel Type</label>
                    <input
                      type="text"
                      name="fuelType"
                      value={editingVehicle.fuelType}
                      onChange={handleEditInputChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Registration Info */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">VIN</label>
                    <input
                      type="text"
                      name="vin"
                      value={editingVehicle.vin}
                      onChange={handleEditInputChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Registration Date</label>
                    <input
                      type="text"
                      name="registrationDate"
                      value={editingVehicle.registrationDate}
                      onChange={handleEditInputChange}
                      placeholder="MM/DD/YYYY"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Ownership & Insurance */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Ownership</label>
                    <input
                      type="text"
                      name="vehicleOwnership"
                      value={editingVehicle.vehicleOwnership}
                      onChange={handleEditInputChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Insurance Date</label>
                    <input
                      type="text"
                      name="insuranceDate"
                      value={editingVehicle.insuranceDate}
                      onChange={handleEditInputChange}
                      placeholder="MM/DD/YYYY"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Documents */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Insurance Copy</label>
                    <input
                      type="file"
                      accept=".pdf"
                      name="insuranceCopy"
                      onChange={handleEditFileChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                    />
                    {editingVehicle.insuranceCopy && (
                      <div className="mt-2 p-2 bg-gray-700 rounded-md">
                        <div className="flex items-center text-sm text-gray-300">
                          <FiFile className="mr-2" size={16} />
                          <span>{typeof editingVehicle.insuranceCopy === 'string' ? 'Insurance Copy.pdf' : editingVehicle.insuranceCopy.name}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Registration Front</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="registrationFront"
                      onChange={handleEditFileChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                    />
                    {editingVehicle.registrationFront && (
                      <div className="mt-2 p-2 bg-gray-700 rounded-md">
                        <img
                          src={typeof editingVehicle.registrationFront === 'string' 
                            ? editingVehicle.registrationFront 
                            : URL.createObjectURL(editingVehicle.registrationFront)}
                          alt="Registration Front"
                          className="w-full h-32 object-contain rounded-md"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Registration Back</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="registrationBack"
                      onChange={handleEditFileChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                    />
                    {editingVehicle.registrationBack && (
                      <div className="mt-2 p-2 bg-gray-700 rounded-md">
                        <img
                          src={typeof editingVehicle.registrationBack === 'string'
                            ? editingVehicle.registrationBack
                            : URL.createObjectURL(editingVehicle.registrationBack)}
                          alt="Registration Back"
                          className="w-full h-32 object-contain rounded-md"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Car Number Photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="carNumberPhoto"
                      onChange={handleEditFileChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                    />
                    {editingVehicle.carNumberPhoto && (
                      <div className="mt-2 p-2 bg-gray-700 rounded-md">
                        <img
                          src={typeof editingVehicle.carNumberPhoto === 'string'
                            ? editingVehicle.carNumberPhoto
                            : URL.createObjectURL(editingVehicle.carNumberPhoto)}
                          alt="Car Number Photo"
                          className="w-full h-32 object-contain rounded-md"
                        />
                      </div>
                    )}
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                    <select
                      name="status"
                      value={editingVehicle.status}
                      onChange={handleEditInputChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Available">Available</option>
                      <option value="In Use">In Use</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
                  onClick={handleSaveEdit}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Vehicle Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Add New Vehicle</h2>
                <button
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Vehicle No <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="vehicleNo"
                      value={newVehicle.vehicleNo}
                      onChange={handleAddInputChange}
                      className={`w-full px-4 py-2 bg-gray-700 border ${
                        formErrors.licensePlate ? "border-red-500" : "border-gray-600"
                      } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {formErrors.licensePlate && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <FiAlertCircle className="mr-1" size={12} />
                        {formErrors.licensePlate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Vehicle Category</label>
                    <input
                      type="text"
                      name="vehicleCategory"
                      value={newVehicle.vehicleCategory}
                      onChange={handleAddInputChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Brand <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={newVehicle.brand}
                      onChange={handleAddInputChange}
                      className={`w-full px-4 py-2 bg-gray-700 border ${
                        formErrors.name ? "border-red-500" : "border-gray-600"
                      } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <FiAlertCircle className="mr-1" size={12} />
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Model Type <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="modelType"
                      value={newVehicle.modelType}
                      onChange={handleAddInputChange}
                      className={`w-full px-4 py-2 bg-gray-700 border ${
                        formErrors.model ? "border-red-500" : "border-gray-600"
                      } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {formErrors.model && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <FiAlertCircle className="mr-1" size={12} />
                        {formErrors.model}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Fuel Type</label>
                    <input
                      type="text"
                      name="fuelType"
                      value={newVehicle.fuelType}
                      onChange={handleAddInputChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      VIN <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="vin"
                      value={newVehicle.vin}
                      onChange={handleAddInputChange}
                      className={`w-full px-4 py-2 bg-gray-700 border ${
                        formErrors.vin ? "border-red-500" : "border-gray-600"
                      } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {formErrors.vin && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <FiAlertCircle className="mr-1" size={12} />
                        {formErrors.vin}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Vehicle Ownership</label>
                    <input
                      type="text"
                      name="vehicleOwnership"
                      value={newVehicle.vehicleOwnership}
                      onChange={handleAddInputChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Registration Date</label>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        name="registrationMonth"
                        value={newVehicle.registrationMonth}
                        onChange={handleAddInputChange}
                        placeholder="MM"
                        className={`px-4 py-2 bg-gray-700 border ${
                          formErrors.registrationDate ? "border-red-500" : "border-gray-600"
                        } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      <input
                        type="text"
                        name="registrationDay"
                        value={newVehicle.registrationDay}
                        onChange={handleAddInputChange}
                        placeholder="DD"
                        className={`px-4 py-2 bg-gray-700 border ${
                          formErrors.registrationDate ? "border-red-500" : "border-gray-600"
                        } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      <input
                        type="text"
                        name="registrationYear"
                        value={newVehicle.registrationYear}
                        onChange={handleAddInputChange}
                        placeholder="YYYY"
                        className={`px-4 py-2 bg-gray-700 border ${
                          formErrors.registrationDate ? "border-red-500" : "border-gray-600"
                        } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>
                    {formErrors.registrationDate && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <FiAlertCircle className="mr-1" size={12} />
                        {formErrors.registrationDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Insurance Valid Up To</label>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        name="insuranceMonth"
                        value={newVehicle.insuranceMonth}
                        onChange={handleAddInputChange}
                        placeholder="MM"
                        className={`px-4 py-2 bg-gray-700 border ${
                          formErrors.insuranceDate ? "border-red-500" : "border-gray-600"
                        } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      <input
                        type="text"
                        name="insuranceDay"
                        value={newVehicle.insuranceDay}
                        onChange={handleAddInputChange}
                        placeholder="DD"
                        className={`px-4 py-2 bg-gray-700 border ${
                          formErrors.insuranceDate ? "border-red-500" : "border-gray-600"
                        } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      <input
                        type="text"
                        name="insuranceYear"
                        value={newVehicle.insuranceYear}
                        onChange={handleAddInputChange}
                        placeholder="YYYY"
                        className={`px-4 py-2 bg-gray-700 border ${
                          formErrors.insuranceDate ? "border-red-500" : "border-gray-600"
                        } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>
                    {formErrors.insuranceDate && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <FiAlertCircle className="mr-1" size={12} />
                        {formErrors.insuranceDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Insurance Copy (PDF)</label>
                    <input
                      type="file"
                      accept=".pdf"
                      name="insuranceCopy"
                      onChange={handleFileChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Registration Certificate Front (image)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      name="registrationFront"
                      onChange={handleFileChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Registration Certificate Back (image)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      name="registrationBack"
                      onChange={handleFileChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Car Number Photo (image)</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="carNumberPhoto"
                      onChange={handleFileChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
                  onClick={handleAddVehicle}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  )
}

export default VehiclesPage
