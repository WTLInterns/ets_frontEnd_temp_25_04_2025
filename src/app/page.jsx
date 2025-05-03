'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to dashboard page
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <div className="inline-block w-16 h-16 mb-4 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        <h1 className="text-2xl font-bold text-white">Loading ETS Dashboard...</h1>
      </div>
    </div>
  );
}
