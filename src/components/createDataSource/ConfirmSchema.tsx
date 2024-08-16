import React, { useState } from "react";
import { CreateTable } from "../../types";
import SchemaTable from "./SchemaTable";
import { useFinalizedSchema } from "../../contexts/FinalizedSchemaContext";
import { useIntegration } from "../../contexts/IntegrationContext";
import { useStream } from "../../contexts/StreamContext";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface ConfirmSchemaProps {
  isActive: boolean;
  onClickBack: () => void;
  onCreateTable: (tableInfo: CreateTable) => void;
}

const ConfirmSchema: React.FC<ConfirmSchemaProps> = ({
  isActive,
  onClickBack,
  onCreateTable,
}) => {
  const { finalizedSchema } = useFinalizedSchema();
  const { streamName } = useStream();
  const { integrationName } = useIntegration();
  const [primaryKey, setPrimaryKey] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!primaryKey) {
      setError("Please select a primary key");
      return;
    }
    const tableInfo: CreateTable = {
      streamName,
      tableName: integrationName,
      databaseName: "default",
      schema: finalizedSchema,
      primaryKey,
    };
    onCreateTable(tableInfo);
  };

  const colNames = finalizedSchema.map((col) => col.name);

  return (
    <form className="block w-full max-w-4xl" onSubmit={handleSubmit}>
      {isActive && (
        <div className="mt-6 bg-custom-medium-blue p-6 rounded-lg shadow-custom">
          <SchemaTable />
          <div className="mt-6">
            <label
              htmlFor="primaryKey"
              className="block text-lg font-medium text-custom-light-gray mb-2"
            >
              Primary Key
            </label>
            <Menu as="div" className="relative inline-block text-left w-full">
              <div>
                <Menu.Button className="inline-flex w-full justify-between items-center rounded-md bg-custom-medium-blue px-4 py-2 text-md font-medium text-custom-light-gray shadow-glow ring-1 ring-inset ring-custom-light-blue hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  {primaryKey || "Select a primary key"}
                  <ChevronDownIcon
                    className="ml-2 -mr-1 h-5 w-5 text-custom-light-blue"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Menu.Items className="absolute z-10 mt-2 w-full origin-top-right rounded-md bg-custom-medium-blue shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  {colNames.map((colName) => (
                    <Menu.Item key={colName}>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-custom-light-purple text-white"
                              : "text-custom-light-gray"
                          } group flex w-full items-center rounded-md px-2 py-2 text-md`}
                          onClick={() => setPrimaryKey(colName)}
                        >
                          {colName}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Menu>
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
              className="px-4 py-2 bg-custom-medium-purple text-white rounded-md hover:bg-opacity-90 transition-colors"
            >
              Create Table
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default ConfirmSchema;
