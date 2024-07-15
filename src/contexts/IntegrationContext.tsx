import { createContext, useContext, useState, ReactNode } from "react";
import { IntegrationContextType } from "../types";

const IntegrationContext = createContext<IntegrationContextType | undefined>(undefined);

interface IntegrationProviderProps {
  children: ReactNode;
}

export const IntegrationProvider: React.FC<IntegrationProviderProps> = ({ children }) => {
  const [integrationName, setIntegrationName] = useState('');

  return (
    <IntegrationContext.Provider value={{ integrationName, setIntegrationName }}>
      {children}
    </IntegrationContext.Provider>
  );
};

export const useIntegration = () => {
  const context = useContext(IntegrationContext);
  if (context === undefined) {
    throw new Error('useIntegration must be used within a IntegrationProvider');
  }
  return context;
};