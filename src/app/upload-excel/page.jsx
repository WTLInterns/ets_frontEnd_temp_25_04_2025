'use client';

import dynamic from 'next/dynamic';
import { useState, useCallback } from 'react';
import { FiUpload, FiFile, FiCheck, FiAlertTriangle, FiDownload } from 'react-icons/fi';

// Lazy-loaded PageTemplate component
const PageTemplate = dynamic(() => import('@/components/shared/PageTemplate'), {
  loading: () => <div className="h-screen w-full bg-white animate-pulse"></div>,
  ssr: false
});

const UploadExcelPage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [dataType, setDataType] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  }, []);

  const validateAndSetFile = (file) => {
    setError('');
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel' // .xls
    ];
    
    if (!validTypes.includes(file.type)) {
      setError('Please upload only Excel files (.xlsx or .xls)');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('File size should be less than 5MB');
      return;
    }
    
    setFile(file);
    setUploadStatus(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !dataType) {
      setError('Please select both a file and data type');
      return;
    }

    try {
      setUploading(true);
      setError('');
      
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUploadStatus('success');
      setFile(null);
      setDataType('');
    } catch (err) {
      setError('Upload failed. Please try again.');
      setUploadStatus('error');
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = (type) => {
    // In a real app, this would trigger a file download
    console.log(`Downloading ${type} template`);
  };

  return (
    <PageTemplate title="Upload Excel Sheet">
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Upload Data</h3>
          <p className="text-gray-600 mb-8">
            Upload Excel sheets to import vehicle, driver, or employee data into the system.
            Please use the provided template format for successful imports.
          </p>
          
          <div className="space-y-6">
            <div 
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
                ${dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-gray-50'}
                ${error ? 'border-red-200' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {file ? (
                <div className="flex items-center justify-center space-x-3">
                  <FiFile size={24} className="text-gray-600" />
                  <span className="text-gray-700 font-medium">{file.name}</span>
                  <button 
                    onClick={() => setFile(null)}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <FiUpload size={40} className={dragActive ? 'text-blue-500' : 'text-gray-400'} />
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">
                      Drag and drop your Excel file here
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      or click to browse from your computer
                    </p>
                  </div>
                </div>
              )}
              
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-md flex items-center border border-red-100">
                <FiAlertTriangle className="mr-2" />
                {error}
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <select 
                value={dataType}
                onChange={(e) => setDataType(e.target.value)}
                className="flex-1 sm:flex-none p-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
              >
                <option value="">Select data type</option>
                <option value="vehicles">Vehicles</option>
                <option value="drivers">Drivers</option>
                <option value="employees">Employees</option>
              </select>
              
              <button
                onClick={handleUpload}
                disabled={!file || !dataType || uploading}
                className={`flex-1 sm:flex-none px-6 py-2.5 rounded-md text-white ${
                  !file || !dataType || uploading 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } transition-colors flex items-center justify-center font-medium`}
              >
                {uploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
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
              <div className="p-3 bg-green-50 text-green-600 rounded-md flex items-center border border-green-100">
                <FiCheck className="mr-2" />
                File uploaded successfully! Data is being processed.
              </div>
            )}
          </div>
          
          <div className="mt-8 border-t border-gray-100 pt-6">
            <h4 className="font-medium text-gray-700 mb-4">Download Templates</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['Vehicle', 'Driver', 'Employee'].map((type) => (
                <button
                  key={type}
                  onClick={() => downloadTemplate(type)}
                  className="flex items-center justify-center p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors border border-gray-200"
                >
                  <FiDownload className="mr-2" />
                  {type} Import Template
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
            <h3 className="text-lg font-medium text-gray-700">Recent Uploads</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
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
              <tbody className="bg-white divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiFile className="text-gray-400 mr-2" />
                      <div className="text-sm font-medium text-gray-700">vehicles_import_2025-04-20.xlsx</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Vehicles</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">2025-04-20</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-50 text-green-600 border border-green-100">
                      <FiCheck className="mr-1" /> Completed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiFile className="text-gray-400 mr-2" />
                      <div className="text-sm font-medium text-gray-700">drivers_import_2025-04-18.xlsx</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Drivers</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">2025-04-18</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-50 text-red-600 border border-red-100">
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
