import { useState, useEffect } from "react";
import queryService from "../api";
import Modal from "./Modal";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const QuarantineTableFormTableForm = ({
  handleAIButton,
  quarantineTableSelector,
  tableName,
  handleFilter,
  aiResponse,
  handleCloseModal,
  isModalOpen,
  exportToCSV,
}) => {
  const [showUniqueErrors, setShowUniqueErrors] = useState(false);
  const [timeRange, setTimeRange] = useState("all");
  //const [startDate, setStartDate] = useState('');
  //const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState("10");
  const [isAPIKeyAvailable, setIsAPIKeyAvailable] = useState(false);

  useEffect(() => {
    const checkAPIKey = async () => {
      try {
        const result = await queryService.fetchAPIKey();
        setIsAPIKeyAvailable(!!result && !!result.api_key);
      } catch (error) {
        console.error('Error checking API key:', error);
        setIsAPIKeyAvailable(false);
      }
    };
    
    checkAPIKey();
  }, []);

  const generateSQLQuery = (formData) => {
    let query = "SELECT ";
    query += formData.showUniqueErrors ? "DISTINCT " : "";
    query +=
      "error_type, error_message, raw_data, original_table, insertion_timestamp ";
    query += `FROM quarantine.${tableName} `;

    const whereConditions = [];

    // Time range condition
    if (formData.timeRange !== "all") {
      let timeCondition;
      switch (formData.timeRange) {
        case "1h":
          timeCondition = "insertion_timestamp >= NOW() - INTERVAL '1 hour'";
          break;
        case "24h":
          timeCondition = "insertion_timestamp >= NOW() - INTERVAL '24 hours'";
          break;
        case "7d":
          timeCondition = "insertion_timestamp >= NOW() - INTERVAL '7 days'";
          break;
        case "30d":
          timeCondition = "insertion_timestamp >= NOW() - INTERVAL '30 days'";
          break;
      }
      if (timeCondition) whereConditions.push(timeCondition);
    }

    if (formData.search) {
      whereConditions.push(
        `(error_message ILIKE '%${formData.search}%' OR error_type ILIKE '%${formData.search}%' OR raw_data ILIKE '%${formData.search}%')`,
      );
    }

    if (whereConditions.length > 0) {
      query += "WHERE " + whereConditions.join(" AND ");
    }

    query += " ORDER BY insertion_timestamp DESC ";

    if (formData.limit !== "all") {
      query += `LIMIT ${formData.limit}`;
    }

    return query;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      showUniqueErrors,
      timeRange,
      search,
      limit,
    };
    console.log("Form submitted", formData);
    try {
      const sqlQuery = generateSQLQuery(formData);
      console.log("Generated SQL Query:", sqlQuery);
      handleFilter(sqlQuery);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-custom-light-gray">
        Quarantine Table Configuration
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className={"w-full"}>{quarantineTableSelector}</div>
          <div className={"w-full"}>
            <label
              htmlFor="timeRange"
              className="block text-sm font-medium text-custom-light-gray mb-2"
            >
              Time Range
            </label>
            <Menu as="div" className="relative inline-block text-left w-full">
              <Menu.Button className="inline-flex w-full justify-between items-center rounded-md bg-custom-dark-blue px-4 py-2 text-sm font-medium text-custom-light-gray shadow-glow ring-1 ring-inset ring-custom-light-blue hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                {timeRange === "all" ? "All" : timeRange}
                <ChevronDownIcon
                  className="ml-2 -mr-1 h-5 w-5 text-custom-light-blue"
                  aria-hidden="true"
                />
              </Menu.Button>
              <Menu.Items className="absolute z-10 mt-2 w-full origin-top-right rounded-md bg-custom-dark-blue shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  {["1h", "24h", "7d", "30d", "all"].map((option) => (
                    <Menu.Item key={option}>
                      {({ active }) => (
                        <button
                          className={`${active
                              ? "bg-custom-light-purple text-white"
                              : "text-custom-light-gray"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          onClick={() => setTimeRange(option)}
                        >
                          {option === "all" ? "All" : option}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </div>
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-custom-light-gray mb-2"
          >
            Search
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search error messages..."
            className="w-full rounded-md bg-custom-dark-blue px-4 py-2 text-sm font-medium text-custom-light-gray shadow-glow ring-1 ring-inset ring-custom-light-blue focus:outline-none focus:ring-2 focus:ring-custom-light-purple"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            id="uniqueErrors"
            className="form-checkbox h-5 w-5 text-custom-light-purple bg-custom-dark-blue border-custom-light-blue rounded"
            checked={showUniqueErrors}
            onChange={(e) => setShowUniqueErrors(e.target.checked)}
          />
          <label
            htmlFor="uniqueErrors"
            className="text-custom-light-gray text-sm font-medium"
          >
            Show only unique errors
          </label>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <label
              htmlFor="limit"
              className="text-sm font-medium text-custom-light-gray"
            >
              Show
            </label>
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex justify-between items-center rounded-md bg-custom-dark-blue px-2 py-1 text-sm font-medium text-custom-light-gray shadow-glow ring-1 ring-inset ring-custom-light-blue hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                {limit}
                <ChevronDownIcon
                  className="ml-2 -mr-1 h-5 w-5 text-custom-light-blue"
                  aria-hidden="true"
                />
              </Menu.Button>
              <Menu.Items className="absolute z-10 mt-2 w-24 origin-top-left rounded-md bg-custom-dark-blue shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  {["10", "25", "50", "100", "all"].map((option) => (
                    <Menu.Item key={option}>
                      {({ active }) => (
                        <button
                          className={`${active
                              ? "bg-custom-light-purple text-white"
                              : "text-custom-light-gray"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          onClick={() => setLimit(option)}
                        >
                          {option}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Menu>
            <span className="text-sm text-custom-light-gray">entries</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
            <button
              type="submit"
              className="px-3 py-2 text-sm bg-custom-light-purple text-white rounded-md hover:bg-custom-medium-purple focus:outline-none focus:ring-2 focus:ring-custom-light-purple focus:ring-offset-2 focus:ring-offset-custom-dark-blue transition duration-150 ease-in-out"
            >
              Apply Filters
            </button>
            <button
              className={`px-3 py-2 text-sm bg-custom-light-purple text-white rounded-md transition duration-150 ease-in-out ${
                isAPIKeyAvailable 
                  ? "hover:bg-custom-medium-purple" 
                  : "opacity-40 cursor-not-allowed"
              }`}
              type="button"
              onClick={handleAIButton}
              disabled={!isAPIKeyAvailable}
            >
              AI Error Analysis
            </button>
            {aiResponse && isModalOpen && (
              <Modal
                text={aiResponse}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
              />
            )}
            <button
              className="px-3 py-2 text-sm bg-custom-green hover:bg-opacity-80 text-white rounded-md transition duration-150 ease-in-out"
              onClick={exportToCSV}
              type="button"
            >
              Export CSV
            </button>
          </div>
        </div>
      </form>

    </>
  );
};

export default QuarantineTableFormTableForm;
