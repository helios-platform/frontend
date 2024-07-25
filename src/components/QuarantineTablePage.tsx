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
import fetchOpenAIOutput from "../utils/fetchOpenAiOuput";



const QuarantineTablePage = () => {
  const location = useLocation()
  const [instanceInfo, setInstanceInfo] = useState({});
  const [selectedInfo, setSelectedInfo] = useState({
    database: "quarantine",
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

  // const handleDatabaseSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const database = e.target.value
  //   const newSelectedInfo = {
  //     database,
  //     tableOptions: instanceInfo[database] || [],
  //     table: instanceInfo[database] ? instanceInfo[database][0] : null
  //   }
  //   setSelectedInfo(newSelectedInfo)
  // }


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

  const handleAIAnalysis = async () => {
    const modifiedQuery = query ? query : `SELECT * FROM ${selectedInfo.database}.${selectedInfo.table}`
    setQuery(modifiedQuery)

    const { cols, rows, row_count } = await queryService.executeQuery(modifiedQuery);
    setTableInfo((prevState) => {
      return { ...prevState, cols, rows, row_count };
    });
  };


  const tableOptions = selectedInfo.tableOptions.map((table) => (
    <option key={table} value={table}>
      {table}
    </option>
  ));

  const formattedColumns = columns(tableInfo.cols)

  // const myDarkTheme = createTheme({
  //   theme: 'dark',
  //   settings: {
  //     background: '#2d2e42',
  //     foreground: '#f0f0f0',
  //     caret: '#ff9800',
  //     selection: '#ff980033',
  //     selectionMatch: '#ff980033',
  //     lineHighlight: '#464766',
  //     gutterBackground: '#2d2e42',
  //     gutterForeground: '#8b8b8b',
  //   },
  //   styles: [
  //     { tag: t.keyword, color: '#ff9800', fontWeight: 'bold' },
  //     { tag: [t.name, t.deleted, t.character, t.macroName], color: '#40c4ff' },
  //     { tag: [t.function(t.variableName), t.labelName], color: '#ff6e40', fontStyle: 'italic' },
  //     { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: '#ffab40' },
  //     { tag: [t.definition(t.name), t.separator], color: '#f0f0f0' },
  //     { tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: '#64ffda' },
  //     { tag: [t.operator, t.operatorKeyword], color: '#ff5252', fontWeight: 'bold' },
  //     { tag: [t.url, t.escape, t.regexp, t.link], color: '#e9c46a' },
  //     { tag: [t.meta, t.comment], color: '#78909c', fontStyle: 'italic' },
  //     { tag: t.strong, fontWeight: 'bold', color: '#ff9800' },
  //     { tag: t.emphasis, fontStyle: 'italic', color: '#40c4ff' },
  //     { tag: t.strikethrough, textDecoration: 'line-through' },
  //     { tag: t.link, color: '#e9c46a', textDecoration: 'underline' },
  //     { tag: t.heading, fontWeight: 'bold', color: '#ff9800' },
  //     { tag: [t.atom, t.bool, t.special(t.variableName)], color: '#ffab40' },
  //     { tag: [t.processingInstruction, t.string, t.inserted], color: '#9ccc65' },
  //     { tag: t.invalid, color: '#ffffff', backgroundColor: '#ff5252' },
  //   ],
  // });

  const handleAIButton = async () => {
    const text = await fetchOpenAIOutput(JSON.stringify([
      {
        id: 1,
        timestamp: new Date('2024-07-25T08:30:00'),
        errorType: 'Syntax Error',
        severity: 'Low',
        message: 'Unexpected token',
        rawError: 'SyntaxError: Unexpected token ) in JSON at position 52'
      },
      {
        id: 2,
        timestamp: new Date('2024-07-25T09:15:00'),
        errorType: 'Runtime Error',
        severity: 'High',
        message: 'Cannot read property of undefined',
        rawError: 'TypeError: Cannot read property \'name\' of undefined'
      },
      {
        id: 3,
        timestamp: new Date('2024-07-25T10:00:00'),
        errorType: 'Logical Error',
        severity: 'Medium',
        message: 'Incorrect calculation result',
        rawError: 'Error: Expected sum to be 15, but got 14'
      },
      {
        id: 4,
        timestamp: new Date('2024-07-25T10:45:00'),
        errorType: 'Network Error',
        severity: 'High',
        message: 'Failed to fetch',
        rawError: 'NetworkError: Failed to fetch https://api.example.com/data'
      },
      {
        id: 5,
        timestamp: new Date('2024-07-25T11:30:00'),
        errorType: 'Database Error',
        severity: 'Critical',
        message: 'Connection timeout',
        rawError: 'DatabaseError: Connection to database timed out after 30 seconds'
      },
      {
        id: 6,
        timestamp: new Date('2024-07-25T12:15:00'),
        errorType: 'Syntax Error',
        severity: 'Low',
        message: 'Missing semicolon',
        rawError: 'SyntaxError: Missing semicolon at line 42'
      },
      {
        id: 7,
        timestamp: new Date('2024-07-25T13:00:00'),
        errorType: 'Runtime Error',
        severity: 'Medium',
        message: 'Stack overflow',
        rawError: 'RangeError: Maximum call stack size exceeded'
      },
      {
        id: 8,
        timestamp: new Date('2024-07-25T13:45:00'),
        errorType: 'Logical Error',
        severity: 'High',
        message: 'Infinite loop detected',
        rawError: 'Error: Infinite loop detected in function processData()'
      },
      {
        id: 9,
        timestamp: new Date('2024-07-25T14:30:00'),
        errorType: 'Network Error',
        severity: 'Medium',
        message: 'CORS policy violation',
        rawError: 'AccessError: Cross-origin request blocked: CORS policy violation'
      },
      {
        id: 10,
        timestamp: new Date('2024-07-25T15:15:00'),
        errorType: 'Database Error',
        severity: 'Critical',
        message: 'Duplicate key violation',
        rawError: 'IntegrityError: Duplicate entry \'user@example.com\' for key \'users.email\''
      }
    ]))
    console.log(text)
  }

  return (
    <>
      <div className="p-8 w-full">
        <div className="max-w-screen mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div>
              <label
                  htmlFor="tables"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quarantine Tables
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
            <div>
              
            </div>
            <div className="col-span-2 flex justify-end items-start">
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
                onClick={handleSelectQuery}
              >
                Run
              </button>
              <button
                className="ml-3 bg-yellow-400 text-black hover:bg-yellow-600 text-white py-2 px-4 rounded-md"
                onClick={handleAIButton}
              >
                AI Error Analysis
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <form>
                <input type="checkbox"></input>
                <label>Show Unique Errors</label>
              </form>

              {/* <label
                htmlFor="sql-queries"
                className="mb-3 block text-sm font-medium text-gray-700"
              >
                SQL Queries
              </label> */}
              {/* <CodeMirror
                id="sql-queries"
                placeholder="Write query..."
                value={query}
                height="300px"
                extensions={[sql()]}
                onChange={handleQueryText}
                onKeyDown={handleKeyDown}
                theme={myDarkTheme}
              /> */}
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

export default QuarantineTablePage;