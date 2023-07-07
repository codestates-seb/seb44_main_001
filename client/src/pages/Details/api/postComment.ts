import axios from 'axios';
import { CommentToPost } from '../../../common/type';

export default async function postComment(url: string, data: CommentToPost) {
  try {
    const headers = {};

    const res = await axios.post(url, data, { headers });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
