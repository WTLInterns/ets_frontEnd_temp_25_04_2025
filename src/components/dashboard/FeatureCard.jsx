'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

const FeatureCard = ({ title, description, icon, bgColor }) => {
  return (
    <Link href="#" className={`${bgColor} dark:bg-primary-dashboard rounded-lg p-5 shadow-md dark:shadow-gray-800 h-full`}>
      <div className="flex flex-col h-full">
        <div className="mb-4 text-accent-blue">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow">{description}</p>
      </div>
    </Link>
  );
};

export default FeatureCard;
