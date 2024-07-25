interface StreamTypeDisplayProps {
  streamType: string;
  imageUrl: string | null;
}

const StreamTypeDisplay = ({ streamType, imageUrl }: StreamTypeDisplayProps) => {
  return (
    <div className="flex items-center space-x-2">
      {imageUrl && <img src={imageUrl} alt={streamType} className="w-6 h-6" />}
      <span>{streamType}</span>
    </div>
  )
};

export default StreamTypeDisplay;