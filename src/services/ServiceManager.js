import axios from 'axios';

const ServiceManager = () => {
  const headers = {
    Accept: 'application/json, text/plain, */*',
    'Content-type': 'multipart/form-data',
  };

  const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/',
    timeout: 60000,
    headers,
  });

  return instance;
};

export default ServiceManager;
