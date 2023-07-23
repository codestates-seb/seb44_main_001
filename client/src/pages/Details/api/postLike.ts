import axios from 'axios';

type likeType = {
  isLiked: boolean;
};

export const postLike = async (url: string, data: likeType) => {
  try {
    const accessToken = localStorage.getItem('Authorization');
    const refreshToken = localStorage.getItem('RefreshToken');

    const headers = {
      Authorization: accessToken,
      Refresh: refreshToken,
    };

    const res = await axios.post(url, data, { headers });

    if (res.headers.authorization) {
      localStorage.setItem('Authorization', res.headers.authorization);
    }

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
