import { useState } from "react";
// import GridList from "./GridList";

const sources = [
  {
    name: "Amazon Kinesis",
    platform: "AWS",
    imageUrl: "/public/images/amazon-kinesis.svg",
  },
  {
    name: "Amazon S3",
    platform: "AWS",
    imageUrl: "/public/images/amazon-s3.svg",
  },
];

interface selectSourceTypeProps {
  isActive: boolean;
  onClickSource: (source: string) => void;
}

const SelectSourceType = ({
  isActive,
  onClickSource,
}: selectSourceTypeProps) => {
  return (
    <>
      <div className="block">
        <h4 className="text-base text-left text-indigo-600 mb-2 pt-2">
          Select the data source
        </h4>
        {isActive && (
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {sources.map((source) => (
              <li
                key={source.name}
                className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow hover:bg-slate-50 active:border-black active:border"
                onClick={() => onClickSource(source.name)}
              >
                <div className="flex flex-1 flex-col p-8">
                  <img
                    alt=""
                    src={source.imageUrl}
                    className="mx-auto h-32 w-32 flex-shrink-0 rounded"
                  />
                  <h3 className="mt-6 text-sm font-medium text-gray-900">
                    {source.name}
                  </h3>
                  <dl className="mt-1 flex flex-grow flex-col justify-between">
                    <dd className="mt-3">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {source.platform}
                      </span>
                    </dd>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SelectSourceType;
