import { useState } from "react";
import SelectSourceType from "./SelectSourceType";
import InputSourceDetails from "./InputSourceDetails";
import ChooseStream from "./ChooseStream";
import ConfirmSchema from "./ConfirmSchema";
import DataSourceConfirmation from "./DataSourceConfirmation";
import APIService from '../../api'
import { CreateTable, InferredSchema, SampleEvent } from "../../types";
import { StreamProvider } from "../../contexts/StreamContext";
import { IntegrationProvider } from "../../contexts/IntegrationContext";
import { FinalizedSchemaProvider } from "../../contexts/FinalizedSchemaContext";



const CreateNewSource = () => {
  const [error, setError] = useState(false)
  const [isOneActive, setIsOneActive] = useState(true);
  const [source, setSource] = useState("");
  const [isTwoActive, setIsTwoActive] = useState(false);
  const [isThreeActive, setIsThreeActive] = useState(false);
  const [isFourActive, setIsFourActive] = useState(false);
  const [isFiveActive, setIsFiveActive] = useState(false);
  const [streamNames, setStreamNames] = useState<string[]>([])
  const [sampleEvent, setSampleEvent] = useState<SampleEvent>({})
  const [inferredSchema, setInferredSchema] = useState<InferredSchema>([])


  const handleClickSource = (sourceName: string) => {
    setSource(sourceName);
    setIsOneActive(false);
    setIsTwoActive(true);
  };

  const handleNavigation = (
    handler1: (value: boolean) => void,
    handler2: (value: boolean) => void
  ) => {
    return () => {
      handler1(false);
      handler2(true);
    };
  };

  const handleAuthenticate = async (accessKey: string, secretKey: string) => {
    try {
      const data = await APIService.authenticate({ accessKey, secretKey })
      if (data.authenticated) {
        setStreamNames(data.streamNames)
        handleNavigation(setIsTwoActive, setIsThreeActive)()
      }
    } catch (error) {
      console.error(error)
      setError(true)
    }
  }

  const handleInferSchema = async (streamName: string) => {
    try {
      const data = await APIService.inferSchema({ streamName })
      console.log(data)
      if (data) {
        setInferredSchema(data.inferredSchema)
        console.log(inferredSchema)
        setSampleEvent(data.sampleEvent)
        handleNavigation(setIsThreeActive, setIsFourActive)()
      }
    } catch (error) {
      console.error(error)
      setError(true)
    }
  }

  const handleCreateTable = async ({ streamName, tableName, databaseName, schema }: CreateTable) => {
    try {
      const data = await APIService.createTable({ streamName, tableName, databaseName, schema })
      if (data && data.success) {
        handleNavigation(setIsFourActive, setIsFiveActive)()
      }
    } catch (error) {
      console.error(error)
      setError(true)
    }
  }

  return (
    <FinalizedSchemaProvider inferredSchema={inferredSchema}>
      <StreamProvider>
        {/* <IntegrationProvider> */}
          <ol className=" overflow-hidden space-y-8">
            <li className="relative flex-1 after:content-['']  after:w-0.5 after:h-full  after:bg-custom-light-purple after:inline-block after:absolute after:-bottom-11 after:left-4 lg:after:left-5">
              <div className="flex items-start font-medium w-full">
                <button className="w-8 h-8 aspect-square bg-custom-light-purple border-2 border-transparent rounded-full flex justify-center items-center mr-3 text-sm text-white lg:w-10 lg:h-10">
                  1
                </button>
                <SelectSourceType
                  isActive={isOneActive}
                  onClickSource={handleClickSource}
                />
              </div>
            </li>
            <li className="relative flex-1 after:content-[''] z-10  after:w-0.5 after:h-full after:z-0 after:bg-gray-200 after:inline-block after:absolute after:-bottom-12 after:left-4 lg:after:left-5">
              <div className="flex items-start font-medium w-full">
                <button className="w-8 h-8 bg-indigo-50 relative z-20 border-2 border-custom-light-purple rounded-full flex justify-center items-center mr-3 text-sm text-custom-light-purple lg:w-10 lg:h-10">
                  2
                </button>
                {/* <IntegrationProvider> */}
                <InputSourceDetails
                  isActive={isTwoActive}
                  onClickBack={handleNavigation(setIsTwoActive, setIsOneActive)}
                  onAuthenticate={handleAuthenticate}
                />
                {/* </IntegrationProvider> */}
              </div>
            </li>
            <li className="relative flex-1 after:content-[''] z-10  after:w-0.5 after:h-full after:z-0 after:bg-gray-200 after:inline-block after:absolute after:-bottom-12 after:left-4 lg:after:left-5">
              <div className="flex items-start font-medium w-full">
                <button className="w-8 h-8 bg-indigo-50 relative z-20 border-2 border-custom-light-purple rounded-full flex justify-center items-center mr-3 text-sm text-custom-light-purple lg:w-10 lg:h-10">
                  3
                </button>
                {/* <StreamProvider> */}
                <ChooseStream
                  isActive={isThreeActive}
                  onClickBack={handleNavigation(setIsThreeActive, setIsTwoActive)}
                  onInferSchema={handleInferSchema}
                  streamNames={streamNames}
                />
                {/* </StreamProvider> */}

              </div>
            </li>
            <li className="relative flex-1 after:content-[''] z-10  after:w-0.5 after:h-full after:z-0 after:bg-gray-200 after:inline-block after:absolute after:-bottom-12 after:left-4 lg:after:left-5">
              <div className="flex items-start font-medium w-full">
                <button className="w-8 h-8 bg-indigo-50 relative z-20 border-2 border-indigo-600 rounded-full flex justify-center items-center mr-3 text-sm text-indigo-600 lg:w-10 lg:h-10">
                  4
                </button>

                <ConfirmSchema
                  isActive={isFourActive}
                  onClickBack={handleNavigation(setIsFourActive, setIsThreeActive)}
                  onCreateTable={handleCreateTable}
                //sampleEvent={sampleEvent}
                />


              </div>
            </li>
            <li className="relative flex-1 after:content-[''] z-10  after:w-0.5 after:h-full after:z-0 after:bg-gray-200 after:inline-block after:absolute after:-bottom-12 after:left-4 lg:after:left-5">
              <div className="flex items-start font-medium w-full">
                <button className="w-8 h-8 bg-indigo-50 relative z-20 border-2 border-indigo-600 rounded-full flex justify-center items-center mr-3 text-sm text-indigo-600 lg:w-10 lg:h-10">
                  5
                </button>
                <DataSourceConfirmation
                  isActive={isFiveActive}
                  onClick={() => null}
                />
              </div>
            </li>
          </ol>
        {/* </IntegrationProvider> */}
      </StreamProvider>
    </FinalizedSchemaProvider>
  );
};

export default CreateNewSource;


// const handleTwoClickBack = () => {
//   setIsTwoActive(false);
//   setIsOneActive(true);
// };

// const handleTwoClickNext = () => {
//   setIsTwoActive(false);
//   setIsThreeActive(true);
// };

// const handleThreeClickBack = () => {
//   setIsThreeActive(false);
//   setIsTwoActive(true);
// };

// const handleThreeClickNext = () => {
//   setIsThreeActive(false);
//   setIsFourActive(true);
// };

// const handleNavigation = ({handler1, handler2}: handleNavigationProps) => {
//   return () => {
//     handler1(false);
//     handler2(true);
//   };
// };


// interface handleNavigationProps {
//   handler1: (value1: boolean) => void;
//   handler2: (value1: boolean) => void;
// }

{/* <InputSourceDetails
  isActive={isTwoActive}
  onClickBack={handleTwoClickBack}
  onClickNext={handleTwoClickNext}
/> */}

{/* <ChooseStream
  isActive={isThreeActive}
  onClickBack={handleThreeClickBack}
  onClickNext={handleThreeClickNext}
/> */}

