import axios from 'axios';
import { PostData } from '../../../common/type';

export async function patchData(url: string, data: PostData) {
  try {
    const headers = {};

    const res = await axios.patch(url, data, { headers });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
