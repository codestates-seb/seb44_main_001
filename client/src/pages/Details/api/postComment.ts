import axios from 'axios';
import { PostData } from '../../../common/type';

export default async function postComment(url: string, data: PostData) {
  try {
    const headers = {};

    const res = await axios.post(url, data, { headers });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
