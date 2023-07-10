import axios from 'axios';

export default async function getMember(
  url: string,
  memberId: number,
  token: string,
) {
  try {
    const headers = {
      'ngrok-skip-browser-warning': '69420',
      Authorization: token,
    };
    const res = await axios.get(`${url}/members/${memberId}`, { headers });
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
}
