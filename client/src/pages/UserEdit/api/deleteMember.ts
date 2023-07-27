import axios from 'axios';

export const deleteMember = async (url: string) => {
  const accessToken = localStorage.getItem('Authorization');
  const refreshToken = localStorage.getItem('RefreshToken');

  const headers = {
    Authorization: accessToken,
    Refresh: refreshToken,
  };

  const res = await axios.delete(url, { headers });
  return res.data;
};
