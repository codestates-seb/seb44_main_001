import axios from 'axios';
import { LoginData } from '../../../common/type';

export default async function loginData(url: string, data: LoginData) {
  try {
    const headers = { 'ngrok-skip-browser-warning': '69420' };

    const res = await axios.post(url, data, { headers });

    const accessToken = res.headers['authorization'];
    const memberId = res.headers['memberid'];
    const refreshToken = res.headers['refresh'];

    console.log(res);

    return { accessToken, memberId, refreshToken };
  } catch (err) {
    console.log(err);
    return { token: '', memberId: 0 };
  }
}
