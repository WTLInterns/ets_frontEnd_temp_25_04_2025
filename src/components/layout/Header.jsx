'use client';

import { useState } from 'react';
import { FiSearch, FiBell, FiX, FiUser } from 'react-icons/fi';

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-gray-900 border-b border-gray-800 shadow-lg">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-10 pl-10 pr-4 text-sm bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700"
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 fancy-icon" />
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3">
        {/* Notifications */}
        <button className="relative p-2 text-gray-300 hover:text-white rounded-full bg-gray-800 border border-gray-700">
          <FiBell size={20} className="text-gray-300 fancy-icon" />
          <span className="absolute top-1 right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-600"></span>
          </span>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 overflow-hidden"
          >
            <FiUser size={20} className="text-white fancy-icon" />
          </button>

          {/* User Menu Modal */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-gray-900 rounded-lg shadow-lg py-2 z-50 border border-gray-800">
              <div className="px-4 py-3 border-b border-gray-800">
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-white">
                      <FiUser size={16} className="fancy-icon" />
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-white">Admin User</div>
                    <div className="text-sm text-gray-400">admin@example.com</div>
                  </div>
                </div>
              </div>
              <div className="py-1">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors">
                  Profile
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors">
                  Settings
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors">
                  Logout
                </button>
              </div>
              <button
                onClick={() => setIsUserMenuOpen(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
              >
                <FiX size={16} className="fancy-icon" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;