import axios from 'axios';

export default async function MyData(url: string, token: string) {
  try {
    const headers = {
      'ngrok-skip-browser-warning': '69420',
      Authorization: `${token}`,
    };

    const res = await axios.get(url, { headers });

    console.log(res);

    return res.data;
  } catch (err) {
    console.log(err);
    return { token: '', memberId: 0 };
  }
}
