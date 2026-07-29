import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { PackagePlus } from 'lucide-react';

const RestockModal = ({
  isOpen,
  onClose,
  vehicle,
  onSubmit,
  isLoading = false,
}) => {
  const [quantity, setQuantity] = useState('5');
  const [error, setError] = useState('');

  useEffect(() => {
    setQuantity('5');
    setError('');
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const num = Number(quantity);
    if (!quantity || isNaN(num) || num <= 0) {
      setError('Please enter a valid quantity greater than 0');
      return;
    }

    await onSubmit(vehicle._id, num);
  };

  if (!vehicle) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Restock Vehicle Inventory"
      subtitle={`Add stock units for ${vehicle.make} ${vehicle.model}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-slate-100 rounded-md p-3.5 border border-slate-200 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-600">Current In Stock:</span>
          <span className="font-extrabold text-slate-900">{vehicle.quantity} units</span>
        </div>

        <Input
          label="Quantity to Add"
          type="number"
          min="1"
          step="1"
          placeholder="e.g. 10"
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
            setError('');
          }}
          error={error}
          helperText="This amount will be added to the current vehicle quantity."
          required
        />

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="success" isLoading={isLoading} icon={PackagePlus}>
            Restock Vehicle
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default RestockModal;
