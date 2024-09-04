import axios from 'axios';

const baseUrl = process.env.REACT_APP_IH_BASE_API_URL || '';

export const createBrandApi = async (accessToken, data) => {
  try {
    const response = await axios.post(`${baseUrl}/brand/create`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllBrandsApi = async (accessToken) => {
  try {
    const response = await axios.get(`${baseUrl}/brand`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getBrandByIdApi = async (accessToken, id) => {
  try {
    const response = await axios.get(`${baseUrl}/brand/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getInfluencersByBrandIdApi = async (accessToken, id, brandName) => {
  try {
    const response = await axios.get(`${baseUrl}/brand/influencers/by-brand`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { brand: brandName },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};
