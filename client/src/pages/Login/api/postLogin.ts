import axios from 'axios';
import { LoginData } from '../../../common/type';

export default async function loginData(url: string, data: LoginData) {
  try {
    const headers = {};

    const res = await axios.post(url, data, { headers });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}