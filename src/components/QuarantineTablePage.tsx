import { DataTable } from "./dataTable/DataTable";
import { columns } from "./dataTable/columns";
import fetchOpenAIOutput from "../lib/fetchOpenAiOuput";
import QuarantineTableForm from "./QuarantineTableForm";
import { useEffect, useRef, useState } from "react";
import queryService from "../api";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

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

  const handleTableSelect = async (table) => {
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
    <div>
      <label
        htmlFor="tables"
        className="block text-sm font-medium text-custom-light-gray mb-2"
      >
        Quarantine Tables
      </label>
      <Menu as="div" className="relative inline-block text-left w-full">
        <Menu.Button className="inline-flex w-full justify-between items-center rounded-md bg-custom-dark-blue px-4 py-2 text-sm font-medium text-custom-light-gray shadow-glow ring-1 ring-inset ring-custom-light-blue hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {selectedInfo.table || "Select Table"}
          <ChevronDownIcon
            className="ml-2 -mr-1 h-5 w-5 text-custom-light-blue"
            aria-hidden="true"
          />
        </Menu.Button>
        <Menu.Items className="absolute z-10 mt-2 w-full origin-top-right rounded-md bg-custom-dark-blue shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            {selectedInfo.tableOptions.map((table) => (
              <Menu.Item key={table}>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-custom-light-purple text-white"
                        : "text-custom-light-gray"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => handleTableSelect(table)}
                  >
                    {table}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Menu>
    </div>
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
      <div className="p-8 w-full bg-custom-dark-blue">
        <div className="max-w-screen mx-auto bg-custom-medium-blue bg-opacity-90 shadow-high rounded-lg p-6 border border-custom-dark-gray backdrop-filter backdrop-blur-sm">
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
          <div className="grid grid-cols-1 gap-4 mt-6">
            <div>
              <label
                htmlFor="table-visual"
                className="mb-3 block text-lg font-medium text-custom-light-gray"
              >
                Table Visual{" "}
                <span className="text-custom-light-blue">
                  - {tableInfo.row_count} rows
                </span>
              </label>
              <div
                id="table-visual"
                className="bg-custom-dark-blue rounded-lg shadow-md overflow-hidden"
              >
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
