"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { FiSearch, FiFilter, FiPlus, FiEdit, FiTrash2, FiMail, FiPhone, FiMapPin , FiUser,FiUpload, FiImage, FiFile, FiX} from "react-icons/fi"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Toaster, toast } from "sonner"

const PageLayout = dynamic(() => import("@/components/layout/PageLayout"), {
  loading: () => <div className="h-screen bg-gray-100 dark:bg-gray-900 animate-pulse"></div>,
  ssr: false,
})

// Sample driver data
const DRIVERS_DATA = [
  {
    id: 1,
    name: "John Doe",
    mobile: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    driverPhoto: "https://randomuser.me/api/portraits/men/1.jpg",
    licenseNumber: "DL-12345678",
    licenseExpiry: "2025-05-15",
    licenseFrontPhoto: "/license-front.jpg",
    licenseBackPhoto: "/license-back.jpg",
    idProofType: "Passport",
    idProofFrontPhoto: "/id-front.jpg",
    idProofBackPhoto: "/id-back.jpg",
    pccForm: "/pcc-form.pdf",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Boston, MA",
    licenseNumber: "DL-87654321",
    licenseExpiry: "2024-03-22",
    experience: "3 years",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 (555) 456-7890",
    address: "789 Pine St, Chicago, IL",
    licenseNumber: "DL-23456789",
    licenseExpiry: "2023-01-10",
    experience: "7 years",
    status: "On Leave",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 234-5678",
    address: "321 Elm St, San Francisco, CA",
    licenseNumber: "DL-34567890",
    licenseExpiry: "2026-02-28",
    experience: "2 years",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    phone: "+1 (555) 876-5432",
    address: "654 Maple Ave, Miami, FL",
    licenseNumber: "DL-45678901",
    licenseExpiry: "2022-11-15",
    experience: "4 years",
    status: "Inactive",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
]

const DriversPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [drivers, setDrivers] = useState(DRIVERS_DATA)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [currentDriver, setCurrentDriver] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  
  // Add form state
  const [addFormData, setAddFormData] = useState({
    name: "",
    mobile: "",
    dateOfBirth: "",
    driverPhoto: null,
    licenseNumber: "",
    licenseExpiry: "",
    licenseFrontPhoto: null,
    licenseBackPhoto: null,
    idProofType: "",
    idProofFrontPhoto: null,
    idProofBackPhoto: null,
    pccForm: null,
    status: "Active"
  })

  // View/Edit form state
  const [viewFormData, setViewFormData] = useState({
    name: "",
    mobile: "",
    dateOfBirth: "",
    driverPhoto: null,
    licenseNumber: "",
    licenseExpiry: "",
    licenseFrontPhoto: null,
    licenseBackPhoto: null,
    idProofType: "",
    idProofFrontPhoto: null,
    idProofBackPhoto: null,
    pccForm: null,
    status: "Active"
  })

  // Filter drivers based on search term and status filter
  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "All" || driver.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      setDrivers(drivers.filter((driver) => driver.id !== id))
    }
  }

  const handleViewDetails = (driver) => {
    setCurrentDriver(driver)
    setViewFormData({
      name: driver.name || "",
      mobile: driver.mobile || "",
      dateOfBirth: driver.dateOfBirth || "",
      driverPhoto: driver.driverPhoto || null,
      licenseNumber: driver.licenseNumber || "",
      licenseExpiry: driver.licenseExpiry || "",
      licenseFrontPhoto: driver.licenseFrontPhoto || null,
      licenseBackPhoto: driver.licenseBackPhoto || null,
      idProofType: driver.idProofType || "",
      idProofFrontPhoto: driver.idProofFrontPhoto || null,
      idProofBackPhoto: driver.idProofBackPhoto || null,
      pccForm: driver.pccForm || null,
      status: driver.status || "Active"
    })
    setIsEditMode(false)
    setIsViewModalOpen(true)
  }

  const handleViewFormChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file' && files) {
      setViewFormData({
        ...viewFormData,
        [name]: files[0]
      })
    } else {
      setViewFormData({
        ...viewFormData,
        [name]: value
      })
    }
  }

  const handleSaveEdit = () => {
    const createFileUrl = (file, currentUrl) => {
      if (!file) return currentUrl
      return typeof file === 'string' ? file : URL.createObjectURL(file)
    }

    const updatedDrivers = drivers.map((driver) => {
      if (driver.id === currentDriver.id) {
        return {
          ...driver,
          ...viewFormData,
          driverPhoto: createFileUrl(viewFormData.driverPhoto, driver.driverPhoto),
          licenseFrontPhoto: createFileUrl(viewFormData.licenseFrontPhoto, driver.licenseFrontPhoto),
          licenseBackPhoto: createFileUrl(viewFormData.licenseBackPhoto, driver.licenseBackPhoto),
          idProofFrontPhoto: createFileUrl(viewFormData.idProofFrontPhoto, driver.idProofFrontPhoto),
          idProofBackPhoto: createFileUrl(viewFormData.idProofBackPhoto, driver.idProofBackPhoto),
          pccForm: createFileUrl(viewFormData.pccForm, driver.pccForm)
        }
      }
      return driver
    })

    setDrivers(updatedDrivers)
    setIsEditMode(false)
    
    // Show success toast
    toast.success("Driver updated successfully!", {
      description: `${viewFormData.name}'s information has been updated.`,
      duration: 3000,
    })
  }

  const handleReject = () => {
    const updatedDrivers = drivers.map((driver) => {
      if (driver.id === currentDriver.id) {
        return {
          ...driver,
          status: "Rejected"
        }
      }
      return driver
    })
    
    setDrivers(updatedDrivers)
    setIsViewModalOpen(false)
    
    // Show success toast
    toast.success("Driver rejected", {
      description: `${currentDriver.name} has been rejected.`,
      duration: 3000,
    })
  }

  const handleApprove = () => {
    const updatedDrivers = drivers.map((driver) => {
      if (driver.id === currentDriver.id) {
        return {
          ...driver,
          status: "Active"
        }
      }
      return driver
    })
    
    setDrivers(updatedDrivers)
    setIsViewModalOpen(false)
    
    // Show success toast
    toast.success("Driver approved", {
      description: `${currentDriver.name} has been approved.`,
      duration: 3000,
    })
  }

  const handleAddInputChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file' && files) {
      setAddFormData({
        ...addFormData,
        [name]: files[0]
      })
    } else {
      setAddFormData({
        ...addFormData,
        [name]: value
      })
    }
  }

  const handleAddStatusChange = (value) => {
    setAddFormData({
      ...addFormData,
      status: value,
    })
  }

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAddFormData({
        ...addFormData,
        profileImage: e.target.files[0]
      })
    }
  }

  const handleAddDriver = () => {
    // Check required fields
    if (!addFormData.name || !addFormData.mobile || !addFormData.licenseNumber) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Generate a new ID
    const newId = Math.max(...drivers.map(d => d.id), 0) + 1
    
    // Create URLs for all uploaded files
    const createFileUrl = (file) => {
      if (!file) return null
      return typeof file === 'string' ? file : URL.createObjectURL(file)
    }

    // Create the new driver object
    const newDriver = {
      id: newId,
      name: addFormData.name,
      mobile: addFormData.mobile,
      dateOfBirth: addFormData.dateOfBirth,
      driverPhoto: createFileUrl(addFormData.driverPhoto),
      licenseNumber: addFormData.licenseNumber,
      licenseExpiry: addFormData.licenseExpiry,
      licenseFrontPhoto: createFileUrl(addFormData.licenseFrontPhoto),
      licenseBackPhoto: createFileUrl(addFormData.licenseBackPhoto),
      idProofType: addFormData.idProofType,
      idProofFrontPhoto: createFileUrl(addFormData.idProofFrontPhoto),
      idProofBackPhoto: createFileUrl(addFormData.idProofBackPhoto),
      pccForm: createFileUrl(addFormData.pccForm),
      status: addFormData.status || "Active"
    }

    // Add the new driver to the list
    setDrivers([...drivers, newDriver])
    
    // Reset the form
    setAddFormData({
      name: "",
      mobile: "",
      dateOfBirth: "",
      driverPhoto: null,
      licenseNumber: "",
      licenseExpiry: "",
      licenseFrontPhoto: null,
      licenseBackPhoto: null,
      idProofType: "",
      idProofFrontPhoto: null,
      idProofBackPhoto: null,
      pccForm: null,
      status: "Active"
    })
    
    setIsAddModalOpen(false)
    
    // Show success toast
    toast.success("Driver added successfully!", {
      description: `${newDriver.name} has been added to the system.`,
      duration: 3000,
    })
  }

  const handleImageClick = (imageUrl, imageType) => {
    if (imageUrl) {
      setPreviewImage({
        url: typeof imageUrl === 'string' ? imageUrl : URL.createObjectURL(imageUrl),
        type: imageType
      })
    }
  }

  return (
    <PageLayout title="Drivers">
      <Toaster position="top-right" richColors />
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Header with search and filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-500" />
            </div>
            <input
              type="text"
              className="pl-10 w-full rounded-md border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-500 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search drivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <FiFilter className="text-gray-500" />
              <select
                className="rounded-md border border-gray-200 bg-gray-50 text-gray-700 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>

            <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => setIsAddModalOpen(true)}>
              <FiPlus className="mr-2" />
              Add Driver
            </Button>
          </div>
        </div>

        {/* Drivers Table */}
        <div className="overflow-x-auto">
          {/* Desktop Table (hidden on mobile) */}
          <table className="hidden md:table min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Driver Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mobile Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  License Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  License Expiry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDrivers.length > 0 ? (
                filteredDrivers.map((driver) => (
                  <tr key={driver.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={driver.driverPhoto || "/placeholder.svg"}
                            alt={driver.name}
                            onError={(e) => {
                              e.target.src = "https://ui-avatars.com/api/?name=" + driver.name.replace(" ", "+") + "&background=3b82f6&color=ffffff"
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-700">{driver.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{driver.mobile}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{driver.licenseNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{driver.licenseExpiry}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        driver.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : driver.status === "Inactive"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {driver.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-blue-500 hover:text-blue-600 transition-colors"
                        onClick={() => handleViewDetails(driver)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No drivers found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Mobile Cards (shown on mobile) */}
          <div className="md:hidden space-y-4">
            {filteredDrivers.length > 0 ? (
              filteredDrivers.map((driver) => (
                <div key={driver.id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
                  {/* Driver Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0">
                        <img
                          className="h-12 w-12 rounded-full object-cover"
                          src={driver.driverPhoto || "/placeholder.svg"}
                          alt={driver.name}
                          onError={(e) => {
                            e.target.src = "https://ui-avatars.com/api/?name=" + driver.name.replace(" ", "+") + "&background=3b82f6&color=ffffff"
                          }}
                        />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-700">{driver.name}</h3>
                        <p className="text-sm text-gray-500">{driver.mobile}</p>
                      </div>
                    </div>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      driver.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : driver.status === "Inactive"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {driver.status}
                    </span>
                  </div>

                  {/* Driver Details */}
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">License Number</p>
                      <p className="text-gray-700">{driver.licenseNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">License Expiry</p>
                      <p className="text-gray-700">{driver.licenseExpiry}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex justify-end">
                    <button
                      className="text-blue-500 hover:text-blue-600 transition-colors text-sm font-medium"
                      onClick={() => handleViewDetails(driver)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-4 text-center text-gray-500">
                No drivers found matching your search criteria.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View/Edit Driver Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto bg-white border border-gray-200 shadow-xl">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center text-gray-800">
              <span className="text-gray-800">{isEditMode ? "Edit Driver" : "Driver Details"}</span>
              <div className="flex gap-2">
                {!isEditMode && (
                  <>
                    <Button
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded shadow"
                      onClick={() => handleApprove()}
                    >
                      Approve
                    </Button>
                    <Button
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded shadow"
                      onClick={() => handleReject()}
                    >
                      Reject
                    </Button>
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded shadow"
                      onClick={() => setIsEditMode(true)}
                    >
                      <FiEdit className="mr-2" />
                      Edit
                    </Button>
                  </>
                )}
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Driver Photo */}
            <div className="flex justify-center">
              <div className="space-y-2 text-center">
                <div className="relative w-32 h-32 mx-auto">
                  <div 
                    className="w-full h-full rounded-full overflow-hidden border-2 border-gray-200 bg-white shadow"
                    onClick={() => handleImageClick(viewFormData.driverPhoto, 'Driver Photo')}
                  >
                    {viewFormData.driverPhoto ? (
                      <img
                        src={typeof viewFormData.driverPhoto === 'string' 
                          ? viewFormData.driverPhoto 
                          : URL.createObjectURL(viewFormData.driverPhoto)}
                        alt="Driver"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <FiUser className="text-gray-400 text-4xl" />
                      </div>
                    )}
                  </div>
                  {isEditMode && (
                    <label className="absolute bottom-0 right-0 cursor-pointer">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600">
                        <FiUpload size={16} />
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        name="driverPhoto"
                        onChange={handleViewFormChange}
                      />
                    </label>
                  )}
                </div>
                <Label className="text-gray-700">Driver Photo</Label>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700">Driver Name</Label>
                <Input
                  name="name"
                  value={viewFormData.name}
                  onChange={handleViewFormChange}
                  disabled={!isEditMode}
                  className="bg-white border border-gray-200 text-gray-800 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">Mobile Number</Label>
                <Input
                  name="mobile"
                  value={viewFormData.mobile}
                  onChange={handleViewFormChange}
                  disabled={!isEditMode}
                  className="bg-white border border-gray-200 text-gray-800 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">Date of Birth</Label>
                <Input
                  name="dateOfBirth"
                  type="date"
                  value={viewFormData.dateOfBirth}
                  onChange={handleViewFormChange}
                  disabled={!isEditMode}
                  className="bg-white border border-gray-200 text-gray-800 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">License ID No</Label>
                <Input
                  name="licenseNumber"
                  value={viewFormData.licenseNumber}
                  onChange={handleViewFormChange}
                  disabled={!isEditMode}
                  className="bg-white border border-gray-200 text-gray-800 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">License Expiry Date</Label>
                <Input
                  name="licenseExpiry"
                  type="date"
                  value={viewFormData.licenseExpiry}
                  onChange={handleViewFormChange}
                  disabled={!isEditMode}
                  className="bg-white border border-gray-200 text-gray-800 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">ID Proof Type</Label>
                <Select 
                  value={viewFormData.idProofType} 
                  onValueChange={(value) => setViewFormData({...viewFormData, idProofType: value})}
                  disabled={!isEditMode}
                >
                  <SelectTrigger className="bg-white border border-gray-200 text-gray-800 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select ID Proof" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200">
                    <SelectItem value="Passport">Passport</SelectItem>
                    <SelectItem value="National ID">National ID</SelectItem>
                    <SelectItem value="Voter ID">Voter ID</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Document Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* License Front Photo */}
              <div className="space-y-2">
                <Label className="text-gray-700">License Front Photo</Label>
                <div className="border rounded-lg p-4 border-gray-200 bg-white">
                  <div 
                    className="aspect-video relative bg-gray-50 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => handleImageClick(viewFormData.licenseFrontPhoto, 'License Front')}
                  >
                    {viewFormData.licenseFrontPhoto ? (
                      <img
                        src={typeof viewFormData.licenseFrontPhoto === 'string' 
                          ? viewFormData.licenseFrontPhoto 
                          : URL.createObjectURL(viewFormData.licenseFrontPhoto)}
                        alt="License Front"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiImage className="text-gray-400 text-4xl" />
                      </div>
                    )}
                    {isEditMode && (
                      <label className="absolute bottom-2 right-2 cursor-pointer">
                        <div className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
                          <FiUpload size={16} />
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          name="licenseFrontPhoto"
                          onChange={handleViewFormChange}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* License Back Photo */}
              <div className="space-y-2">
                <Label className="text-gray-700">License Back Photo</Label>
                <div className="border rounded-lg p-4 border-gray-200 bg-white">
                  <div 
                    className="aspect-video relative bg-gray-50 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => handleImageClick(viewFormData.licenseBackPhoto, 'License Back')}
                  >
                    {viewFormData.licenseBackPhoto ? (
                      <img
                        src={typeof viewFormData.licenseBackPhoto === 'string' 
                          ? viewFormData.licenseBackPhoto 
                          : URL.createObjectURL(viewFormData.licenseBackPhoto)}
                        alt="License Back"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiImage className="text-gray-400 text-4xl" />
                      </div>
                    )}
                    {isEditMode && (
                      <label className="absolute bottom-2 right-2 cursor-pointer">
                        <div className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
                          <FiUpload size={16} />
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          name="licenseBackPhoto"
                          onChange={handleViewFormChange}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* ID Proof Front Photo */}
              <div className="space-y-2">
                <Label className="text-gray-700">ID Proof Front Photo</Label>
                <div className="border rounded-lg p-4 border-gray-200 bg-white">
                  <div 
                    className="aspect-video relative bg-gray-50 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => handleImageClick(viewFormData.idProofFrontPhoto, 'ID Proof Front')}
                  >
                    {viewFormData.idProofFrontPhoto ? (
                      <img
                        src={typeof viewFormData.idProofFrontPhoto === 'string' 
                          ? viewFormData.idProofFrontPhoto 
                          : URL.createObjectURL(viewFormData.idProofFrontPhoto)}
                        alt="ID Proof Front"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiImage className="text-gray-400 text-4xl" />
                      </div>
                    )}
                    {isEditMode && (
                      <label className="absolute bottom-2 right-2 cursor-pointer">
                        <div className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
                          <FiUpload size={16} />
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          name="idProofFrontPhoto"
                          onChange={handleViewFormChange}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* ID Proof Back Photo */}
              <div className="space-y-2">
                <Label className="text-gray-700">ID Proof Back Photo</Label>
                <div className="border rounded-lg p-4 border-gray-200 bg-white">
                  <div 
                    className="aspect-video relative bg-gray-50 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => handleImageClick(viewFormData.idProofBackPhoto, 'ID Proof Back')}
                  >
                    {viewFormData.idProofBackPhoto ? (
                      <img
                        src={typeof viewFormData.idProofBackPhoto === 'string' 
                          ? viewFormData.idProofBackPhoto 
                          : URL.createObjectURL(viewFormData.idProofBackPhoto)}
                        alt="ID Proof Back"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiImage className="text-gray-400 text-4xl" />
                      </div>
                    )}
                    {isEditMode && (
                      <label className="absolute bottom-2 right-2 cursor-pointer">
                        <div className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
                          <FiUpload size={16} />
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          name="idProofBackPhoto"
                          onChange={handleViewFormChange}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* PCC Form */}
              <div className="space-y-2 md:col-span-2">
                <Label className="text-gray-700">PCC Form (Optional)</Label>
                <div className="border rounded-lg p-4 border-gray-200 bg-white">
                  <div className="relative bg-gray-50 rounded-lg p-4">
                    {viewFormData.pccForm ? (
                      <div className="flex items-center space-x-2">
                        <FiFile className="text-gray-400 text-xl" />
                        <span className="text-sm text-gray-600">
                          {typeof viewFormData.pccForm === 'string' 
                            ? viewFormData.pccForm.split('/').pop() 
                            : viewFormData.pccForm.name}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center py-4">
                        <FiFile className="text-gray-400 text-4xl" />
                      </div>
                    )}
                    {isEditMode && (
                      <label className="absolute bottom-2 right-2 cursor-pointer">
                        <div className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
                          <FiUpload size={16} />
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          name="pccForm"
                          onChange={handleViewFormChange}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsViewModalOpen(false)
              setIsEditMode(false)
            }} className="border-gray-200 text-gray-700 hover:bg-gray-100">
              Close
            </Button>
            {isEditMode && (
              <Button onClick={handleSaveEdit} className="bg-blue-500 hover:bg-blue-600 text-white">
                Save Changes
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Preview Modal */}
      <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
        <DialogContent className="sm:max-w-[90vw] max-h-[90vh] overflow-hidden p-0">
          <DialogHeader>
            <DialogTitle className="sr-only">Image Preview</DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={() => setPreviewImage(null)}
            >
              <FiX className="h-4 w-4" />
            </Button>
            <div className="w-full h-full flex items-center justify-center bg-black/90">
              <img
                src={previewImage?.url}
                alt={previewImage?.type}
                className="max-w-full max-h-[85vh] object-contain"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Driver Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">Add New Driver</DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Driver Photo and Basic Information */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Driver Photo */}
              <div className="w-full md:w-1/3">
                <div className="space-y-2 text-center">
                  <div className="relative w-32 h-32 mx-auto">
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-200">
                      {addFormData.driverPhoto ? (
                        <img
                          src={typeof addFormData.driverPhoto === 'string' 
                            ? addFormData.driverPhoto 
                            : URL.createObjectURL(addFormData.driverPhoto)}
                          alt="Driver"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <FiUser className="text-gray-400 text-4xl" />
                        </div>
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 cursor-pointer">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600">
                        <FiUpload size={16} />
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        name="driverPhoto"
                        onChange={handleAddInputChange}
                      />
                    </label>
                  </div>
                  <Label className="text-gray-700">Driver Photo</Label>
                </div>
              </div>

              {/* Basic Information */}
              <div className="w-full md:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700">Driver Name *</Label>
                    <Input
                      name="name"
                      value={addFormData.name}
                      onChange={handleAddInputChange}
                      placeholder="Enter driver name"
                      required
                      className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700">Mobile Number *</Label>
                    <Input
                      name="mobile"
                      value={addFormData.mobile}
                      onChange={handleAddInputChange}
                      placeholder="Enter mobile number"
                      required
                      className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700">Date of Birth</Label>
                    <Input
                      name="dateOfBirth"
                      type="date"
                      value={addFormData.dateOfBirth}
                      onChange={handleAddInputChange}
                      className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700">License ID No *</Label>
                    <Input
                      name="licenseNumber"
                      value={addFormData.licenseNumber}
                      onChange={handleAddInputChange}
                      placeholder="Enter license number"
                      required
                      className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700">License Expiry Date</Label>
                    <Input
                      name="licenseExpiry"
                      type="date"
                      value={addFormData.licenseExpiry}
                      onChange={handleAddInputChange}
                      className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700">ID Proof Type</Label>
                    <Select 
                      value={addFormData.idProofType} 
                      onValueChange={(value) => setAddFormData({...addFormData, idProofType: value})}
                    >
                      <SelectTrigger className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select ID Proof" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200">
                        <SelectItem value="Passport">Passport</SelectItem>
                        <SelectItem value="National ID">National ID</SelectItem>
                        <SelectItem value="Voter ID">Voter ID</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* License Front Photo */}
              <div className="space-y-2">
                <Label className="text-gray-700">License Front Photo</Label>
                <div className="border rounded-lg p-4 border-gray-200">
                  <div className="aspect-video relative bg-gray-50 rounded-lg overflow-hidden">
                    {addFormData.licenseFrontPhoto ? (
                      <img
                        src={typeof addFormData.licenseFrontPhoto === 'string' 
                          ? addFormData.licenseFrontPhoto 
                          : URL.createObjectURL(addFormData.licenseFrontPhoto)}
                        alt="License Front"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiImage className="text-gray-400 text-4xl" />
                      </div>
                    )}
                    <label className="absolute bottom-2 right-2 cursor-pointer">
                      <div className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
                        <FiUpload size={16} />
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        name="licenseFrontPhoto"
                        onChange={handleAddInputChange}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* License Back Photo */}
              <div className="space-y-2">
                <Label className="text-gray-700">License Back Photo</Label>
                <div className="border rounded-lg p-4 border-gray-200">
                  <div className="aspect-video relative bg-gray-50 rounded-lg overflow-hidden">
                    {addFormData.licenseBackPhoto ? (
                      <img
                        src={typeof addFormData.licenseBackPhoto === 'string' 
                          ? addFormData.licenseBackPhoto 
                          : URL.createObjectURL(addFormData.licenseBackPhoto)}
                        alt="License Back"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiImage className="text-gray-400 text-4xl" />
                      </div>
                    )}
                    <label className="absolute bottom-2 right-2 cursor-pointer">
                      <div className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
                        <FiUpload size={16} />
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        name="licenseBackPhoto"
                        onChange={handleAddInputChange}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* ID Proof Front Photo */}
              <div className="space-y-2">
                <Label className="text-gray-700">ID Proof Front Photo</Label>
                <div className="border rounded-lg p-4 border-gray-200">
                  <div className="aspect-video relative bg-gray-50 rounded-lg overflow-hidden">
                    {addFormData.idProofFrontPhoto ? (
                      <img
                        src={typeof addFormData.idProofFrontPhoto === 'string' 
                          ? addFormData.idProofFrontPhoto 
                          : URL.createObjectURL(addFormData.idProofFrontPhoto)}
                        alt="ID Proof Front"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiImage className="text-gray-400 text-4xl" />
                      </div>
                    )}
                    <label className="absolute bottom-2 right-2 cursor-pointer">
                      <div className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
                        <FiUpload size={16} />
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        name="idProofFrontPhoto"
                        onChange={handleAddInputChange}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* ID Proof Back Photo */}
              <div className="space-y-2">
                <Label className="text-gray-700">ID Proof Back Photo</Label>
                <div className="border rounded-lg p-4 border-gray-200">
                  <div className="aspect-video relative bg-gray-50 rounded-lg overflow-hidden">
                    {addFormData.idProofBackPhoto ? (
                      <img
                        src={typeof addFormData.idProofBackPhoto === 'string' 
                          ? addFormData.idProofBackPhoto 
                          : URL.createObjectURL(addFormData.idProofBackPhoto)}
                        alt="ID Proof Back"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiImage className="text-gray-400 text-4xl" />
                      </div>
                    )}
                    <label className="absolute bottom-2 right-2 cursor-pointer">
                      <div className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
                        <FiUpload size={16} />
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        name="idProofBackPhoto"
                        onChange={handleAddInputChange}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* PCC Form */}
              <div className="space-y-2 md:col-span-2">
                <Label className="text-gray-700">PCC Form (Optional)</Label>
                <div className="border rounded-lg p-4 border-gray-200">
                  <div className="relative bg-gray-50 rounded-lg p-4">
                    {addFormData.pccForm ? (
                      <div className="flex items-center space-x-2">
                        <FiFile className="text-gray-400 text-xl" />
                        <span className="text-sm text-gray-600">
                          {typeof addFormData.pccForm === 'string' 
                            ? addFormData.pccForm.split('/').pop() 
                            : addFormData.pccForm.name}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center py-4">
                        <FiFile className="text-gray-400 text-4xl" />
                      </div>
                    )}
                    <label className="absolute bottom-2 right-2 cursor-pointer">
                      <div className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
                        <FiUpload size={16} />
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        name="pccForm"
                        onChange={handleAddInputChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddModalOpen(false)}
              className="border-gray-200 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddDriver}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Add Driver
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  )
}

export default DriversPage
