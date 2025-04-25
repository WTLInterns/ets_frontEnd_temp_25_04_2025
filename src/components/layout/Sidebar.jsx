'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiGrid, 
  FiUserPlus, 
  FiUsers, 
  FiTruck, 
  FiPlusCircle, 
  FiLink, 
  FiUpload, 
  FiSettings,
  FiMenu,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

const Sidebar = () => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    // Dispatch custom event for other components to listen to
    const event = new CustomEvent('sidebarChange', { 
      detail: { expanded: !isExpanded } 
    });
    window.dispatchEvent(event);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Navigation items with fancy colorful icons
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: <FiGrid className="text-purple-500 fancy-icon" size={20} /> 
    },
    { 
      name: 'Add Drivers', 
      path: '/add-drivers', 
      icon: <FiUserPlus className="text-green-500 fancy-icon" size={20} /> 
    },
    { 
      name: 'Drivers', 
      path: '/drivers', 
      icon: <FiUsers className="text-cyan-500 fancy-icon" size={20} /> 
    },
    { 
      name: 'Add Vehicles', 
      path: '/add-vehicles', 
      icon: <FiPlusCircle className="text-pink-500 fancy-icon" size={20} /> 
    },
    { 
      name: 'Vehicles', 
      path: '/vehicles', 
      icon: <FiTruck className="text-yellow-500 fancy-icon" size={20} /> 
    },
    { 
      name: 'Pairing Vehicle', 
      path: '/pairing-vehicle', 
      icon: <FiLink className="text-orange-500 fancy-icon" size={20} /> 
    },
    { 
      name: 'Add Employees', 
      path: '/add-employees', 
      icon: <FiUserPlus className="text-indigo-500 fancy-icon" size={20} /> 
    },
    { 
      name: 'Employees', 
      path: '/employees', 
      icon: <FiUsers className="text-red-500 fancy-icon" size={20} /> 
    },
    { 
      name: 'Pairing Employees', 
      path: '/pairing-employees', 
      icon: <FiLink className="text-teal-500 fancy-icon" size={20} /> 
    },
    { 
      name: 'Upload Excel Sheet', 
      path: '/upload-excel', 
      icon: <FiUpload className="text-lime-500 fancy-icon" size={20} /> 
    },
    { 
      name: 'Settings', 
      path: '/settings', 
      icon: <FiSettings className="text-gray-400 fancy-icon" size={20} /> 
    },
  ];

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white"
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`sidebar fixed left-0 top-0 h-full transition-all duration-300 z-40
                   ${isMobileMenuOpen ? 'w-64 translate-x-0' : isExpanded ? 'w-64' : 'w-16'} 
                   ${isMobileMenuOpen ? 'translate-x-0' : !isExpanded && !isMobileMenuOpen ? 'translate-x-0' : 'translate-x-0'}`}
        onClick={() => {
          if (!isExpanded && !isMobileMenuOpen) {
            toggleSidebar();
          }
        }}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
          {(isExpanded || isMobileMenuOpen) && (
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                ETS
              </div>
              <span className="ml-3 text-white font-bold text-xl">ETS</span>
            </div>
          )}
          
          {/* Toggle Button (Desktop only) */}
          <button
            className={`hidden md:block text-white p-1 rounded-full hover:bg-gray-700 ${!isExpanded && !isMobileMenuOpen ? 'mx-auto' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleSidebar();
            }}
            aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isExpanded ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 px-2">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link 
                    href={item.path}
                    className={`sidebar-item flex items-center py-2 px-3 rounded-lg transition-colors
                              ${isActive 
                                ? 'active text-white' 
                                : 'text-gray-400 hover:text-white'
                              }`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    
                    {(isExpanded || isMobileMenuOpen) && (
                      <span className="ml-3 font-medium">{item.name}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;