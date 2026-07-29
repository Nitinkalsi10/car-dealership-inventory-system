import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import Toast from '../components/common/Toast';
import api from '../services/api';

const MainLayout = ({ activePage, onNavigate, children }) => {
    const [isConnected, setIsConnected] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const checkConnection = async () => {
            try {
                await api.get('/vehicles');
                setIsConnected(true);
            } catch {
                setIsConnected(false);
            }
        };
        checkConnection();
        const interval = setInterval(checkConnection, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex selection:bg-blue-600 selection:text-white">
            {/* Sidebar - Fixed on desktop, Drawer overlay on mobile */}
            <Sidebar
                activePage={activePage}
                onNavigate={onNavigate}
                isMobileOpen={isMobileOpen}
                onCloseMobile={() => setIsMobileOpen(false)}
            />

            {/* Main Content Section */}
            <div className="flex-1 ml-0 md:ml-64 flex flex-col min-h-screen min-w-0">
                {/* Top Navbar */}
                <Navbar
                    activePage={activePage}
                    onNavigate={onNavigate}
                    onToggleMobileSidebar={() => setIsMobileOpen(!isMobileOpen)}
                />

                {/* Dynamic Page Workspace */}
                <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto space-y-6 animate-fade-in min-w-0">
                    {children}
                </main>

                {/* Footer with Connection Status */}
                <footer className="border-t border-slate-200 bg-white py-4 mt-8 px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
                        <p className="text-center sm:text-left">© 2026 Car Dealership Inventory System</p>

                        {/* Connection Status at the bottom */}
                        <div className="flex items-center gap-2 border border-slate-200 rounded px-2.5 py-1 bg-slate-50">
                            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-red-500'}`} />
                            <span className="font-semibold text-slate-700">Connection Status:</span>
                            <span className={isConnected ? 'text-emerald-700 font-bold' : 'text-red-700 font-bold'}>
                                {isConnected ? 'Backend Connected' : 'Disconnected'}
                            </span>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Toast Notification Container */}
            <Toast />
        </div>
    );
};

export default MainLayout;
