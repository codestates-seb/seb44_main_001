import axios from 'axios';
import { BASE_URL } from '../../util/constantValue';
import { AUTHORIZATION, REFRESHTOKEN } from '../../util/constantValue';

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(AUTHORIZATION);
  const refreshToken = localStorage.getItem(REFRESHTOKEN);

  if (accessToken) {
    config.headers.Authorization = accessToken;
  }

  if (refreshToken) {
    config.headers.Refresh = refreshToken;
  }
  return config;
});
