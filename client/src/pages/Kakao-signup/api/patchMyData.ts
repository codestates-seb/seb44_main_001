import axios from 'axios';
import { SignupPatchData } from '../../../common/type';

export default async function patchMyData(
  url: string,
  token: string,
  data: SignupPatchData,
) {
  try {
    const headers = {
      Authorization: `${token}`,
    };

    await axios.patch(url, data, { headers });
  } catch (err) {
    console.log(err);
  }
}
