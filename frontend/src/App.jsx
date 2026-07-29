import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { VehicleProvider } from './context/VehicleContext';
import MainLayout from './layouts/MainLayout';
import AppRoutes from './routes/AppRoutes';
import Login from './pages/Login';
import Register from './pages/Register';

const MainAppContent = () => {
  const { isAuthenticated } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');
  const [authView, setAuthView] = useState('login'); // 'login' | 'register'

  // If user is not authenticated, show Login or Register page
  if (!isAuthenticated) {
    if (authView === 'register') {
      return (
        <Register
          onNavigateLogin={() => setAuthView('login')}
          onRegisterSuccess={() => setAuthView('login')}
        />
      );
    }
    return (
      <Login
        onNavigateRegister={() => setAuthView('register')}
        onLoginSuccess={() => setActivePage('dashboard')}
      />
    );
  }

  // Once authenticated, show full MainLayout with Sidebar, Top Navbar & Routes
  return (
    <MainLayout activePage={activePage} onNavigate={setActivePage}>
      <AppRoutes activePage={activePage} onNavigate={setActivePage} />
    </MainLayout>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <VehicleProvider>
          <MainAppContent />
        </VehicleProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
