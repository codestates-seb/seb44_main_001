import axios from 'axios';

export const getData = async (
  url: string,
  region: string,
  category: string,
) => {
  try {
    const params = {
      region: region,
      category: category,
    };

    const res = await axios(url, { params });
    return res.data;
  } catch (err) {
    console.error(`Fail to get. ${err}`);
  }
};
