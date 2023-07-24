import axios from 'axios';
import { SignupData } from '../../../common/type';

export default async function signupData(url: string, data: SignupData) {
  const headers = {};

  await axios.post(url, data, { headers });
}
