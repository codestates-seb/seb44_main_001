import axios from 'axios';

export const getNotification = async (url: string) => {
  const headers = { 'ngrok-skip-browser-warning': '69420' };

  const res = await axios.get(url, { headers });

  return res.data;
};
