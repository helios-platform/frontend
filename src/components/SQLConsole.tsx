const SQLConsole = () => {
  return ( 
    <>
      <div className="p-8 w-full">
        <div className="max-w-screen mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div>
                    <label htmlFor="databases" className="block text-sm font-medium text-gray-700 text-left ml-1">Databases</label>
                    <select 
                      id="databases" 
                      name="databases" 
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" 
                      // onChange={}
                      // value=''
                      >
                        
                    </select>
                </div>
                <div>
                    <label htmlFor="tables" className="block text-sm font-medium text-gray-700 text-left ml-1">Tables</label>
                    <select 
                      id="tables" 
                      name="tables" 
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      // onChange={}
                      // value=''
                      >
        
                    </select>
                </div>
                <div className="col-span-2 flex justify-end items-start">
                    <button 
                      className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
                    >
                        Run
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="sql-queries" className="mb-3 block text-sm font-medium text-gray-700">SQL Queries</label>
                <textarea 
                  id="sql-queries" 
                  name="sql-queries" 
                  rows="4"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  placeholder='Write query...'
                  // value=''
                  // onChange={}
                ></textarea>
              </div>
              <div>
                <label htmlFor="table-visual" className="mb-3 block text-sm font-medium text-gray-700">Table Visual</label>
                <div 
                  id="table-visual" 
                >
                  {/* {tableInfo.rows.length ? 
                    <Table cols={tableInfo.cols} rows={tableInfo.rows}/> 
                    : <span className="mt-1 block w-full h-48 border border-gray-300 rounded-md bg-gray-50"></span>
                  } */}
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
   );
}
 
export default SQLConsole;