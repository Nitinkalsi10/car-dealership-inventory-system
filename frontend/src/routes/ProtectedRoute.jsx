import React from 'react';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/Login';

const ProtectedRoute = ({ children, requireAdmin = false, onNavigateLogin }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Login onNavigateLogin={onNavigateLogin} />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="bg-white rounded-lg p-10 text-center border border-slate-200 shadow-sm max-w-lg mx-auto space-y-3 my-8">
        <h3 className="text-lg font-bold text-slate-900">Access Restricted</h3>
        <p className="text-xs text-slate-500">
          This area is reserved for Administrator accounts only.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
