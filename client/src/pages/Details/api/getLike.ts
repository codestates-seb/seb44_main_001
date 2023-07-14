import axios from 'axios';

export default async function getLikes(url: string, memberId: number) {
  try {
    const headers = {
      'ngrok-skip-browser-warning': '69420',
      memberId: memberId,
    };

    const res = await axios.get(url, { headers });
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
