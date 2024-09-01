import axios from 'axios';

const baseUrl = process.env.REACT_APP_IH_BASE_API_URL || '';

const adminLoginApi = async (email, password) => {
  try {
    const response = await axios.post(`${baseUrl}/signin`, { email, password });

    return response.data;
  } catch (error) {
    return error;
  }
};

export default adminLoginApi;
