import { ChangeEvent } from "react";
import { useStream } from "../../contexts/StreamContext";

interface chooseStreamProps {
  isActive: boolean;
  onClickBack: () => void;
  onInferSchema: (streamName: string) => void;
  streamNames: string[];
}

const ChooseStream = ({
  isActive,
  onClickBack,
  onInferSchema,
  streamNames,
}: chooseStreamProps) => {
  const { streamName, setStreamName } = useStream();
  return (
    <>
      <form
        className="block w-[52rem]"
        method='POST'
        onSubmit={(e) => {
          e.preventDefault()
          onInferSchema(streamName)
        }}
      >
        <h4 className="text-base text-left text-indigo-600 mb-2 pt-2">
          Choose Stream
        </h4>

        {isActive && (
          <div className="mt-6 bg-white p-6 rounded-md shadow-md">
            <div className="grid gap-6">
              <div className="flex flex-col">
                <label
                  htmlFor="kinesisStream"
                  className="text-left mb-2 text-gray-700"
                >
                  Kinesis Stream
                </label>
                <select
                  name=""
                  id="kinesisStream"
                  className="flex items-center justify-between py-2 pl-4 border rounded-md"
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setStreamName(e.target.value)}
                >
                  <option className="text-slate-200" value="">
                    Select a stream
                  </option>
                  {/* # TODO: add unique key */}

                  {streamNames.map((stream) => {
                    return (
                      <option
                        key={stream}
                        value={stream}
                        selected={streamName === stream}
                      >
                        {stream}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <button onClick={() => onClickBack()} className="px-4 py-2 bg-gray-300 rounded-md">Back</button>
              <button type='submit' className="px-4 py-2 bg-indigo-500 text-white rounded-md">
                Next: Confirm Schema
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default ChooseStream;
