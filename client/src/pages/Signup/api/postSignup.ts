import axios from 'axios';
import { SignupData } from '../../../common/type';

export default async function signupData(url: string, data: SignupData) {
    console.log(data)
    const headers = {'ngrok-skip-browser-warning': '69420',};

    const res = await axios.post(url, data, { headers });
    console.log(res);
}