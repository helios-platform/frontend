import { useState } from "react";
import SelectSourceType from "./SelectSourceType";
import InputSourceDetails from "./InputSourceDetails";
import ChooseStream from "./ChooseStream";
import ConfirmSchema from "./ConfirmSchema";
import DataSourceConfirmation from "./DataSourceConfirmation";
import APIService from "../../api";
import { CreateTable, InferredSchema, SampleEvent } from "../../types";
import { StreamProvider } from "../../contexts/StreamContext";
import { IntegrationProvider } from "../../contexts/IntegrationContext";
import { FinalizedSchemaProvider } from "../../contexts/FinalizedSchemaContext";

const CreateNewSource = () => {
  const [error, setError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [source, setSource] = useState("");
  const [streamNames, setStreamNames] = useState<string[]>([]);
  const [sampleEvent, setSampleEvent] = useState<SampleEvent>({});
  const [inferredSchema, setInferredSchema] = useState<InferredSchema>([]);

  const handleClickSource = (sourceName: string) => {
    setSource(sourceName);
    setActiveStep(2);
  };

  const handleNavigation = (step: number) => {
    setActiveStep(step);
    setError(null);
  };

  const handleAuthenticate = async (accessKey: string, secretKey: string) => {
    try {
      const data = await APIService.authenticate({ accessKey, secretKey });
      if (data.authenticated) {
        setStreamNames(data.streamNames);
        handleNavigation(3);
      } else {
        setError("Authentication failed. Please check your credentials.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during authentication.");
    }
  };

  const handleInferSchema = async (streamName: string) => {
    try {
      const data = await APIService.inferSchema({ streamName });
      if (data) {
        setInferredSchema(data.inferredSchema);
        setSampleEvent(data.sampleEvent);
        handleNavigation(4);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while inferring the schema.");
    }
  };

  const handleCreateTable = async ({
    streamName,
    tableName,
    databaseName,
    schema,
  }: CreateTable) => {
    try {
      const data = await APIService.createTable({
        streamName,
        tableName,
        databaseName,
        schema,
      });
      if (data && data.success) {
        handleNavigation(5);
      } else {
        setError("Failed to create table. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while creating the table.");
    }
  };

  return (
    <FinalizedSchemaProvider inferredSchema={inferredSchema}>
      <StreamProvider>
        <IntegrationProvider>
          <div className="container mx-auto px-4 py-8 bg-custom-dark-blue text-custom-light-gray">
            <ol className="relative space-y-8 before:absolute before:left-[15px] before:top-4 before:h-[calc(100%-32px)] before:w-0.5 before:bg-custom-light-purple">
              <li className="relative">
                <div className="flex items-center">
                  <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full bg-custom-light-purple text-white">
                    1
                  </div>
                  <h4 className="ml-12 text-lg font-semibold text-custom-light-purple">
                    Select the data source
                  </h4>
                </div>
                <div className="mt-4 ml-12">
                  <SelectSourceType
                    isActive={activeStep === 1}
                    onClickSource={handleClickSource}
                  />
                </div>
              </li>
              <li className="relative">
                <div className="flex items-center">
                  <div
                    className={`absolute left-0 flex h-8 w-8 items-center justify-center rounded-full ${
                      activeStep >= 2
                        ? "bg-custom-light-purple"
                        : "bg-custom-medium-blue"
                    } text-white`}
                  >
                    2
                  </div>
                  <h4 className="ml-12 text-lg font-semibold text-custom-light-purple">
                    Setup Connection
                  </h4>
                </div>
                <div className="mt-4 ml-12">
                  <InputSourceDetails
                    isActive={activeStep === 2}
                    onClickBack={() => handleNavigation(1)}
                    onAuthenticate={handleAuthenticate}
                  />
                </div>
              </li>
              <li className="relative">
                <div className="flex items-center">
                  <div
                    className={`absolute left-0 flex h-8 w-8 items-center justify-center rounded-full ${
                      activeStep >= 3
                        ? "bg-custom-light-purple"
                        : "bg-custom-medium-blue"
                    } text-white`}
                  >
                    3
                  </div>
                  <h4 className="ml-12 text-lg font-semibold text-custom-light-purple">
                    Choose Stream
                  </h4>
                </div>
                <div className="mt-4 ml-12">
                  <ChooseStream
                    isActive={activeStep === 3}
                    onClickBack={() => handleNavigation(2)}
                    onInferSchema={handleInferSchema}
                    streamNames={streamNames}
                  />
                </div>
              </li>
              <li className="relative">
                <div className="flex items-center">
                  <div
                    className={`absolute left-0 flex h-8 w-8 items-center justify-center rounded-full ${
                      activeStep >= 4
                        ? "bg-custom-light-purple"
                        : "bg-custom-medium-blue"
                    } text-white`}
                  >
                    4
                  </div>
                  <h4 className="ml-12 text-lg font-semibold text-custom-light-purple">
                    Confirm Schema
                  </h4>
                </div>
                <div className="mt-4 ml-12">
                  <ConfirmSchema
                    isActive={activeStep === 4}
                    onClickBack={() => handleNavigation(3)}
                    onCreateTable={handleCreateTable}
                  />
                </div>
              </li>
              <li className="relative">
                <div className="flex items-center">
                  <div
                    className={`absolute left-0 flex h-8 w-8 items-center justify-center rounded-full ${
                      activeStep >= 5
                        ? "bg-custom-light-purple"
                        : "bg-custom-medium-blue"
                    } text-white`}
                  >
                    5
                  </div>
                  <h4 className="ml-12 text-lg font-semibold text-custom-light-purple">
                    Data Source Confirmation
                  </h4>
                </div>
                <div className="mt-4 ml-12">
                  <DataSourceConfirmation
                    isActive={activeStep === 5}
                    onClick={() => null}
                  />
                </div>
              </li>
            </ol>
            {error && (
              <div className="mt-4 text-red-500 bg-red-100 border border-red-400 rounded p-2">
                {error}
              </div>
            )}
          </div>
        </IntegrationProvider>
      </StreamProvider>
    </FinalizedSchemaProvider>
  );
};

export default CreateNewSource;
