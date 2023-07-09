import axios from 'axios';
import { CommentToPost } from '../../../common/type';

export default async function patchComment(url: string, data: CommentToPost) {
  try {
    const headers = { 'ngrok-skip-browser-warning': '69420' };

    const res = await axios.patch(url, data, { headers });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
