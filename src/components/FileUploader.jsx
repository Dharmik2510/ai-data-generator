import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { motion } from 'framer-motion';

export const FileUploader = ({ files, onFilesSelected }) => {
  const fileInputRef = useRef(null);
  
  return (
    <div className="space-y-4">
      <div 
        className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer" 
        onClick={() => fileInputRef.current.click()}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Upload Files</h3>
        <p className="mt-1 text-xs text-gray-500">Click to browse or drag and drop</p>
        <input 
          type="file" 
          multiple 
          ref={fileInputRef} 
          onChange={onFilesSelected} 
          className="hidden" 
        />
      </div>
      
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
    </div>
  );
};
