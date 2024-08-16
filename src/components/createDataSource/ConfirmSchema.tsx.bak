import { CreateTable } from "../../types";
import SchemaTable from "./SchemaTable"
import { useFinalizedSchema } from "../../contexts/FinalizedSchemaContext";
import { useIntegration } from "../../contexts/IntegrationContext";
import { useStream } from "../../contexts/StreamContext";

interface confirmSchemaProps {
  isActive: boolean;
  onClickBack: () => void;
  onCreateTable: (tableInfo: CreateTable) => void
  //sampleEvent: SampleEvent
}

const ConfirmSchema = ({
  isActive,
  onClickBack,
  onCreateTable,
  //sampleEvent
}: confirmSchemaProps) => {
  const { finalizedSchema, setFinalizedSchema } = useFinalizedSchema()
  const { streamName, setStreamName } = useStream();
  const { integrationName, setIntegrationName } = useIntegration(); 

  const colNames = finalizedSchema.map(cols => cols.name)
  const databaseName = 'default' 
  
  return (
    <>
      <form 
      method="POST"
      className="block"
      onSubmit={(e) => {
        e.preventDefault()
        onCreateTable({streamName, tableName: integrationName, schema: finalizedSchema, databaseName})
      }}
      >
        <h4 className="text-base text-left text-indigo-600 mb-2">
          Confirm Schema
        </h4>

        {isActive && (
          <>
            <SchemaTable />
            <div className="flex flex-col">
              <label
                htmlFor="kinesisStream"
                className="text-left mb-2 text-gray-700"
              >
                Primary Key
              </label>
              <select
                name=""
                id="kinesisStream"
                className="flex items-center justify-between py-2 pl-4 border rounded-md"
              >
                <option className="text-slate-200" value="">
                  Select a primary key
                </option>
                {/* TODO: keys as unique values */}
                {colNames.map((colName) => {
                  return (
                    <option
                      key={colName}
                      value={colName}
                    >
                      {colName}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="mt-6 flex gap-4">
              <button onClick={() => onClickBack()} className="px-4 py-2 bg-gray-300 rounded-md">Back</button>
              <button type='submit' className="px-4 py-2 bg-indigo-500 text-white rounded-md">
                Next: Data Source Confirmation
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default ConfirmSchema;
