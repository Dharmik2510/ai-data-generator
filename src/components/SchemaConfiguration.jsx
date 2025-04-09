import React from 'react';
import { Dropdown } from './Dropdown';
import { Button } from './Button';
import { PlayCircle } from 'lucide-react';

export const SchemaConfiguration = ({ 
  schema, 
  selectedLLM, 
  setSelectedLLM, 
  temperature, 
  setTemperature, 
  onPreview, 
  onBack, 
  onContinue,
  llmOptions
}) => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-md shadow-sm">
      <h3 className="font-medium text-lg mb-3">Schema Configuration</h3>
      
      {schema && (
        <div className="space-y-4">
          <div className="p-3 bg-gray-50 rounded-md">
            <h4 className="font-medium text-gray-800">{schema.name}</h4>
            <table className="w-full mt-2 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2">Field</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {schema.fields.map((field, idx) => (
                  <tr key={idx} className="border-t border-gray-200">
                    <td className="p-2">{field.name}</td>
                    <td className="p-2">{field.type}</td>
                    <td className="p-2">{field.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language Model</label>
              <Dropdown 
                label="Select LLM" 
                value={selectedLLM}
                options={llmOptions}
                onChange={setSelectedLLM}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Temperature ({temperature})</label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1" 
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-4 flex gap-3">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onPreview}>
          <PlayCircle size={18} />
          Preview Sample Data
        </Button>
        <Button onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};
