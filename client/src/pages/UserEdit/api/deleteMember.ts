import axios from 'axios';

export const deleteMember = async (url: string) => {
  const token = localStorage.getItem('Authorization');

  const headers = {
    Authorization: token,
    'ngrok-skip-browser-warning': '69420',
  };

  const res = await axios.delete(url, { headers });
  return res.data
};
