'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { FiSun, FiMoon, FiTrash2, FiEdit, FiMoreVertical } from 'react-icons/fi';
import { useTheme } from '@/components/layout/ThemeProvider';
import { useRouter } from 'next/navigation';

// Lazy-loaded PageTemplate component
const PageLayout = dynamic(() => import('@/components/layout/PageLayout'), {
    loading: () => <div className="h-screen bg-gray-100 dark:bg-primary animate-pulse"></div>,
    ssr: false
  });

const BookingsPage = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [bookings, setBookings] = useState([
    {
      id: 1,
      bookingId: 'WTL1745846968701',
      userName: 'testing',
      fromLocation: 'Pune, Maharashtra, India',
      toLocation: 'Mumbai, Maharashtra, India',
      tripType: 'OneWay',
      startDate: '2025-05-05',
      returnDate: '',
      time: '23:58',
      amount: '2416',
      status: 'Pending'
    },
    {
      id: 2,
      bookingId: 'WTL1745837658620',
      userName: 'ram',
      fromLocation: 'Pune, Maharashtra, India',
      toLocation: 'Mumbai, Maharashtra, India',
      tripType: 'OneWay',
      startDate: '2025-04-28',
      returnDate: '',
      time: '19:22',
      amount: '2114',
      status: 'Pending'
    },
    {
      id: 3,
      bookingId: 'WTL1745664214513',
      userName: 'Abhishek Pattekari',
      fromLocation: 'Office No. 007, 2nd Floor, A Wing City Vista, Fountain Road, Ashoka Nagar, Kharadi, Pune, Maharashtra 411014',
      toLocation: 'Munnar, Kerala, India',
      tripType: 'OneWay',
      startDate: '2025-04-26',
      returnDate: '',
      time: '4:13 PM',
      amount: '18509',
      status: 'Pending'
    }
  ]);

  const handleDelete = (id) => {
    // Implement delete functionality
    console.log('Delete booking:', id);
  };

  const handleActionClick = (bookingId) => {
    router.push(`/online-booking/vendor/${bookingId}`);
  };

  return (
    <PageLayout title="Employees">
      <div className="min-h-screen p-4 md:p-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-700">Booking Management</h1>
          </div>

          {/* Mobile Cards (hidden on md and larger screens) */}
          <div className="md:hidden space-y-4">
            {bookings.map((booking, index) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      booking.status === 'Pending' 
                        ? 'bg-yellow-50 text-yellow-700' 
                        : 'bg-green-50 text-green-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Booking ID</p>
                    <p className="text-sm font-medium text-gray-700">{booking.bookingId}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">User</p>
                      <p className="text-sm text-gray-700 truncate">{booking.userName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="text-sm text-gray-700">₹{booking.amount}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">From</p>
                    <p className="text-sm text-gray-700 line-clamp-2">{booking.fromLocation}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">To</p>
                    <p className="text-sm text-gray-700">{booking.toLocation}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="text-sm text-gray-700">{booking.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="text-sm text-gray-700">{booking.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="p-2 text-red-500 hover:text-red-600"
                      title="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                    <button
                      className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-200"
                      title="Action"
                      onClick={() => handleActionClick(booking.bookingId)}
                    >
                      Action
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table (hidden on mobile) */}
          <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking, index) => (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{index + 1}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                        <span className="truncate max-w-[120px] inline-block">{booking.bookingId}</span>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600 max-w-[100px] truncate">
                        {booking.userName}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-600 max-w-[150px] truncate">
                        {booking.fromLocation}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600 max-w-[120px] truncate">
                        {booking.toLocation}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">
                        {booking.startDate}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">
                        {booking.time}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">
                        ₹{booking.amount}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === 'Pending' 
                            ? 'bg-yellow-50 text-yellow-700' 
                            : 'bg-green-50 text-green-700'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleDelete(booking.id)}
                            className="p-1 text-red-500 hover:text-red-600"
                            title="Delete"
                          >
                            <FiTrash2 size={18} />
                          </button>
                          <button
                            className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-200"
                            title="Action"
                            onClick={() => handleActionClick(booking.bookingId)}
                          >
                            Action
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BookingsPage;
