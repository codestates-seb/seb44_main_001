import axios from 'axios';

export default async function deleteRoom(url: string) {
  try {
    const token = localStorage.getItem('Authorization');

    const headers = {
      Authorization: token,
      'ngrok-skip-browser-warning': '69420',
    };

    const res = await axios.delete(url, { headers });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
