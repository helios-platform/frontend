import React, { useEffect, useState } from "react";
import { useIntegration } from "../../contexts/IntegrationContext";
import APIService from "../../api";

interface InputSourceDetailsProps {
  isActive: boolean;
  onClickBack: () => void;
  onAuthenticate: (accessKey: string, secretKey: string) => Promise<void>;
}

const InputSourceDetails: React.FC<InputSourceDetailsProps> = ({
  isActive,
  onClickBack,
  onAuthenticate,
}) => {
  const { integrationName, setIntegrationName } = useIntegration();
  const [accessKey, setAccessKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [existingTables, setExistingTables] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExistingTables = async () => {
      try {
        const { rows } = await APIService.executeQuery("SHOW TABLES");
        setExistingTables(rows.map((row: any) => row.name));
      } catch (error) {
        console.error("Error fetching existing tables:", error);
        setError("Failed to fetch existing tables. Please try again.");
      }
    };

    if (isActive) {
      fetchExistingTables();
    }
  }, [isActive]);

  const handleTableValidation = () => {
    if (existingTables.includes(integrationName)) {
      setError("Table name already exists in database");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!integrationName || !accessKey || !secretKey) {
      setError("All fields are required");
      return;
    }

    if (!handleTableValidation()) {
      return;
    }

    setIsLoading(true);
    try {
      await onAuthenticate(accessKey, secretKey);
    } catch (error) {
      setError("Authentication failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      method="POST"
      className="block w-full max-w-3xl"
      onSubmit={handleSubmit}
    >
      <h4 className="text-lg font-semibold text-left text-custom-light-purple mb-4">
        Setup Connection
      </h4>

      {isActive && (
        <div className="mt-6 bg-custom-medium-blue p-6 rounded-lg shadow-custom">
          <div className="space-y-6">
            <div className="flex flex-col">
              <label
                htmlFor="integrationName"
                className="mb-2 text-custom-light-gray text-left"
              >
                Integration Name
              </label>
              <input
                id="integrationName"
                name="integrationName"
                placeholder="My new Kinesis stream"
                className="bg-custom-dark-blue text-custom-light-gray p-2 border border-custom-light-blue rounded-md focus:ring-2 focus:ring-custom-light-purple"
                value={integrationName}
                onChange={(e) => setIntegrationName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="iamAccessKey"
                className="mb-2 text-custom-light-gray text-left"
              >
                IAM Access Key
              </label>
              <input
                id="iamAccessKey"
                name="username"
                placeholder="Enter your IAM access key"
                className="bg-custom-dark-blue text-custom-light-gray p-2 border border-custom-light-blue rounded-md focus:ring-2 focus:ring-custom-light-purple"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="iamSecret"
                className="mb-2 text-custom-light-gray text-left"
              >
                IAM Secret
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="iamSecret"
                  name="password"
                  placeholder="Enter your IAM secret"
                  className="bg-custom-dark-blue text-custom-light-gray p-2 border border-custom-light-blue rounded-md w-full focus:ring-2 focus:ring-custom-light-purple"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-custom-light-blue"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    role="img"
                    aria-label="eye"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3.118 12.467a.987.987 0 0 1 0-.935C5.01 8.033 8.505 5 12 5s6.99 3.033 8.882 6.533a.987.987 0 0 1 0 .935C18.99 15.967 15.495 19 12 19s-6.99-3.033-8.882-6.533Z"
                      clipRule="evenodd"
                    ></path>
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.429"
                      d="M14.121 9.879A3 3 0 1 1 9.88 14.12 3 3 0 0 1 14.12 9.88"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 text-red-400 bg-red-900/50 border border-red-400 rounded p-2">
              {error}
            </div>
          )}

          <div className="mt-8 flex gap-4">
            <button
              type="button"
              onClick={onClickBack}
              className="px-4 py-2 bg-custom-dark-blue text-custom-light-gray rounded-md hover:bg-opacity-80 transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-custom-medium-purple text-white rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Next: Choose Stream"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default InputSourceDetails;
