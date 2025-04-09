import React from 'react';
import { Sparkles } from 'lucide-react';

const Toolbar = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Sparkles className="h-6 w-6 text-yellow-300" />
            <h1 className="text-white text-xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-100">
                AI-Powered Data Generator
              </span>
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-yellow-200 transition-colors">
              Documentation
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Toolbar;