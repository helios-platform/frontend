import axios from 'axios';

const API_URL = '/api'; // Adjust this to your backend URL

const getDatabases = async () => {
  try {
    const response = await axios.get(`${API_URL}/databases`);
    return response.data;
  } catch (error) {
    console.error('Error in getDatabases: ', error)
    return {}
  }

};

const executeQuery = async (query: string) => {
  try {
    const { data }  = await axios.post(`${API_URL}/query`, { query });
    return {cols: data.metadata.column_names, rows: data.data}
  } catch (error) {
    console.error('Error in executeQuery: ', error)
  }

};

export default { getDatabases, executeQuery }