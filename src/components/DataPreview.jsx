import React from 'react';
import { motion } from 'framer-motion';

export const DataPreview = ({ data }) => {
  if (!data) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="bg-white p-4 border border-gray-200 rounded-md shadow-sm overflow-x-auto"
    >
      <h3 className="font-medium text-lg mb-3">Data Preview</h3>
      <table className="min-w-full divide-y divide-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-50">
            {data.headers.map((header, idx) => (
              <th key={idx} className="p-2 text-left font-medium text-gray-700">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.rows.map((row, rowIdx) => (
            <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="p-2 whitespace-nowrap">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};