import React from "react";
import { Link } from "react-router-dom";
import { useIntegration } from "../../contexts/IntegrationContext";

interface DataSourceConfirmationProps {
  isActive: boolean;
}

const DataSourceConfirmation: React.FC<DataSourceConfirmationProps> = ({
  isActive,
}) => {
  const { integrationName } = useIntegration();

  return (
    <div className="block w-full max-w-3xl">
      {isActive && (
        <div className="mt-6 bg-custom-medium-blue p-6 rounded-lg shadow-custom">
          <p className="text-custom-light-gray mb-6">
            Your data source has been successfully created and configured.
          </p>
          <div className="flex flex-col space-y-4">
            <Link
              to="/sql-dashboard"
              state={{ fromLink: true }}
              className="px-4 py-2 bg-custom-medium-purple text-white rounded-md hover:bg-opacity-90 transition-colors text-center"
            >
              Visit {integrationName}
            </Link>
            <Link
              to="/view-sources"
              className="px-4 py-2 bg-custom-dark-blue text-custom-light-gray rounded-md hover:bg-opacity-80 transition-colors text-center"
            >
              View All Sources
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataSourceConfirmation;
