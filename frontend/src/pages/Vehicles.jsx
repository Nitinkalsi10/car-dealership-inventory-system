import React from 'react';
import { SlidersHorizontal, RefreshCw, Plus, Car } from 'lucide-react';
import { useVehicles } from '../context/VehicleContext';
import { useAuth } from '../context/AuthContext';
import VehicleTable from '../components/vehicle/VehicleTable';
import EmptyState from '../components/ui/EmptyState';
import Table from '../components/ui/Table';
import { TableRowSkeleton } from '../components/ui/Skeleton';
import Button from '../components/ui/Button';

const CATEGORY_LIST = ['All', 'Sedan', 'SUV', 'Truck', 'Coupe', 'Electric', 'Luxury', 'Hatchback'];

const Vehicles = ({ onOpenAddModal, onOpenEditModal, onOpenRestockModal, onDeleteVehicle }) => {
  const { vehicles, loading, filters, updateFilters, resetFilters, purchaseVehicle } = useVehicles();
  const { isAdmin } = useAuth();

  const handlePurchase = (id) => {
    purchaseVehicle(id);
  };

  const headers = [
    'Make & Model',
    'Category',
    'Price',
    'Quantity',
    'Stock Status',
    'Actions',
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Vehicles Catalog</h1>
          <p className="text-xs text-slate-500 font-medium">Search, filter, and purchase available inventory models</p>
        </div>

        {isAdmin && (
          <Button variant="primary" icon={Plus} onClick={onOpenAddModal}>
            Add Vehicle
          </Button>
        )}
      </div>

      {/* Filter and Search Panel */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
            Search & Filter Vehicles
          </div>
          <button
            onClick={resetFilters}
            className="text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search by Make */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Make</label>
            <input
              type="text"
              placeholder="e.g. Toyota"
              value={filters.make || ''}
              onChange={(e) => updateFilters({ make: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-slate-300 text-xs font-medium focus:border-blue-600 outline-none"
            />
          </div>

          {/* Search by Model */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Model</label>
            <input
              type="text"
              placeholder="e.g. Corolla"
              value={filters.model || ''}
              onChange={(e) => updateFilters({ model: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-slate-300 text-xs font-medium focus:border-blue-600 outline-none"
            />
          </div>

          {/* Filter by Category */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Category</label>
            <select
              value={filters.category || ''}
              onChange={(e) => updateFilters({ category: e.target.value === 'All' ? '' : e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-slate-300 text-xs font-medium focus:border-blue-600 outline-none bg-white cursor-pointer"
            >
              {CATEGORY_LIST.map((cat) => (
                <option key={cat} value={cat === 'All' ? '' : cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Min Price */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Min Price ($)</label>
            <input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice || ''}
              onChange={(e) => updateFilters({ minPrice: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-slate-300 text-xs font-medium focus:border-blue-600 outline-none"
            />
          </div>

          {/* Max Price */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Max Price ($)</label>
            <input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice || ''}
              onChange={(e) => updateFilters({ maxPrice: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-slate-300 text-xs font-medium focus:border-blue-600 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Main Vehicles Display - Exclusive Table View */}
      {loading ? (
        <Table headers={headers}>
          <TableRowSkeleton columns={6} />
          <TableRowSkeleton columns={6} />
          <TableRowSkeleton columns={6} />
        </Table>
      ) : vehicles.length > 0 ? (
        <VehicleTable
          vehicles={vehicles}
          onPurchase={handlePurchase}
          onEdit={onOpenEditModal}
          onRestock={onOpenRestockModal}
          onDelete={onDeleteVehicle}
        />
      ) : (
        <EmptyState
          icon={Car}
          title="No Vehicles Matched"
          description="Try adjusting your make, model, or price range filters."
          actionLabel="Clear Filters"
          onAction={resetFilters}
        />
      )}
    </div>
  );
};

export default Vehicles;
