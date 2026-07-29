import React, { useState } from 'react';
import { Search, Plus, Boxes } from 'lucide-react';
import { useVehicles } from '../context/VehicleContext';
import { useAuth } from '../context/AuthContext';
import VehicleTable from '../components/vehicle/VehicleTable';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';

const Inventory = ({ onOpenAddModal, onOpenEditModal, onOpenRestockModal, onDeleteVehicle }) => {
  const { vehicles, loading, filters, updateFilters, purchaseVehicle } = useVehicles();
  const { isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const handlePurchase = (id) => {
    purchaseVehicle(id);
  };

  const filteredVehicles = vehicles.filter((v) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      v.make?.toLowerCase().includes(term) ||
      v.model?.toLowerCase().includes(term) ||
      v.category?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Inventory Management</h1>
          <p className="text-xs text-slate-500 font-medium">Record of stock quantities and status badges</p>
        </div>

        {isAdmin && (
          <Button variant="primary" icon={Plus} onClick={onOpenAddModal}>
            Add Vehicle
          </Button>
        )}
      </div>

      {/* Search Toolbar */}
      <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search inventory by make, model, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-md border border-slate-300 text-xs font-medium focus:border-blue-600 outline-none"
          />
        </div>

        <div className="text-xs font-semibold text-slate-500 hidden sm:block">
          Showing <span className="text-slate-900 font-bold">{filteredVehicles.length}</span> of{' '}
          <span className="text-slate-900 font-bold">{vehicles.length}</span> vehicles
        </div>
      </div>

      {/* Inventory Data Table */}
      {filteredVehicles.length > 0 ? (
        <VehicleTable
          vehicles={filteredVehicles}
          onPurchase={handlePurchase}
          onEdit={onOpenEditModal}
          onRestock={onOpenRestockModal}
          onDelete={onDeleteVehicle}
        />
      ) : (
        <EmptyState
          icon={Boxes}
          title="No Inventory Records Found"
          description="No vehicles match your search query."
          actionLabel="Clear Search"
          onAction={() => setSearchTerm('')}
        />
      )}
    </div>
  );
};

export default Inventory;
