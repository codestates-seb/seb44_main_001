import axios from 'axios';

export const getData = async (
  url: string,
  location: string,
  category: string,
  pageParam: number,
) => {
  const params = {
    location,
    category,
    page:pageParam,
  };
  const res = await axios(url, { params });
  return res.data;
};
