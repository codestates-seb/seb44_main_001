import axios from 'axios';

export const postLogout = async (url: string) => {
  const token = localStorage.getItem('Authorization');
  const headers = {
    Authorization: token,
    'ngrok-skip-browser-warning': '69420',
  };
  const res = await axios.post(url, null, { headers });
  return res.data
};
