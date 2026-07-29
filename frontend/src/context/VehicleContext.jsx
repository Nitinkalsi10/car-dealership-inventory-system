import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import vehicleService from '../services/vehicleService';
import { useToast } from './ToastContext';

const VehicleContext = createContext(null);

const DEFAULT_FILTERS = {
  make: '',
  model: '',
  category: '',
  minPrice: '',
  maxPrice: '',
};

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const { showToast } = useToast();

  // Load vehicles from backend
  const fetchVehicles = useCallback(async (activeFilters = filters) => {
    setLoading(true);
    setError(null);
    try {
      const hasActiveFilters = Object.values(activeFilters).some((val) => val !== '');
      const response = hasActiveFilters
        ? await vehicleService.searchVehicles(activeFilters)
        : await vehicleService.getVehicles();

      if (response && response.data) {
        setVehicles(Array.isArray(response.data) ? response.data : []);
      } else {
        setVehicles([]);
      }
    } catch (err) {
      console.warn('Backend unavailable or fetch error, using sample demonstration inventory:', err);
      setError(err.message || 'Failed to load vehicles from API');
      // If error occurs (e.g. backend offline or unauthenticated), fallback to demonstration inventory
      setVehicles(getSampleInventory());
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const updateFilters = (newFilters) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    fetchVehicles(updated);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    fetchVehicles(DEFAULT_FILTERS);
  };

  // Purchase vehicle action
  const purchaseVehicle = async (vehicleId) => {
    try {
      const response = await vehicleService.purchaseVehicle(vehicleId);
      showToast({
        type: 'success',
        title: 'Purchase Successful!',
        message: response.message || 'Vehicle purchase completed successfully.',
      });

      // Update state locally
      setVehicles((prev) =>
        prev.map((item) =>
          item._id === vehicleId
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
      );

      // Re-sync with backend
      fetchVehicles();
      return response;
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Purchase Failed',
        message: err.message || 'Unable to complete vehicle purchase',
      });
      throw err;
    }
  };

  // Add vehicle action (Admin)
  const addVehicle = async (vehicleData) => {
    try {
      const response = await vehicleService.createVehicle(vehicleData);
      showToast({
        type: 'success',
        title: 'Vehicle Added',
        message: response.message || 'New vehicle added to inventory successfully.',
      });
      fetchVehicles();
      return response;
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Failed to Add Vehicle',
        message: err.message || 'Error adding vehicle to inventory',
      });
      throw err;
    }
  };

  // Edit vehicle action (Admin)
  const editVehicle = async (id, vehicleData) => {
    try {
      const response = await vehicleService.updateVehicle(id, vehicleData);
      showToast({
        type: 'success',
        title: 'Vehicle Updated',
        message: response.message || 'Vehicle details updated successfully.',
      });
      fetchVehicles();
      return response;
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Update Failed',
        message: err.message || 'Error updating vehicle',
      });
      throw err;
    }
  };

  // Restock vehicle action (Admin)
  const restockVehicle = async (id, quantity) => {
    try {
      const response = await vehicleService.restockVehicle(id, quantity);
      showToast({
        type: 'success',
        title: 'Inventory Restocked',
        message: response.message || `Successfully added ${quantity} units to inventory.`,
      });
      fetchVehicles();
      return response;
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Restock Failed',
        message: err.message || 'Error restocking vehicle',
      });
      throw err;
    }
  };

  // Delete vehicle action (Admin)
  const deleteVehicle = async (id) => {
    try {
      const response = await vehicleService.deleteVehicle(id);
      showToast({
        type: 'success',
        title: 'Vehicle Deleted',
        message: response.message || 'Vehicle removed from inventory.',
      });
      setVehicles((prev) => prev.filter((v) => v._id !== id));
      return response;
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Deletion Failed',
        message: err.message || 'Error deleting vehicle',
      });
      throw err;
    }
  };

  // Analytics Stats calculated dynamically from inventory
  const stats = useMemo(() => {
    const totalVehicles = vehicles.length;
    const totalQuantity = vehicles.reduce((sum, v) => sum + (Number(v.quantity) || 0), 0);
    const totalValue = vehicles.reduce((sum, v) => sum + (Number(v.price) || 0) * (Number(v.quantity) || 0), 0);
    const categoriesSet = new Set(vehicles.map((v) => v.category).filter(Boolean));
    const numberCategories = categoriesSet.size;

    const recentlyAdded = [...vehicles]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 4);

    const lowStockVehicles = vehicles.filter((v) => (Number(v.quantity) || 0) <= 5);

    return {
      totalVehicles,
      totalQuantity,
      totalValue,
      numberCategories,
      recentlyAdded,
      lowStockVehicles,
      categoriesList: Array.from(categoriesSet),
    };
  }, [vehicles]);

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        loading,
        error,
        filters,
        stats,
        fetchVehicles,
        updateFilters,
        resetFilters,
        purchaseVehicle,
        addVehicle,
        editVehicle,
        restockVehicle,
        deleteVehicle,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicles = () => {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error('useVehicles must be used within a VehicleProvider');
  }
  return context;
};

// Default demonstration dataset if database is empty or connection fails
function getSampleInventory() {
  return [
    {
      _id: 'sample-1',
      make: 'Toyota',
      model: 'Camry Hybrid XSE',
      category: 'Sedan',
      price: 32400,
      quantity: 14,
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'sample-2',
      make: 'Tesla',
      model: 'Model Y Long Range',
      category: 'Electric',
      price: 47990,
      quantity: 3,
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'sample-3',
      make: 'BMW',
      model: 'X5 xDrive40i',
      category: 'SUV',
      price: 65200,
      quantity: 8,
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'sample-4',
      make: 'Ford',
      model: 'F-150 Lightning',
      category: 'Truck',
      price: 54995,
      quantity: 0,
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'sample-5',
      make: 'Porsche',
      model: '911 Carrera GTS',
      category: 'Luxury',
      price: 138600,
      quantity: 2,
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'sample-6',
      make: 'Audi',
      model: 'RS e-tron GT',
      category: 'Electric',
      price: 106500,
      quantity: 5,
      createdAt: new Date().toISOString(),
    },
  ];
}

export default VehicleContext;
