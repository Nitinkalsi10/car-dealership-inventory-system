import React from 'react';

const Table = ({ headers = [], children, className = '' }) => {
  return (
    <div className={`w-full overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-xs ${className}`}>
      <table className="w-full text-left border-collapse min-w-[640px]">
        <thead>
          <tr className="bg-slate-100 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600">
            {headers.map((header, index) => (
              <th key={index} className="px-3 sm:px-5 py-3 whitespace-nowrap">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-xs sm:text-sm font-medium text-slate-700">
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
