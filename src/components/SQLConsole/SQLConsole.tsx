import React from "react";
import { useSQLConsole } from "./useSQLConsole";
import DatabaseSelector from "./DatabaseSelector";
import TableSelector from "./TableSelector";
import SQLEditor from "./SQLEditor";
import ResultsTable from "./ResultsTable";

const SQLConsole: React.FC = () => {
  const {
    instanceInfo,
    selectedInfo,
    query,
    tableInfo,
    handleDatabaseSelect,
    handleTableSelect,
    handleQueryChange,
    handleRunQuery,
    handleKeyDown,
    exportToCSV,
  } = useSQLConsole();

  return (
    <div className="p-8 w-full">
      <div className="max-w-screen mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <div className="grid grid-cols-4 gap-4 mb-6 items-center">
          <DatabaseSelector
            databases={Object.keys(instanceInfo)}
            selectedDatabase={selectedInfo.database}
            onSelect={handleDatabaseSelect}
          />
          <TableSelector
            tables={selectedInfo.tableOptions}
            selectedTable={selectedInfo.table}
            onSelect={handleTableSelect}
          />
          <div className="col-span-2 flex justify-end items-start">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 mx-2 rounded-md"
              onClick={handleRunQuery}
            >
              Run
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
              onClick={exportToCSV}
              disabled={tableInfo.rows.length === 0}
            >
              Export CSV
            </button>
          </div>
        </div>
        <SQLEditor
          query={query}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
        />
        <ResultsTable data={tableInfo} />
      </div>
    </div>
  );
};

export default SQLConsole;
