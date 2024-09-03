import axios from 'axios';

const baseUrl = process.env.REACT_APP_IH_BASE_API_URL || '';

export const createInfluencerApi = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/influencer/create`, data);

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllInfluencersApi = async (accessToken) => {
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

export const getInfluencersByFilterApi = async (accessToken, filters) => {
  try {
    const response = await axios.get(`${baseUrl}/influencer/filter`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: filters,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};
