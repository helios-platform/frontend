import { Link } from "react-router-dom";
import { useIntegration } from "../../contexts/IntegrationContext";

interface dataSourceConfirmationProps {
  isActive: boolean;
}

const DataSourceConfirmation = ({ isActive }: dataSourceConfirmationProps) => {
  const { integrationName, setIntegrationName } = useIntegration(); 
  return (
    <>
      <div className="block">
        <h4 className="text-base text-left text-indigo-600 mb-2">
          Data Source Confirmation
        </h4>

        {isActive && (
          <div>
            <div className="mt-6 flex gap-4">

              <Link to="/sql-dashboard" state={{ fromLink: true }}className="px-4 py-2 bg-indigo-500 text-white rounded-md" onClick={() => {
                console.log('Link clicked!')
                // setSelectedInfo(...)
              }}>
                Visit {integrationName}
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default DataSourceConfirmation