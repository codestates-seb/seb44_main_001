import axios from 'axios';

export default async function getData(url: string) {
  try {
    const headers = {};

    const res = await axios.get(url, { headers });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
