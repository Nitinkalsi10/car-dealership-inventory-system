import React, { useState } from 'react';
import { PlusCircle, ArrowLeft } from 'lucide-react';
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

const AddVehicle = ({ onNavigate }) => {
  const { addVehicle } = useVehicles();

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    category: 'Sedan',
    price: '',
    quantity: '1',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const errs = {};
    if (!formData.make.trim()) errs.make = 'Make is required';
    if (!formData.model.trim()) errs.model = 'Model is required';
    if (!formData.category.trim()) errs.category = 'Category is required';
    if (!formData.price || isNaN(formData.price) || Number(formData.price) < 0) {
      errs.price = 'Valid price is required';
    }
    if (!formData.quantity || isNaN(formData.quantity) || Number(formData.quantity) < 0) {
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
      await addVehicle({
        make: formData.make.trim(),
        model: formData.model.trim(),
        category: formData.category.trim(),
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      });
      onNavigate('vehicles');
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
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Add New Vehicle</h1>
          <p className="text-xs text-slate-500 font-medium">Create a new vehicle record</p>
        </div>
        <Button variant="outline" size="sm" icon={ArrowLeft} onClick={() => onNavigate('vehicles')}>
          Back to Catalog
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Make (Brand)"
              name="make"
              placeholder="e.g. Toyota"
              value={formData.make}
              onChange={handleChange}
              error={errors.make}
              required
            />
            <Input
              label="Model Name"
              name="model"
              placeholder="e.g. Camry"
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
              step="100"
              placeholder="28000"
              value={formData.price}
              onChange={handleChange}
              error={errors.price}
              required
            />
            <Input
              label="Initial Quantity"
              name="quantity"
              type="number"
              min="0"
              step="1"
              placeholder="5"
              value={formData.quantity}
              onChange={handleChange}
              error={errors.quantity}
              required
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => onNavigate('vehicles')}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={loading} icon={PlusCircle}>
              Save & Add Vehicle
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
