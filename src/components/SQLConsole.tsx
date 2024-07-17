import React, { useState, useEffect, useRef } from "react";
import queryService from "../services/api";
import { DataTable } from "./dataTable/DataTable";
import { columns } from "./dataTable/columns"
import { useIntegration } from "../contexts/IntegrationContext";
import { useLocation } from "react-router-dom";
import { PaginationState } from "@tanstack/react-table";

const SQLConsole = () => {
  const location = useLocation()
  const [instanceInfo, setInstanceInfo] = useState({});
  const [selectedInfo, setSelectedInfo] = useState({
    database: "default",
    tableOptions: [],
    table: null,
  });
  const [query, setQuery] = useState("");
  const [tableInfo, setTableInfo] = useState({
    cols: [],
    rows: [],
    row_count: 0,
  });
  const isFetchingRef = useRef(false);

  const { integrationName } = useIntegration();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
    pageCount: 0,
  });


  useEffect(() => {
    console.log('Effect 1')
    const fetchInstanceInfo = async () => {
      if (isFetchingRef.current) return; // Prevent duplicate requests
      isFetchingRef.current = true;

      const data = await queryService.getDatabases();
      setInstanceInfo(data);
      setSelectedInfo(() => {
        const newState = {
          database: "default",
          tableOptions: data ? data["default"] || [] : [],
          table: data ? (data["default"] ? data["default"][0] : null) : null,
        };
        return newState;
      });
      isFetchingRef.current = false
    };
    fetchInstanceInfo();
  }, []);

  useEffect(() => {
    if (integrationName) {
      if (location?.state?.fromLink || selectedInfo.tableOptions.includes(integrationName)) {
        setSelectedInfo(prevState => ({
          ...prevState,
          table: integrationName
        }));

        if (location?.state?.fromLink) {
          window.history.replaceState({}, document.title);
        }
      }
    }
  }, [location, integrationName, selectedInfo.tableOptions]);

  useEffect(() => {
    const fetchTableData = async () => {
      if (selectedInfo.database && selectedInfo.table) {
        const result = await queryService.executeQuery(
          `SELECT * FROM ${selectedInfo.database}.${selectedInfo.table}`,
          pagination.pageIndex + 1,
          pagination.pageSize
        );
        setTableInfo({
          cols: result.cols,
          rows: result.rows,
          row_count: result.row_count,
        });
        setPagination(prev => ({
          ...prev,
          totalCount: result.total_count,
          pageCount: result.total_pages,
        }));
      }
    };

    fetchTableData();
  }, [selectedInfo.database, selectedInfo.table, pagination.pageIndex, pagination.pageSize]);

  const handlePaginationChange = (updater: (old: PaginationState) => PaginationState) => {
    setPagination(updater);
  };

  const handleDatabaseSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const database = e.target.value
    const newSelectedInfo = {
      database,
      tableOptions: instanceInfo[database] || [],
      table: instanceInfo[database] ? instanceInfo[database][0] : null
    }
    setSelectedInfo(newSelectedInfo)
  }


  const handleTableSelect = async (e: React.SyntheticEvent) => {
    const table = e.target.value;
    setSelectedInfo((prevState) => {
      const newState = {
        ...prevState,
        table: table,
      };
      return newState;
    });
  };

  const handleQueryText = async (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault(); // Prevent default behavior (new line in textarea)
      handleQuery();
    }
  };

  const handleQuery = async () => {
    const { cols, rows, row_count } = await queryService.executeQuery(query);
    setTableInfo((prevState) => {
      return { ...prevState, cols, rows, row_count };
    });
  };

  const databaseOptions = Object.keys(instanceInfo).map((database) => (
    <option key={database} value={database}>
      {database}
    </option>
  ));

  const tableOptions = selectedInfo.tableOptions.map((table) => (
    <option key={table} value={table}>
      {table}
    </option>
  ));

  const formattedColumns = columns(tableInfo.cols)

  return (
    <>
      <div className="p-8 w-full">
        <div className="max-w-screen mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div>
              <label
                htmlFor="databases"
                className="block text-sm font-medium text-gray-700"
              >
                Databases
              </label>
              <select
                id="databases"
                name="databases"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                onChange={handleDatabaseSelect}
                value={selectedInfo.database}
              >
                {databaseOptions}
              </select>
            </div>
            <div>
              <label
                htmlFor="tables"
                className="block text-sm font-medium text-gray-700"
              >
                Tables
              </label>
              <select
                id="tables"
                name="tables"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                onChange={handleTableSelect}
                value={selectedInfo.table || ""}
              >
                {tableOptions}
              </select>
            </div>
            <div className="col-span-2 flex justify-end items-start">
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
                onClick={handleQuery}
              >
                Run
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="sql-queries"
                className="mb-3 block text-sm font-medium text-gray-700"
              >
                SQL Queries
              </label>
              <textarea
                id="sql-queries"
                name="sql-queries"
                rows="4"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                placeholder="Write query..."
                value={query}
                onChange={handleQueryText}
                onKeyDown={handleKeyDown}
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="table-visual"
                className="mb-3 block text-sm font-medium text-gray-700"
              >
                Table Visual <span className="text-gray-500">- {tableInfo.row_count} rows</span>
              </label>
              <div id="table-visual">
                {tableInfo.rows.length !== 0 && tableInfo.cols.length !== 0 && (
                  <DataTable
                    columns={formattedColumns}
                    data={tableInfo.rows} 
                    pageCount={pagination.pageCount}
                    pagination={pagination}
                    onPaginationChange={handlePaginationChange}></DataTable>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SQLConsole;
