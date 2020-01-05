import axios from 'axios';
import { Alert } from 'react-native';

const REST = axios.create({
  baseURL: 'http://192.168.1.5:6789/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

REST.interceptors.request.use(async config => {
  try {
    config.params = { locale: 'en' };
    config.headers = {
      ...config.headers,
    };
    return config;
  } catch (error) {
    return Promise.reject(error);
  }
});

REST.interceptors.response.use(
  res => res,
  error => {
    if (error.message === 'Network Error') {
      Alert.alert(error.message);
    } else if (
      error.response &&
      error.response.status === 401 &&
      !error.response.request.responseURL.includes('sign_in')
    ) {
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  },
);

export default REST;
