import axios from 'axios';

export default async function deleteArticle(url: string) {
  try {
    const headers = {};

    const res = await axios.patch(url, { headers });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
