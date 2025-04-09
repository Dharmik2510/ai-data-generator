import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, HelpCircle } from 'lucide-react';
import Button from '../Button';
import Dropdown from '../Dropdown';

const Step1Upload = ({ 
  files, 
  fileInputRef, 
  handleFileUpload, 
  outputFormat, 
  setOutputFormat, 
  schema,
  setCurrentStep,
  setUserSpecifications // Add this to props
}) => {
  const fileFormats = ['CSV', 'JSON', 'XML', 'Excel'];
  const [specifications, setSpecifications] = useState(''); // Local state
  
  const handleSpecificationsChange = (e) => {
    setSpecifications(e.target.value);
    setUserSpecifications(e.target.value); // Lift state up if needed
  };

  return (
    <div className="space-y-6">
      {/* File Upload Section */}
      <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer" 
           onClick={() => fileInputRef.current.click()}>
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Upload Files</h3>
        <p className="mt-1 text-xs text-gray-500">Click to browse or drag and drop</p>
        <input 
          type="file" 
          multiple 
          ref={fileInputRef} 
          onChange={handleFileUpload} 
          className="hidden" 
        />
      </div>
      
      {/* Specifications Textarea */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Additional Specifications
          </label>
          <HelpCircle size={16} className="text-gray-400" />
        </div>
        <textarea
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter DDL, business rules, data volume requirements, or any other specifications..."
          value={specifications}
          onChange={handleSpecificationsChange}
        />
        <p className="text-xs text-gray-500">
          Example: "Generate 10,000 records with realistic customer data including emails, phone numbers, and purchase history"
        </p>
      </div>

      {/* Selected Files */}
      {files.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-blue-50 rounded-md"
        >
          <h3 className="font-medium text-blue-800">Selected Files ({files.length})</h3>
          <ul className="mt-2 text-sm">
            {files.map((file, index) => (
              <li key={index} className="text-gray-700">{file.name}</li>
            ))}
          </ul>
        </motion.div>
      )}
      
      {/* Output Format Selection */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Output Format</label>
          <Dropdown 
            label="Select Format" 
            value={outputFormat}
            options={fileFormats}
            onChange={setOutputFormat}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Export Location</label>
          <div className="p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
            Local Computer
          </div>
        </div>
      </div>
      
      <Button 
        onClick={() => schema && setCurrentStep(2)}
        disabled={!schema}
        className="w-full"
      >
        {schema ? 'Continue to Schema Configuration' : 'Upload files to continue'}
      </Button>
    </div>
  );
};

export default Step1Upload;