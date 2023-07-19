import axios from 'axios';
import { Member } from '../../../common/type';

export const patchMyData = async (url: string, data: Member) => {
  const token = localStorage.getItem('Authorization');

  const formData = new FormData();
  if (data.file) {
    formData.append('image', data.file);
  }

  const jsonBlob = new Blob([JSON.stringify(data.memberPatchDto)], {
    type: 'application/json',
  });

  formData.append('memberPatchDto', jsonBlob);

  const headers = {
    Authorization: token,
    'ngrok-skip-browser-warning': '69420',
    'Content-Type': 'multipart/form-data',
  };

  const res = await axios.patch(url, formData, { headers });
  return res.data;
};
