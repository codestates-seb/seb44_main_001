import axios from 'axios';

export default async function deleteLike(url: string, memberId: number) {
  try {
    const options = {
      headers: {
        'ngrok-skip-browser-warning': '69420',
      },
      params: {
        memberId: memberId,
      },
    };
    
    const res = await axios.delete(url, options);
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}