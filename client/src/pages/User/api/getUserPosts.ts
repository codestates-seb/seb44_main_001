import axios from 'axios';

export const getUserPosts = async (
  url: string,
  memberId: string | null,
  pageParam: number,
) => {
  const res = await axios(url, {
    params: {
      ...(memberId && { memberId }),
      page: pageParam,
    },
    headers: {
      'ngrok-skip-browser-warning': '69420',
    },
  });
  return res.data;
};
