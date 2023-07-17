import axios from 'axios';
import { postChat } from '../../../type';

export default async function postData(url: string, data: postChat) {
  try {
    const headers = { 'ngrok-skip-browser-warning': '69420' };

    const res = await axios.post(url, data, { headers });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
