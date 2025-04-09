import React from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle, FileText, X } from 'lucide-react';

const Snackbar = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  const Icon = type === 'success' ? Check : type === 'error' ? AlertCircle : FileText;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed bottom-4 right-4 ${bgColor} text-white p-4 rounded-md shadow-lg flex items-center gap-3 max-w-md`}
    >
      <Icon size={20} />
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="text-white hover:text-gray-200">
        <X size={18} />
      </button>
    </motion.div>
  );
};

export default Snackbar;