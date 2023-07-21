import axios from 'axios';
import { ChatMembers } from '../../../common/type';

export default async function postChatMembers(url: string, data: ChatMembers) {
  try {
    const accessToken = localStorage.getItem('Authorization');
    const refreshToken = localStorage.getItem('RefreshToken');

    const headers = {
      'ngrok-skip-browser-warning': '69420',
      Authorization: accessToken,
      Refresh: refreshToken,
    };

    const res = await axios.post(url, data, { headers });
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
