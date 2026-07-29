import React from 'react';
import { ShoppingBag, Edit, PlusCircle, Trash2, Tag } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { formatCurrency, getStockStatus, getVehicleImage } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';

const VehicleCard = ({
  vehicle,
  onPurchase,
  onEdit,
  onRestock,
  onDelete,
}) => {
  const { isAdmin } = useAuth();
  const { _id, make, model, category, price, quantity } = vehicle;

  const stockInfo = getStockStatus(quantity);
  const isOutOfStock = quantity <= 0;
  const imageUrl = getVehicleImage(vehicle);

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:border-slate-300 transition-colors flex flex-col overflow-hidden">
      {/* Image container */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100 border-b border-slate-200">
        <img
          src={imageUrl}
          alt={`${make} ${model}`}
          className="w-full h-full object-cover"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
          <Badge variant="slate" className="bg-white/95 shadow-xs font-bold">
            <Tag className="w-3 h-3 text-blue-600 mr-1 inline" />
            {category || 'Uncategorized'}
          </Badge>
          <Badge variant={stockInfo.variant} className="bg-white/95 shadow-xs">
            {stockInfo.label}
          </Badge>
        </div>

        {/* Bottom banner details */}
        <div className="absolute bottom-0 left-0 right-0 bg-slate-900/80 p-2.5 text-white">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300">{make}</p>
          <h3 className="text-base font-bold leading-tight">{model}</h3>
        </div>
      </div>

      {/* Body details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div className="flex items-baseline justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-bold text-slate-500 block uppercase">Price</span>
            <span className="text-xl font-bold text-slate-900">{formatCurrency(price)}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-500 block uppercase">Stock</span>
            <span className={`text-sm font-bold ${isOutOfStock ? 'text-red-600' : 'text-slate-800'}`}>
              {quantity} {quantity === 1 ? 'unit' : 'units'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            variant={isOutOfStock ? 'outline' : 'primary'}
            disabled={isOutOfStock}
            onClick={() => onPurchase && onPurchase(_id)}
            className="w-full"
            icon={ShoppingBag}
          >
            {isOutOfStock ? 'Out of Stock' : 'Purchase Vehicle'}
          </Button>

          {isAdmin && (
            <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit && onEdit(vehicle)}
                icon={Edit}
                title="Edit vehicle details"
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRestock && onRestock(vehicle)}
                icon={PlusCircle}
                className="text-emerald-700 hover:bg-emerald-50"
                title="Restock quantity"
              >
                Restock
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete && onDelete(vehicle)}
                icon={Trash2}
                className="text-red-600 hover:bg-red-50"
                title="Delete vehicle"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
