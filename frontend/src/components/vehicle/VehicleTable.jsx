import React from 'react';
import { ShoppingBag, Edit, PlusCircle, Trash2 } from 'lucide-react';
import Table from '../ui/Table';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { formatCurrency, getStockStatus } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';

const VehicleTable = ({
  vehicles = [],
  onPurchase,
  onEdit,
  onRestock,
  onDelete,
}) => {
  const { isAdmin } = useAuth();

  const headers = [
    'Make & Model',
    'Category',
    'Price',
    'Quantity',
    'Stock Status',
    'Actions',
  ];

  return (
    <Table headers={headers}>
      {vehicles.map((v) => {
        const stockInfo = getStockStatus(v.quantity);
        const isOutOfStock = (v.quantity || 0) <= 0;

        return (
          <tr key={v._id || Math.random()} className="hover:bg-slate-50 transition-colors">
            {/* Make & Model */}
            <td className="px-3 sm:px-5 py-3 whitespace-nowrap">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-slate-100 text-slate-800 font-bold flex items-center justify-center text-xs shrink-0 border border-slate-200">
                  {v.make?.charAt(0) || 'C'}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">{v.model}</div>
                  <div className="text-[10px] sm:text-xs text-slate-500 uppercase">{v.make}</div>
                </div>
              </div>
            </td>

            {/* Category */}
            <td className="px-3 sm:px-5 py-3 whitespace-nowrap">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                {v.category || 'General'}
              </span>
            </td>

            {/* Price */}
            <td className="px-3 sm:px-5 py-3 font-bold text-slate-900 whitespace-nowrap text-xs sm:text-sm">
              {formatCurrency(v.price)}
            </td>

            {/* Quantity */}
            <td className="px-3 sm:px-5 py-3 font-semibold text-slate-800 whitespace-nowrap text-xs sm:text-sm">
              {v.quantity} units
            </td>

            {/* Stock Status Badge */}
            <td className="px-3 sm:px-5 py-3 whitespace-nowrap">
              <Badge variant={stockInfo.variant}>
                {stockInfo.label}
              </Badge>
            </td>

            {/* Actions */}
            <td className="px-3 sm:px-5 py-3 whitespace-nowrap">
              <div className="flex items-center gap-1.5 flex-wrap">
                <Button
                  variant={isOutOfStock ? 'outline' : 'primary'}
                  size="sm"
                  disabled={isOutOfStock}
                  onClick={() => onPurchase && onPurchase(v._id)}
                  icon={ShoppingBag}
                >
                  {isOutOfStock ? 'Out of Stock' : 'Purchase'}
                </Button>

                {isAdmin && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit && onEdit(v)}
                      icon={Edit}
                      title="Edit vehicle details"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRestock && onRestock(v)}
                      icon={PlusCircle}
                      className="text-emerald-700 hover:bg-emerald-50"
                      title="Restock quantity"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete && onDelete(v)}
                      icon={Trash2}
                      className="text-red-600 hover:bg-red-50"
                      title="Delete vehicle"
                    />
                  </>
                )}
              </div>
            </td>
          </tr>
        );
      })}
    </Table>
  );
};

export default VehicleTable;
