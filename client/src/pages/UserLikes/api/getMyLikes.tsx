import axios from 'axios';

export const getMyLikes = async (url: string, pageParam: number) => {
  const res = await axios(url, {
    params: {
      page: pageParam,
      pageSize: 9,
    },
    headers: {},
  });
  return res.data;
};
