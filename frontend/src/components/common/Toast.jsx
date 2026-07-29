import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const Toast = () => {
  const { toast, hideToast } = useToast();

  if (!toast) return null;

  const { type, title, message } = toast;

  const config = {
    success: {
      bg: 'bg-slate-900 text-white border-slate-800',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
      accent: 'bg-emerald-500',
    },
    error: {
      bg: 'bg-slate-900 text-white border-slate-800',
      icon: <XCircle className="w-5 h-5 text-red-400 shrink-0" />,
      accent: 'bg-red-500',
    },
    warning: {
      bg: 'bg-slate-900 text-white border-slate-800',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
      accent: 'bg-amber-500',
    },
    info: {
      bg: 'bg-slate-900 text-white border-slate-800',
      icon: <Info className="w-5 h-5 text-blue-400 shrink-0" />,
      accent: 'bg-blue-500',
    },
  }[type] || {
    bg: 'bg-slate-900 text-white border-slate-800',
    icon: <Info className="w-5 h-5 text-blue-400 shrink-0" />,
    accent: 'bg-blue-500',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-fade-in px-4 pointer-events-auto">
      <div className={`relative flex items-start gap-3 p-4 rounded-md border shadow-lg ${config.bg}`}>
        <div className={`absolute top-0 left-0 bottom-0 w-1 rounded-l-md ${config.accent}`} />

        <div className="pt-0.5">{config.icon}</div>

        <div className="flex-1 pr-2">
          {title && <h4 className="font-bold text-sm text-white mb-0.5">{title}</h4>}
          {message && <p className="text-xs text-slate-300 leading-normal">{message}</p>}
        </div>

        <button
          onClick={hideToast}
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
