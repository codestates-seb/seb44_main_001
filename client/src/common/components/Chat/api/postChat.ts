import axios from 'axios';
import { PostChat } from '../../../type';

export default async function postChat(url: string, data: PostChat) {
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
  } catch (err) {
    console.log(err);
  }
}
