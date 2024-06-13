import axios from 'axios';


export const fetchDevices = async () => {
  try {
    const response = await axios.get('http://173.249.41.29:5035/api/devices');
    return response.data;
  } catch (error) {
    console.error('Error fetching devices:', error);
    throw error;
  }
};