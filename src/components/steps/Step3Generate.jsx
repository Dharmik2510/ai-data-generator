import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Check, Download } from 'lucide-react';
import Button from '../Button';

const Step3Generate = ({ 
  files, 
  outputFormat, 
  selectedLLM, 
  temperature, 
  schema, 
  isGenerating, 
  progress, 
  handleGenerate, 
  setCurrentStep 
}) => {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white border border-gray-200 rounded-md shadow-sm text-center">
        <h3 className="font-medium text-lg mb-6">Generate Synthetic Data</h3>
        
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Configuration Summary:</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-md">
            <div className="text-left">
              <p><strong>Files:</strong> {files.length} file(s)</p>
              <p><strong>Output Format:</strong> {outputFormat}</p>
              <p><strong>Export Location:</strong> Local Computer</p>
            </div>
            <div className="text-left">
              <p><strong>Language Model:</strong> {selectedLLM}</p>
              <p><strong>Temperature:</strong> {temperature}</p>
              <p><strong>Schema:</strong> {schema?.name}</p>
            </div>
          </div>
        </div>
        
        {!isGenerating && progress === 0 ? (
          <Button onClick={handleGenerate} className="w-60">
            Generate Data
          </Button>
        ) : !isGenerating && progress === 100 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center text-green-500 gap-2">
              <Check size={24} />
              <span className="font-medium">Generation Complete!</span>
            </div>
            <Button className="w-60">
              <Download size={18} />
              Download Files
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {progress}% Complete
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                />
              </div>
            </div>
            <div className="flex items-center justify-center text-blue-600 gap-2">
              <Loader2 size={20} className="animate-spin" />
              <span>Generating synthetic data...</span>
            </div>
          </div>
        )}
        
        <div className="mt-6 flex justify-center">
          <Button variant="outline" onClick={() => setCurrentStep(2)} disabled={isGenerating}>
            Back to Schema Configuration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step3Generate;