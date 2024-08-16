import React from "react";

const sources = [
  {
    name: "Amazon Kinesis",
    platform: "AWS",
    imageUrl: "./images/amazon-kinesis.svg",
    // color: "bg-indigo-600",
  },
  {
    name: "Amazon S3",
    platform: "AWS",
    imageUrl: "./images/amazon-s3.svg",
    // color: "bg-green-600",
  },
];

interface selectSourceTypeProps {
  isActive: boolean;
  onClickSource: (source: string) => void;
}

const SelectSourceType: React.FC<selectSourceTypeProps> = ({
  isActive,
  onClickSource,
}) => {
  return (
    <div className="block">
      <h4 className="text-lg font-semibold text-left text-custom-light-purple mb-4">
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
              className="col-span-1 flex flex-col rounded-lg bg-custom-medium-blue text-center shadow-custom hover:shadow-glow transition-shadow duration-300 cursor-pointer"
              onClick={() => onClickSource(source.name)}
            >
              <div className="flex flex-1 flex-col p-8">
                <div
                  className={`mx-auto h-32 w-32 flex-shrink-0 rounded-lg ${source.color} flex items-center justify-center`}
                >
                  <img
                    alt=""
                    src={source.imageUrl}
                    className="h-32 w-32 rounded-lg"
                  />
                </div>
                <h3 className="mt-6 text-sm font-medium text-custom-light-gray">
                  {source.name}
                </h3>
                <dl className="mt-1 flex flex-grow flex-col justify-between">
                  <dd className="mt-3">
                    <span className="inline-flex items-center rounded-full bg-custom-green/20 px-2 py-1 text-xs font-medium text-custom-green ring-1 ring-inset ring-custom-green/30">
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
  );
};

export default SelectSourceType;
