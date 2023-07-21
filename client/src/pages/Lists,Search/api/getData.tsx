import axios from 'axios';

export const getData = async (
  url: string,
  keyword: string | undefined,
  selectedCategory: number | undefined,
  selectedLocation: number,
  pageParam: number,
) => {
  const res = await axios(url, {
    params: {
      ...(keyword && { keyword }),
      ...(selectedCategory && { categoryId: selectedCategory }),
      locationId: selectedLocation,
      page: pageParam,
      pageSize: 9,
    },
    headers: {
      'ngrok-skip-browser-warning': '69420',
    },
  });
  return res.data;
};
