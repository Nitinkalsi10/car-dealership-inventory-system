import React from 'react';

export const CardSkeleton = () => (
  <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm space-y-4 animate-pulse">
    <div className="w-full h-40 bg-slate-200 rounded-md" />
    <div className="flex justify-between items-center">
      <div className="w-20 h-4 bg-slate-200 rounded" />
      <div className="w-16 h-4 bg-slate-200 rounded" />
    </div>
    <div className="w-3/4 h-5 bg-slate-200 rounded" />
    <div className="w-1/2 h-6 bg-slate-200 rounded" />
    <div className="w-full h-10 bg-slate-200 rounded-md" />
  </div>
);

export const TableRowSkeleton = ({ columns = 7 }) => (
  <tr className="animate-pulse">
    {Array.from({ length: columns }).map((_, i) => (
      <td key={i} className="px-5 py-3">
        <div className="h-4 bg-slate-200 rounded w-full max-w-[120px]" />
      </td>
    ))}
  </tr>
);

export default CardSkeleton;
