import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Toolbar from './components/Toolbar';
import SyntheticDataGenerator from './pages/SyntheticDataGenerator';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toolbar /> {/* Add the toolbar here */}
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <SyntheticDataGenerator />
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;