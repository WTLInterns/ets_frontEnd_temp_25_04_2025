'use client';

import { useState } from 'react';
import { FiSearch, FiBell, FiX, FiUser, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from './ThemeProvider';

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b border-gray-200 shadow-lg transition-colors duration-200">
      {/* Search */}
      <div className="relative w-full max-w-md">
        {/* <input
          type="text"
          placeholder="Search..."
          className="w-full h-10 pl-10 pr-4 text-sm bg-gray-50 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 border border-gray-200"
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" /> */}
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3">
        {/* Theme Toggle */}
        {/* <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-50 text-gray-600 hover:text-gray-700 border border-gray-200 transition-colors duration-200"
          aria-label={`Toggle ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button> */}

        {/* Notifications */}
        <button className="relative p-2 rounded-full bg-gray-50 text-gray-600 hover:text-gray-700 border border-gray-200">
          <FiBell size={20} />
          <span className="absolute top-1 right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
          </span>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-400 overflow-hidden"
          >
            <FiUser size={20} className="text-white" />
          </button>

          {/* User Menu Modal */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg py-2 z-50 border border-gray-200 bg-white">
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-400 flex items-center justify-center text-white">
                      <FiUser size={16} />
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-700">Admin User</div>
                    <div className="text-sm text-gray-500">admin@example.com</div>
                  </div>
                </div>
              </div>
              <div className="py-1">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 transition-colors">
                  Profile
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 transition-colors">
                  Settings
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 transition-colors">
                  Logout
                </button>
              </div>
              <button
                onClick={() => setIsUserMenuOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <FiX size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;