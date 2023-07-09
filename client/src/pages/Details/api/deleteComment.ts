import axios from 'axios';

export default async function deleteComment(url: string) {
  try {
    const headers = { 'ngrok-skip-browser-warning': '69420' };

    const res = await axios.delete(url, { headers });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
