import axios from 'axios';
import { ArticleToPost } from '../../../common/type';

export default async function patchData(url: string, data: ArticleToPost) {
  try {
    const headers = { 'ngrok-skip-browser-warning': '69420' };

    const res = await axios.patch(url, data, { headers });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
