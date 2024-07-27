import { useState } from 'react';
import queryService from '../services/api'
import Modal from './Modal';

const QuarantineTableFormTableForm = ({handleAIButton, quarantineTableSelector, tableName, handleFilter, aiResponse, handleCloseModal, isModalOpen}) => {
  const [showUniqueErrors, setShowUniqueErrors] = useState(false);
  const [timeRange, setTimeRange] = useState('all');
  //const [startDate, setStartDate] = useState('');
  //const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState('10');

  const generateSQLQuery = (formData) => {
    let query = 'SELECT ';
    query += formData.showUniqueErrors ? 'DISTINCT ' : '';
    query += 'error_type, error_message, raw_data, original_table, insertion_timestamp ';
    query += `FROM quarantine.${tableName} `;
    
    let whereConditions = [];

    // Time range condition
    if (formData.timeRange !== 'all') {
      let timeCondition;
      switch (formData.timeRange) {
        case '1h':
          timeCondition = "insertion_timestamp >= NOW() - INTERVAL '1 hour'";
          break;
        case '24h':
          timeCondition = "insertion_timestamp >= NOW() - INTERVAL '24 hours'";
          break;
        case '7d':
          timeCondition = "insertion_timestamp >= NOW() - INTERVAL '7 days'";
          break;
        case '30d':
          timeCondition = "insertion_timestamp >= NOW() - INTERVAL '30 days'";
          break;
      }
      if (timeCondition) whereConditions.push(timeCondition);
    }

    // Search condition
    if (formData.search) {
      whereConditions.push(`(error_message ILIKE '%${formData.search}%' OR error_type ILIKE '%${formData.search}%' OR raw_data ILIKE '%${formData.search}%')`);
    }

    if (whereConditions.length > 0) {
      query += 'WHERE ' + whereConditions.join(' AND ');
    }

    query += ' ORDER BY insertion_timestamp DESC ';

    if (formData.limit !== 'all') {
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
      limit
    };
    console.log('Form submitted', formData);
    try {
      const sqlQuery = generateSQLQuery(formData);
      console.log('Generated SQL Query:', sqlQuery);
      handleFilter(sqlQuery)
      
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Quarantine Table Configuration</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className={'w-full'}>{quarantineTableSelector}</div>
          <div className={'w-full'}>
            <label htmlFor="timeRange" className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
            <div className="relative">
              <select
                id="timeRange"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="all">All</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            id="search"
            placeholder="Search error messages..."
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            id="uniqueErrors"
            className="form-checkbox h-5 w-5 text-blue-600"
            checked={showUniqueErrors}
            onChange={(e) => setShowUniqueErrors(e.target.checked)}
          />
          <label htmlFor="uniqueErrors" className="text-gray-700 text-sm font-medium">Show only unique errors</label>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <label htmlFor="limit" className="text-sm font-medium text-gray-700">Show</label>
            <select
              id="limit"
              className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-16"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="all">All</option>
            </select>
            <span className="text-sm text-gray-700">entries</span>
          </div>
          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Apply Filters
            </button>
            <button
              type="button"
              className="ml-3 bg-yellow-400 text-black hover:bg-yellow-600 text-white py-2 px-4 rounded-md"
              onClick={handleAIButton}

            >
              AI Error Analysis
            </button>
            {aiResponse && isModalOpen && <Modal text={aiResponse} isOpen={isModalOpen} onClose={handleCloseModal}></Modal>}
            
          </div>
        </div>
      </form>
    </>
  );
};

export default QuarantineTableFormTableForm;