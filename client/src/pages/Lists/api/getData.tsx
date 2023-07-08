import axios from 'axios';

export const getData = async (
  url: string,
  selectedLocation: number,
  selectedCategory: number,
  pageParam: number,
) => {
  const res = await axios(url, {
    params: {
      categoryId:selectedCategory,
      locationId:selectedLocation,
      page: pageParam,
      pageSize:12,
    },
    headers: {
      'ngrok-skip-browser-warning': '69420',
    },
  });
  return res.data;
};
