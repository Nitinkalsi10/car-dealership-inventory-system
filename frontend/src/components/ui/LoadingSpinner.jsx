import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ label = 'Loading data...', size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex flex-col items-center justify-center p-12 space-y-3 ${className}`}>
      <Loader2 className={`${sizes[size] || sizes.md} text-blue-600 animate-spin`} />
      {label && <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>}
    </div>
  );
};

export default LoadingSpinner;
