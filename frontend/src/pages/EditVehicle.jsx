import React, { useState, useEffect } from 'react';
import { Edit, ArrowLeft } from 'lucide-react';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { useVehicles } from '../context/VehicleContext';

const CATEGORY_OPTIONS = [
  'Sedan',
  'SUV',
  'Truck',
  'Coupe',
  'Electric',
  'Luxury',
  'Hatchback',
  'Convertible',
];

const EditVehicle = ({ vehicle, onNavigate }) => {
  const { editVehicle } = useVehicles();

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    category: 'Sedan',
    price: '',
    quantity: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (vehicle) {
      setFormData({
        make: vehicle.make || '',
        model: vehicle.model || '',
        category: vehicle.category || 'Sedan',
        price: vehicle.price !== undefined ? vehicle.price : '',
        quantity: vehicle.quantity !== undefined ? vehicle.quantity : '',
      });
    }
  }, [vehicle]);

  if (!vehicle) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-slate-500 font-bold">No vehicle selected for editing.</p>
        <Button variant="primary" onClick={() => onNavigate('vehicles')}>
          Return to Vehicles
        </Button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const errs = {};
    if (!formData.make.trim()) errs.make = 'Make is required';
    if (!formData.model.trim()) errs.model = 'Model is required';
    if (!formData.category.trim()) errs.category = 'Category is required';
    if (formData.price === '' || isNaN(formData.price) || Number(formData.price) < 0) {
      errs.price = 'Valid price is required';
    }
    if (formData.quantity === '' || isNaN(formData.quantity) || Number(formData.quantity) < 0) {
      errs.quantity = 'Valid quantity is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await editVehicle(vehicle._id, {
        make: formData.make.trim(),
        model: formData.model.trim(),
        category: formData.category.trim(),
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      });
      onNavigate('inventory');
    } catch {
      // Handled in context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Edit Vehicle</h1>
          <p className="text-xs text-slate-500 font-medium">Update record for {vehicle.make} {vehicle.model}</p>
        </div>
        <Button variant="outline" size="sm" icon={ArrowLeft} onClick={() => onNavigate('inventory')}>
          Back to Inventory
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Make"
              name="make"
              value={formData.make}
              onChange={handleChange}
              error={errors.make}
              required
            />
            <Input
              label="Model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              error={errors.model}
              required
            />
          </div>

          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={CATEGORY_OPTIONS}
            error={errors.category}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Price ($ USD)"
              name="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={handleChange}
              error={errors.price}
              required
            />
            <Input
              label="Quantity"
              name="quantity"
              type="number"
              min="0"
              value={formData.quantity}
              onChange={handleChange}
              error={errors.quantity}
              required
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => onNavigate('inventory')}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={loading} icon={Edit}>
              Update Vehicle
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVehicle;
