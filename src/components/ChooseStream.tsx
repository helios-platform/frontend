interface chooseStreamProps {
  isActive: boolean;
  onClickBack: () => void;
  onClickNext: () => void;
}

const ChooseStream = ({
  isActive,
  onClickBack,
  onClickNext,
}: chooseStreamProps) => {
  return (
    <>
      <div className="block w-[52rem]">
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
                >
                  <option className="text-slate-200" value="">
                    Select a stream
                  </option>
                  <option value="Stream 1">Stream 1</option>
                  <option value="Stream 2">Stream 2</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <button onClick={() => onClickBack()} className="px-4 py-2 bg-gray-300 rounded-md">Back</button>
              <button onClick={() => onClickNext()} className="px-4 py-2 bg-indigo-500 text-white rounded-md">
                Next: Confirm Schema
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChooseStream;
