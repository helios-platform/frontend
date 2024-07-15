import { createContext, useContext, useState, ReactNode } from "react";
import { StreamContextType } from "../types";

const StreamContext = createContext<StreamContextType | undefined>(undefined);

interface StreamProviderProps {
  children: ReactNode;
}

export const StreamProvider: React.FC<StreamProviderProps> = ({ children }) => {
  const [streamName, setStreamName] = useState('');

  return (
    <StreamContext.Provider value={{ streamName, setStreamName }}>
      {children}
    </StreamContext.Provider>
  );
};

export const useStream = () => {
  const context = useContext(StreamContext);
  if (context === undefined) {
    throw new Error('useStream must be used within a StreamProvider');
  }
  return context;
};

