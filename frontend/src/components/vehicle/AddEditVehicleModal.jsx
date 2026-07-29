import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

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

const AddEditVehicleModal = ({
  isOpen,
  onClose,
  vehicle = null,
  onSubmit,
  isLoading = false,
}) => {
  const isEditMode = !!vehicle;

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    category: '',
    price: '',
    quantity: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (vehicle) {
      setFormData({
        make: vehicle.make || '',
        model: vehicle.model || '',
        category: vehicle.category || '',
        price: vehicle.price !== undefined ? vehicle.price : '',
        quantity: vehicle.quantity !== undefined ? vehicle.quantity : '',
      });
    } else {
      setFormData({
        make: '',
        model: '',
        category: 'Sedan',
        price: '',
        quantity: '1',
      });
    }
    setErrors({});
  }, [vehicle, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.make.trim()) newErrors.make = 'Make is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (formData.price === '' || isNaN(formData.price) || Number(formData.price) < 0) {
      newErrors.price = 'Valid positive price is required';
    }
    if (formData.quantity === '' || isNaN(formData.quantity) || Number(formData.quantity) < 0) {
      newErrors.quantity = 'Valid non-negative quantity is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await onSubmit({
      make: formData.make.trim(),
      model: formData.model.trim(),
      category: formData.category.trim(),
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? 'Edit Vehicle Details' : 'Add New Vehicle'}
      subtitle={isEditMode ? `Update record for ${vehicle?.make} ${vehicle?.model}` : 'Enter vehicle specifications'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Make (Manufacturer)"
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
            placeholder="e.g. Corolla"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Price ($ USD)"
            name="price"
            type="number"
            min="0"
            step="100"
            placeholder="e.g. 35000"
            value={formData.price}
            onChange={handleChange}
            error={errors.price}
            required
          />

          <Input
            label="Quantity (Units)"
            name="quantity"
            type="number"
            min="0"
            step="1"
            placeholder="e.g. 5"
            value={formData.quantity}
            onChange={handleChange}
            error={errors.quantity}
            required
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200 mt-4">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isLoading}>
            {isEditMode ? 'Save Changes' : 'Create Vehicle'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditVehicleModal;
