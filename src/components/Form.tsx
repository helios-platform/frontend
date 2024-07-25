const Form = () => {
  return ( 
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Error Table Configuration</h2>
      <form className="space-y-6">
        <div className="flex items-center space-x-4">
          <input type="checkbox" id="uniqueErrors" className="form-checkbox h-5 w-5 text-blue-600"></input>
          <label htmlFor="uniqueErrors" className="text-gray-700">Show only unique errors</label>
        </div>

        <div>
          <label htmlFor="timeRange" className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
          <select id="timeRange" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="all">All</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4" id="customDateRange" style="display: none;">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input type="date" id="startDate" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input type="date" id="endDate" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          </div>
        </div>

        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input type="text" id="search" placeholder="Search error messages..." className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <label htmlFor="limit" className="text-sm font-medium text-gray-700">Show</label>
            <select id="limit" className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="all">All</option>
              
            </select>
            <span className="text-sm text-gray-700">entries</span>
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
}
 
export default Form;

