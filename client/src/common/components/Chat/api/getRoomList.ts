import axios from 'axios';

export default async function getRoomList(url: string) {
  try {
    const accessToken = localStorage.getItem('Authorization');
    const refreshToken = localStorage.getItem('RefreshToken');

    const headers = {
      'ngrok-skip-browser-warning': '69420',
      Authorization: accessToken,
      Refresh: refreshToken,
    };

    const res = await axios.get(url, { headers });

    console.log(accessToken,res.headers.authorization)
    if(!!res.headers.authorization && accessToken !== res.headers.authorization){
      console.log("겟룸리스트로달라졌다!!!!!!!!!!!!!!!!!!!")
    }

    if (res.headers.authorization) {
      localStorage.setItem('Authorization', res.headers.authorization);
    }
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
