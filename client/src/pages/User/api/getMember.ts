import axios from 'axios';

export default async function getMember(url: string, token: string) {
  const headers = {
    Authorization: `${token}`,
  };

  const res = await axios.get(url, { headers });

  return res.data;
}
