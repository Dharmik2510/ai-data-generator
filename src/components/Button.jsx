import React from 'react';

const Button = ({ children, variant = "primary", onClick, disabled, className = "" }) => {
  const baseClasses = "flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-300",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 disabled:bg-gray-100 disabled:text-gray-400",
    outline: "border border-gray-300 hover:bg-gray-100 text-gray-800 disabled:text-gray-400"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;