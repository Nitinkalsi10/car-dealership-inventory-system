import React from 'react';
import {
    LayoutDashboard,
    Car,
    PlusCircle,
    Boxes,
    Settings,
    LogOut,
    X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ activePage, onNavigate, isMobileOpen, onCloseMobile }) => {
    const { user, isAdmin, logout } = useAuth();

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, adminOnly: false },
        { id: 'vehicles', label: 'Vehicles Catalog', icon: Car, adminOnly: false },
        { id: 'add-vehicle', label: 'Add Vehicle', icon: PlusCircle, adminOnly: true },
        { id: 'inventory', label: 'Inventory Management', icon: Boxes, adminOnly: false },
        { id: 'settings', label: 'Settings', icon: Settings, adminOnly: false },
    ];

    const handleNavClick = (id) => {
        onNavigate(id);
        if (onCloseMobile) onCloseMobile();
    };

    return (
        <>
            {/* Mobile Backdrop Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/70 z-40 md:hidden transition-opacity"
                    onClick={onCloseMobile}
                />
            )}

            {/* Sidebar Drawer */}
            <aside
                className={`w-64 bg-white dark:bg-slate-900 text-slate-900 dark:text-white min-h-screen flex flex-col justify-between p-4 fixed left-0 top-0 bottom-0 z-50 border-r border-slate-200 dark:border-slate-800 transition-transform duration-200 ease-in-out md:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                    }`}
            >
                {/* Brand Header */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2 py-2 border-b border-slate-200 dark:border-slate-800 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center font-bold text-base shrink-0 border border-slate-800 dark:border-slate-700">
                                C
                            </div>
                            <div>
                                <h1 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">AutoSphere</h1>
                                <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Dealership</p>
                            </div>
                        </div>

                        {/* Close Button on Mobile */}
                        <button
                            onClick={onCloseMobile}
                            className="p-1 rounded text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white md:hidden"
                            aria-label="Close sidebar"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="space-y-1">
                        <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                            Navigation
                        </div>
                        {navItems.map((item) => {
                            if (item.adminOnly && !isAdmin) return null;
                            const Icon = item.icon;
                            const isActive = activePage === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-bold transition-colors cursor-pointer ${isActive
                                            ? 'bg-slate-900 text-white dark:bg-slate-800 dark:text-white border border-slate-900 dark:border-slate-700'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                                        }`}
                                >
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                                    <span>{item.label}</span>
                                    {item.adminOnly && (
                                        <span className="ml-auto text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                                            Admin
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* User Profile Card & Logout */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                    {user ? (
                        <div className="bg-slate-50 dark:bg-slate-800/80 rounded-md p-2.5 border border-slate-200 dark:border-slate-700 flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name || 'Dealership User'}</p>
                                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                                    {isAdmin ? 'Admin' : 'Customer'}
                                </span>
                            </div>
                        </div>
                    ) : null}

                    <button
                        onClick={() => {
                            logout();
                            if (onCloseMobile) onCloseMobile();
                        }}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
