'use client';

import dynamic from 'next/dynamic';

// Lazy-loaded PageLayout component
const PageLayout = dynamic(() => import('@/components/layout/PageLayout'), {
  loading: () => <div className="h-screen w-full  animate-pulse"></div>,
  ssr: false
});

const PageTemplate = ({ title, children }) => {
  return (
    <PageLayout title={title}>
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-800">
          {children || (
            <div className="py-8 text-center">
              <h2 className="text-xl font-semibold mb-4 text-white">
                {title} Page
              </h2>
              <p className="text-gray-300">
                This page is under construction. Content will be added soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default PageTemplate;
