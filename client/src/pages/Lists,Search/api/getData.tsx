import axios from 'axios';
//로그인 안했을때 전역상태 들와서
// categoryId:selectedCategory,
// locationId:selectedLocation,
// 조건부 요청 보내기
export const getData = async (
  url: string,
  keyword: string,
  selectedCategory: number,
  selectedLocation: number,
  pageParam: number,
) => {
  const res = await axios(url, {
    params: {
      ...(keyword && { keyword }),
      categoryId: selectedCategory,
      locationId: selectedLocation,
      page: pageParam,
      pageSize: 12,
    },
    headers: {
      'ngrok-skip-browser-warning': '69420',
    },
  });
  return res.data;
};
