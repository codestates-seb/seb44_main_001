import axios from 'axios';

type isLikedType = {
  isLiked: boolean;
  memberId: number;
  postId: number;
};

export default async function postLike(url: string, likeData: isLikedType) {
  try {
    const token = localStorage.getItem('Authorization');

    const headers = {
      Authorization: token,
      'ngrok-skip-browser-warning': '69420',
    };

    const res = await axios.post(url, likeData, { headers });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
