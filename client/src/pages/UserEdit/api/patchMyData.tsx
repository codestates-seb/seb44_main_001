import axios from 'axios';
import { Member } from '../../../common/type';

export const patchMyData = async (url: string, data: Member) => {
  const token = localStorage.getItem('Authorization');

  const headers = {
    Authorization: token,
    'ngrok-skip-browser-warning': '69420',
  };
  const res = await axios.patch(url, data, { headers });
  return res.data;
};
