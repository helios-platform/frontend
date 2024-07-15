
import { z } from "zod";

// POST /api/authenticate
export const AuthenticateResponseSchema = z.object({
  authenticated: z.boolean(),
  streamNames: z.array(z.string())
});

export type AuthenticateResponse = z.infer<typeof AuthenticateResponseSchema>;

// POST /api/kinesis-sample
const ColumnSchema = z.object({
  name: z.string(),
  type: z.string()
});

const SampleEventSchema = z.record(z.string(), z.any());

export type SampleEvent = z.infer<typeof SampleEventSchema>

const InferredSchemaSchema = z.array(ColumnSchema)

export type InferredSchema = z.infer<typeof InferredSchemaSchema>

export const InferSchemaResponseSchema = z.object({
  inferredSchema: InferredSchemaSchema,
  sampleEvent: SampleEventSchema
});

export type InferSchemaResponse = z.infer<typeof InferSchemaResponseSchema>;

// POST /api/create-table
export const CreateTableResponseSchema = z.object({
  create_table_query: z.string(),
  message: z.string(),
  streamARN: z.string(),
  success: z.boolean(),
  tableUUID: z.string()
});

export type CreateTableResponse = z.infer<typeof CreateTableResponseSchema>;

// You can also define schemas for the request bodies if needed
const AuthenticateRequestSchema = z.object({
  accessKey: z.string(),
  secretKey: z.string(),
});

const InferSchemaRequestSchema = z.object({
  streamName: z.string()
});

const CreateTableRequestSchema = z.object({
  streamName: z.string(),
  tableName: z.string(),
  schema: z.array(ColumnSchema),
  databaseName: z.string()
});

// Types for request bodies
export type AuthenticateRequest = z.infer<typeof AuthenticateRequestSchema>;
export type InferSchemaRequest = z.infer<typeof InferSchemaRequestSchema>;
export type CreateTableRequest = z.infer<typeof CreateTableRequestSchema>;

const StreamContextTypeSchema = z.object({
  streamName: z.string(),
  setStreamName: z.function().args(z.string()).returns(z.void())
})

export type StreamContextType = z.infer<typeof StreamContextTypeSchema>

const IntegrationContextTypeSchema = z.object({
  integrationName: z.string(),
  setIntegrationName: z.function().args(z.string()).returns(z.void())
})

export type IntegrationContextType = z.infer<typeof IntegrationContextTypeSchema>

const FinalizedSchemaContextTypeSchema = z.object({
  finalizedSchema: InferredSchemaSchema,
  setFinalizedSchema: z.function(
    z.tuple([InferredSchemaSchema]),
    z.void()
  )
})

export type FinalizedSchemaContextType = z.infer<typeof FinalizedSchemaContextTypeSchema>

const CreateTableSchema = z.object({
  streamName: z.string(),
  tableName: z.string(), 
  databaseName: z.string(), 
  schema: InferredSchemaSchema
});

export type CreateTable = z.infer<typeof CreateTableSchema>