import React from 'react';

interface DatabaseSelectorProps {
  databases: string[];
  selectedDatabase: string;
  onSelect: (database: string) => void;
}

const DatabaseSelector: React.FC<DatabaseSelectorProps> = ({ databases, selectedDatabase, onSelect }) => (
  <div>
    <label htmlFor="databases" className="block text-sm font-medium text-gray-700">
      Databases
    </label>
    <select
      id="databases"
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      value={selectedDatabase}
      onChange={(e) => onSelect(e.target.value)}
    >
      {databases.map((database) => (
        <option key={database} value={database}>
          {database}
        </option>
      ))}
    </select>
  </div>
);

export default DatabaseSelector;