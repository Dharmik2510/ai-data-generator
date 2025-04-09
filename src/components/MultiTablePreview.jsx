import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MultiTablePreview = ({ previewData }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="bg-white p-4 border border-gray-200 rounded-md shadow-sm overflow-x-auto"
    >
      <h3 className="font-medium text-lg mb-3">Data Preview</h3>
      
      {/* Table Selection Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        {previewData.tables.map((table, index) => (
          <button
            key={index}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === index
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {table.name}
          </button>
        ))}
      </div>
      
      {/* Active Table Display */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-50">
              {previewData.tables[activeTab].headers.map((header, idx) => (
                <th key={idx} className="px-3 py-2 text-left font-medium text-gray-700">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {previewData.tables[activeTab].rows.map((row, rowIdx) => (
              <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="px-3 py-2 whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Table Count Indicator */}
      <div className="mt-3 text-xs text-gray-500">
        Showing table {activeTab + 1} of {previewData.tables.length}
      </div>
    </motion.div>
  );
};

export default MultiTablePreview;