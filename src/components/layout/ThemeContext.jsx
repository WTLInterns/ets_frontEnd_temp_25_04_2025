'use client';

import { useTheme } from './';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      aria-label={`Toggle ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  );
}