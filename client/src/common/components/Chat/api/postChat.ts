import axios from 'axios';
import { PostChat } from '../../../type';

export default async function postChat(url: string, data: PostChat) {
  try {
    const token = localStorage.getItem('Authorization');

    const headers = {
      Authorization: token,
      'ngrok-skip-browser-warning': '69420',
    };

    const res = await axios.post(url, data, { headers });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
