import axios from 'axios';

export default async function getMember(url: string, memberId: number) {
  try {
    const headers = {
      'ngrok-skip-browser-warning': '69420',
      Authorization: `${localStorage.getItem('Authorization')}`,
    };
    const res = await axios.get(`${url}/members/${memberId}`, { headers });
    console.log(res.data);
    return res;
  } catch (err) {
    console.log(err);
  }
}
