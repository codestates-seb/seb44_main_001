import axios from 'axios';

export default async function validateOauth(url: string, token: string) {
  try {
    const headers = {
      Authorization: `${token}`,
    };

    await axios.get(url, { headers });
  } catch (err) {
    console.log(err);
  }
}
