'use client';

import { useTheme } from './ThemeProvider';
import { useEffect } from 'react';

export default function ClientLayout({ children }) {
  const { theme, mounted } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen">
        {children}
      </div>
  );
}
