'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { use } from 'react';

const PageLayout = dynamic(() => import('@/components/layout/PageLayout'), {
  loading: () => <div className="h-screen bg-gray-100 dark:bg-primary animate-pulse"></div>,
  ssr: false
});

const BookingDetailsPage = ({ params }) => {
  const router = useRouter();
  const resolvedParams = use(params);
  const { bookingId } = resolvedParams;
  
  const [isDriverOpen, setIsDriverOpen] = useState(false);
  const [isCabOpen, setIsCabOpen] = useState(false);
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [isCabModalOpen, setIsCabModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [assignedDriver, setAssignedDriver] = useState(null);
  const [assignedCab, setAssignedCab] = useState(null);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const [vendors] = useState([
    {
      id: 1,
      companyName: 'jaywant',
      contactNo: '9857357',
      email: 'jaywant61495@gmail.com',
      address: 'pune'
    }
  ]);

  const [drivers] = useState([
    {
      id: 1,
      driverName: 'jaywant',
      contactNo: '46464',
      alternateContactNo: '654646',
      email: 'ja@gmail.com'
    },
    {
      id: 2,
      driverName: 'fsdf',
      contactNo: 'sfsd',
      alternateContactNo: 'dsfds',
      email: 'sdfdfs@gmail.com'
    },
    {
      id: 52,
      driverName: 'shubham',
      contactNo: 'sdggsd',
      alternateContactNo: 'dgsdg',
      email: 'jaywant61495@gmail.com'
    },
    {
      id: 53,
      driverName: 'gautam',
      contactNo: 'dsfssf',
      alternateContactNo: 'dsfsdf',
      email: 'dfdsf@gmail.com'
    },
    {
      id: 102,
      driverName: 'raja',
      contactNo: '3453333333',
      alternateContactNo: '333434343',
      email: 'ram@gmail.com'
    }
  ]);

  // This would typically come from an API call using the bookingId
  const [bookingDetails] = useState({
    bookingId: 'WTL1745846968701',
    name: 'testing',
    from: 'Pune, Maharashtra, India',
    to: 'Mumbai, Maharashtra, India',
    tripType: 'OneWay',
    startDate: '2025-05-05',
    returnDate: 'N/A',
    time: '23:58',
    amount: '2416',
    gst: '121',
    serviceCharge: '242',
    car: 'Sedan',
    cabDetails: {
      cabId: '1234',
      cabModel: 'Toyota Prius',
      licensePlate: 'XYZ 123'
    },
    driverDetails: {
      driverId: '5678',
      driverName: 'John Doe',
      contactNo: '+1234567890'
    }
  });
  const tripData = [
    { date: "11/22/2021", status: "Completed" },
    { date: "11/15/2021", status: "Pending" },
    { date: "12/05/2021", status: "Cancelled" },
    { date: "01/10/2022", status: "Upcoming" }
  ];

  const [cabs] = useState([
    {
      id: 1,
      vehicleName: 'BMW',
      vehicleRCNo: 'fdsf',
      otherDetails: 's',
      status: 'COMPLETED'
    },
    {
      id: 2,
      vehicleName: 'dsfdsfds',
      vehicleRCNo: 'sdfds',
      otherDetails: 'sdf',
      status: 'PENDING'
    }
  ]);

  const handleAssignVendor = (vendorId) => {
    console.log('Assigning vendor:', vendorId);
    setIsVendorModalOpen(false);
    setSuccessMessage('Vendor assigned successfully!');
    setShowSuccess(true);
  };

  const handleAssignDriver = (driver) => {
    console.log('Assigning driver:', driver.id);
    setAssignedDriver(driver);
    setIsDriverModalOpen(false);
    setIsDriverOpen(true);
    setSuccessMessage('Driver assigned successfully!');
    setShowSuccess(true);
  };

  const handleAssignCab = (cab) => {
    console.log('Assigning cab:', cab.id);
    setAssignedCab(cab);
    setIsCabModalOpen(false);
    setIsCabOpen(true);
    setSuccessMessage('Cab assigned successfully!');
    setShowSuccess(true);
  };

  return (
    <PageLayout title="Booking Details">
      <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          {showSuccess && (
            <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50 animate-fade-in-out">
              {successMessage}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 mb-6">
            <button 
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              onClick={() => setIsVendorModalOpen(true)}
            >
              Assign Vendor
            </button>
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              onClick={() => setIsDriverModalOpen(true)}
            >
              Assign Driver
            </button>
            <button 
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
              onClick={() => setIsCabModalOpen(true)}
            >
              Assign Cab
            </button>
          </div>

          {/* Client's Booking Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Client's Booking Summary</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Booking ID</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{bookingDetails.bookingId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{bookingDetails.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">From</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{bookingDetails.from}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">To</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{bookingDetails.to}</p>
                </div>
             
<div className="space-y-2">
  <p className="text-sm text-gray-500 dark:text-gray-400">Trip Type</p>
  <div className="flex items-center gap-2">
    <select 
      className="text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 rounded-md px-3 py-1 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={`${bookingDetails.date} - ${bookingDetails.status}`}
      onChange={(e) => {
        const [date, status] = e.target.value.split(" - ");
        setBookingDetails({...bookingDetails, date, status});
      }}
    >
      {tripData.map((trip, index) => (
        <option 
          key={index} 
          value={`${trip.date} - ${trip.status}`}
        >
          {trip.date} - {trip.status}
        </option>
      ))}
    </select>
    
    {/* Status indicator */}
    {bookingDetails.status === "Completed" && (
      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
        Completed
      </span>
    )}
    {bookingDetails.status === "Pending" && (
      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
        Pending
      </span>
    )}
    {bookingDetails.status === "Cancelled" && (
      <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
        Cancelled
      </span>
    )}
    {bookingDetails.status === "Upcoming" && (
      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
        Upcoming
      </span>
    )}
  </div>
</div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Start Date</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{bookingDetails.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Return Date</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{bookingDetails.returnDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{bookingDetails.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">₹{bookingDetails.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">GST</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">₹{bookingDetails.gst}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Service Charge</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">₹{bookingDetails.serviceCharge}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Car</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{bookingDetails.car}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Assign Cab Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
            <button
              onClick={() => setIsCabOpen(!isCabOpen)}
              className="w-full px-6 py-4 flex justify-between items-center text-left"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Assign Cab</h2>
              {isCabOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            {isCabOpen && (
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                {assignedCab ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Cab ID</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{assignedCab.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Vehicle Name</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{assignedCab.vehicleName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Vehicle RC.No</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{assignedCab.vehicleRCNo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        assignedCab.status === 'COMPLETED' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {assignedCab.status}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No cab assigned yet. Click "Assign Cab" button to assign a cab.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Assign Driver Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => setIsDriverOpen(!isDriverOpen)}
              className="w-full px-6 py-4 flex justify-between items-center text-left"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Assign Driver</h2>
              {isDriverOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            {isDriverOpen && (
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                {assignedDriver ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Driver ID</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{assignedDriver.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Driver Name</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{assignedDriver.driverName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Contact No</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{assignedDriver.contactNo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{assignedDriver.email}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No driver assigned yet. Click "Assign Driver" button to assign a driver.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vendor Modal */}
      {isVendorModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Assign Vendor</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Vendor Id
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Vendor Company Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Contact No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Assign
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {vendors.map((vendor) => (
                      <tr key={vendor.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {vendor.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {vendor.companyName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {vendor.contactNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {vendor.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {vendor.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          <button
                            onClick={() => handleAssignVendor(vendor.id)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                          >
                            Assign
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsVendorModalOpen(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Driver Modal */}
      {isDriverModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Assign Driver</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Driver Id
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Driver Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Contact No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Alternate Contact No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Assign
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {drivers.map((driver) => (
                      <tr key={driver.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {driver.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {driver.driverName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {driver.contactNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {driver.alternateContactNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {driver.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          <button
                            onClick={() => handleAssignDriver(driver)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                          >
                            Assign
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsDriverModalOpen(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cab Modal */}
      {isCabModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Assign Admin Cab</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Cab Id
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Vehicle Name/Registration No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Vehicle RC.No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Other Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Assign
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {cabs.map((cab) => (
                      <tr key={cab.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {cab.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {cab.vehicleName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {cab.vehicleRCNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {cab.otherDetails}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            cab.status === 'COMPLETED' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {cab.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          <button
                            onClick={() => handleAssignCab(cab)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                          >
                            Assign
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsCabModalOpen(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-20px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
        .animate-fade-in-out {
          animation: fadeInOut 3s ease-in-out;
        }
      `}</style>
    </PageLayout>
  );
};

export default BookingDetailsPage;
