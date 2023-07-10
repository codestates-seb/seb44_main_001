import axios from 'axios';
import { LoginData } from '../../../common/type';
import { setTokenData } from '../store/userTokenStore';

export default async function loginData(url: string, data: LoginData) {
  try {
    const headers = { 'ngrok-skip-browser-warning': '69420' };

    const res = await axios.post(url, data, { headers });
    const token = res.headers['Authorization'];
    const memberId = res.headers['Memberid'];

    // dispatch(setTokenData({ token, memberId }));

    console.log(res);
    console.log('Authorization: ', token);
    console.log('memberId: ', memberId);
  } catch (err) {
    console.log(err);
  }
}
