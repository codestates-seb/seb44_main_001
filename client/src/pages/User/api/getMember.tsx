import axios from 'axios';

export const getMember = async (url: string, memberId: number) => {
  const params = {
    memberId,
  };
  const res = await axios(url, { params });
  return res.data;
};