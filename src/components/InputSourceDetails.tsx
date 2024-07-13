interface inputSourceDetailsProps {
  isActive: boolean;
  onClickBack: () => void;
  onClickNext: () => void;
}

const InputSourceDetails = ({
  isActive,
  onClickBack,
  onClickNext,
}: inputSourceDetailsProps) => {
  return (
    <>
      <div className="block w-[52rem]">
        <h4 className="text-base text-left text-indigo-600 mb-2 pt-2">
          Setup Connection
        </h4>

        {isActive && (
          <div className="mt-6 bg-white p-6 rounded-md shadow-md">
            <div className="grid gap-6">
              <div className="flex flex-col">
                <label
                  htmlFor="integrationName"
                  className="mb-2 text-gray-700 text-left"
                >
                  Integration Name
                </label>
                <input
                  id="integrationName"
                  name="integrationName"
                  placeholder="My new Kinesis stream"
                  className="p-2 border rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="iamAccessKey"
                  className="mb-2 text-gray-700 text-left"
                >
                  IAM Access Key
                </label>
                <input
                  id="iamAccessKey"
                  name="username"
                  placeholder="Select your IAM access key"
                  className="p-2 border rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="iamSecret"
                  className="mb-2 text-gray-700 text-left"
                >
                  IAM Secret
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="iamSecret"
                    name="password"
                    placeholder="Input your IAM secret"
                    className="p-2 border rounded-md w-full"
                  />
                  <button className="absolute right-2 top-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      role="img"
                      aria-label="eye"
                    >
                      <path
                        stroke="#161517"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M3.118 12.467a.987.987 0 0 1 0-.935C5.01 8.033 8.505 5 12 5s6.99 3.033 8.882 6.533a.987.987 0 0 1 0 .935C18.99 15.967 15.495 19 12 19s-6.99-3.033-8.882-6.533Z"
                        clipRule="evenodd"
                      ></path>
                      <path
                        stroke="#161517"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.429"
                        d="M14.121 9.879A3 3 0 1 1 9.88 14.12 3 3 0 0 1 14.12 9.88"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => onClickBack()}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Back
              </button>
              <button
                onClick={() => onClickNext()}
                className="px-4 py-2 bg-indigo-500 text-white rounded-md"
              >
                Next: Choose Stream
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InputSourceDetails;
