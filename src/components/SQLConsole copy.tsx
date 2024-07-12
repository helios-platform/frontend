import React, { useState, useEffect, useRef } from "react";
import queryService from "../services/api";
import { Table } from "./Table";

const SQLConsole = () => {
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
  });
  const isFetchingRef = useRef(false);

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
    console.log('Effect 2')
    const fetchTableData = async () => {
      if (selectedInfo.database && selectedInfo.table) {
        const { cols, rows } = await queryService.executeQuery(
          `SELECT * FROM ${selectedInfo.database}.${selectedInfo.table} LIMIT 20`
        );
        setTableInfo({ cols, rows });
      }
    };

    fetchTableData();
  }, [selectedInfo.database, selectedInfo.table]);

  const handleDatabaseSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const database = e.target.value
    const newSelectedInfo = {
      database,
      tableOptions: instanceInfo[database] || [],
      table: instanceInfo[database] ? instanceInfo[database][0] : null
    }
    setSelectedInfo(newSelectedInfo)
  }

  // const handleDatabaseSelect = async (e) => {
  //   const database = e.target.value;
  //   const tableOptions = instanceInfo[database] || [];
  //   const firstTable = tableOptions[0] || null;

  //   setSelectedInfo({
  //     database,
  //     tableOptions,
  //     table: firstTable,
  //   });

  //   // if (firstTable) {
  //   //   const { cols, rows } = await queryService.executeQuery(
  //   //     `SELECT * FROM ${database}.${firstTable} LIMIT 20`
  //   //   );
  //   //   console.log({cols, rows, firstTable, database})
  //   //   setTableInfo({ cols, rows });
  //   // } else {
  //   //   setTableInfo({ cols: [], rows: [] });
  //   // }
  // };

  const handleTableSelect = async (e: React.SyntheticEvent) => {
    const table = e.target.value;
    setSelectedInfo((prevState) => {
      const newState = {
        ...prevState,
        table: table,
      };
      return newState;
    });

    // const { cols, rows } = await queryService.executeQuery(
    //   { query: `SELECT * FROM ${selectedInfo.database}.${table}` }
    // )
    // setTableInfo(prevState => {
    //   return { ...prevState, cols, rows }
    // })
  };

  const handleQueryText = async (e: React.SyntheticEvent) => {
    setQuery(e.target.value);
  };

  const handleRunQuery = async () => {
    const { cols, rows } = await queryService.executeQuery(query);
    setTableInfo((prevState) => {
      return { ...prevState, cols, rows };
    });
    setQuery("");
  };

  console.log({instanceInfo})
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
                onClick={handleRunQuery}
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
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="table-visual"
                className="mb-3 block text-sm font-medium text-gray-700"
              >
                Table Visual
              </label>
              <div id="table-visual">
                {tableInfo.rows.length ? (
                  <Table cols={tableInfo.cols} rows={tableInfo.rows} />
                ) : (
                  <span className="mt-1 block w-full h-48 border border-gray-300 rounded-md bg-gray-50"></span>
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
