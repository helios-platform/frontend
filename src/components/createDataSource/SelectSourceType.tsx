import React from "react";

const sources = [
  {
    name: "Amazon Kinesis",
    platform: "AWS",
    imageUrl: "./images/amazon-kinesis.svg",
  },
  {
    name: "Amazon S3",
    platform: "AWS",
    imageUrl: "./images/amazon-s3.svg",
  },
];

interface SelectSourceTypeProps {
  isActive: boolean;
  onClickSource: (source: string) => void;
}

const SelectSourceType: React.FC<SelectSourceTypeProps> = ({
  isActive,
  onClickSource,
}) => {
  return (
    <div className="block">
      {isActive && (
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {sources.map((source) => (
            <li
              key={source.name}
              className="col-span-1 flex flex-col rounded-lg bg-custom-medium-blue text-center shadow-custom hover:shadow-glow transition-shadow duration-300 cursor-pointer"
              onClick={() => onClickSource(source.name)}
            >
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-center">
                  <img
                    alt=""
                    src={source.imageUrl}
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-lg object-contain"
                  />
                </div>
                <h3 className="mt-4 text-sm font-medium text-custom-light-gray">
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
