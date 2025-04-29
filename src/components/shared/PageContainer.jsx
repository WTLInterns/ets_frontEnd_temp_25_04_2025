'use client';

import { useTheme } from '../layout/ThemeProvider';

export default function PageContainer({ children, className = '' }) {
  const { theme } = useTheme();

  return (
    <div className={`p-6 rounded-lg transition-colors duration-200 ${
      theme === 'dark'
        ? 'bg-gray-800 text-gray-100'
        : 'bg-white text-gray-900'
    } ${className}`}>
      {children}
    </div>
  );
}
