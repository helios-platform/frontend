import React from "react";
import { useStream } from "../../contexts/StreamContext";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface ChooseStreamProps {
  isActive: boolean;
  onClickBack: () => void;
  onInferSchema: (streamName: string) => void;
  streamNames: string[];
}

const ChooseStream: React.FC<ChooseStreamProps> = ({
  isActive,
  onClickBack,
  onInferSchema,
  streamNames,
}) => {
  const { streamName, setStreamName } = useStream();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (streamName) {
      onInferSchema(streamName);
    }
  };

  return (
    <form className="block w-full max-w-3xl" onSubmit={handleSubmit}>
      <h4 className="text-lg font-semibold text-left text-custom-light-purple mb-4">
        Choose Stream
      </h4>
      {isActive && (
        <div className="mt-6 bg-custom-medium-blue p-6 rounded-lg shadow-custom">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="kinesisStream"
                className="block text-lg font-medium text-custom-light-gray mb-2"
              >
                Kinesis Stream
              </label>
              <Menu as="div" className="relative inline-block text-left w-full">
                <div>
                  <Menu.Button className="inline-flex w-full justify-between items-center rounded-md bg-custom-dark-blue px-4 py-2 text-md font-medium text-custom-light-gray shadow-glow ring-1 ring-inset ring-custom-light-blue hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    {streamName || "Select a stream"}
                    <ChevronDownIcon
                      className="ml-2 -mr-1 h-5 w-5 text-custom-light-blue"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Menu.Items className="absolute z-10 mt-2 w-full origin-top-right rounded-md bg-custom-dark-blue shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1">
                    {streamNames.map((stream) => (
                      <Menu.Item key={stream}>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-custom-light-purple text-white"
                                : "text-custom-light-gray"
                            } group flex w-full items-center rounded-md px-2 py-2 text-md`}
                            onClick={() => setStreamName(stream)}
                          >
                            {stream}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Menu>
            </div>
          </div>
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
              disabled={!streamName}
            >
              Next: Confirm Schema
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default ChooseStream;
