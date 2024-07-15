interface dataSourceConfirmationProps {
  isActive: boolean;
  onClick: () => void;
}

const DataSourceConfirmation = ({ isActive, onClick }: dataSourceConfirmationProps) => {
  return (
    <>
      <div className="block">
        <h4 className="text-base text-left text-indigo-600 mb-2">
          Data Source Confirmation
        </h4>

        {isActive && (
          <div>
            <div className="mt-6 flex gap-4">

              <button onClick={() => onClick()} className="px-4 py-2 bg-indigo-500 text-white rounded-md">
                Visit tableName
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default DataSourceConfirmation