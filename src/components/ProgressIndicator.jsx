import React from 'react';
import { Check } from 'lucide-react'; 

const ProgressIndicator = ({ currentStep }) => {
  const steps = [
    { num: 1, title: "File Upload" },
    { num: 2, title: "Schema Configuration" },
    { num: 3, title: "Generate Data" }
  ];
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.num}>
            {/* Step circle */}
            <div className="relative flex flex-col items-center">
              <div 
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 
                  ${currentStep === step.num 
                    ? 'border-blue-600 bg-blue-600 text-white' 
                    : currentStep > step.num 
                      ? 'border-blue-600 bg-white text-blue-600' 
                      : 'border-gray-300 bg-white text-gray-400'
                  }`}
              >
                {currentStep > step.num ? <Check size={20} /> : step.num}
              </div>
              <div className="mt-2 text-sm font-medium text-gray-600">{step.title}</div>
            </div>
            
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4 h-0.5 bg-gray-200 relative">
                <div 
                  className="absolute inset-0 bg-blue-600 transition-all duration-500"
                  style={{ width: currentStep > index + 1 ? '100%' : currentStep === index + 1 ? '50%' : '0%' }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;