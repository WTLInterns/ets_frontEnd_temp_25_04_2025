'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiGrid, FiUserPlus, FiUsers, FiTruck, FiPlusCircle, 
  FiLink, FiUpload, FiSettings, FiMenu, FiChevronLeft, 
  FiChevronRight, FiX
} from 'react-icons/fi';
import { FaUsersViewfinder } from "react-icons/fa6";
import { useTheme } from './ThemeProvider';

const Sidebar = () => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef(null);
  const { theme } = useTheme();

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsExpanded(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isMobileMenuOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isMobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    const event = new CustomEvent('sidebarChange', { 
      detail: { expanded: !isExpanded } 
    });
    window.dispatchEvent(event);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Navigation items with fancy colorful icons
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: <FiGrid className="text-purple-500 fancy-icon" size={20} /> 
    },
    { 
      name: 'Online Booking', 
      path: '/online-booking', 
      icon: <FaUsersViewfinder  className="text-green-500 fancy-icon" size={20} /> 
    },
    { 
      name: 'Drivers', 
      path: '/drivers', 
      icon: <FiUsers className="text-cyan-500 fancy-icon" size={20} /> 
    },
    // { 
    //   name: 'Add Vehicles', 
    //   path: '/add-vehicles', 
    //   icon: <FiPlusCircle className="text-pink-500 fancy-icon" size={20} /> 
    // },
    { 
      name: 'Vehicles', 
      path: '/vehicles', 
      icon: <FiTruck className="text-yellow-500 fancy-icon" size={20} /> 
    },
    // { 
    //   name: 'Pairing Vehicle', 
    //   path: '/pairing-vehicle', 
    //   icon: <FiLink className="text-orange-500 fancy-icon" size={20} /> 
    // },
    // { 
    //   name: 'Add Employees', 
    //   path: '/add-employees', 
    //   icon: <FiUserPlus className="text-indigo-500 fancy-icon" size={20} /> 
    // },
    { 
      name: 'Employees', 
      path: '/employees', 
      icon: <FiUsers className="text-red-500 fancy-icon" size={20} /> 
    },
    // { 
    //   name: 'Pairing Employees', 
    //   path: '/pairing-employees', 
    //   icon: <FiLink className="text-teal-500 fancy-icon" size={20} /> 
    // },
    { 
      name: 'Upload Excel Sheet', 
      path: '/upload-excel', 
      icon: <FiUpload className="text-lime-500 fancy-icon" size={20} /> 
    },
    // { 
    //   name: 'Settings', 
    //   path: '/settings', 
    //   icon: <FiSettings className="text-gray-400 fancy-icon" size={20} /> 
    // },
  ];

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        className={`md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white text-gray-700 shadow-lg transition-transform ${
          isMobileMenuOpen ? 'transform translate-x-64' : ''
        }`}
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-gray-700 bg-opacity-30 backdrop-blur-sm z-30 transition-opacity"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside 
        ref={sidebarRef}
        className={`fixed left-0 top-0 h-full transition-all duration-300 z-40 bg-white border-r border-gray-200 ${
          isMobile 
            ? `${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} w-64`
            : `${isExpanded ? 'w-64' : 'w-16'}`
        }
        shadow-xl`}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {(isExpanded || isMobileMenuOpen) ? (
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center text-white font-bold text-xl">
                ETS
              </div>
              <span className="ml-3 font-bold text-xl text-gray-700">ETS</span>
            </div>
          ) : (
            !isMobile && (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center text-white font-bold text-xl mx-auto">
                E
              </div>
            )
          )}
          
          {/* Toggle Button (Desktop only) */}
          {!isMobile && (
            <button
              className="p-1 rounded-full text-gray-600 hover:bg-gray-100"
              onClick={toggleSidebar}
              aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {isExpanded ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 px-2 overflow-y-auto h-[calc(100%-4rem)]">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link 
                    href={item.path}
                    className={`flex items-center py-2 px-3 rounded-lg transition-colors
                              ${isActive 
                                ? 'bg-gray-100 text-gray-700'
                                : 'text-gray-600 hover:text-gray-700 hover:bg-gray-50'
                              }
                              ${(isExpanded || isMobileMenuOpen) ? '' : 'justify-center'}`}
                    title={!(isExpanded || isMobileMenuOpen) ? item.name : ''}
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