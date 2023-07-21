import axios from 'axios';

export const deleteLike = async (url: string) => {
  const headers = { 'ngrok-skip-browser-warning': '69420' };
  const res = await axios.delete(url, { headers });
  return res.data;
};
