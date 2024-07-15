
import { useFinalizedSchema } from "../../contexts/FinalizedSchemaContext";

const dataTypeOptions = [
  'String', 'Int', 'Float', 'Date', 'DateTime', 'UUID', 'Bool',
  'Int16', 'Int32', 'Int64', 'Int128', 'Int256', 'UInt8', 'UInt16',
  'UInt32', 'UInt64', 'UInt128', 'UInt256', 'Decimal', 'Decimal32',
  'Decimal64', 'Decimal128', 'Decimal256', 'Float32', 'Float64',
  'Date32', 'DateTime32', 'DateTime64', 'IPv4', 'IPv6', 'Int8'
];


const SchemaTable = () => {
  const { finalizedSchema, setFinalizedSchema } = useFinalizedSchema()

  const handleChange = (index: number, field: string, value: string) => {
    const newSchema = finalizedSchema.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setFinalizedSchema(newSchema);
  };

  // const handleDelete = (index) => {
  //   setData(data.filter((_, i) => i !== index));
  // };

  // const handleAdd = () => {
  //   setData([...data, { name: '', type: 'String', defaultValue: '', nullable: false }]);
  // };

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default value</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nullable</th>
            <th className="px-6 py-3"></th> */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {finalizedSchema.map((row, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  placeholder="Enter column name"
                  value={row.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  className="border border-gray-300 p-2 rounded-md w-full"
                  value={row.type}
                  onChange={(e) => handleChange(index, 'type', e.target.value)}
                >
                  {dataTypeOptions.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              {/* <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.defaultValue}
                  onChange={(e) => handleChange(index, 'defaultValue', e.target.value)}
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
              </td> */}
              {/* TODO: primary keys cannot be nullable */}
              {/* <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={row.nullable}
                  onChange={(e) => handleChange(index, 'nullable', e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </td> */}
              {/* <td className="px-6 py-4 whitespace-nowrap">
                <button 
                  onClick={() => handleDelete(index)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="mt-4">
        <button 
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Row
        </button>
      </div> */}
    </div>
  );
};

export default SchemaTable;