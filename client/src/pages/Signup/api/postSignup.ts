import axios from 'axios';
import { SignupData } from '../../../common/type';

export default async function signupData(url: string, data: SignupData) {
  try {
    const headers = {};

    const res = await axios.post(url, data, { headers });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}