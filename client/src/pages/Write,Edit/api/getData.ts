import axios from 'axios';
import { ArticleToGet } from '../../../common/type';

export default async function getData(url: string): Promise<ArticleToGet> {
  try {
    const headers = { 'ngrok-skip-browser-warning': '69420' };

    const res = await axios.get(url, { headers });
    console.log(res);

    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
