import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { FinalizedSchemaContextType, InferredSchema } from "../types";

const FinalizedSchemaContext = createContext<FinalizedSchemaContextType | undefined>(undefined);

interface FinalizedSchemaProviderProps {
  children: ReactNode;
  inferredSchema: InferredSchema;
}

export const FinalizedSchemaProvider: React.FC<FinalizedSchemaProviderProps> = ({ children, inferredSchema }) => {
  const [finalizedSchema, setFinalizedSchema] = useState<InferredSchema>(() => inferredSchema);
  console.log('FinalizedSchemaProvider Context', inferredSchema, finalizedSchema)

  useEffect(() => {
    setFinalizedSchema(inferredSchema);
  }, [inferredSchema]);

  return (
    <FinalizedSchemaContext.Provider value={{ finalizedSchema, setFinalizedSchema }}>
      {children}
    </FinalizedSchemaContext.Provider>
  );
};

export const useFinalizedSchema = () => {
  const context = useContext(FinalizedSchemaContext);
  if (context === undefined) {
    throw new Error('useFinalizedSchema must be used within a FinalizedSchemaProvider');
  }
  return context;
};