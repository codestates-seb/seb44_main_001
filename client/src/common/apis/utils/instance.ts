import axios from 'axios';
import { BASE_URL } from '../../util/constantValue';

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('Authorization');
  const refreshToken = localStorage.getItem('RefreshToken');

  if (accessToken) {
    config.headers.Authorization = accessToken;
  }

  if (refreshToken) {
    config.headers.Refresh = refreshToken;
  }
  return config;
});
