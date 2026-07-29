import React, { useState } from 'react';
import Dashboard from '../pages/Dashboard';
import Vehicles from '../pages/Vehicles';
import AddVehicle from '../pages/AddVehicle';
import EditVehicle from '../pages/EditVehicle';
import Inventory from '../pages/Inventory';
import Settings from '../pages/Settings';
import ProtectedRoute from './ProtectedRoute';
import AddEditVehicleModal from '../components/vehicle/AddEditVehicleModal';
import RestockModal from '../components/vehicle/RestockModal';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { useVehicles } from '../context/VehicleContext';
import { AlertTriangle } from 'lucide-react';

const AppRoutes = ({ activePage, onNavigate }) => {
  const { addVehicle, editVehicle, restockVehicle, deleteVehicle } = useVehicles();

  // Modal states
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [selectedVehicleForModal, setSelectedVehicleForModal] = useState(null);

  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [vehicleToRestock, setVehicleToRestock] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);

  const [vehicleToEditPage, setVehicleToEditPage] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Modal triggers
  const handleOpenAddModal = () => {
    setSelectedVehicleForModal(null);
    setIsAddEditModalOpen(true);
  };

  const handleOpenEditModal = (v) => {
    setSelectedVehicleForModal(v);
    setIsAddEditModalOpen(true);
  };

  const handleOpenRestockModal = (v) => {
    setVehicleToRestock(v);
    setIsRestockModalOpen(true);
  };

  const handleOpenDeleteModal = (v) => {
    setVehicleToDelete(v);
    setIsDeleteModalOpen(true);
  };

  // Submit Add or Edit modal
  const handleAddEditSubmit = async (formData) => {
    setActionLoading(true);
    try {
      if (selectedVehicleForModal) {
        await editVehicle(selectedVehicleForModal._id, formData);
      } else {
        await addVehicle(formData);
      }
      setIsAddEditModalOpen(false);
    } finally {
      setActionLoading(false);
    }
  };

  // Submit Restock
  const handleRestockSubmit = async (id, quantityToAdd) => {
    setActionLoading(true);
    try {
      await restockVehicle(id, quantityToAdd);
      setIsRestockModalOpen(false);
    } finally {
      setActionLoading(false);
    }
  };

  // Submit Delete
  const handleDeleteConfirm = async () => {
    if (!vehicleToDelete) return;
    setActionLoading(true);
    try {
      await deleteVehicle(vehicleToDelete._id);
      setIsDeleteModalOpen(false);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <>
      {activePage === 'dashboard' && (
        <ProtectedRoute>
          <Dashboard
            onNavigate={onNavigate}
            onOpenAddModal={handleOpenAddModal}
            onOpenRestockModal={handleOpenRestockModal}
          />
        </ProtectedRoute>
      )}

      {activePage === 'vehicles' && (
        <ProtectedRoute>
          <Vehicles
            onOpenAddModal={handleOpenAddModal}
            onOpenEditModal={handleOpenEditModal}
            onOpenRestockModal={handleOpenRestockModal}
            onDeleteVehicle={handleOpenDeleteModal}
          />
        </ProtectedRoute>
      )}

      {activePage === 'add-vehicle' && (
        <ProtectedRoute requireAdmin={true}>
          <AddVehicle onNavigate={onNavigate} />
        </ProtectedRoute>
      )}

      {activePage === 'edit-vehicle' && (
        <ProtectedRoute requireAdmin={true}>
          <EditVehicle vehicle={vehicleToEditPage} onNavigate={onNavigate} />
        </ProtectedRoute>
      )}

      {activePage === 'inventory' && (
        <ProtectedRoute>
          <Inventory
            onOpenAddModal={handleOpenAddModal}
            onOpenEditModal={handleOpenEditModal}
            onOpenRestockModal={handleOpenRestockModal}
            onDeleteVehicle={handleOpenDeleteModal}
          />
        </ProtectedRoute>
      )}

      {activePage === 'settings' && (
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      )}

      {/* Global Add/Edit Modal */}
      <AddEditVehicleModal
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        vehicle={selectedVehicleForModal}
        onSubmit={handleAddEditSubmit}
        isLoading={actionLoading}
      />

      {/* Global Restock Modal */}
      <RestockModal
        isOpen={isRestockModalOpen}
        onClose={() => setIsRestockModalOpen(false)}
        vehicle={vehicleToRestock}
        onSubmit={handleRestockSubmit}
        isLoading={actionLoading}
      />

      {/* Global Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Vehicle Deletion"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-900">
            <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
            <div>
              <h4 className="font-extrabold text-sm">Are you absolutely sure?</h4>
              <p className="text-xs text-red-700 mt-0.5">
                This action will permanently delete{' '}
                <span className="font-black">{vehicleToDelete?.make} {vehicleToDelete?.model}</span> from inventory.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)} disabled={actionLoading}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm} isLoading={actionLoading}>
              Delete Vehicle
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AppRoutes;
