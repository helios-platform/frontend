import axios from 'axios';

const API_URL = '/api'; // Adjust this to your backend URL

const getDatabases = async () => {
  const response = await axios.get(`${API_URL}/databases`);
  return response.data;
};

const executeQuery = async (query: string) => {
  const response = await axios.post(`${API_URL}/query`, { query });
  return response.data;
};

export default { getDatabases, executeQuery }