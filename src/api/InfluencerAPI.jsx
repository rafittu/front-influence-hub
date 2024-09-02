import axios from 'axios';

const baseUrl = process.env.REACT_APP_IH_BASE_API_URL || '';

const findAllInfluencersApi = async (accessToken) => {
  try {
    const response = await axios.get(`${baseUrl}/influencer/all`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export default findAllInfluencersApi;
