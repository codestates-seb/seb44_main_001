import axios from 'axios';

export const getUserPosts = async (
  url: string,
  memberId: string | null,
  pageParam: string,
) => {
  const res = await axios(url, {
    params: {
      ...(memberId && { memberId }),
      page: pageParam,
    },
    headers: {},
  });
  return res.data;
};
