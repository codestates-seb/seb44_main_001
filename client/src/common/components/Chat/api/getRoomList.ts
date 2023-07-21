import axios from 'axios';

export default async function getRoomList(url: string) {
  try {
    const token = localStorage.getItem('Authorization');

    const headers = {
      Authorization: token,
      'ngrok-skip-browser-warning': '69420',
    };

    const res = await axios.get(url, { headers });
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
