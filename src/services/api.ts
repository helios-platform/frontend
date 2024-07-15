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
  CreateTableResponse
} from '../types';

const API_URL = '/api';

// /api/databases
const getDatabases = async () => {
  try {
    const response = await axios.get(`${API_URL}/databases`);
    return response.data;
  } catch (error) {
    console.error('Error in getDatabases: ', error)
    return {}
  }
};

// /api/query
const executeQuery = async (query: string) => {
  try {
    const { data }  = await axios.post(`${API_URL}/query`, { query });
    return {cols: data.metadata.column_names, rows: data.data}
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

export default { getDatabases, executeQuery, authenticate, inferSchema, createTable }

// HTTPDriver for http://localhost:8123 returned response code 400)
//  Code: 62. DB::Exception: Syntax error: failed at position 23 ('('): (user_id Nullable(Int64), session_id Nullable(String), 
//  event_type Nullable(String), event_timestamp Nullable(Int64), page_url Nullable(String), product_id Nulla. 
 
//  Expected one of: identifier, end of query. (SYNTAX_ERROR) (version 24.5.3.5 (official build))
