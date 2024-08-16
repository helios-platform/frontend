import React from "react";
import { useSQLConsole } from "./useSQLConsole";
import Selector from "./Selector";
import SQLEditor from "./SQLEditor";
import ResultsTable from "./ResultsTable";
import { PlayIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

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
    <div className="p-8 w-full bg-custom-dark-blue">
      <div className="max-w-screen mx-auto bg-custom-medium-blue bg-opacity-90 rounded-lg p-6 border border-custom-dark-blue shadow-high backdrop-filter backdrop-blur-sm">
        <div className="grid grid-cols-4 gap-4 mb-6 items-end">
          <Selector
            options={Object.keys(instanceInfo)}
            selectedOption={selectedInfo.database}
            onSelect={handleDatabaseSelect}
            label="Databases"
          />
          <Selector
            options={selectedInfo.tableOptions}
            selectedOption={selectedInfo.table}
            onSelect={handleTableSelect}
            label="Tables"
          />
          <div className="col-span-2 flex justify-end items-start space-x-4">
            <button
              className="bg-custom-light-purple hover:bg-custom-medium-purple text-white py-2 px-4 rounded-md flex items-center transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-light-purple cursor-pointer shadow-md"
              onClick={handleRunQuery}
            >
              <PlayIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              Run
            </button>
            <button
              className="bg-custom-green hover:bg-opacity-80 text-white py-2 px-4 rounded-md flex items-center transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-green cursor-pointer shadow-md"
              onClick={exportToCSV}
              disabled={tableInfo.rows.length === 0}
            >
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" aria-hidden="true" />
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
