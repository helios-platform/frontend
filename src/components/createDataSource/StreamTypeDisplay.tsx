import React from "react";

interface StreamTypeDisplayProps {
  streamType: string;
  imageUrl: string | null;
}

const StreamTypeDisplay: React.FC<StreamTypeDisplayProps> = ({
  streamType,
  imageUrl,
}) => {
  return (
    <div className="flex items-center space-x-2">
      {imageUrl && (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-custom-dark-blue">
          <img src={imageUrl} alt={streamType} className="w-6 h-6" />
        </div>
      )}
      <span className="text-custom-light-gray">{streamType}</span>
    </div>
  );
};

export default StreamTypeDisplay;

