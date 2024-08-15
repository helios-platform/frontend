import { z } from "zod";

export const DatabasesResponseSchema = z.record(
  z.string(),
  z.array(z.string()),
);
export type DatabasesResponse = z.infer<typeof DatabasesResponseSchema>;

export const QueryResponseSchema = z.object({
  cols: z.array(z.string()),
  rows: z.array(z.record(z.string(), z.any())),
  row_count: z.number(),
});

export type QueryResponse = z.infer<typeof QueryResponseSchema>;

export const AuthenticateResponseSchema = z.object({
  authenticated: z.boolean(),
  streamNames: z.array(z.string()),
});

export type AuthenticateResponse = z.infer<typeof AuthenticateResponseSchema>;

export type AuthenticateRequest = z.infer<typeof AuthenticateRequestSchema>;

const ColumnSchema = z.object({
  name: z.string(),
  type: z.string(),
});

const SampleEventSchema = z.record(z.string(), z.any());

export type SampleEvent = z.infer<typeof SampleEventSchema>;

const InferredSchemaSchema = z.array(ColumnSchema);

export type InferredSchema = z.infer<typeof InferredSchemaSchema>;

export const InferSchemaResponseSchema = z.object({
  inferredSchema: InferredSchemaSchema,
  sampleEvent: SampleEventSchema,
});

export type InferSchemaResponse = z.infer<typeof InferSchemaResponseSchema>;

const AuthenticateRequestSchema = z.object({
  accessKey: z.string(),
  secretKey: z.string(),
});

const InferSchemaRequestSchema = z.object({
  streamName: z.string(),
});

export type InferSchemaRequest = z.infer<typeof InferSchemaRequestSchema>;

const CreateTableRequestSchema = z.object({
  streamName: z.string(),
  tableName: z.string(),
  schema: z.array(ColumnSchema),
  databaseName: z.string(),
});

export const CreateTableResponseSchema = z.object({
  createTableQuery: z.string(),
  message: z.string(),
  streamARN: z.string(),
  success: z.boolean(),
  tableUUID: z.string(),
});

export type CreateTableResponse = z.infer<typeof CreateTableResponseSchema>;
export type CreateTableRequest = z.infer<typeof CreateTableRequestSchema>;
export type CreateTable = z.infer<typeof CreateTableSchema>;

const CreateTableSchema = z.object({
  streamName: z.string(),
  tableName: z.string(),
  databaseName: z.string(),
  schema: InferredSchemaSchema,
});

export const RawSourceDataSchema = z.object({
  streamName: z.string(),
  streamType: z.string(),
  tableName: z.string(),
  createdOn: z.string(),
});

export const TransformedSourceDataSchema = RawSourceDataSchema.extend({
  imageUrl: z.string().nullable(),
});

export const SourcesResponseSchema = z.array(TransformedSourceDataSchema);

export type RawSourceData = z.infer<typeof RawSourceDataSchema>;
export type TransformedSourceData = z.infer<typeof TransformedSourceDataSchema>;
export type SourcesResponse = z.infer<typeof SourcesResponseSchema>;

export const streamTypeMap = {
  kinesis: {
    streamType: "Amazon Kinesis",
    imageUrl: "./images/amazon-kinesis.svg",
  },
  s3: {
    streamType: "Amazon S3",
    imageUrl: "./images/amazon-s3.svg",
  },
} as const;

const StreamContextTypeSchema = z.object({
  streamName: z.string(),
  setStreamName: z.function().args(z.string()).returns(z.void()),
});

export type StreamContextType = z.infer<typeof StreamContextTypeSchema>;

const IntegrationContextTypeSchema = z.object({
  integrationName: z.string(),
  setIntegrationName: z.function().args(z.string()).returns(z.void()),
});

export type IntegrationContextType = z.infer<
  typeof IntegrationContextTypeSchema
>;

const FinalizedSchemaContextTypeSchema = z.object({
  finalizedSchema: InferredSchemaSchema,
  setFinalizedSchema: z.function(z.tuple([InferredSchemaSchema]), z.void()),
});

export type FinalizedSchemaContextType = z.infer<
  typeof FinalizedSchemaContextTypeSchema
>;

