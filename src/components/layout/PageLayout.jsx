'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy-loaded components with loading fallbacks
const Header = dynamic(() => import('@/components/layout/Header'), {
  loading: () => <div className="h-16 bg-gray-900 animate-pulse"></div>,
  ssr: false
});

const Sidebar = dynamic(() => import('@/components/layout/Sidebar'), {
  loading: () => <div className="fixed left-0 top-0 w-20 h-screen bg-gray-900 animate-pulse"></div>,
  ssr: false
});

const PageLayout = ({ children, title, isDashboard = false }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true); // Default to expanded
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true);
    
    // Check if we're on mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    // Initial check
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Listen for sidebar expansion events
  useEffect(() => {
    const handleSidebarChange = (e) => {
      setSidebarExpanded(e.detail.expanded);
    };

    // Create a custom event listener
    window.addEventListener('sidebarChange', handleSidebarChange);

    return () => {
      window.removeEventListener('sidebarChange', handleSidebarChange);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-screen bg-white">
        <div className="fixed left-0 top-0 w-20 h-screen bg-gray-900"></div>
        <div className="flex-1 pl-20">
          <div className="h-16 bg-gray-900"></div>
          <div className="p-4 md:p-6">
            <div className="h-8 w-48 bg-gray-800 rounded mb-6"></div>
            <div className="animate-pulse">{children}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-full z-40">
        <Suspense fallback={<div className="fixed left-0 top-0 w-20 h-screen bg-gray-900 animate-pulse"></div>}>
          <Sidebar />
        </Suspense>
      </div>

      {/* Main Content */}
      <div 
        className={`flex-1 flex flex-col w-full transition-all duration-300 ${
          sidebarExpanded && !isMobile ? 'md:ml-64' : 'md:ml-20'
        }`}
      >
        {/* Fixed Header */}
        <div className="sticky top-0 z-30 w-full">
          <Suspense fallback={<div className="h-16 bg-gray-900 animate-pulse"></div>}>
            <Header />
          </Suspense>
        </div>

        {/* Page Content */}
        <main 
          className={`flex-1 p-4 md:p-6 overflow-auto ${
            isDashboard ? 'bg-white' : 'bg-white'
          }`}
        >
          {title && (
            <h1 className="text-2xl font-bold mb-6 text-white">{title}</h1>
          )}
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageLayout;