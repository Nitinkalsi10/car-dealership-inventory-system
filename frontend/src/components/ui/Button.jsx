import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold tracking-tight rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary: 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-900 focus:ring-slate-800',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 focus:ring-slate-400',
    success: 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-800 focus:ring-slate-700',
    danger: 'bg-slate-800 hover:bg-red-700 text-white border border-slate-800 focus:ring-slate-700',
    warning: 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-800 focus:ring-slate-700',
    outline: 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 focus:ring-slate-300',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 focus:ring-slate-200',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 min-h-[32px]',
    md: 'text-sm px-4 py-2 gap-2 min-h-[40px]',
    lg: 'text-base px-5 py-2.5 gap-2 min-h-[46px]',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 shrink-0" />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
