import React, { useState, useEffect, useRef } from "react";
import queryService from "../services/api";
import { DataTable } from "./dataTable/DataTable";
import { columns } from "./dataTable/columns"
import { useIntegration } from "../contexts/IntegrationContext";
import { useLocation } from "react-router-dom";

import CodeMirror from '@uiw/react-codemirror';
// import { javascript } from '@codemirror/lang-javascript';
import { sql } from '@codemirror/lang-sql';
// import { StreamLanguage } from '@codemirror/language';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';



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

  useEffect(() => {
    const fetchInstanceInfo = async () => {
      if (isFetchingRef.current) return; // Prevent duplicate requests
      isFetchingRef.current = true;

      const data = await queryService.listDatabases();
      delete data.quarantine
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

        // Clear the location state if it was set
        if (location?.state?.fromLink) {
          window.history.replaceState({}, document.title);
        }
      }
    }
  }, [location, integrationName, selectedInfo.tableOptions]);

  useEffect(() => {
    const fetchTableData = async () => {
      if (selectedInfo.database && selectedInfo.table) {
        const { cols, rows, row_count } = await queryService.executeQuery(
          `SELECT * FROM ${selectedInfo.database}.${selectedInfo.table}`
        );
        setTableInfo({ cols, rows, row_count });
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

  const handleQueryText = async (queryValue) => {
    setQuery(queryValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault(); // Prevent default behavior (new line in textarea)
      handleSelectQuery();
    }
  };

  const handleSelectQuery = async () => {
    const modifiedQuery = query ? query : `SELECT * FROM ${selectedInfo.database}.${selectedInfo.table}`
    setQuery(modifiedQuery)

    const { cols, rows, row_count } = await queryService.executeQuery(modifiedQuery);
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

  const myDarkTheme = createTheme({
    theme: 'dark',
    settings: {
      background: '#2d2e42',
      foreground: '#f0f0f0',
      caret: '#ff9800',
      selection: '#ff980033',
      selectionMatch: '#ff980033',
      gutterBackground: '#2d2e42',
      gutterForeground: '#8b8b8b',
      fontSize: '16px',
      lineHighlight: '#464766',
    },
    styles: [
      { tag: t.keyword, color: '#ff9800', fontWeight: 'bold' },
      { tag: [t.name, t.deleted, t.character, t.macroName], color: '#40c4ff' },
      { tag: [t.function(t.variableName), t.labelName], color: '#ff6e40', fontStyle: 'italic' },
      { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: '#ffab40' },
      { tag: [t.definition(t.name), t.separator], color: '#f0f0f0' },
      { tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: '#64ffda' },
      { tag: [t.operator, t.operatorKeyword], color: '#ff5252', fontWeight: 'bold' },
      { tag: [t.url, t.escape, t.regexp, t.link], color: '#e9c46a' },
      { tag: [t.meta, t.comment], color: '#78909c', fontStyle: 'italic' },
      { tag: t.strong, fontWeight: 'bold', color: '#ff9800' },
      { tag: t.emphasis, fontStyle: 'italic', color: '#40c4ff' },
      { tag: t.strikethrough, textDecoration: 'line-through' },
      { tag: t.link, color: '#e9c46a', textDecoration: 'underline' },
      { tag: t.heading, fontWeight: 'bold', color: '#ff9800' },
      { tag: [t.atom, t.bool, t.special(t.variableName)], color: '#ffab40' },
      { tag: [t.processingInstruction, t.string, t.inserted], color: '#9ccc65' },
      { tag: t.invalid, color: '#ffffff', backgroundColor: '#ff5252' },
    ],
  });

  return (
    <>
      {/* <CodeMirror value={'javascript'} height="200px" extensions={[sql({ sql: true })]} /> */}

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
                onClick={handleSelectQuery}
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
              {/* <textarea
                id="sql-queries"
                name="sql-queries"
                rows="4"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                placeholder="Write query..."
                value={query}
                onChange={handleQueryText}
                onKeyDown={handleKeyDown}
              ></textarea> */}
              <CodeMirror
                id="sql-queries"
                placeholder="Write query..."
                value={query}
                height="350px"
                extensions={[sql()]}
                onChange={handleQueryText}
                onKeyDown={handleKeyDown}
                theme={myDarkTheme}
              />
            </div>
            <div>
              <label
                htmlFor="table-visual"
                className="mb-3 block text-sm font-medium text-gray-700"
              >
                Table Visual <span className="text-gray-500">- {tableInfo.row_count} rows</span>
              </label>
              <div id="table-visual">
                {tableInfo.rows.length !== 0 && tableInfo.cols.length !== 0 && <DataTable columns={formattedColumns} data={tableInfo.rows} ></DataTable>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SQLConsole;