import React from 'react';
import { Car } from 'lucide-react';
import Button from './Button';

const EmptyState = ({
  icon: Icon = Car,
  title = 'No items found',
  description = 'There are no vehicles matching your search criteria or the inventory is empty.',
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg p-8 text-center border border-slate-200 shadow-sm max-w-md mx-auto space-y-4 my-6 ${className}`}>
      <div className="w-12 h-12 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
        <Icon className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
