import axios from 'axios';
import { 
  AuthenticateRequest, 
  AuthenticateResponse, 
  AuthenticateResponseSchema,
  InferSchemaRequest,
  InferSchemaResponse,
  InferSchemaResponseSchema,
  CreateTableRequest,
  CreateTableResponseSchema,
  CreateTableResponse,
  DatabasesResponse,
  DatabasesResponseSchema,
  QueryResponse,
  QueryResponseSchema,
  SourcesResponse,
  SourcesResponseSchema,
  RawSourceDataSchema,
  TransformedSourceDataSchema,
} from '../types';

const API_URL = '/api';

// /api/databases

const listDatabases = async (): Promise<DatabasesResponse> => {
  try {
    const { data } = await axios.get<DatabasesResponse>(`${API_URL}/databases`);
    return DatabasesResponseSchema.parse(data);
  } catch (error) {
    console.error('Error in listDatabases: ', error)
    return {}
  }
};

// /api/query
const executeQuery = async (query: string): Promise<QueryResponse | undefined> => {
  function extractLimitNumber(query: string): number | null {
    const match = query.match(/\bLIMIT\s+(\d+)(?!\s*,)/i);
    return match ? parseInt(match[1], 10) : null;
  }

  try {
    const { data }  = await axios.post(`${API_URL}/query`, { query });

    const match = extractLimitNumber(query)
    
    const response: QueryResponse = {
      cols: data.metadata.column_names,
      rows: data.data,
      row_count: match ? Math.min(data.metadata.row_count, match) : data.metadata.row_count,
    };
    return QueryResponseSchema.parse(response);
  } catch (error) {
    console.error('Error in executeQuery: ', error)
  }

};


// /api/authenticate
const authenticate = async ({ accessKey, secretKey }: AuthenticateRequest) => {
  try {
    const { data } = await axios.post<AuthenticateResponse>(`${API_URL}/authenticate`, { accessKey, secretKey })
    return AuthenticateResponseSchema.parse(data)
  } catch (error) {
    console.error('Error in authenticate: ', error)
    return { authenticated: false, streamNames: [] }
  }
}


// /api/kinesis-sample
const inferSchema = async ({streamName}: InferSchemaRequest) => {
  try {
    console.log(streamName)
    const { data }  = await axios.post<InferSchemaResponse>(`${API_URL}/kinesis-sample`, { streamName });
    return InferSchemaResponseSchema.parse(data)
  } catch (error) {
    console.error('Error in inferSchema: ', error)
  }
}

// /api/create-table
const createTable = async ({ streamName, tableName, databaseName, schema }: CreateTableRequest) => {
  try {
      console.log('in frontend services createTable', { streamName, tableName, databaseName, schema })
      const { data } = await axios.post<CreateTableResponse>(`${API_URL}/create-table`, { streamName, tableName, databaseName, schema })
      return CreateTableResponseSchema.parse(data)
  } catch (error) {
    console.error('Error in createTable: ', error)
  }
}

const streamTypeMap = {
  'kinesis': {
    streamType: "Amazon Kinesis",
    imageUrl: "./images/amazon-kinesis.svg",
  },
  's3': {
    streamType: "Amazon S3",
    imageUrl: "./images/amazon-s3.svg",
  },
};

// /api/sources
const listSources = async (): Promise<SourcesResponse | undefined> => {
  try {
    const response = await axios.get(`${API_URL}/sources`);
    const rawData = RawSourceDataSchema.array().parse(response.data);
    
    const transformedData = rawData.map(source => {
      const mappedData = streamTypeMap[source.streamType as keyof typeof streamTypeMap];
      return TransformedSourceDataSchema.parse({
        ...source,
        streamType: mappedData ? mappedData.streamType : source.streamType,
        imageUrl: mappedData ? mappedData.imageUrl : null
      });
    });

    return SourcesResponseSchema.parse(transformedData);
  } catch (error) {
    console.error('Error in listSources: ', error);
    return undefined;
  }
};

export default { listDatabases, executeQuery, authenticate, inferSchema, createTable, listSources }
