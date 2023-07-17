import axios from 'axios';

export default async function getLike(url: string, memberId: number) {
  try {
    const options = {
      headers: {
        'ngrok-skip-browser-warning': '69420',
      },
      params: {
        memberId: memberId,
      },
    };
    
    const res = await axios.get(url, options);
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}