import React from "react";
import { useFinalizedSchema } from "../../contexts/FinalizedSchemaContext";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const dataTypeOptions = [
  "String",
  "Int",
  "Float",
  "Date",
  "DateTime",
  "UUID",
  "Bool",
  "Int16",
  "Int32",
  "Int64",
  "Int128",
  "Int256",
  "UInt8",
  "UInt16",
  "UInt32",
  "UInt64",
  "UInt128",
  "UInt256",
  "Decimal",
  "Decimal32",
  "Decimal64",
  "Decimal128",
  "Decimal256",
  "Float32",
  "Float64",
  "Date32",
  "DateTime32",
  "DateTime64",
  "IPv4",
  "IPv6",
  "Int8",
];

const SchemaTable: React.FC = () => {
  const { finalizedSchema, setFinalizedSchema } = useFinalizedSchema();

  const handleChange = (index: number, field: string, value: string) => {
    const newSchema = finalizedSchema.map((row, i) =>
      i === index ? { ...row, [field]: value } : row,
    );
    setFinalizedSchema(newSchema);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-custom-light-blue/30">
        <thead className="">
          <tr>
            <th className="px-6 py-3 text-center text-sm font-medium text-custom-light-blue uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-center text-sm font-medium text-custom-light-blue uppercase tracking-wider">
              Type
            </th>
          </tr>
        </thead>
        <tbody className="bg-custom-medium-blue divide-y divide-custom-light-blue/20">
          {finalizedSchema.map((row, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  placeholder="Enter column name"
                  value={row.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  className="bg-custom-medium-blue text-custom-light-gray p-2 border border-custom-light-blue rounded-md w-full focus:ring-2 focus:ring-custom-light-purple"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Menu
                  as="div"
                  className="relative inline-block text-left w-full"
                >
                  <div>
                    <Menu.Button className="inline-flex w-full justify-between items-center rounded-md bg-custom-medium-blue px-4 py-2 text-sm font-medium text-custom-light-gray shadow-sm ring-1 ring-inset ring-custom-light-blue hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      {row.type}
                      <ChevronDownIcon
                        className="ml-2 -mr-1 h-5 w-5 text-custom-light-blue"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Menu.Items className="absolute z-10 mt-2 w-full origin-top-right rounded-md bg-custom-medium-blue shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 max-h-60 overflow-auto">
                      {dataTypeOptions.map((option) => (
                        <Menu.Item key={option}>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-custom-light-purple text-white"
                                  : "text-custom-light-gray"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              onClick={() =>
                                handleChange(index, "type", option)
                              }
                            >
                              {option}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Menu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchemaTable;
