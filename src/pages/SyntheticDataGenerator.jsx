import React, { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Upload, AlertCircle } from 'lucide-react';
import Button from '../components/Button';
import Snackbar from '../components/Snackbar';
import ProgressIndicator from '../components/ProgressIndicator';
import Step1Upload from '../components/steps/Step1Upload';
import Step2Schema from '../components/steps/Step2Schema';
import Step3Generate from '../components/steps/Step3Generate';

export default function SyntheticDataGenerator() {
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [outputFormat, setOutputFormat] = useState('CSV');
  const [selectedLLM, setSelectedLLM] = useState('Azure OpenAI');
  const [temperature, setTemperature] = useState(0.7);
  const [schema, setSchema] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [snackbar, setSnackbar] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [userSpecifications, setUserSpecifications] = useState('');

  const fileInputRef = useRef(null);
  
  // Handlers
  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    
    setSnackbar({
      message: `${selectedFiles.length} file(s) selected successfully`,
      type: 'success'
    });
    
    setTimeout(() => {
      setSchema({
        name: 'Customer Data',
        fields: [
          { name: 'id', type: 'string', description: 'Unique identifier' },
          { name: 'fullName', type: 'string', description: 'Customer full name' },
          { name: 'email', type: 'string', description: 'Email address' },
          { name: 'age', type: 'number', description: 'Age in years' },
          { name: 'purchaseHistory', type: 'array', description: 'Previous purchases' }
        ]
      });
    }, 1000);
  };
  
  const handlePreview = () => {
    setPreviewData({
        tables: [
          {
            name: "Customers",
            headers: ['id', 'name', 'email'],
            rows: [
              ['1', 'John Doe', 'john@example.com'],
              ['2', 'Jane Smith', 'jane@example.com']
            ]
          },
          {
            name: "Orders",
            headers: ['order_id', 'customer_id', 'amount'],
            rows: [
              ['101', '1', '129.99'],
              ['102', '2', '89.99']
            ]
          }
        ]
      });
    
    setSnackbar({
      message: 'Preview generated successfully!',
      type: 'success'
    });
  };
  
  const handleGenerate = () => {
    setIsGenerating(true);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setSnackbar({
            message: 'Data generation completed!',
            type: 'success'
          });
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };
  
  const closeSnackbar = () => {
    setSnackbar(null);
  };
  
  const renderCurrentStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <Step1Upload 
            files={files}
            fileInputRef={fileInputRef}
            handleFileUpload={handleFileUpload}
            outputFormat={outputFormat}
            setOutputFormat={setOutputFormat}
            schema={schema}
            setCurrentStep={setCurrentStep}
            setUserSpecifications={setUserSpecifications}
          />
        );
      case 2:
        return (
          <Step2Schema 
            schema={schema}
            selectedLLM={selectedLLM}
            setSelectedLLM={setSelectedLLM}
            temperature={temperature}
            setTemperature={setTemperature}
            handlePreview={handlePreview}
            setCurrentStep={setCurrentStep}
            previewData={previewData}
          />
        );
      case 3:
        return (
          <Step3Generate 
            files={files}
            outputFormat={outputFormat}
            selectedLLM={selectedLLM}
            temperature={temperature}
            schema={schema}
            isGenerating={isGenerating}
            progress={progress}
            handleGenerate={handleGenerate}
            setCurrentStep={setCurrentStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Synthetic Data Generator</h1>
        <p className="text-gray-600">Generate high-quality synthetic data from your existing schemas</p>
      </div>
      
      <ProgressIndicator currentStep={currentStep} />
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        {renderCurrentStep()}
      </div>
      
      <AnimatePresence>
        {snackbar && (
          <Snackbar 
            message={snackbar.message}
            type={snackbar.type}
            onClose={closeSnackbar}
          />
        )}
      </AnimatePresence>
    </div>
  );
}