import axios from 'axios';

export async function getComment(url: string, page = 1, size = 5) {
  try {
    const headers = { 'ngrok-skip-browser-warning': '69420' };

    const res = await axios.get(url, {
      headers,
      params: { page, size },
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
