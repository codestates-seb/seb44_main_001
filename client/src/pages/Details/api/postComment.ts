import axios from 'axios';
import { CommentToPost } from '../../../common/type';

export default async function postComment(url: string, data: CommentToPost) {
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
