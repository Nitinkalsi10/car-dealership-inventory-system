import React from 'react';
import { User, ShieldCheck, UserCheck, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const Settings = () => {
  const { user, isAdmin, logout } = useAuth();

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Account Settings</h1>
        <p className="text-xs text-slate-400 font-medium">Manage your profile details and active session</p>
      </div>

      {/* User Profile Card */}
      <div className="bg-slate-900 rounded-lg border border-slate-800 shadow-sm p-6 space-y-5">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="w-8 h-8 rounded bg-slate-800 text-slate-200 flex items-center justify-center font-bold">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">User Account Information</h3>
            <p className="text-xs text-slate-400">Active user session</p>
          </div>
        </div>

        <div className="space-y-4 text-xs font-medium">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Full Name</label>
              <div className="p-2.5 rounded-md bg-slate-800 border border-slate-700 text-white font-bold">
                {user?.name || 'N/A'}
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Email Address</label>
              <div className="p-2.5 rounded-md bg-slate-800 border border-slate-700 text-white font-bold truncate">
                {user?.email || 'N/A'}
              </div>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Role & Permissions</label>
            <div className="p-3 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isAdmin ? (
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                ) : (
                  <UserCheck className="w-4 h-4 text-blue-500" />
                )}
                <span className="font-bold text-white capitalize">
                  {isAdmin ? 'Administrator' : 'Customer'}
                </span>
              </div>
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${isAdmin ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-blue-950 text-blue-400 border border-blue-800'}`}>
                {user?.role || 'user'}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <Button variant="danger" icon={LogOut} onClick={logout}>
            Sign Out Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
