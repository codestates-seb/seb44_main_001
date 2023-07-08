import axios from 'axios';

export default async function deleteArticle(url: string) {
  try {
    const headers = { 'ngrok-skip-browser-warning': '69420' };

    const res = await axios.patch(url, { headers });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
