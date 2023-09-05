import axios from 'axios';

export const getList = async (
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
    headers: {},
  });
  return res.data;
};
