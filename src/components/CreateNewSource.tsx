import { useState } from "react";
import SelectSourceType from "./SelectSourceType";
import InputSourceDetails from "./InputSourceDetails";
import ChooseStream from "./ChooseStream";
import ConfirmSchema from "./ConfirmSchema";

const CreateNewSource = () => {
  const [isOneActive, setIsOneActive] = useState(true);
  const [source, setSource] = useState("");
  const [isTwoActive, setIsTwoActive] = useState(false);
  const [isThreeActive, setIsThreeActive] = useState(false);
  const [isFourActive, setIsFourActive] = useState(false);

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

  return (
    <ol className=" overflow-hidden space-y-8">
      <li className="relative flex-1 after:content-['']  after:w-0.5 after:h-full  after:bg-indigo-600 after:inline-block after:absolute after:-bottom-11 after:left-4 lg:after:left-5">
        <div className="flex items-start font-medium w-full">
          <button className="w-8 h-8 aspect-square bg-indigo-600 border-2 border-transparent rounded-full flex justify-center items-center mr-3 text-sm text-white lg:w-10 lg:h-10">
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
          <button className="w-8 h-8 bg-indigo-50 relative z-20 border-2 border-indigo-600 rounded-full flex justify-center items-center mr-3 text-sm text-indigo-600 lg:w-10 lg:h-10">
            2
          </button>
          <InputSourceDetails
            isActive={isTwoActive}
            onClickBack={handleNavigation(setIsTwoActive, setIsOneActive)}
            onClickNext={handleNavigation(setIsTwoActive, setIsThreeActive)}
          />
        </div>
      </li>
      <li className="relative flex-1 after:content-[''] z-10  after:w-0.5 after:h-full after:z-0 after:bg-gray-200 after:inline-block after:absolute after:-bottom-12 after:left-4 lg:after:left-5">
        <div className="flex items-start font-medium w-full">
          <button className="w-8 h-8 bg-indigo-50 relative z-20 border-2 border-indigo-600 rounded-full flex justify-center items-center mr-3 text-sm text-indigo-600 lg:w-10 lg:h-10">
            3
          </button>
          <ChooseStream
            isActive={isThreeActive}
            onClickBack={handleNavigation(setIsThreeActive, setIsTwoActive)}
            onClickNext={handleNavigation(setIsThreeActive, setIsFourActive)}
          />
        </div>
      </li>
      <li className="relative flex-1 after:content-[''] z-10  after:w-0.5 after:h-full after:z-0 after:bg-gray-200 after:inline-block after:absolute after:-bottom-12 after:left-4 lg:after:left-5">
        <div className="flex items-start font-medium w-full">
          <button className="w-8 h-8 bg-indigo-50 relative z-20 border-2 border-indigo-600 rounded-full flex justify-center items-center mr-3 text-sm text-indigo-600 lg:w-10 lg:h-10">
            4
          </button>
          <ConfirmSchema
            isActive={isFourActive}
            onClickBack={() => null}
            onClickNext={() => null}
          />
        </div>
      </li>
    </ol>
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