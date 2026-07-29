import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null); // { type: 'success'|'error'|'info', title, message }

    const showToast = useCallback(({ type = 'info', title, message, duration = 4000 }) => {
        setToast({ type, title, message, id: Date.now() });

        if (duration > 0) {
            setTimeout(() => {
                setToast((current) => (current?.id === current?.id ? null : current));
            }, duration);
        }
    }, []);

    const hideToast = useCallback(() => {
        setToast(null);
    }, []);

    return (
        <ToastContext.Provider value={{ toast, showToast, hideToast }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export default ToastContext;
