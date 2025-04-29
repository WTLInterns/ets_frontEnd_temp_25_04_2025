'use client';

import ThemeProvider from './ThemeProvider';
import ClientLayout from './ClientLayout';

export default function ThemeWrapper({ children }) {
  return (
    <ThemeProvider>
      <ClientLayout>{children}</ClientLayout>
    </ThemeProvider>
  );
}
