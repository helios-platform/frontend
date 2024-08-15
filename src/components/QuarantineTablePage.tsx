import { DataTable } from "./dataTable/DataTable";
import { columns } from "./dataTable/columns";
import fetchOpenAIOutput from "../lib/fetchOpenAiOuput";
import QuarantineTableForm from "./QuarantineTableForm";
import { useEffect, useRef, useState } from "react";
import queryService from "../api";
import { mkConfig, generateCsv, download } from "export-to-csv";

const QuarantineTablePage = () => {
  const [selectedInfo, setSelectedInfo] = useState({
    // Change this to "quarantine" once we can test with quarantine data
    database: "quarantine",
    tableOptions: [],
    table: null,
  });
  const [tableInfo, setTableInfo] = useState({
    cols: [],
    rows: [],
    row_count: 0,
  });
  const [aiResponseText, setAiResponseText] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    const fetchQuarantineTables = async () => {
      if (isFetchingRef.current) return; // Prevent duplicate requests
      isFetchingRef.current = true;

      const data = await queryService.listDatabases();
      console.log({ data });
      // Make sure to use data["quarantine"] to fetch quarantine tables. Using "default" for testing purposes
      setSelectedInfo((prevState) => {
        const newState = {
          ...prevState,
          tableOptions: data ? data["quarantine"] || [] : [],
          table: data
            ? data["quarantine"]
              ? data["quarantine"][0]
              : null
            : null,
        };
        return newState;
      });
      isFetchingRef.current = false;
    };
    try {
      fetchQuarantineTables();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // TODO: Make sure we really need another useEffect here
  useEffect(() => {
    try {
      fetchTableData(
        `SELECT * FROM ${selectedInfo.database}.${selectedInfo.table}`,
      );
    } catch (error) {
      console.log(error);
    } finally {
      // alert('You have no quarantine tables')
    }
  }, [selectedInfo.table]);

  const fetchTableData = async (query) => {
    if (selectedInfo.table) {
      const { cols, rows, row_count } = await queryService.executeQuery(query);
      setTableInfo({ cols, rows, row_count: rows.length });
    }
  };

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    filename: "sql_export",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const exportToCSV = () => {
    const csv = generateCsv(csvConfig)(tableInfo.rows);
    download(csvConfig)(csv);
  };

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
  );

  const formattedColumns = columns(tableInfo.cols);

  const handleAIButton = async (e) => {
    setIsModalOpen(true);
    setAiResponseText("Generating error analysis...");
    const text = await fetchOpenAIOutput(
      JSON.stringify({ cols: tableInfo.cols, rows: tableInfo.rows }).slice(
        0,
        1000,
      ),
    );
    setAiResponseText(text);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="p-8 w-full">
        <div className="max-w-screen mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <QuarantineTableForm
            handleFilter={fetchTableData}
            handleCloseModal={handleCloseModal}
            handleAIButton={handleAIButton}
            quarantineTableSelector={quarantineTableSelector}
            tableName={selectedInfo.table}
            aiResponse={aiResponseText}
            isModalOpen={isModalOpen}
            exportToCSV={exportToCSV}
          />
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="table-visual"
                className="mb-3 block text-sm font-medium text-gray-700"
              >
                Table Visual{" "}
                <span className="text-gray-500">
                  - {tableInfo.row_count} rows
                </span>
              </label>
              <div id="table-visual">
                {tableInfo.rows.length !== 0 && tableInfo.cols.length !== 0 && (
                  <DataTable
                    columns={formattedColumns}
                    data={tableInfo.rows}
                  ></DataTable>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuarantineTablePage;

