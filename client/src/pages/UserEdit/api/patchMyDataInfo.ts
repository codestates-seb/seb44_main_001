import axios from 'axios';

import { MemberPatchDto } from '../../../common/type';

export const patchMyDataInfo = async (url: string, data: MemberPatchDto) => {
  const token = localStorage.getItem('Authorization');
  const refreshToken = localStorage.getItem('RefreshToken');

  const headers = {
    Authorization: token,
    Refresh: refreshToken,
  };

  const res = await axios.patch(url, data, { headers });
  return res.data;
};
