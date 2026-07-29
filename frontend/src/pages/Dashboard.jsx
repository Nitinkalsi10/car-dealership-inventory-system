import React from 'react';
import {
  Car,
  Boxes,
  DollarSign,
  Layers,
  TrendingUp,
  AlertTriangle,
  Clock,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { useVehicles } from '../context/VehicleContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, getStockStatus } from '../utils/formatters';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const Dashboard = ({ onNavigate, onOpenAddModal, onOpenRestockModal }) => {
  const { stats } = useVehicles();
  const { isAdmin, user } = useAuth();

  const {
    totalVehicles,
    totalQuantity,
    totalValue,
    numberCategories,
    recentlyAdded,
    lowStockVehicles,
  } = stats;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="rounded-lg bg-slate-900 text-white p-6 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center px-2.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold uppercase tracking-wider">
            {isAdmin ? 'Admin Portal' : 'Customer Workspace'}
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Welcome back, {user?.name || 'User'}
          </h1>
          <p className="text-slate-300 text-xs max-w-xl">
            Dealership inventory summary. Monitor vehicle stock, track inventory value, and view recent additions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <Button variant="primary" icon={Plus} onClick={onOpenAddModal} className="bg-white text-slate-900 hover:bg-slate-100 border-white">
              Add Vehicle
            </Button>
          )}
          <Button
            variant="outline"
            className="bg-slate-800 hover:bg-slate-700 text-white border-slate-700"
            onClick={() => onNavigate('vehicles')}
          >
            Browse Catalog
          </Button>
        </div>
      </div>

      {/* 4 Light-Colored Professional Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Vehicles */}
        <div className="bg-blue-50/50 dark:bg-slate-900 p-5 rounded-lg border border-blue-100 dark:border-slate-800 shadow-xs space-y-3 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-slate-400">Total Vehicles</span>
            <div className="w-10 h-10 rounded bg-blue-100/80 dark:bg-slate-800 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold">
              <Car className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-950 dark:text-white">{totalVehicles}</div>
            <div className="text-xs text-blue-700 dark:text-slate-400 font-medium mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Live Catalog Models
            </div>
          </div>
        </div>

        {/* Total Quantity */}
        <div className="bg-indigo-50/50 dark:bg-slate-900 p-5 rounded-lg border border-indigo-100 dark:border-slate-800 shadow-xs space-y-3 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-slate-400">Stock Quantity</span>
            <div className="w-10 h-10 rounded bg-indigo-100/80 dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Boxes className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-indigo-950 dark:text-white">{totalQuantity}</div>
            <div className="text-xs text-indigo-700 dark:text-slate-400 font-medium mt-0.5">Available Units on Lot</div>
          </div>
        </div>

        {/* Total Inventory Value */}
        <div className="bg-emerald-50/50 dark:bg-slate-900 p-5 rounded-lg border border-emerald-100 dark:border-slate-800 shadow-xs space-y-3 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-slate-400">Inventory Value</span>
            <div className="w-10 h-10 rounded bg-emerald-100/80 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-950 dark:text-white">{formatCurrency(totalValue)}</div>
            <div className="text-xs text-emerald-700 dark:text-slate-400 font-medium mt-0.5">Total Valuation</div>
          </div>
        </div>

        {/* Number of Categories */}
        <div className="bg-purple-50/50 dark:bg-slate-900 p-5 rounded-lg border border-purple-100 dark:border-slate-800 shadow-xs space-y-3 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-900 dark:text-slate-400">Categories</span>
            <div className="w-10 h-10 rounded bg-purple-100/80 dark:bg-slate-800 text-purple-700 dark:text-purple-400 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-950 dark:text-white">{numberCategories}</div>
            <div className="text-xs text-purple-700 dark:text-slate-400 font-medium mt-0.5">Active Segments</div>
          </div>
        </div>
      </div>

      {/* Two Columns: Recently Added Vehicles & Low Stock Vehicles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recently Added Vehicles */}
        <div className="bg-white dark:bg-slate-900 rounded-lg p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recently Added Vehicles</h3>
            </div>
            <button
              onClick={() => onNavigate('vehicles')}
              className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
            >
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            {recentlyAdded.length > 0 ? (
              recentlyAdded.map((v) => (
                <div
                  key={v._id || Math.random()}
                  className="flex items-center justify-between p-3 rounded-md bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-slate-900 dark:bg-slate-700 text-white font-bold flex items-center justify-center text-xs shrink-0">
                      {v.make?.charAt(0) || 'V'}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-xs">{v.make} {v.model}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{v.category}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-slate-900 dark:text-white text-xs">{formatCurrency(v.price)}</div>
                    <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">{v.quantity} units</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-4">No recent vehicles recorded</p>
            )}
          </div>
        </div>

        {/* Low Stock Vehicles Alert Card */}
        <div className="bg-white dark:bg-slate-900 rounded-lg p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Low Stock Vehicles</h3>
            </div>
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
              {lowStockVehicles.length} Items
            </span>
          </div>

          <div className="space-y-2.5">
            {lowStockVehicles.length > 0 ? (
              lowStockVehicles.map((v) => {
                const stockInfo = getStockStatus(v.quantity);
                return (
                  <div
                    key={v._id || Math.random()}
                    className="flex items-center justify-between p-3 rounded-md bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900"
                  >
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-xs">{v.make} {v.model}</div>
                      <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Stock: {v.quantity} units</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant={stockInfo.variant}>{stockInfo.label}</Badge>
                      {isAdmin && (
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => onOpenRestockModal && onOpenRestockModal(v)}
                        >
                          Restock
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-4">All vehicle stocks are currently healthy</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
