import axios from 'axios';

export const deleteLike = async (url: string) => {
  try {
    const accessToken = localStorage.getItem('Authorization');
    const refreshToken = localStorage.getItem('RefreshToken');

    const headers = {
      'ngrok-skip-browser-warning': '69420',
      Authorization: accessToken,
      Refresh: refreshToken,
    };

    const res = await axios.delete(url, { headers });

    if (res.headers.authorization) {
      localStorage.setItem('Authorization', res.headers.authorization);
    }

    return res.data.likeCount
  } catch (err) {
    console.log(err);
  }
};
