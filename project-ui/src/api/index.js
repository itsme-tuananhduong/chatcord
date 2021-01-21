import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.common.Authorization = token;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export default instance;