import { DataTable } from "./dataTable/DataTable";
import { columns } from "./dataTable/columns"
import fetchOpenAIOutput from "../utils/fetchOpenAiOuput";
import QuarantineTableForm from "./QuarantineTableForm";
import { useEffect, useRef, useState } from "react";
import queryService from '../services/api'

const QuarantineTablePage = () => {
  const [selectedInfo, setSelectedInfo] = useState({
    // Change this to "quarantine" once we can test with quarantine data
    database: "default",
    tableOptions: [],
    table: null,
  });
  const [tableInfo, setTableInfo] = useState({
    cols: [],
    rows: [],
    row_count: 0,
  });
  const isFetchingRef = useRef(false);

  useEffect(() => {
    const fetchQuarantineTables = async () => {
      if (isFetchingRef.current) return; // Prevent duplicate requests
      isFetchingRef.current = true;

      const data = await queryService.listDatabases();
      // Make sure to use data["quarantine"] to fetch quarantine tables. Using "default" for testing purposes
      setSelectedInfo((prevState) => {
        const newState = {
          ...prevState,
          tableOptions: data ? data["default"] || [] : [],
          table: data ? (data["default"] ? data["default"][0] : null) : null,
        };
        return newState;
      });
      isFetchingRef.current = false
    };
    try {
      fetchQuarantineTables();
    } catch(error) {
      console.log(error)
    }

  }, []);

  // TODO: Make sure we really need another useEffect here
  useEffect(() => {
    const fetchTableData = async () => {
      if (selectedInfo.table) {
        const { cols, rows, row_count } = await queryService.executeQuery(
          `SELECT * FROM ${selectedInfo.database}.${selectedInfo.table}`
        );
        setTableInfo({ cols, rows, row_count });
      }
    };

    try {
      fetchTableData();
    } catch (error) {
      console.log(error)
    } finally {
      alert('You have no quarantine tables')
    }
  }, [selectedInfo.table]);

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

  const tableOptions = selectedInfo.tableOptions.map((table) => (
    <option key={table} value={table}>
      {table}
    </option>
  ));

  const quarantineTableSelector = (
    <>
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
    </>
  )

  const formattedColumns = columns(tableInfo.cols)

  const handleAIButton = async (e) => {
    e.preventDefault()
    const text = await fetchOpenAIOutput(JSON.stringify([
      {
        error_type: "datetime_parse_error",
        error_message: "Cannot parse '2023-13-32' as DateTime: syntax error",
        raw_data: JSON.stringify({ timestamp: "2023-13-32", user_id: 12345, action: "login" }),
        original_table: "user_actions",
        insertion_timestamp: "2024-07-25 10:15:30"
      },
      {
        error_type: "uuid_error",
        error_message: "Cannot parse uuid 'not-a-valid-uuid': Cannot parse UUID from String",
        raw_data: JSON.stringify({ id: "not-a-valid-uuid", product_name: "Widget", quantity: 5 }),
        original_table: "inventory",
        insertion_timestamp: "2024-07-25 11:22:45"
      },
      {
        error_type: "int_parse_error",
        error_message: "Cannot parse string 'one hundred' as Int32: syntax error",
        raw_data: JSON.stringify({ order_id: 789, item_count: "one hundred" }),
        original_table: "orders",
        insertion_timestamp: "2024-07-25 12:30:15"
      },
      {
        error_type: "extra_column_error",
        error_message: "Unrecognized column 'middle_name' in table",
        raw_data: JSON.stringify({ first_name: "John", middle_name: "Doe", last_name: "Smith" }),
        original_table: "customers",
        insertion_timestamp: "2024-07-25 13:45:00"
      },
      {
        error_type: "missing_column_error",
        error_message: "No such column 'email' in table",
        raw_data: JSON.stringify({ username: "jsmith", password: "hashedpassword" }),
        original_table: "users",
        insertion_timestamp: "2024-07-25 14:10:20"
      },
      {
        error_type: "unknown",
        error_message: "Unexpected error occurred during data insertion",
        raw_data: JSON.stringify({ transaction_id: "TX123456", amount: 99.99, currency: "USD" }),
        original_table: "transactions",
        insertion_timestamp: "2024-07-25 15:05:55"
      },
      {
        error_type: "syntax_error",
        error_message: "Cannot parse expression of type 'String' here: expected 'Boolean'",
        raw_data: JSON.stringify({ is_active: "yes", account_id: 98765 }),
        original_table: "accounts",
        insertion_timestamp: "2024-07-25 16:20:10"
      },
      {
        error_type: "type_mismatch",
        error_message: "Type mismatch in ORDER BY: expected UInt32, got String",
        raw_data: JSON.stringify({ product_id: "ABC123", category: "electronics", price: 299.99 }),
        original_table: "products",
        insertion_timestamp: "2024-07-25 17:30:40"
      },
      {
        error_type: "unknown",
        error_message: "Internal server error occurred during query execution",
        raw_data: JSON.stringify({ log_id: 56789, severity: "high", message: "API timeout" }),
        original_table: "system_logs",
        insertion_timestamp: "2024-07-25 18:45:25"
      },
      {
        error_type: "unknown",
        error_message: "Unexpected EOF while parsing JSON input",
        raw_data: "{\"incomplete_json\": \"This JSON string is not properly closed",
        original_table: "raw_data",
        insertion_timestamp: "2024-07-25 19:55:50"
      }
    ]))
    console.log(text)
  }

  return (
    <>
      <div className="p-8 w-full">
        <div className="max-w-screen mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <QuarantineTableForm handleAIButton={handleAIButton} quarantineTableSelector={quarantineTableSelector} />
          <div className="grid grid-cols-1 gap-4">
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