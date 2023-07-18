import axios from 'axios';

type likeType = {
  isLiked: boolean;
};

export const postLike = async (url: string, data: likeType) => {
  const headers = { 'ngrok-skip-browser-warning': '69420' };
  const res = await axios.post(url, data, { headers });
  return res.data;
};
