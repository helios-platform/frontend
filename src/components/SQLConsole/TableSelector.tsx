import React from 'react';

interface TableSelectorProps {
  tables: string[];
  selectedTable: string | null;
  onSelect: (table: string) => void;
}

const TableSelector: React.FC<TableSelectorProps> = ({ tables, selectedTable, onSelect }) => (
  <div>
    <label htmlFor="tables" className="block text-sm font-medium text-gray-700">
      Tables
    </label>
    <select
      id="tables"
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      value={selectedTable || ""}
      onChange={(e) => onSelect(e.target.value)}
    >
      {tables.map((table) => (
        <option key={table} value={table}>
          {table}
        </option>
      ))}
    </select>
  </div>
);

export default TableSelector;