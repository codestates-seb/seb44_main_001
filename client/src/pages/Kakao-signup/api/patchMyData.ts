import axios from 'axios';
import { MemberPatchDto } from '../../../common/type';

export const patchMyData = async (url: string, data: MemberPatchDto) => {
  const accessToken = localStorage.getItem('Authorization');
  const refreshToken = localStorage.getItem('RefreshToken');

  const headers = {
    Authorization: accessToken,
    Refresh: refreshToken,
  };
  
  const res = await axios.patch(url, data, { headers });
  
  if (res.headers.authorization) {
    localStorage.setItem('Authorization', res.headers.authorization);
  }

  return res.data;
};
