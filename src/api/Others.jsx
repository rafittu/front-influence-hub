import axios from 'axios';

const getAddress = async (zipCode) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);

    return response.data;
  } catch (error) {
    return error;
  }
};

export default getAddress;
