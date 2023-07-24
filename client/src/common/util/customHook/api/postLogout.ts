import axios from 'axios';

export const postLogout = async (url: string) => {
  const accessToken = localStorage.getItem('Authorization');
  const refreshToken = localStorage.getItem('RefreshToken');

  const headers = {
    Authorization: accessToken,
    Refresh: refreshToken,
  };

  const res = await axios.post(url, { headers });

  if (res.headers.authorization) {
    localStorage.setItem('Authorization', res.headers.authorization);
  }
  return res.data;
};
