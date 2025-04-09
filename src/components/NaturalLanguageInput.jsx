import React, { useState } from 'react';
import { Button } from './Button';

export const NaturalLanguageInput = ({ value, onChange, onSubmit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4 mb-4">
      <h3 className="font-medium text-lg mb-2">Additional Specifications</h3>
      <p className="text-sm text-gray-600 mb-3">
        Provide any additional requirements in natural language (data volume, business rules, DDL statements, etc.)
      </p>
      
      <textarea 
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        rows={isExpanded ? 10 : 4}
        placeholder="Example: Generate 1000 records with valid US phone numbers. Ensure customer IDs follow the pattern CU-XXXXX. Include purchase dates from the last 3 years only."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsExpanded(true)}
      />
      
      <div className="flex justify-between mt-3">
        <button 
          type="button" 
          className="text-sm text-blue-600 hover:text-blue-800"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
        
        <Button onClick={onSubmit} variant="secondary" className="text-sm px-3 py-1">
          Apply Specifications
        </Button>
      </div>
    </div>
  );
};