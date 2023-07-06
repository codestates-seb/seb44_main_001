import axios from 'axios';

export const getData =  (
  url: string,
  region: string,
  category: string,
) => {
  const params = {
    region: region,
    category: category,
  };
  return axios(url, { params })
  .then(res=> res.data)
};
