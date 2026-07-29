import React, { useState } from 'react';
import { Search, ChevronDown, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useVehicles } from '../../context/VehicleContext';

const pageTitles = {
    dashboard: 'Dashboard',
    vehicles: 'Vehicle Catalog',
    'add-vehicle': 'Add Vehicle',
    inventory: 'Inventory Management',
    settings: 'Settings',
};

const Navbar = ({ activePage, onNavigate, onToggleMobileSidebar }) => {
    const { user, logout } = useAuth();
    const { filters, updateFilters } = useVehicles();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const title = pageTitles[activePage] || 'Dealership Inventory';

    return (
        <header className="sticky top-0 z-20 bg-slate-900 px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-slate-800">
            {/* Left: Mobile Menu Toggle Button + Page Title */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onToggleMobileSidebar}
                    className="p-1.5 rounded-md border border-slate-700 text-slate-200 hover:bg-slate-800 md:hidden cursor-pointer"
                    aria-label="Open Navigation Menu"
                >
                    <Menu className="w-5 h-5" />
                </button>

                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">{title}</h2>
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2 sm:gap-3">
                {/* Quick Search Input */}
                <div className="relative hidden md:block w-52 lg:w-60">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search make or model..."
                        value={filters.model || filters.make || ''}
                        onChange={(e) => updateFilters({ model: e.target.value })}
                        className="w-full pl-9 pr-3 py-1.5 rounded-md bg-slate-800 border border-slate-700 text-xs font-medium text-white placeholder:text-slate-500 focus:border-slate-600 outline-none transition-colors"
                    />
                </div>

                {/* User Profile Menu */}
                <div className="relative">
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center gap-2 p-1.5 px-2 rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                        <div className="w-7 h-7 rounded bg-slate-700 text-white font-bold text-xs flex items-center justify-center">
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="text-left hidden sm:block">
                            <div className="text-xs font-bold text-white leading-none">{user?.name || 'User'}</div>
                        </div>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {showProfileMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-slate-900 rounded-md shadow-lg border border-slate-800 p-1 z-30 animate-fade-in space-y-1">
                            <div className="p-2 border-b border-slate-800">
                                <div className="font-bold text-xs text-white truncate">{user?.name}</div>
                                <div className="text-[11px] text-slate-400 truncate">{user?.email}</div>
                            </div>
                            <button
                                onClick={() => {
                                    setShowProfileMenu(false);
                                    onNavigate('settings');
                                }}
                                className="w-full text-left px-3 py-1.5 text-xs font-bold text-slate-200 hover:bg-slate-800 rounded transition-colors"
                            >
                                Settings
                            </button>
                            <button
                                onClick={() => {
                                    setShowProfileMenu(false);
                                    logout();
                                }}
                                className="w-full text-left px-3 py-1.5 text-xs font-bold text-red-400 hover:bg-red-950/40 rounded transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
