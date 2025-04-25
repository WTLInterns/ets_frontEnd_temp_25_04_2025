'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { FiUpload, FiFile, FiCheck, FiAlertTriangle } from 'react-icons/fi';

// Lazy-loaded PageTemplate component
const PageTemplate = dynamic(() => import('@/components/shared/PageTemplate'), {
  loading: () => <div className="h-screen w-full bg-gray-100 animate-pulse"></div>,
  ssr: false
});

const UploadExcelPage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus(null);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    setUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      setUploadStatus('success');
      // In a real app, you would send the file to your API here
    }, 2000);
  };

  return (
    <PageTemplate title="Upload Excel Sheet">
      <div className="space-y-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Upload Data</h3>
          <p className="text-blue-600 mb-4">
            Upload Excel sheets to import vehicle, driver, or employee data into the system.
            Please use the provided template format for successful imports.
          </p>
          
          <div className="mt-4 space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {file ? (
                <div className="flex items-center justify-center space-x-2">
                  <FiFile size={24} className="text-blue-500" />
                  <span className="text-gray-700 font-medium">{file.name}</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-center">
                    <FiUpload size={36} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500">
                    Drag and drop your Excel file here, or click to browse
                  </p>
                </div>
              )}
              
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            
            <div className="flex items-center mt-4 space-x-4">
              <select className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select data type</option>
                <option value="vehicles">Vehicles</option>
                <option value="drivers">Drivers</option>
                <option value="employees">Employees</option>
              </select>
              
              <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className={`px-4 py-2 rounded-md text-white ${
                  !file || uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                } transition-colors flex items-center`}
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <FiUpload className="mr-2" />
                    Upload File
                  </>
                )}
              </button>
            </div>
            
            {uploadStatus === 'success' && (
              <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md flex items-center">
                <FiCheck className="mr-2" />
                File uploaded successfully! Data is being processed.
              </div>
            )}
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium text-gray-700 mb-2">Download Templates</h4>
            <div className="space-y-2">
              <button className="flex items-center text-blue-600 hover:text-blue-800">
                <FiFile className="mr-2" /> Vehicle Import Template
              </button>
              <button className="flex items-center text-blue-600 hover:text-blue-800">
                <FiFile className="mr-2" /> Driver Import Template
              </button>
              <button className="flex items-center text-blue-600 hover:text-blue-800">
                <FiFile className="mr-2" /> Employee Import Template
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="font-medium text-gray-700">Recent Uploads</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Filename
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">vehicles_import_2025-04-20.xlsx</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Vehicles</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">2025-04-20</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      <FiCheck className="mr-1" /> Completed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">drivers_import_2025-04-18.xlsx</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Drivers</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">2025-04-18</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      <FiAlertTriangle className="mr-1" /> Error
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default UploadExcelPage;
