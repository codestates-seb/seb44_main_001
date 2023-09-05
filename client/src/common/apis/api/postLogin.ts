import axios from 'axios';
import { LoginData } from '../../type';

export async function loginData(url: string, data: LoginData) {
  const res = await axios.post(url, data);

  const accessToken = res.headers['authorization'];
  const memberId = res.headers['memberid'];
  const refreshToken = res.headers['refresh'];

  return { accessToken, memberId, refreshToken };
}
