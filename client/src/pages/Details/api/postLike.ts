import axios from 'axios';

type likeType = {
  isLiked: boolean;
};

export const postLike = async (url: string, data: likeType) => {
    const token = localStorage.getItem('Authorization');
    const headers = {
      Authorization: token,
      'ngrok-skip-browser-warning': '69420',
    };
  const res = await axios.post(url, data, { headers });
  return res.data;
};

