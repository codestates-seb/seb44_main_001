import { instance } from '../utils/instance';

async function makeRequest(method: string, url: string, data?: unknown) {
  try {
    let res;

    switch (method) {
      case 'GET':
        res = await instance.get(url);
        break;
      case 'POST':
        res = await instance.post(url, data);
        break;
      case 'PATCH':
        res = await instance.patch(url, data);
        break;
      case 'DELETE':
        res = await instance.delete(url);
        break;
      default:
        throw new Error('Unsupported HTTP method');
    }

    if (res.headers.authorization) {
      localStorage.setItem('Authorization', res.headers.authorization);
    }

    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getData(url: string) {
  return makeRequest('GET', url);
}

export async function postData(url: string, data: unknown) {
  return makeRequest('POST', url, data);
}

export async function patchData(url: string, data: unknown) {
  return makeRequest('PATCH', url, data);
}

export async function deleteData(url: string) {
  return makeRequest('DELETE', url);
}
