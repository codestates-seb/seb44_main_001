import axios from 'axios';
import { ChatMembers } from '../../../common/type';

export default async function postChatMembers(url: string, data: ChatMembers) {
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
}
