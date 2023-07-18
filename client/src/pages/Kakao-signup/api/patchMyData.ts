import axios from 'axios';
import { SignupPatchData } from '../../../common/type';

export default async function patchMyData(
  url: string,
  token: string,
  data: SignupPatchData,
) {
  try {
    const headers = {
      'ngrok-skip-browser-warning': '69420',
      Authorization: `${token}`,
    };

    const res = await axios.patch(url, data, { headers });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
